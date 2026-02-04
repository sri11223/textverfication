# Production SaaS Transformation Plan

This document converts the current hackathon-level app into a production-grade, cloud-ready SaaS with clear architecture, services, data flow, and implementation patterns.

## 1) System Architecture

### High-level architecture diagram (textual)

```
┌───────────────────────────┐
│        Next.js App        │
│  - SSR/ISR + API client   │
│  - Dashboard + Admin UI   │
└──────────────┬────────────┘
               │ HTTPS
               ▼
┌──────────────────────────────────────────────┐
│          API Gateway (Edge Layer)            │
│  - JWT/API key auth  - Rate limiting         │
│  - Schema validation  - Request logging      │
└──────────────┬──────────────┬────────────────┘
               │              │
               ▼              ▼
┌──────────────────────┐  ┌───────────────────────────┐
│   Core API Service   │  │  AI Orchestration Service │
│  - Users/Projects    │  │  - Job creation           │
│  - Reports/History   │  │  - Retries/Workflow state │
│  - Billing/Webhooks  │  │  - Result normalization   │
└──────────────┬───────┘  └───────────┬───────────────┘
               │                      │
               ▼                      ▼
┌──────────────────────┐  ┌───────────────────────────┐
│   MongoDB (Primary)  │  │   Redis (Cache + Queue)   │
│  - Users/Projects    │  │  - BullMQ job queues       │
│  - Reports/Vectors   │  │  - Rate-limit counters     │
└──────────────┬───────┘  └───────────┬───────────────┘
               │                      │
               ▼                      ▼
┌──────────────────────────┐  ┌──────────────────────────┐
│ Object Storage (S3/GCS)  │  │ FastAPI AI Microservice  │
│  - PDF reports           │  │  - Embeddings            │
│  - Exports               │  │  - Scoring/Suggestions   │
└──────────────────────────┘  └───────────┬──────────────┘
                                          │
                                          ▼
                               ┌──────────────────────────┐
                               │ Vector DB (Atlas/pgvector)│
                               │  - similarity search      │
                               └──────────────────────────┘
```

### Service responsibilities

- **Next.js frontend**: SSR/ISR pages, authenticated dashboard, settings, admin console, usage charts, and API client logic.
- **API Gateway**: central auth (JWT + API keys), request validation (Zod/Joi), rate limiting, and routing to internal services.
- **Core API Service (Express)**: users, projects, reports, billing events, API key management, audit logs.
- **AI Orchestration Service (Express)**: job queueing, retries, workflow state, and AI service communication.
- **FastAPI AI Service**: embeddings, similarity, quality score, rewrite suggestions, domain fit prediction.
- **Redis**: cache hot results, store rate-limit counters, and back BullMQ queues.
- **MongoDB**: system of record for users, projects, reports, vectors, usage.
- **Object Storage**: PDF reports, exports, and audit data retention.
- **Observability**: OpenTelemetry traces/metrics/logs to Grafana/Datadog.

### Data flow (title analysis request)

1. User submits title from Next.js UI.
2. API Gateway validates JWT/API key + schema, then forwards to Core API.
3. Core API writes report metadata and sends AI job to Orchestration service.
4. AI Orchestration creates BullMQ job and returns a `jobId` to the client.
5. Worker calls FastAPI, which computes embeddings + scores.
6. AI results persist to MongoDB; vectors optionally stored in a vector DB.
7. Client polls `GET /api/reports/:id` or receives webhook for completion.

## 2) Clean Code Structure

### Backend (Express) folder structure

```
backend/
  src/
    routes/
      auth.routes.ts
      projects.routes.ts
      reports.routes.ts
      api-keys.routes.ts
    controllers/
      auth.controller.ts
      projects.controller.ts
      reports.controller.ts
      api-keys.controller.ts
    services/
      auth.service.ts
      project.service.ts
      report.service.ts
      ai-orchestration.service.ts
      billing.service.ts
    workers/
      ai.worker.ts
      pdf.worker.ts
    models/
      user.model.ts
      project.model.ts
      report.model.ts
      api-key.model.ts
      usage.model.ts
    middlewares/
      auth.middleware.ts
      rate-limit.middleware.ts
      validate.middleware.ts
      error.middleware.ts
    utils/
      logger.ts
      cache.ts
      errors.ts
      crypto.ts
```

