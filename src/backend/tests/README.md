# Backend Testing Guide

This document provides a comprehensive testing checklist for the MoneyFlow FastAPI backend.

## 🚀 Quick Start Testing

### 1. Installation Verification
```bash
cd src/backend
pip install -r requirements.txt
```

### 2. Basic Server Startup
```bash
cd src/backend
python main.py
```

Expected output:
```
🚀 Starting MoneyFlow Backend API v1.0.0
📊 Environment: development
🔗 API URL: http://localhost:8000
✅ Database tables created successfully
```

### 3. Health Check
```bash
curl http://localhost:8000/health
```

Expected response:
```json
{
  "status": "healthy",
  "version": "1.0.0",
  "environment": "development"
}
```

## 🧪 Comprehensive API Testing

### 1. API Documentation Access
- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc
- **OpenAPI JSON**: http://localhost:8000/api/v1/openapi.json

### 2. User Management Endpoints

#### GET /api/v1/users/me
```bash
curl -X GET "http://localhost:8000/api/v1/users/me"
```

#### PUT /api/v1/users/me
```bash
curl -X PUT "http://localhost:8000/api/v1/users/me" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Updated Name",
    "monthly_income": 6000.0
  }'
```

### 3. Transaction Management Endpoints

#### GET /api/v1/transactions/
```bash
curl -X GET "http://localhost:8000/api/v1/transactions/?limit=10&skip=0"
```

#### POST /api/v1/transactions/
```bash
curl -X POST "http://localhost:8000/api/v1/transactions/" \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 50.0,
    "category": "Food & Dining",
    "description": "Lunch at cafe",
    "type": "expense"
  }'
```

#### GET /api/v1/transactions/recent
```bash
curl -X GET "http://localhost:8000/api/v1/transactions/recent?limit=5"
```

### 4. Budget Management Endpoints

#### GET /api/v1/budgets/
```bash
curl -X GET "http://localhost:8000/api/v1/budgets/"
```

#### POST /api/v1/budgets/
```bash
curl -X POST "http://localhost:8000/api/v1/budgets/" \
  -H "Content-Type: application/json" \
  -d '{
    "category": "Transportation",
    "allocated": 400.0,
    "color": "#4ECDC4",
    "icon": "🚗"
  }'
```

### 5. automation Endpoints

#### GET /api/v1/ai/predictions
```bash
curl -X GET "http://localhost:8000/api/v1/ai/predictions"
```

#### GET /api/v1/ai/insights
```bash
curl -X GET "http://localhost:8000/api/v1/ai/insights"
```

#### GET /api/v1/ai/recommendations
```bash
curl -X GET "http://localhost:8000/api/v1/ai/recommendations"
```

#### POST /api/v1/ai/analyze
```bash
curl -X POST "http://localhost:8000/api/v1/ai/analyze" \
  -H "Content-Type: application/json" \
  -d '{
    "user_id": "user_1",
    "timeframe": "month",
    "include_forecasting": true,
    "include_budget_recommendations": true,
    "include_risk_analysis": true
  }'
```

## 🗄️ Database Testing

### 1. Check Database File Creation
```bash
ls -la src/backend/moneyflow.db
```

### 2. Verify Tables Created
```python
# In Python shell:
from app.core.database import engine
from sqlalchemy import inspect

inspector = inspect(engine)
tables = inspector.get_table_names()
print("Tables:", tables)
```

### 3. Check Sample Data
```python
# In Python shell:
from app.core.database import SessionLocal

db = SessionLocal()
users = db.query(User).all()
print(f"Users: {len(users)}")

transactions = db.query(Transaction).all()
print(f"Transactions: {len(transactions)}")

budgets = db.query(Budget).all()
print(f"Budgets: {len(budgets)}")

db.close()
```

## 🔧 Configuration Testing

### 1. Environment Variables
```bash
# Test different environments
export ENVIRONMENT=production
export DATABASE_URL="postgresql://..."
python main.py
```

### 2. CORS Testing
```bash
# Test CORS headers
curl -I -X OPTIONS "http://localhost:8000/api/v1/users/me" \
  -H "Origin: http://localhost:3000" \
  -H "Access-Control-Request-Method: GET"
```

## 🛠️ Development Tools Testing

### 1. Hot Reload Testing
```bash
# Modify a file and verify server restarts automatically
echo "# Test change" >> src/backend/app/api/v1/endpoints/users.py
# Server should restart automatically
```

