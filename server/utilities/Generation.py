import requests
from utils import API_TOKEN

API_URL = "https://api-inference.huggingface.co/models/junseokkim00/KoBART_Question_Generation"
headers = {"Authorization": "Bearer " + API_TOKEN}

def Generation_query(payload):
    response = requests.post(API_URL, headers=headers, json=payload)
    return response.json()