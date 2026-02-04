from typing import Dict


def score(title: str) -> Dict:
    length_score = max(0, min(1, len(title) / 120))
    clarity = 0.8
    novelty = 0.6
    specificity = 0.7
    grammar = 0.9

    score_value = round((clarity + novelty + specificity + grammar + length_score) / 5 * 100, 2)

    return {
        "score": score_value,
        "breakdown": {
            "clarity": clarity,
            "novelty": novelty,
            "specificity": specificity,
            "grammar": grammar,
            "length": length_score,
        },
        "suggestions": ["Make the title more specific.", "Highlight the main contribution."],
    }
