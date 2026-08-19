# Security Policy

## Supported version

Security fixes are prioritized on the current `main` branch.

## Reporting a vulnerability

Do **not** open a public issue for a suspected vulnerability, leaked secret, unsafe financial-data flow, authentication bypass, or privacy concern. Instead, create a private GitHub security advisory for this repository. If private advisories are unavailable, contact the maintainer through a private GitHub channel and include `MoneyFlow security report` in the subject.

Provide a concise description, affected component and version, reproduction steps or a proof of concept, observed and expected behavior, potential impact, and any suggested mitigation. Please do not include real bank credentials, personal financial records, access tokens, or production database data.

## Security boundaries

MoneyFlow is currently a local-first demo and engineering foundation. It does not provide a hosted bank connection, multi-user authentication, or production data-processing guarantee. Treat its seeded data and local API as development artifacts. Before any public deployment, add server-side secret management, explicit user isolation, authenticated routes, strict CORS policy, durable encrypted storage, and an independent security review.

## Secret handling

Never commit `.env` files, credentials, bank data, tokens, or customer records. Vite variables beginning with `VITE_` are exposed to the browser bundle and must not contain secrets. If exposure is suspected, revoke and rotate the affected credential immediately, remove it from repository history and logs where possible, and report it privately.
