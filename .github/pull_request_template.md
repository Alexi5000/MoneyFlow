## Summary

Describe the user-visible or API-visible outcome and the reason for the change.

## Validation

State the exact commands run and their results.

- [ ] `npm run lint`
- [ ] `npm run typecheck`
- [ ] `npm run test`
- [ ] `npm run validate:backend`
- [ ] `npm run build`

## Contract and environment impact

- [ ] API routes, response shapes, or seeded data are unchanged, or documentation and smoke tests were updated together.
- [ ] Environment requirements are unchanged, or `.env.example` and README guidance were updated.
- [ ] No `VITE_*` variable carries a secret, and no real financial data, credentials, or tokens are included.
- [ ] Screenshots or request/response examples are included when they clarify the change.

## Security

- [ ] This pull request does not disclose a vulnerability or sensitive data. Security concerns follow `SECURITY.md` instead.