Best practices:
- **Controllers**: I/O boundaries and response shaping only.
- **Services**: business logic, orchestrations, and data access.
- **Workers**: asynchronous job handling (AI, PDF, exports).
- **Middlewares**: auth, validation, rate limiting, and error handling.

### AI Service (FastAPI) folder structure

```
ai_service/
  main.py
  services/
    scoring_service.py
    suggestion_service.py
    similarity_service.py
    domain_fit_service.py
  models/
    request_models.py
    response_models.py
  embeddings/
    embedder.py
    vector_store.py
  config/
    settings.py
```

Best practices:
- Pydantic models for all requests and responses.
- Stateless endpoints that rely on external stores.
- Dependency-injected embedding clients for easier testing.

## 3) Core Product Features (Logic + API + Schema)

### 1) AI Title Quality Score (0–100)

**Feature logic**
- Score = weighted sum of clarity, novelty, specificity, length, grammar.
- Normalize to 0–100 and return a breakdown.

**API**
- `POST /api/titles/score`
  - Input: `{ title, field, context? }`
  - Output: `{ score, breakdown, suggestions }`

**Schema (MongoDB)**
- `reports` document:
  - `score: number`
  - `scoreBreakdown: { clarity, novelty, specificity, grammar, length }`

### 2) Similarity detection (embeddings)

**Feature logic**
- Compute embedding for title; search top-K similar titles in vector store.
- Return matches with similarity scores and DOIs.

**API**
- `POST /api/titles/similarity`
  - Input: `{ title, k? }`
  - Output: `{ matches: [{ title, doi, score }] }`

**Schema**
- `vectors` collection:
  - `title`, `doi`, `embedding`, `createdAt`.

### 3) AI rewrite suggestions

**Feature logic**
- LLM prompt generates 3–5 improved alternatives + rationale.

**API**
- `POST /api/titles/rewrite`
  - Input: `{ title, tone?, field? }`
  - Output: `{ suggestions: [{ title, rationale }] }`

**Schema**
- `reports.suggestions: { title, rationale }[]`.

### 4) Journal/domain fit prediction

**Feature logic**
- Classifier predicts domain and top journal matches with confidence.

**API**
- `POST /api/titles/domain-fit`

**Schema**
- `reports.domainFit: { domain, confidence, journals[] }`.

### 5) User dashboard history

**Feature logic**
- Persist each report per user/project, filterable by date and status.

**API**
- `GET /api/reports?projectId=...&from=...&to=...`

**Schema**
- `reports.userId`, `reports.projectId`, `reports.status`.

### 6) Project folders

**Feature logic**
- Projects collect reports, allow tags, collaborators.

**API**
- `POST /api/projects`
- `GET /api/projects`

**Schema**
- `projects` collection:
  - `name`, `ownerId`, `tags`, `collaborators`.

### 7) PDF export report

**Feature logic**
- Render report content to PDF in worker; store in object storage.

**API**
- `POST /api/reports/:id/pdf`

**Schema**
- `reports.pdfUrl` and `reports.pdfStatus`.

### 8) Version comparison

**Feature logic**
- Compare two report versions; return diff with score deltas.

**API**
- `GET /api/reports/:id/compare?previous=...`

**Schema**
- `reports.version`, `reports.previousId`.

### 9) API access for developers

**Feature logic**
- API keys with scope + quota; usage tracked per key.

**API**
- `POST /api/keys`
- `GET /api/keys`

**Schema**
- `api_keys` collection:
  - `hashedKey`, `scopes`, `rateLimit`, `expiresAt`.

## 4) Performance + Scaling (with examples)

### Redis caching strategy

- Cache title similarity results with a normalized key.
- TTL 24h, invalidation on new embedding insertion.

```ts
// utils/cache.ts
const cacheKey = `similarity:${hashTitle(title)}`;
const cached = await redis.get(cacheKey);
if (cached) return JSON.parse(cached);
```

