# MoneyFlow Credits and Inspiration

MoneyFlow is an original full-stack finance dashboard created for the MoneyFlow repository. The current buildout uses external projects for product research, interface inspiration, and architecture benchmarking, while preserving a license-safe boundary around source-code reuse.

## Project Authorship

| Role | Credit |
|---|---|
| **Project creator and owner** | [Alex Cinovoj](https://github.com/Alexi5000) |
| **Project brand** | MoneyFlow |
| **Implementation scope** | React dashboard, FastAPI service, seeded finance analytics, API contracts, documentation, and configuration updates. |
| **License** | MIT, as specified in the repository license file. |

> The MoneyFlow application code in this buildout is written for this repository. Third-party projects listed below are credited as inspiration and benchmarking references, not as copied code sources.

## Open-Source Inspiration

| Project | Link | What Inspired MoneyFlow | License Boundary |
|---|---|---|---|
| **Firefly III** | [github.com/firefly-iii/firefly-iii](https://github.com/firefly-iii/firefly-iii) | Self-hosted personal finance positioning, rule-based categorization, budgets, savings goals, import/export thinking, and API-first product depth. | Treated as feature inspiration only because the project is AGPL-3.0 oriented.[1] |
| **Actual Budget** | [github.com/actualbudget/actual](https://github.com/actualbudget/actual) | Local-first budgeting language, envelope budgeting, migration/onboarding emphasis, and documentation-first user education. | MIT-licensed reference; MoneyFlow retains original implementation.[2] |
| **Maybe Finance** | [github.com/maybe-finance/maybe](https://github.com/maybe-finance/maybe) | Polished finance cockpit direction, self-hosting polish, export flows, automation/chat roadmap ideas, and future cash-flow visualizations. | Treated as feature inspiration only because of AGPL and trademark constraints noted by the project.[3] |
| **React TypeScript Personal Finance Dashboard** | [github.com/iambhavesh55/personal-finance-dashboard](https://github.com/iambhavesh55/personal-finance-dashboard) | Compact dashboard composition, chart-first layout, transaction CRUD patterns, local fallback thinking, and budget progress presentation. | MIT-licensed reference; MoneyFlow uses original code.[4] |

## Design and Product References

MoneyFlow adopts a dark, developer-tool-inspired interface direction with high-contrast panels, orange accent colors, compact navigation, and analytics-first visual hierarchy. The result is intended to feel more like a professional command center than a conventional spreadsheet-style budget tracker.

| Reference Area | Implementation in MoneyFlow |
|---|---|
| **Dark UI language** | Black canvas, translucent panels, orange focus states, and card-based layout. |
| **Financial cockpit layout** | KPI rows, chart grids, insight panels, budget cards, goal progress, and transaction workspace. |
| **automation finance assistant direction** | Rule metadata, confidence scoring, insight severity, recommended actions, and categorization endpoint. |
| **Self-hostable future path** | API-first backend and documentation structure designed for future database, auth, and Docker expansion. |

## Source-Code Reuse Policy

The repository should preserve a clear distinction between **inspiration** and **direct code inclusion**. Directly importing source from third-party repositories requires license review, notice retention, and explicit documentation in this file before merge.

| Policy | Requirement |
|---|---|
| **AGPL projects** | Do not copy source into MoneyFlow unless the project intentionally adopts compatible obligations. |
| **MIT projects** | Reuse is possible only with proper attribution and retained license notices, but original implementation remains preferred. |
| **Trademarks and branding** | Do not reuse third-party logos, product names, or protected brand assets in a way that implies endorsement. |
| **Documentation** | Any future direct code import must include source URL, license, files affected, and required notices. |

## Core Technology Acknowledgments

MoneyFlow relies on widely used open-source frameworks and libraries. These dependencies remain under their respective licenses and are managed through the project manifests.

| Layer | Technologies |
|---|---|
| **Frontend** | React, TypeScript, Vite, Tailwind CSS, Recharts, Framer Motion, Lucide React, React Router. |
| **Backend** | Python, FastAPI, Pydantic, Uvicorn, Starlette middleware. |
| **Tooling** | npm, TypeScript project references, Vite production build, GitHub version control. |

## References

[1]: https://github.com/firefly-iii/firefly-iii "Firefly III on GitHub"
[2]: https://github.com/actualbudget/actual "Actual Budget on GitHub"
[3]: https://github.com/maybe-finance/maybe "Maybe Finance on GitHub"
[4]: https://github.com/iambhavesh55/personal-finance-dashboard "React TypeScript Personal Finance Dashboard on GitHub"
