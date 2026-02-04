from pydantic import BaseModel
from typing import List, Dict


class ScoreBreakdown(BaseModel):
    clarity: float
    novelty: float
    specificity: float
    grammar: float
    length: float


class ScoreResponse(BaseModel):
    score: float
    breakdown: ScoreBreakdown
    suggestions: List[str]


class SimilarityMatch(BaseModel):
    title: str
    doi: str | None
    score: float


class SimilarityResponse(BaseModel):
    matches: List[SimilarityMatch]


class RewriteSuggestion(BaseModel):
    title: str
    rationale: str


class RewriteResponse(BaseModel):
    suggestions: List[RewriteSuggestion]


class BatchSimilarityResponse(BaseModel):
    results: Dict[str, SimilarityResponse]