### Async AI job processing (BullMQ)

```ts
// services/ai-orchestration.service.ts
export const enqueueReport = async (payload) => {
  const job = await queue.add('ai-report', payload, {
    attempts: 3,
    backoff: { type: 'exponential', delay: 1000 },
  });
  return { jobId: job.id };
};
```

### Rate limiting

```ts
// middlewares/rate-limit.middleware.ts
export const rateLimit = rateLimiter({
  windowMs: 60_000,
  max: 120,
  standardHeaders: true,
});
```

### Batching requests

```ts
// services/similarity.service.ts
export const batchSimilarity = async (titles) => {
  return aiClient.post('/batch/similarity', { titles });
};
```

### Retries and failure handling

- Use retries in BullMQ with exponential backoff.
- Move failed jobs to a dead-letter queue after N failures.

## 5) Security

- **JWT + refresh tokens** stored in httpOnly cookies.
- **Input validation** with Zod/Joi at gateway boundary.
- **API key management**: hashed keys, rotation, scopes.
- **CORS + Helmet** with allowlist origin checks.
- **Secrets management**: vault/SSM; never commit secrets.

```ts
// middlewares/auth.middleware.ts
export const authMiddleware = (req, res, next) => {
  const token = extractJwt(req);
  if (!token) return res.status(401).json({ error: 'Unauthorized' });
  req.user = verifyJwt(token);
  return next();
};
```

## 6) DevOps & Deployment

### Docker

- `Dockerfile` for frontend, API, AI service.
- `docker-compose.yml` for local dev.

### CI/CD (GitHub Actions)

- Lint + test + build on PR.
- Deploy staging on merge to `main`.
- Deploy prod with manual approval.

### Production cloud layout

- Frontend: Vercel/CloudFront.
- API services: Kubernetes/ECS.
- MongoDB Atlas, Redis Elasticache.
- Observability: Grafana/Datadog.

### Environment strategy

- Separate configs for dev/staging/prod.
- Secrets in managed vaults, not `.env` in prod.

## 7) Sample Improved Code

### Express controller → service pattern

```ts
// controllers/reports.controller.ts
export const createReport = async (req, res) => {
  const report = await reportService.create(req.user.id, req.body);
  return res.status(201).json(report);
};
```

```ts
// services/report.service.ts
export const create = async (userId, payload) => {
  const job = await queue.add('ai-report', { userId, payload });
  return { jobId: job.id };
};
```

### FastAPI AI endpoint

```py
@app.post('/score', response_model=ScoreResponse)
def score_title(req: ScoreRequest):
    score = scoring_service.score(req.title)
    return score
```

### Queue worker

```ts
queue.process('ai-report', async (job) => {
  return aiClient.generateReport(job.data);
});
```

### AI similarity calculation

```py
def cosine_similarity(vec1, vec2):
    return np.dot(vec1, vec2) / (np.linalg.norm(vec1) * np.linalg.norm(vec2))
```

## 8) Product Roadmap

- **MVP**: auth, scoring, similarity, dashboard, PDF export.
- **v1**: projects, history, API keys, billing, async jobs.
- **v2**: domain fit prediction, collaboration, advanced analytics.
- **Scale**: enterprise SSO, audit logs, custom models, SLAs.

## 9) Resume-Level Explanation

### Resume bullets
- Designed scalable SaaS architecture with async AI microservices, job queues, and Redis caching for high-throughput title analysis.
- Built production-grade API services with JWT refresh tokens, API key auth, and full observability pipelines.
- Implemented AI workflows (embeddings + similarity + scoring) to deliver structured reports and suggestions.

### System design interview summary
- Chose async queueing to decouple AI workload from latency-sensitive APIs.
- Used Redis/BullMQ for retries and backoff, improving resilience.
- Separated AI into FastAPI microservice for independent scaling.

### Metrics-driven impact statements (example)
- Reduced AI latency by 40% with caching + batching.
- Improved throughput 3x with async processing.
- Increased reliability to 99.9% with retries and dead-letter queues.
