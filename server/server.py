import json
from flask import Flask, jsonify
from flask_cors import CORS
import Generation
import Extract
import Summarization
from Distract import distract
import random
from makeChunk import doc2Chunk
from collections import defaultdict

app = Flask(__name__)
CORS(app)


@app.route("/api/makeChunk/<text>", methods=["GET"])
def makeChunk(text):
    response = doc2Chunk(text)
    json_obj = {"response": response}
    return jsonify(json_obj)


@app.route("/api", methods=["GET"])
def read_root():
    return {"Hello": "Cite3!"}


@app.route("/api/summarization/<text>", methods=["GET"])
def summary(text):
    return Summarization.query({"inputs": text,
                                "parameters": {"min_length": 200, "max_length": 256, "repetition_penalty": 2.0},
                                'options': {"wait_for_model": True}})


@app.route("/api/extract/<text>", methods=["GET"])
def extract(text):
    # response = KeyphraseExtraction.keywordExtraction(text)
    response = Extract.extract(document=text, model_name="gpt-3.5-turbo-0613", n_words=10)
    json_obj = {"response": response}
    return jsonify(json_obj)


@app.route("/api/generation/<text>/<answer>", methods=["GET"])
def generate(text, answer):
    return Generation.query({"inputs": text + "<unused0>" + answer,
                             'options': {"wait_for_model": True}})

@app.route("/api/distractors/<text>/<keyword>", methods=["GET"])
def distractor(text, keyword):
    # response = Distractor.get_distractor(text=text, keyword=keyword)
    response = distract(question=text, answer=keyword, model_name="gpt-3.5-turbo-0613")
    json_obj = {"response": response}
    return jsonify(json_obj)

@app.route("/api/makeQuiz/<text>", methods=["GET"])
def makeQuiz(text):
    questions = []
    summarize_response = Summarization.query({"inputs": text,
                                "parameters": {"min_length": 200, "max_length": 256, "repetition_penalty": 2.0},
                                'options': {"wait_for_model": True}})

    extract_response = Extract.extract(document=summarize_response[0]['summary_text'], model_name="gpt-3.5-turbo-0613", n_words=10)
    if len(extract_response) > 10:
        random.shuffle(extract_response)
        extract_response = extract_response[:10]
    idx=0
    for keyword in extract_response:
        response=defaultdict(list)
        response['answer'] = keyword
        generate_question = Generation.query({"inputs": summarize_response[0]['summary_text'] + "<unused0>" + keyword,
                             'options': {"wait_for_model": True}})
        response['question'] = generate_question[0]['generated_text']
        try:
            distractor = distract(question=text, answer=keyword, model_name="gpt-3.5-turbo-0613")
            # distractor = Distractor.get_distractor(text=text, keyword=keyword)
        except:
            distractor = ["Distractor failed"]
        distractor.append(keyword)
        random.shuffle(distractor)
        response['distractor'] = distractor
        response['index'] = idx
        questions.append(response)
        idx+=1
    json_obj = {"response": questions}
    return jsonify(json_obj)




if __name__ == "__main__":
    app.run(host="0.0.0.0",port=8080)
