from fastapi import APIRouter
# from fastapi.responses import JSONResponse
import logging
from openai import OpenAI 
from dotenv import load_dotenv
import yaml
# from functions import get_context
import json
from pydantic import BaseModel
import requests
import os

load_dotenv()

# Setup logging
logging.basicConfig(level=logging.WARN)
logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)
logger.propagate = False

router = APIRouter()
# client = OpenAI()

config = ''
try:
    with open('config.yaml', 'r') as f:
        config = yaml.safe_load(f)
except Exception as e:
    logger.exception("Could not load config.yaml")
    config = {}

logger.info('Config Loaded')

messages  = [
    {
        'role': 'system',
        'content': config['tutor']['system'].format(config['Miles Morales']['description'])
    }
]
# global system_prompt
system_prompt = config['tutor']['system'].format(config['Miles Morales']['description'])
os.environ['system_prompt'] = system_prompt

tools = [
    config['hybrid_query_tool']
]

###############################################
class QueryRequest(BaseModel):
    query: str

class PersonaRequest(BaseModel):
    persona: str


def ai_response(query,messages, tools):
    payload = {
        "request_source": "override_params",
        "query": query,
        "session_id": "testing3",
        "model_params": {
            "system_prompt": os.getenv('system_prompt'),
            "search_params": {
                "retrieval_type": "neighbor"
            }
        }
    }

    headers = {
        "Authorization": f"Bearer {os.getenv('MY_AI_BUILDER_API_KEY')}", 
        "Content-Type": "application/json"
    }

    response = requests.post(url=os.getenv('MY_AI_BUILDER_API')+'query',headers=headers,json=payload)
    return response.json().get('response','')

@router.post('/chat')
def chat(request: QueryRequest):
    messages.append(
        {
        'role': 'user',
        'content': request.query
    })
    # logger.info(F"MESSAGES: {messages[0]}")
    response = ai_response(request.query,messages,tools)
    # response = 'This is testing phase.'
    messages.append(
        {
        'role': 'assistant',
        'content': response
    })

    return {'response': response}

@router.post('/persona')
def update_persona(request: PersonaRequest):
    messages[0] = {'role':'system','content': config['tutor']['system'].format(config[request.persona]['description'])}
    os.environ['system_prompt'] = config['tutor']['system'].format(config[request.persona]['description'])
    return {'response':'done'}

@router.get('/')
def check():
    return {'reponse':'Hello!'}


