# Backend Operations for MoneyFlow

This document outlines the backend operations required for the MoneyFlow application. Currently, these operations are handled by mock data and simulated services within the frontend. In a production environment, these would be replaced by a robust backend system, likely utilizing a database (e.g., Supabase) and potentially external APIs for AI functionalities.

## 1. User Management

**Purpose**: To manage user profiles and authentication.

### Endpoints

- **`GET /api/user`**
  - **Description**: Fetches the current user's profile information.
  - **Inputs**: None (user identified via authentication token).
  - **Outputs**: User object (ID, name, email, financial summaries, avatar URL).
  - **Current Mock**: `src/frontend/data/mockFinancialData.json` (`user` object).

- **`PUT /api/user`**
  - **Description**: Updates the current user's profile information.
  - **Inputs**: Partial User object (fields to update).
  - **Outputs**: Updated User object.
  - **Current Mock**: In-memory state update in `src/store/financialStore.ts`.

## 2. Financial Data Management

**Purpose**: To manage transactions and budgets.

### Transactions

- **`GET /api/transactions`**
  - **Description**: Fetches a list of all transactions for the current user.
  - **Inputs**: Optional query parameters for filtering (e.g., `category`, `type`, `dateRange`), and pagination (`limit`, `offset`).
  - **Outputs**: Array of Transaction objects.
  - **Current Mock**: `src/frontend/data/mockFinancialData.json` (`transactions` array).

- **`GET /api/transactions/recent`**
  - **Description**: Fetches a limited number of recent transactions.
  - **Inputs**: `limit` (number of transactions to return).
  - **Outputs**: Array of Transaction objects.
  - **Current Mock**: Filtered `transactions` array from `src/frontend/data/mockFinancialData.json`.

- **`POST /api/transactions`**
  - **Description**: Adds a new transaction.
  - **Inputs**: Transaction object (without ID).
  - **Outputs**: Newly created Transaction object (with ID).
  - **Current Mock**: In-memory state update in `src/store/financialStore.ts`.

- **PUT /api/transactions/{id}**
  - **Description**: Updates an existing transaction.
  - **Inputs**: `id` (transaction ID), Partial Transaction object.
  - **Outputs**: Updated Transaction object.
  - **Current Mock**: In-memory state update in `src/store/financialStore.ts`.

- **DELETE /api/transactions/{id}**
  - **Description**: Deletes a transaction.
  - **Inputs**: `id` (transaction ID).
  - **Outputs**: Success status.
  - **Current Mock**: In-memory state update in `src/store/financialStore.ts`.

### Budgets

- **`GET /api/budgets`**
  - **Description**: Fetches a list of all budgets for the current user.
  - **Inputs**: None.
  - **Outputs**: Array of Budget objects.
  - **Current Mock**: `src/frontend/data/mockFinancialData.json` (`budgets` array).

- **`POST /api/budgets`**
  - **Description**: Creates a new budget.
  - **Inputs**: Budget object (without ID).
  - **Outputs**: Newly created Budget object (with ID).
  - **Current Mock**: In-memory state update in `src/store/financialStore.ts`.

- **`PUT /api/budgets/{id}`**
  - **Description**: Updates an existing budget.
  - **Inputs**: `id` (budget ID), Partial Budget object.
  - **Outputs**: Updated Budget object.
  - **Current Mock**: In-memory state update in `src/store/financialStore.ts`.

- **`DELETE /api/budgets/{id}`**
  - **Description**: Deletes a budget.
  - **Inputs**: `id` (budget ID).
  - **Outputs**: Success status.
  - **Current Mock**: In-memory state update in `src/store/financialStore.ts`.

## 3. AI/Analytics Services

**Purpose**: To provide AI-driven insights, predictions, and recommendations. These operations typically involve heavy computation and data analysis.

- **`GET /api/ai/predictions`**
  - **Description**: Generates and fetches financial predictions (e.g., next month's spending, savings projections).
  - **Inputs**: None (uses historical user data).
  - **Outputs**: Prediction object.
  - **Current Mock**: `src/frontend/data/aiPredictions.json` (`predictions` object).

- **`GET /api/ai/insights`**
  - **Description**: Generates and fetches personalized financial insights (e.g., spending alerts, savings opportunities).
  - **Inputs**: None (uses historical user data).
  - **Outputs**: Array of Insight objects.
  - **Current Mock**: `src/frontend/data/aiPredictions.json` (`insights` array).

- **`GET /api/ai/recommendations`**
  - **Description**: Generates and fetches actionable financial recommendations (e.g., budget optimization tips).
  - **Inputs**: None (uses historical user data).
  - **Outputs**: Array of Recommendation objects.
  - **Current Mock**: `src/frontend/data/aiPredictions.json` (`recommendations` array).

- **`POST /api/ai/analyze`**
  - **Description**: Triggers AI analysis of spending patterns.
  - **Inputs**: None (uses current user data).
  - **Outputs**: Analysis progress and results.
  - **Current Mock**: Simulated analysis with progress updates.

## 4. Categories Management

**Purpose**: To manage transaction categories and their metadata.

- **`GET /api/categories`**
  - **Description**: Fetches all available transaction categories.
  - **Inputs**: None.
  - **Outputs**: Array of Category objects.
  - **Current Mock**: `src/frontend/data/mockFinancialData.json` (`categories` array).

## Data Models

### User
```typescript
interface User {
  id: string
  name: string
  email: string
  totalBalance: number
  monthlyIncome: number
  monthlyExpenses: number
  savingsGoal: number
  currentSavings: number
  avatar?: string
}
```

### Transaction
```typescript
interface Transaction {
  id: string
  amount: number
  category: string
  subcategory?: string
  description: string
  date: string
  type: 'income' | 'expense'
  merchant?: string
  location?: string
  paymentMethod?: string
}
```

### Budget
```typescript
interface Budget {
  id: string
  category: string
  allocated: number
  spent: number
  remaining: number
  percentage: number
  color: string
  icon: string
}
```

### AI Prediction
```typescript
interface Prediction {
  nextMonthSpending: {
    amount: number
    confidence: number
    trend: string
    change: number
    changePercentage: number
  }
  budgetForecasts: Array<{
    category: string
    predicted: number
    current: number
    likelihood: string
    confidence: number
  }>
  savingsProjection: {
    sixMonths: number
    oneYear: number
    goalAchievement: string
    confidence: number
  }
}
```

## Mock Data Store Files

The project uses these mock data store files:

- `src/frontend/data/mockFinancialData.json`: Contains initial mock data for `user`, `transactions`, `budgets`, and `categories`.
- `src/frontend/data/aiPredictions.json`: Contains mock data for AI-generated `predictions`, `insights`, and `recommendations`.

## Migration to Production Backend

When migrating to a production backend (e.g., Supabase), the following steps would be required:

1. **Database Schema**: Create tables for users, transactions, budgets, and categories.
2. **Authentication**: Implement user authentication and authorization.
3. **API Endpoints**: Replace mock service calls with actual HTTP requests to backend APIs.
4. **Real-time Updates**: Implement real-time data synchronization for live updates.
5. **AI Integration**: Connect to actual AI services (OpenAI, custom ML models) for predictions and insights.
6. **Data Validation**: Implement server-side validation and error handling.
7. **Performance Optimization**: Add caching, pagination, and query optimization.

## Security Considerations

- **Authentication**: Secure user authentication with JWT tokens or similar.
- **Authorization**: Ensure users can only access their own data.
- **Data Validation**: Validate all inputs on the server side.
- **Rate Limiting**: Implement rate limiting for API endpoints.
- **Encryption**: Encrypt sensitive financial data at rest and in transit.