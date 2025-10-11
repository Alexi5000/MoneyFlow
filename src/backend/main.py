"""
MoneyFlow Backend API Server

A comprehensive FastAPI backend for the MoneyFlow financial management application.
Provides RESTful APIs for user management, transactions, budgets, and AI insights.
"""

from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import uvicorn
from contextlib import asynccontextmanager

from app.core.config import settings
from app.core.database import create_tables, get_db
from app.api.v1.api import api_router
from app.middleware.error_handler import ErrorHandlerMiddleware
from app.middleware.logging import LoggingMiddleware


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application lifespan manager for startup and shutdown events."""
    # Startup
    print(f"[START] MoneyFlow Backend API v{settings.VERSION}")
    print(f"[ENV] Environment: {settings.ENVIRONMENT}")
    print(f"[URL] API URL: http://{settings.HOST}:{settings.PORT}")

    # Create database tables
    await create_tables()

    yield

    # Shutdown
    print("[SHUTDOWN] MoneyFlow Backend API")


def create_application() -> FastAPI:
    """Create and configure the FastAPI application."""

    # Create FastAPI app with metadata
    app = FastAPI(
        title=settings.PROJECT_NAME,
        description="AI-Powered Budget Tracking API",
        version=settings.VERSION,
        openapi_url=f"{settings.API_V1_STR}/openapi.json",
        docs_url="/docs",
        redoc_url="/redoc",
        lifespan=lifespan
    )

    # Set up CORS middleware
    if settings.BACKEND_CORS_ORIGINS:
        app.add_middleware(
            CORSMiddleware,
            allow_origins=[str(origin) for origin in settings.BACKEND_CORS_ORIGINS],
            allow_credentials=True,
            allow_methods=["*"],
            allow_headers=["*"],
        )

    # Add custom middleware
    app.add_middleware(ErrorHandlerMiddleware)
    app.add_middleware(LoggingMiddleware)

    # Include API routers
    app.include_router(api_router, prefix=settings.API_V1_STR)

    # Health check endpoint
    @app.get("/health", tags=["Health"])
    async def health_check():
        """Health check endpoint."""
        return {
            "status": "healthy",
            "version": settings.VERSION,
            "environment": settings.ENVIRONMENT
        }

    return app


# Create the FastAPI application instance
app = create_application()


if __name__ == "__main__":
    """Run the application in development mode."""
    uvicorn.run(
        "main:app",
        host=settings.HOST,
        port=settings.PORT,
        reload=True,
        reload_dirs=["src/backend"],
        log_level="info"
    )
