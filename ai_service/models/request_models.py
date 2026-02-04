from pydantic import BaseModel, Field
from typing import List, Optional


class ScoreRequest(BaseModel):
    title: str = Field(..., min_length=4)
    field: Optional[str] = None
    context: Optional[str] = None


class SimilarityRequest(BaseModel):
    title: str = Field(..., min_length=4)
    k: int = 5


class RewriteRequest(BaseModel):
    title: str = Field(..., min_length=4)
    tone: Optional[str] = None
    field: Optional[str] = None


class BatchSimilarityRequest(BaseModel):
    titles: List[str]
