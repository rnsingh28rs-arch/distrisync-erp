# DistriSync ERP — Stage Delivery Map

| Stage | Domain | Delivered in this rebuild |
|---|---|---|
| 1 | Foundation | tenant/user/role/permission/audit schema, signed sessions, RBAC middleware, health endpoint, CI, Cloud Run template |
| 2 | Core ERP | customers, products, categories, warehouses, inventory ledger, orders, lines, dispatches, CRUD API |
| 3 | Distribution | distributors, wholesalers, sales executives, schemes, territory fields |
| 4 | Field Force | attendance with GPS/photo metadata, DSR with idempotency |
| 5 | Finance | invoices, collections, ledger accounts, journal entries/lines, GST-ready tax fields |
| 6 | Intelligence | alerts, forecast snapshots, KPI API |
| 7 | Ecosystem | API keys, webhooks, integration events |
| 8 | Manufacturing | raw materials, BOMs, production orders, consumption, finished goods |

## Important production note

The repository contains the application and infrastructure contracts. Actual Google Cloud resources (Cloud SQL instance, Cloud Run service, Artifact Registry, Secret Manager values, DNS and Cloud Storage bucket) must be created in the customer's Google Cloud project; secrets are intentionally not stored in GitHub.

The demo sign-in endpoint exists only for local development. Production authentication must replace it with the chosen identity provider or a fully provisioned credential flow before public launch.
