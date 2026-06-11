from pydantic import BaseModel, Field
from typing import Any, Optional


class PipelineNode(BaseModel):
    id: str
    type: Optional[str] = None
    position: Optional[dict[str, Any]] = None
    data: dict[str, Any] = Field(default_factory=dict)


class PipelineEdge(BaseModel):
    id: Optional[str] = None
    source: str
    target: str
    sourceHandle: Optional[str] = None
    targetHandle: Optional[str] = None


class PipelineRequest(BaseModel):
    nodes: list[PipelineNode]
    edges: list[PipelineEdge]


class PipelineResponse(BaseModel):
    num_nodes: int
    num_edges: int
    is_dag: bool
    cycles: list[list[str]] = []
    topological_order: Optional[list[str]] = None
