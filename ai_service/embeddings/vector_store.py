from typing import List, Dict


class VectorStore:
    def __init__(self):
        self._store: List[Dict] = []

    def add(self, title: str, embedding: List[float], doi: str | None = None):
        self._store.append({"title": title, "embedding": embedding, "doi": doi})

    def search(self, embedding: List[float], k: int = 5) -> List[Dict]:
        return self._store[:k]
