.PHONY: help install start stop test clean dev build

# Default target
help:
	@echo "MoneyFlow - Available Commands"
	@echo ""
	@echo "  make install    - Install all dependencies"
	@echo "  make start      - Start both backend and frontend servers"
	@echo "  make stop       - Stop all running servers"
	@echo "  make test       - Test all API endpoints"
	@echo "  make dev        - Start development mode"
	@echo "  make build      - Build for production"
	@echo "  make clean      - Clean build artifacts and cache"
	@echo ""

# Install all dependencies
install:
	@echo "Installing backend dependencies..."
	@cd src/backend && pip install -r requirements.txt
	@echo ""
	@echo "Installing frontend dependencies..."
	@npm install
	@echo ""
	@echo "Installation complete!"

# Start both servers (Windows)
start:
	@echo "Starting MoneyFlow..."
	@scripts\QUICKSTART.bat

# Stop all servers
stop:
	@echo "Stopping all servers..."
	@powershell -Command "Get-Process | Where-Object {$$_.ProcessName -eq 'python' -or $$_.ProcessName -eq 'node'} | Stop-Process -Force"
	@echo "Servers stopped."

# Test API endpoints
test:
	@echo "Testing MoneyFlow APIs..."
	@powershell -ExecutionPolicy Bypass -File scripts/test_api.ps1

# Development mode
dev:
	@echo "Starting development servers..."
	@echo "Backend: http://localhost:8000"
	@echo "Frontend: http://localhost:5173"
	@start cmd /k "cd src/backend && uvicorn main:app --host 0.0.0.0 --port 8000 --reload"
	@start cmd /k "npm run dev"

# Build for production
build:
	@echo "Building MoneyFlow..."
	@npm run build
	@echo "Build complete! Check dist/ folder"

# Clean build artifacts
clean:
	@echo "Cleaning build artifacts..."
	@if exist dist rmdir /s /q dist
	@if exist node_modules/.vite rmdir /s /q node_modules/.vite
	@if exist src/backend/__pycache__ rmdir /s /q src/backend/__pycache__
	@if exist src/backend/app/__pycache__ rmdir /s /q src/backend/app/__pycache__
	@echo "Clean complete!"

# Quick restart
restart: stop
	@timeout /t 2 /nobreak >nul
	@$(MAKE) start

