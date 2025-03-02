import requests
import json

OLLAMA_URL = "http://localhost:11434/api/generate"
headers = {"Content-Type": "application/json"}

def query_ollama(prompt, model="deepseek-r1"):
    payload = {
        "model": model,
        "prompt": prompt,
        "stream": False
    }
    response = requests.post(OLLAMA_URL, headers=headers, data=json.dumps(payload))
    return response.json()["response"]

print(query_ollama("LangChain이 뭔지 한글로 답변해줘"))
