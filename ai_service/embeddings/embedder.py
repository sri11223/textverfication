from typing import List
import numpy as np


def embed(text: str) -> List[float]:
    np.random.seed(abs(hash(text)) % (2**32))
    vector = np.random.rand(384)
    return vector.tolist()
