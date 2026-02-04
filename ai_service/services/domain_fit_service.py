from typing import Dict


def predict(title: str) -> Dict:
    return {
        "domain": "Computer Science",
        "confidence": 0.72,
        "journals": ["ACM Transactions", "IEEE Access"],
    }