### 2. Logging Verification
```bash
# Check console output for request logging
curl http://localhost:8000/health
# Should see: 📨 GET /health - 200 - 0.0012s
```

## 🚨 Error Handling Testing

### 1. Invalid Request Testing
```bash
# Test 422 validation errors
curl -X POST "http://localhost:8000/api/v1/transactions/" \
  -H "Content-Type: application/json" \
  -d '{"invalid": "data"}'
```

### 2. Not Found Testing
```bash
# Test 404 errors
curl -X GET "http://localhost:8000/api/v1/nonexistent"
```

### 3. Server Error Testing
```bash
# Test 500 errors by causing database issues
# (Remove database file and restart server)
rm src/backend/moneyflow.db
python main.py
```

## 📊 Performance Testing

### 1. Response Time Testing
```bash
# Test API response times
time curl -s http://localhost:8000/api/v1/transactions/recent
```

### 2. Concurrent Request Testing
```bash
# Test with multiple concurrent requests
for i in {1..10}; do
  curl -s "http://localhost:8000/api/v1/users/me" &
done
wait
```

## 🔒 Security Testing

### 1. CORS Verification
```bash
# Test CORS preflight requests
curl -X OPTIONS "http://localhost:8000/api/v1/transactions/" \
  -H "Origin: http://localhost:3000" \
  -H "Access-Control-Request-Method: POST" \
  -v
```

### 2. Input Validation
```bash
# Test SQL injection attempts
curl -X POST "http://localhost:8000/api/v1/transactions/" \
  -H "Content-Type: application/json" \
  -d '{
    "amount": "50; DROP TABLE users;--",
    "category": "Test",
    "description": "Test",
    "type": "expense"
  }'
```

## 🧪 Automated Testing Setup

### 1. Install Test Dependencies
```bash
pip install pytest pytest-asyncio httpx
```

### 2. Run Tests
```bash
cd src/backend
pytest tests/ -v
```

### 3. Create Test Files Structure
```
src/backend/tests/
├── __init__.py
├── test_api/
│   ├── __init__.py
│   ├── test_users.py
│   ├── test_transactions.py
│   ├── test_budgets.py
│   ├── test_categories.py
│   └── test_classification.py
├── test_database/
│   ├── __init__.py
│   └── test_models.py
└── conftest.py
```

## 🔍 Debugging Checklist

### 1. Common Issues to Check
- [ ] Python version (3.8+ required)
- [ ] All dependencies installed
- [ ] Database file exists and is writable
- [ ] Port 8000 is available
- [ ] No firewall blocking connections

### 2. Error Log Analysis
```bash
# Check server logs for errors
python main.py 2>&1 | tee backend.log
```

### 3. Database Inspection
```python
# Debug database issues
from app.core.database import SessionLocal
from app.models.user import User

db = SessionLocal()
try:
    user = db.query(User).first()
    print(f"User found: {user}")
except Exception as e:
    print(f"Database error: {e}")
finally:
    db.close()
```

## ✅ Verification Checklist

- [ ] Server starts without errors
- [ ] Health endpoint returns 200
- [ ] API documentation accessible
- [ ] Database tables created
- [ ] Sample data loaded
- [ ] All CRUD operations work
- [ ] Error handling functions
- [ ] CORS headers present
- [ ] Logging working
- [ ] Hot reload functional

## 🚀 Production Deployment Testing

### 1. Production Configuration
```bash
export ENVIRONMENT=production
export DATABASE_URL="postgresql://..."
export SECRET_KEY="your-secret-key"
python main.py
```

### 2. Production Features
- [ ] Environment variable loading
- [ ] Production logging level
- [ ] Database connection pooling
- [ ] SSL/TLS configuration
- [ ] Rate limiting
- [ ] Authentication middleware

## 📈 Next Steps After Testing

1. **Frontend Integration**: Test API calls from React frontend
2. **Authentication**: Implement JWT token authentication
3. **Real Database**: Switch to PostgreSQL for production
4. **Monitoring**: Add logging and metrics
5. **Testing Suite**: Implement comprehensive automated tests
6. **Documentation**: Update API documentation with examples

---

**🎯 Testing Status: READY FOR RUNTIME VERIFICATION**

Once Python is available in your environment, follow this comprehensive testing guide to verify all backend functionality works correctly!
