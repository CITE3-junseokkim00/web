import json

from flask import Flask, jsonify
from flask_cors import CORS

import Generation
import KeyphraseExtraction
from Extract import extract
import Summarization
import Distractor
from makeChunk import doc2Chunk
from collections import defaultdict

app = Flask(__name__)
CORS(app)



@app.route("/api/makeChunk/<text>", methods=["GET"])
def makeChunk(text: str):
    response = doc2Chunk(text)
    json_obj = {"response": response}
    return jsonify(json_obj)


@app.route("/api", methods=["GET"])
def read_root():
    return {"Hello": "Cite3!"}


@app.route("/api/summarization/<text>", methods=["GET"])
def summary(text: str):
    return Summarization.query({"inputs": text,
                                "parameters": {"min_length": 200, "max_length": 256, "repetition_penalty": 2.0},
                                'options': {"wait_for_model": True}})


@app.route("/api/extract/<text>", methods=["GET"])
def extract(text: str):
    # response = KeyphraseExtraction.keywordExtraction(text)
    response = extract(document=text, model_name="gpt-3.5-turbo-0613", n_words=10)
    json_obj = {"response": response}
    return jsonify(json_obj)


@app.route("/api/generation/<text>/<answer>", methods=["GET"])
def generate(text: str, answer: str):
    return Generation.query({"inputs": text + "<unused0>" + answer,
                             'options': {"wait_for_model": True}})

@app.route("/api/distractors/<text>/<keyword>", methods=["GET"])
def distractor(text: str, keyword: str):
    response = Distractor.get_distractor(text=text, keyword=keyword)
    json_obj = {"response": response}
    return jsonify(json_obj)

@app.route("/api/makeQuiz/<text>", methods=["GET"])
def makeQuiz(text: str):
    questions = []
    summarize_response = Summarization.query({"inputs": text,
                                "parameters": {"min_length": 200, "max_length": 256, "repetition_penalty": 2.0},
                                'options': {"wait_for_model": True}})
    extract_response = KeyphraseExtraction.keywordExtraction(summarize_response[0]['summary_text'])
    idx=0
    for keyword in extract_response:
        response=defaultdict(list)
        response['answer'] = keyword
        generate_question = Generation.query({"inputs": summarize_response[0]['summary_text'] + "<unused0>" + keyword,
                             'options': {"wait_for_model": True}})
        response['question'] = generate_question[0]['generated_text']
        distractor = Distractor.get_distractor(text=text, keyword=keyword)
        response['distractor'] = distractor
        response['index'] = idx
        questions.append(response)
        idx+=1
    json_obj = {"response": questions}
    return jsonify(json_obj)




if __name__ == "__main__":
    app.run(host="0.0.0.0",port=8080)
