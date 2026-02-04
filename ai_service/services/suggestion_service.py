from typing import List


def rewrite(title: str) -> List[dict]:
    return [
        {"title": f"A Comprehensive Study of {title}", "rationale": "Adds clarity and scope."},
        {"title": f"{title}: Methods and Findings", "rationale": "Highlights methodology and outcomes."},
    ]
