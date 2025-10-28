dev:
\tdocker compose -f infra/docker-compose.yml up -d --build
down:
\tdocker compose -f infra/docker-compose.yml down
logs:
\tdocker compose -f infra/docker-compose.yml logs -f api web