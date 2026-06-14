import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from models import PipelineRequest, PipelineResponse
from dag import analyze

load_dotenv()


def parse_cors_origins() -> list[str]:
    raw = os.getenv("BACKEND_CORS_ORIGINS", "")
    origins = [origin.strip() for origin in raw.split(",") if origin.strip()]
    if origins:
        return origins
    return ["http://localhost:3000", "http://127.0.0.1:3000"]

app = FastAPI(title="VectorShift Pipeline Parser")

app.add_middleware(
    CORSMiddleware,
    allow_origins=parse_cors_origins(),
    allow_credentials=os.getenv("BACKEND_CORS_ALLOW_CREDENTIALS", "true").lower() == "true",
    allow_methods=[m.strip() for m in os.getenv("BACKEND_CORS_ALLOW_METHODS", "*").split(",") if m.strip()],
    allow_headers=[h.strip() for h in os.getenv("BACKEND_CORS_ALLOW_HEADERS", "*").split(",") if h.strip()],
)


@app.post("/pipelines/parse", response_model=PipelineResponse)
def parse_pipeline(req: PipelineRequest) -> PipelineResponse:
    result = analyze(req.nodes, req.edges)
    return PipelineResponse(
        num_nodes=len(req.nodes),
        num_edges=len(req.edges),
        is_dag=result["is_dag"],
    )


@app.get("/health")
def health():
    return {"status": "ok"}
