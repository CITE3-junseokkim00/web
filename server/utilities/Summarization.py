import requests
from utilities.utils import API_TOKEN

API_URL = "https://api-inference.huggingface.co/models/psyche/KoT5-summarization"
headers = {"Authorization": "Bearer " + API_TOKEN}
# headers = {"Authorization": "Bearer " + "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"}

def Summarize_query(payload):
    
    response = requests.post(API_URL, headers=headers, json=payload)
    return response.json()
