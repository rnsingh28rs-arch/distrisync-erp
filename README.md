# DistriSync ERP

**Cloud Sales & Distribution Management Platform**  
**One Business. One Data. Every Device.**

Production rebuild of the DistriSync ERP prototype.

## Source layout
- `web/` — React web application
- `api/` — TypeScript backend/API
- `api/migrations/` — PostgreSQL schema by delivery stage
- `infra/` — Cloud Run container configuration
- `.github/workflows/` — CI/CD
- `tests/` — architecture and regression tests

## 8 stages
1. Foundation — tenant isolation, auth, RBAC, audit
2. Core ERP — customers, products, inventory, orders, dispatch
3. Distribution — C&F, distributor, wholesaler, sales force
4. Field Force — GPS, attendance, DSR, photo/offline contracts
5. Finance — invoices, collections, GST-ready fields, ledger, P&L
6. Intelligence — KPIs, alerts and forecasting
7. Ecosystem — API keys, webhooks and integrations
8. Manufacturing — raw materials, BOM, production and finished goods

## Google Cloud target
- Cloud SQL for PostgreSQL
- Cloud Run for API
- Cloud Storage for documents/photos
- Cloud Logging/Monitoring
- GitHub Actions for CI/CD

No production secrets belong in this repository.
