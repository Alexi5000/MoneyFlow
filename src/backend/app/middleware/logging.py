"""
Logging middleware for request/response logging.
"""

import time
from typing import Callable
from fastapi import Request
from starlette.middleware.base import BaseHTTPMiddleware


class LoggingMiddleware(BaseHTTPMiddleware):
    """Middleware for logging HTTP requests and responses."""

    async def dispatch(self, request: Request, call_next: Callable):
        """Log request details and response."""
        start_time = time.time()

        # Log incoming request
        print(f"[REQ] {request.method} {request.url.path}")

        try:
            response = await call_next(request)

            # Calculate processing time
            process_time = time.time() - start_time

            # Log response
            print(f"[RES] {request.method} {request.url.path} - {response.status_code} - {process_time:.4f}s")

            return response

        except Exception as e:
            process_time = time.time() - start_time
            print(f"[ERR] {request.method} {request.url.path} - ERROR - {process_time:.4f}s")
            print(f"      Error: {str(e)}")
            raise
