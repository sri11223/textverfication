import sys
import logging
import os
import json
from scholarly import scholarly
from sentence_transformers import SentenceTransformer, util
import google.generativeai as genai

# Suppress all gRPC logs and unnecessary warnings
os.environ["GRPC_VERBOSITY"] = "NONE"
os.environ["TF_CPP_MIN_LOG_LEVEL"] = "3"

logging.getLogger('google').setLevel(logging.ERROR)
logging.getLogger('grpc').setLevel(logging.ERROR)

# Configure the Gemini API
api_key = os.getenv("GEMINI_API_KEY")
if not api_key:
    print(json.dumps({"error": "GEMINI_API_KEY is not set"}))
    sys.exit()

try:
    genai.configure(api_key=api_key)
    gemini_model = genai.GenerativeModel("gemini-1.5-flash")
except Exception as e:
    print(json.dumps({"error": f"Error configuring Gemini API: {str(e)}"}))
    sys.exit()

# Initialize the SentenceTransformer model
try:
    model = SentenceTransformer('all-MiniLM-L6-v2')
except Exception as e:
    print(json.dumps({"error": f"Error initializing SentenceTransformer: {str(e)}"}))
    sys.exit()

def fetch_top_results(query, num_results=5):
    search_query = scholarly.search_pubs(query)
    results = []
    for _ in range(num_results):
        try:
            result = next(search_query)
            title = result['bib']['title']
            pub_url = result.get('pub_url', 'No link available')
            results.append({"title": title, "url": pub_url})
        except StopIteration:
            break
    return results

def analyze_title_with_gemini(title, reason):
    prompt = (
        f"""You are an expert in reviewing research paper titles.
        Proposed Title: '{title}'. 
        Similarity: This is {reason}. 
        Now, make a short report (single-line points and headers) based on proposed title and similarity. 
        If not duplicate, please find disallowed combinations, or inappropriate prefixes. 
        Provide suggestions for improvement if Duplicate. Provide suggestions for improvement."""
    )
    response = gemini_model.generate_content(prompt)
    return response.text

def analyze_uniqueness(submitted_title, search_results):
    if not search_results:
        return {
            "input": submitted_title,
            "output": {
                "queried_title": "Error",
                "feedback": "No search results found.",
                "approval_probability": 0.0
            }
        }

    query_embedding = model.encode(submitted_title, convert_to_tensor=True)
    titles = [result['title'] for result in search_results]
    title_embeddings = model.encode(titles, convert_to_tensor=True)

    similarity_scores = util.pytorch_cos_sim(query_embedding, title_embeddings)[0]

    for idx, (result, score) in enumerate(zip(search_results, similarity_scores)):
        score = score.item()
        if score == 1.0:
            feedback = analyze_title_with_gemini(submitted_title, f"Duplicate of '{result['title']}'.")
            return {
                "input": submitted_title,
                "output": {
                    "queried_title": result['title'],
                    "feedback": feedback,
                    "approval_probability": 0.0
                }
            }

    best_match_idx = similarity_scores.argmax().item()
    best_match_score = similarity_scores[best_match_idx].item()

    if best_match_score >= 0.85:
        reason = f"highly similar to '{titles[best_match_idx]}', similarity score: {best_match_score:.2f}"
    else:
        reason = "unique"

    feedback = analyze_title_with_gemini(submitted_title, reason)
    approval_probability = (1 - best_match_score) * 100

    return {
        "input": submitted_title,
        "output": {
            "queried_title": titles[best_match_idx],
            "feedback": feedback,
            "approval_probability": approval_probability
        }
    }

def main():
    submitted_title = sys.stdin.read().strip()

    if not submitted_title:
        print(json.dumps({"error": "No title provided!"}))
        return

    search_results = fetch_top_results(submitted_title, num_results=5)
    analysis = analyze_uniqueness(submitted_title, search_results)
    print(json.dumps(analysis, indent=2))

# Correctly checking if this is the main script
if __name__ == "__main__":
    main()
