"""
Custom error handling middleware for FastAPI.
"""

import time
import traceback
from typing import Callable
from fastapi import Request, HTTPException, status
from fastapi.responses import JSONResponse
from starlette.middleware.base import BaseHTTPMiddleware
from app.schemas.common import ErrorResponse


class ErrorHandlerMiddleware(BaseHTTPMiddleware):
    """Custom middleware for comprehensive error handling."""

    async def dispatch(self, request: Request, call_next: Callable):
        """Process request and handle errors."""
        start_time = time.time()

        try:
            response = await call_next(request)

            # Add processing time to response headers
            process_time = time.time() - start_time
            response.headers["X-Process-Time"] = str(process_time)

            return response

        except Exception as e:
            process_time = time.time() - start_time

            # Log the error
            print(f"❌ Error processing {request.method} {request.url}: {str(e)}")
            print(f"⏱️  Processing time: {process_time:.4f}s")
            print(f"📝 Traceback: {traceback.format_exc()}")

            # Handle different types of errors
            if isinstance(e, HTTPException):
                return JSONResponse(
                    status_code=e.status_code,
                    content=ErrorResponse(
                        detail=str(e.detail),
                        error_code=f"HTTP_{e.status_code}"
                    ).dict()
                )

            # Handle database errors
            elif "database" in str(e).lower():
                return JSONResponse(
                    status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                    content=ErrorResponse(
                        detail="Database operation failed",
                        error_code="DATABASE_ERROR"
                    ).dict()
                )

            # Handle validation errors
            elif "validation" in str(e).lower():
                return JSONResponse(
                    status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
                    content=ErrorResponse(
                        detail="Request validation failed",
                        error_code="VALIDATION_ERROR"
                    ).dict()
                )

            # Handle all other errors
            else:
                return JSONResponse(
                    status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                    content=ErrorResponse(
                        detail="Internal server error",
                        error_code="INTERNAL_ERROR"
                    ).dict()
                )
