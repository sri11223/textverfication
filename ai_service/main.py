from fastapi import FastAPI
from ai_service.models.request_models import ScoreRequest, SimilarityRequest, RewriteRequest, BatchSimilarityRequest
from ai_service.models.response_models import ScoreResponse, SimilarityResponse, RewriteResponse, BatchSimilarityResponse
from ai_service.services import scoring_service, similarity_service, suggestion_service, domain_fit_service

app = FastAPI(title="Text Verification AI Service")


@app.post("/score", response_model=ScoreResponse)
async def score_title(request: ScoreRequest):
    return scoring_service.score(request.title)


@app.post("/similarity", response_model=SimilarityResponse)
async def similarity(request: SimilarityRequest):
    return {"matches": similarity_service.similarity_matches(request.title)}


@app.post("/rewrite", response_model=RewriteResponse)
async def rewrite(request: RewriteRequest):
    return {"suggestions": suggestion_service.rewrite(request.title)}


@app.post("/domain-fit")
async def domain_fit(request: ScoreRequest):
    return domain_fit_service.predict(request.title)


@app.post("/batch/similarity", response_model=BatchSimilarityResponse)
async def batch_similarity(request: BatchSimilarityRequest):
    results = {
        title: {"matches": similarity_service.similarity_matches(title)}
        for title in request.titles
    }
    return {"results": results}
