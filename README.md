# OrçaIA (MVP)
Monorepo: Next.js (apps/web), FastAPI (apps/api), ETL SINAPI (data/sinapi_etl).

## Dev rápido
- Pré-requisitos: Docker, Node 20+, Python 3.11+, pnpm (ou npm), uv (opcional).
- Subir stack: `make dev` ou `docker compose -f infra/docker-compose.yml up -d`

## Pastas
- apps/web: front Next.js
- apps/api: FastAPI
- data/sinapi_etl: scripts para ingestão SINAPI/SEINFRA
- infra: docker-compose, DB, Redis, MinIO