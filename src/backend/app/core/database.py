"""
Database configuration and connection management for MoneyFlow Backend.
"""

from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session
from typing import Generator
import os

from app.core.config import settings

# Create database directory if it doesn't exist
os.makedirs(os.path.dirname(settings.DATABASE_URL.replace("sqlite:///", "")), exist_ok=True)

# Create SQLAlchemy engine
engine = create_engine(
    settings.DATABASE_URL,
    connect_args={"check_same_thread": False} if "sqlite" in settings.DATABASE_URL else {},
    pool_pre_ping=True,
)

# Create SessionLocal class
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Create Base class for models
Base = declarative_base()


def get_db() -> Generator[Session, None, None]:
    """Dependency to get database session."""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


async def create_tables():
    """Create all database tables."""
    try:
        # Import all models to ensure they are registered with SQLAlchemy
        from app.models.user import User
        from app.models.transaction import Transaction
        from app.models.budget import Budget
        from app.models.category import Category

        # Create all tables
        Base.metadata.create_all(bind=engine)
        print("✅ Database tables created successfully")

    except Exception as e:
        print(f"❌ Error creating database tables: {e}")
        raise


async def drop_tables():
    """Drop all database tables (for testing)."""
    try:
        Base.metadata.drop_all(bind=engine)
        print("✅ Database tables dropped successfully")
    except Exception as e:
        print(f"❌ Error dropping database tables: {e}")
        raise


def init_db():
    """Initialize database with sample data for development."""
    try:
        db = SessionLocal()

        # Import models
        from app.models.user import User
        from app.models.transaction import Transaction
        from app.models.budget import Budget
        from app.models.category import Category

        # Check if data already exists
        if db.query(User).first():
            print("📊 Database already initialized")
            return

        # Create sample categories
        categories_data = [
            Category(id="1", name="Food & Dining", color="#FF6B6B", icon="🍽️"),
            Category(id="2", name="Transportation", color="#4ECDC4", icon="🚗"),
            Category(id="3", name="Entertainment", color="#45B7D1", icon="🎬"),
            Category(id="4", name="Shopping", color="#FFA07A", icon="🛍️"),
            Category(id="5", name="Bills & Utilities", color="#98D8C8", icon="💡"),
            Category(id="6", name="Healthcare", color="#F7DC6F", icon="🏥"),
            Category(id="7", name="Income", color="#82E0AA", icon="💰"),
        ]

        for cat in categories_data:
            db.add(cat)

        # Create sample user
        sample_user = User(
            id="user_1",
            name="Alex Thompson",
            email="alex.thompson@example.com",
            total_balance=15420.75,
            monthly_income=5500.00,
            monthly_expenses=3200.00,
            savings_goal=15000.00,
            current_savings=8750.00,
            avatar="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
        )
        db.add(sample_user)

        # Create sample budgets
        budgets_data = [
            Budget(
                id="budget_1",
                category="Food & Dining",
                allocated=800.00,
                spent=650.00,
                remaining=150.00,
                percentage=81.25,
                color="#FF6B6B",
                icon="🍽️",
                user_id="user_1"
            ),
            Budget(
                id="budget_2",
                category="Transportation",
                allocated=400.00,
                spent=380.00,
                remaining=20.00,
                percentage=95.00,
                color="#4ECDC4",
                icon="🚗",
                user_id="user_1"
            ),
            Budget(
                id="budget_3",
                category="Entertainment",
                allocated=300.00,
                spent=150.00,
                remaining=150.00,
                percentage=50.00,
                color="#45B7D1",
                icon="🎬",
                user_id="user_1"
            ),
        ]

        for budget in budgets_data:
            db.add(budget)

        # Create sample transactions
        from datetime import datetime, timedelta
        import random

        transactions_data = []
        categories = ["Food & Dining", "Transportation", "Entertainment", "Shopping", "Income"]

        # Generate last 30 days of transactions
        for i in range(30):
            date = datetime.now() - timedelta(days=i)
            category = random.choice(categories)

            if category == "Income":
                amount = round(random.uniform(500, 1000), 2)
                trans_type = "income"
            else:
                amount = round(random.uniform(10, 200), 2)
                trans_type = "expense"

            transaction = Transaction(
                id=f"trans_{i+1}",
                amount=amount,
                category=category,
                description=f"Sample {category.lower()} transaction",
                type=trans_type,
                merchant=f"Sample Merchant {i+1}",
                date=date,
                user_id="user_1"
            )
            transactions_data.append(transaction)

        for trans in transactions_data:
            db.add(trans)

        db.commit()
        print("✅ Database initialized with sample data")

    except Exception as e:
        print(f"❌ Error initializing database: {e}")
        db.rollback()
        raise
    finally:
        db.close()
