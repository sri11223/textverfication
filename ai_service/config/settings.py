from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    model_name: str = "sentence-transformers/all-MiniLM-L6-v2"
    embedding_dim: int = 384


settings = Settings()
