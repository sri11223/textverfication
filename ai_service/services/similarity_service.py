from typing import List
import numpy as np
from ai_service.embeddings.embedder import embed


def cosine_similarity(vec1: List[float], vec2: List[float]) -> float:
    v1 = np.array(vec1)
    v2 = np.array(vec2)
    denom = np.linalg.norm(v1) * np.linalg.norm(v2)
    return float(np.dot(v1, v2) / denom) if denom else 0.0


def similarity_matches(title: str) -> List[dict]:
    base = embed(title)
    candidates = [
        {"title": f"{title} in practice", "doi": None, "vector": embed(f"{title} in practice")},
        {"title": f"{title} review", "doi": None, "vector": embed(f"{title} review")},
    ]
    results = []
    for candidate in candidates:
        score = cosine_similarity(base, candidate["vector"])
        results.append({"title": candidate["title"], "doi": candidate["doi"], "score": score})
    return results
