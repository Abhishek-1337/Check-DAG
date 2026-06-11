from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from models import PipelineRequest, PipelineResponse
from dag import analyze

app = FastAPI(title="VectorShift Pipeline Parser")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/pipelines/parse", response_model=PipelineResponse)
def parse_pipeline(req: PipelineRequest) -> PipelineResponse:
    result = analyze(req.nodes, req.edges)
    return PipelineResponse(
        num_nodes=len(req.nodes),
        num_edges=len(req.edges),
        is_dag=result["is_dag"],
        cycles=result["cycles"],
        topological_order=result["topological_order"],
    )


@app.get("/health")
def health():
    return {"status": "ok"}
