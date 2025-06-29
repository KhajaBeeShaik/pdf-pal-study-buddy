from fastapi import FastAPI
from routes2 import router
from dotenv import load_dotenv
import os
from fastapi.middleware.cors import CORSMiddleware

# load_dotenv() 

# openai_api_key = os.getenv("OPENAI_API_KEY")





app = FastAPI()

# 2. Configure CORS middleware for the entire application
# Define allowed origins (your frontend URLs)
# IMPORTANT: In production, replace "*" with your actual frontend domain(s)
origins = [
    "http://localhost",
    "http://localhost:3000", # Common for React create-react-app
    "http://localhost:5173", # Common for Vite (React) dev server
    "http://localhost:8080"
    # "https://your-production-frontend-domain.com",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],    # Allows all methods including OPTIONS, GET, POST, etc.
    allow_headers=["*"],    # Allows all headers including Content-Type, Authorization, etc.
)
app.include_router(router)