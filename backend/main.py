
import os
import requests

from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

load_dotenv()

NATLAS_API_URL = os.getenv("NATLAS_API_URL", "").rstrip("/")
NATLAS_API_KEY = os.getenv("NATLAS_API_KEY", "")

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {"message": "NaijaDev Studio API is running"}


@app.get("/health")
def health():
    return {"status": "ok"}


class PromptRequest(BaseModel):
    language: str
    prompt: str


@app.post("/generate")
def generate(request: PromptRequest):

    if not NATLAS_API_URL or not NATLAS_API_KEY:
        raise HTTPException(
            status_code=503,
            detail="N-ATLAS API configuration is missing"
        )

    try:
        result = requests.post(
            f"{NATLAS_API_URL}/generate",
            headers={
                "x-api-key": NATLAS_API_KEY
            },
            json={
                "language": request.language,
                "prompt": request.prompt
            },
            timeout=120
        )

        result.raise_for_status()
        data = result.json()

        return {
            "language": request.language,
            "prompt": request.prompt,
            "response": data["response"]
        }

    except requests.exceptions.RequestException as error:
        print("N-ATLAS connection error:", str(error))

        raise HTTPException(
            status_code=502,
            detail="Unable to connect to N-ATLAS"
        )

    except (ValueError, KeyError):
        raise HTTPException(
            status_code=502,
            detail="Invalid response from N-ATLAS"
        )
