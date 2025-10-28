import os
from pydantic import BaseModel

class Settings(BaseModel):
    ENV: str = os.getenv("ENV", "dev")
    DB_URL: str = os.getenv("DB_URL", "postgresql+psycopg://postgres:postgres@db:5432/orcaia")
    REDIS_URL: str = os.getenv("REDIS_URL", "redis://redis:6379/0")

settings = Settings()