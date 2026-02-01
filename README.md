# Text Verification (Title Verification)

Full-stack application for verifying research paper titles. The frontend is a React
app (`aass`) and the backend is an Express API (`backend`) that validates titles
against CrossRef/Google Scholar and runs a Python-based AI analysis for feedback.

## Project Structure

- `aass/` — React frontend (Create React App)
- `backend/` — Express API server + MongoDB
- `backend/src/controllers/app.py` — Python AI title analysis (Gemini + embeddings)

## Prerequisites

- Node.js 18+ and npm
- Python 3.9+
- MongoDB (local or remote)

## Setup

### 1) Install dependencies

```bash
cd backend
npm install

cd ../aass
npm install
```

### 2) Configure environment variables

Create `backend/.env` (sample values already present in the repo):

```env
port=4000
url=mongodb://localhost:27017/hackathon
GOOGLE_API_KEY=your_google_custom_search_key
CX=your_custom_search_engine_id
```

### 3) Configure Python dependencies

The backend executes `backend/src/controllers/app.py` for AI feedback. Install:

```bash
pip install scholarly sentence-transformers google-generativeai
```

Then add your Gemini API key in `backend/src/controllers/app.py`:

```python
genai.configure(api_key="YOUR_GEMINI_API_KEY")
```

## Running the App

Start the backend:

```bash
cd backend
npm run dev
```

Start the frontend:

```bash
cd aass
npm start
```

The frontend runs at `http://localhost:3000` and the API runs at
`http://localhost:4000`.

## API Endpoints

- `POST /auth/signup` — Create user account
- `POST /auth/login` — Login
- `GET /api/titles?title=Your%20Title` — Title feedback analysis

## Frontend Scripts

From `aass/`:

- `npm start` — Start React dev server
- `npm test` — Run tests
- `npm run build` — Create production build

## Notes

- The backend uses MongoDB. Ensure the connection string in `.env` is reachable.
- For production, update JWT secrets and cookie security settings in the backend.
