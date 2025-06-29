# Run on port 8010

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os, json, yaml
from dotenv import load_dotenv
import requests

# Load environment variables
load_dotenv(dotenv_path="./.env")
API_KEY = os.getenv("MY_AI_BUILDER_API_KEY")
API_URL = os.getenv("MY_AI_BUILDER_API")

app = FastAPI()

# Allow frontend on localhost:8080
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8080"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load prompts
with open("prompts.yaml", 'r') as f:
    prompts = yaml.safe_load(f)

# Load payloads
payloads = {}
for filename in os.listdir("./payloads"):
    if filename.endswith(".json"):
        with open(os.path.join("./payloads", filename), "r") as f:
            key = os.path.splitext(filename)[0]
            payloads[key] = json.load(f)
            payloads[key]["model_params"]["system_prompt"] = prompts["system_prompt"]

# Authorization headers
headers = {
    "Authorization": f"Bearer {API_KEY}",
    "Content-Type": "application/json"
}

# Data models
class CodeSubmission(BaseModel):
    question: str
    code: str

# API for generating questions.
@app.get("/api/questions")
def get_questions():
    payload = payloads["generate_questions"]
    payload["query"] = prompts["generate_questions_prompt"]
    response = requests.post(API_URL + "query", json=payload, headers=headers)
    print("Questions: ", response.json()["response"].split("\n"))
    return {"questions": response.json()["response"].split("\n")}

# API for getting hints/instructions to solve a question.
@app.post("/api/instructions")
def get_instructions(data: dict):
    question = data["question"]
    prompt = prompts["generate_information_prompt"].replace("{question}", question)

    payload = payloads["answer_question"]
    payload["query"] = prompt
    payload["model_params"]["history"].clear()

    response = requests.post(API_URL + "query", json=payload, headers=headers)
    instructions = response.json()["response"]

    payload["model_params"]["history"].append({
        "query": prompt,
        "response": instructions
    })

    return {"instructions": instructions}

# API to check whether the code answers the question correctly and how it can be optimized
# with GPU-accelerated packages.
@app.post("/api/check")
def check_answer(submission: CodeSubmission):
    prompt = prompts["check_correctness_prompt"]
    prompt = prompt.replace("{question}", submission.question).replace("{code}", submission.code)

    payload = payloads["answer_question"]
    payload["query"] = prompt

    response = requests.post(API_URL + "query", json=payload, headers=headers)
    evaluation = response.json()["response"]

    payload["model_params"]["history"].append({
        "query": prompt,
        "response": evaluation
    })

    is_correct = "question answered correctly" in evaluation.lower()

    return {
        "correct": is_correct,
        "feedback": evaluation
    }