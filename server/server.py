import json

from flask import Flask, jsonify
from flask_cors import CORS

import Generation
import KeyphraseExtraction
import Summarization
import Distractor
from makeChunk import doc2Chunk

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
    response = KeyphraseExtraction.keywordExtraction(text)
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


if __name__ == "__main__":
    app.run(host="0.0.0.0",port=8080)
