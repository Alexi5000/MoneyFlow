# MoneyFlow Maintenance Policy

## Purpose

MoneyFlow is Alexi5000’s local-first budgeting and cash-flow product foundation. It is maintained as a practical reference for thoughtful AI-assisted application development: deterministic finance calculations, explicit API contracts, observable validation, and guarded boundaries around sensitive data. The repository reflects experience building agent workflows and automations with Cursor, Claude, Codex-class tools, and comparable systems while keeping the application’s financial logic understandable without relying on an AI model.

## Current boundary

The committed application runs with seeded local data and a FastAPI plus React architecture. It is not a hosted banking service, financial advisor, tax product, or production multi-tenant financial platform. The existing categorization and insight behavior is deterministic demo logic; it must not be represented as personalized financial advice or autonomous financial decision-making.

## Future integrations

Any bank connection, external model provider, authentication provider, or durable database must be introduced behind a server-side integration boundary. Add explicit consent, least-privilege credentials, auditability, test coverage, and private configuration before accepting real customer data. Never move provider credentials into Vite-exposed environment variables.

## Quality boundary

MoneyFlow is an original repository, not a GitHub fork. Documentation, policies, smoke tests, environment templates, and CI quality gates are owned by Alexi5000. Product changes should remain small, observable, and backed by the documented quality contract. Do not add temporary bypasses, undocumented environment requirements, or generated artifacts to the repository.
