
# NaijaDev Studio 🇳🇬

### A Multilingual Nigerian AI Playground Powered by N-ATLAS

NaijaDev Studio is an interactive AI playground that enables developers, students, educators, and other users to experiment with Nigerian-language artificial intelligence.

The application integrates the NCAIR N-ATLAS language model and supports prompt-based text generation in English, Hausa, Igbo, and Yoruba.

Built as a prototype for the NITDA National AI Innovation Challenge 2026.

## The Problem

Many AI development tools prioritize English, creating barriers for people who want to experiment with artificial intelligence in Nigerian languages.

Developers also need accessible ways to test locally relevant language models before integrating them into applications.

## Our Solution

NaijaDev Studio provides a simple web interface where users can:

- Select English, Hausa, Igbo, or Yoruba.
- Enter a prompt or question.
- Generate responses using the N-ATLAS 8B model.
- Explore Nigerian-language AI capabilities.
- View an interface designed for developer experimentation.

## Technology Stack

| Component | Technology |
|---|---|
| Frontend | React, TypeScript, Vite |
| Backend | Python, FastAPI |
| AI Model | NCAIR1/N-ATLaS |
| AI Framework | Hugging Face Transformers, PyTorch |
| Model Execution | Kaggle GPU T4 x2 |
| Temporary API Access | Cloudflare Tunnel |
| API Authentication | Private API key |
| Version Control | Git and GitHub |

## System Architecture

```text
React + TypeScript Frontend
           |
           v
Local FastAPI Backend
           |
           v
Authenticated HTTPS Request
           |
           v
Cloudflare Temporary Tunnel
           |
           v
FastAPI Server on Kaggle
           |
           v
N-ATLAS 8B Language Model
           |
           v
Generated Response
           |
           v
React User Interface
```

## Supported Languages

- English
- Hausa
- Igbo
- Yoruba

All four languages have been tested through the integrated application.

These tests demonstrate successful response generation, not a comprehensive evaluation of linguistic accuracy.

## Project Structure

```text
naijadev-studio/
├── backend/
│   └── main.py
├── frontend/
│   ├── src/
│   │   ├── App.tsx
│   │   ├── App.css
│   │   └── index.css
│   └── package.json
├── .gitignore
└── README.md
```

## Getting Started

### Prerequisites

- Python 3
- Node.js and npm
- Access to a running N-ATLAS inference endpoint
- An API key for the inference endpoint

### 1. Clone the Repository

```bash
git clone https://github.com/muxty001/naijadev-studio.git
cd naijadev-studio
```

### 2. Configure the Backend

```bash
cd backend
python -m venv venv
```

Activate the virtual environment.

On Windows:

```powershell
.\venv\Scripts\Activate.ps1
```

Install dependencies:

```bash
python -m pip install fastapi uvicorn requests python-dotenv
```

Create a `.env` file inside the `backend` directory:

```dotenv
NATLAS_API_URL=YOUR_INFERENCE_ENDPOINT
NATLAS_API_KEY=YOUR_PRIVATE_API_KEY
```

Do not commit the `.env` file or expose the API key in frontend code.

Start the backend:

```bash
python -m uvicorn main:app --reload
```

The backend runs at:

http://127.0.0.1:8000

### 3. Start the Frontend

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

Open:

http://localhost:5173

### 4. Generate an AI Response

1. Select a language.
2. Enter a question or prompt.
3. Click Generate.
4. Wait for the N-ATLAS response.

## API Endpoints

### GET /health

Returns the local backend health status.

### POST /generate

Example request:

```json
{
  "language": "Hausa",
  "prompt": "Explain what an API is in simple Hausa."
}
```

The backend forwards the request to the configured N-ATLAS inference service.

Example response structure:

```json
{
  "language": "Hausa",
  "prompt": "Explain what an API is in simple Hausa.",
  "response": "AI-generated response appears here."
}
```

## N-ATLAS Integration

The N-ATLAS model is loaded using Hugging Face Transformers and PyTorch on Kaggle GPUs.

A FastAPI inference service handles generation requests, and a temporary Cloudflare tunnel enables the local application to communicate with that service.

The Hugging Face model requires appropriate access authorization.

## Current Limitations

- The inference server runs in a temporary Kaggle session.
- The Cloudflare tunnel URL changes when a new tunnel is created.
- The application is not yet permanently deployed.
- AI responses may take time to generate.
- Language accuracy requires further evaluation.
- The Kaggle inference notebook is maintained separately from this repository.

## Future Improvements

- Permanent inference hosting
- Streaming AI responses
- Response-time optimization
- Additional developer integration examples
- Improved multilingual evaluation
- Public beta testing and feedback

## Project Status

Functional hackathon prototype.

The frontend, local backend, and N-ATLAS inference service have been integrated and tested successfully.

## Developer

Mustapha Aminu

GitHub: https://github.com/muxty001

## Acknowledgements

NITDA, NCAIR, the N-ATLAS model contributors, Hugging Face, Kaggle, and the open-source developer community.
