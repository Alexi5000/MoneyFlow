"""
Application configuration settings for MoneyFlow Backend.

Uses environment variables with sensible defaults for development.
"""

import secrets
from typing import List, Optional, Union
from pydantic import AnyHttpUrl, field_validator
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    """Application settings with environment variable support."""

    # Project metadata
    PROJECT_NAME: str = "MoneyFlow API"
    VERSION: str = "1.0.0"
    DESCRIPTION: str = "AI-Powered Budget Tracking API"
    API_V1_STR: str = "/api/v1"

    # Server settings
    HOST: str = "localhost"
    PORT: int = 8000
    ENVIRONMENT: str = "development"

    # Security settings
    SECRET_KEY: str = secrets.token_urlsafe(32)
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 8  # 8 days

    # CORS settings
    BACKEND_CORS_ORIGINS: List[AnyHttpUrl] = [
        "http://localhost:3000",  # React dev server
        "http://localhost:5173",  # Vite dev server
        "http://127.0.0.1:3000",
        "http://127.0.0.1:5173",
    ]

    @field_validator("BACKEND_CORS_ORIGINS", mode="before")
    @classmethod
    def assemble_cors_origins(
        cls, v: Union[str, List[str]]
    ) -> Union[List[str], str]:
        """Parse CORS origins from environment variable or list."""
        if isinstance(v, str) and not v.startswith("["):
            return [i.strip() for i in v.split(",")]
        elif isinstance(v, (list, str)):
            return v
        raise ValueError(v)

    # Database settings
    DATABASE_URL: str = "sqlite:///./moneyflow.db"
    DATABASE_TEST_URL: str = "sqlite:///./test.db"

    # AI Service settings (for future integration)
    OPENAI_API_KEY: Optional[str] = None
    AI_MODEL: str = "gpt-3.5-turbo"

    # Rate limiting
    RATE_LIMIT_REQUESTS: int = 100
    RATE_LIMIT_WINDOW: int = 60  # seconds

    model_config = {
        "env_file": ".env",
        "case_sensitive": True
    }


# Create global settings instance
settings = Settings()
