# DistriSync ERP

**Cloud Sales & Distribution Management Platform**  
**One Business. One Data. Every Device.**

Production rebuild for a true multi-tenant ERP. This repository is separate from the legacy Bring My Bite project.

## Architecture

- **Google Cloud SQL — PostgreSQL:** transactional source of truth
- **Google Cloud Run:** secure Node/Express API
- **Google Cloud Storage:** photos, invoices, documents and exports (integration contract)
- **GitHub Actions:** CI/CD verification
- **React/Vite:** responsive web client
- Android, iOS and Windows clients consume the same versioned API

## Eight stages

1. **Foundation** — tenant isolation, signed sessions, RBAC, audit
2. **Core ERP** — customers, products, inventory ledger, orders, dispatch
3. **Distribution** — C&F/distributors/wholesalers/sales executives/schemes
4. **Field Force** — attendance, GPS, photo metadata, DSR and idempotent sync
5. **Finance** — invoices, collections, GST-ready tax fields, ledger and journal primitives
6. **Intelligence** — KPIs, mismatch alerts and forecast snapshots
7. **Ecosystem** — API keys, webhooks and integration events
8. **Manufacturing** — raw materials, BOM, production consumption and finished goods

## Local development

```bash
npm install
npm run typecheck
npm test
npm run build
```

Run the API with `npm run dev -w api` and the web client with `npm run dev -w web`.

## Google Cloud deployment

1. Create Cloud SQL PostgreSQL and a database.
2. Run `api/migrations/001_schema.sql` against that database.
3. Store `DATABASE_URL` and `JWT_SECRET` in Secret Manager.
4. Build/publish `infra/Dockerfile` to Artifact Registry.
5. Deploy `infra/cloudrun.yaml` after replacing project/region/instance/domain placeholders.
6. Configure the web client's `VITE_API_URL` to the Cloud Run API.

Secrets are intentionally never committed to GitHub.

## Production boundary

The repository contains the application, schema and deployment contracts. A live Google Cloud environment cannot be provisioned without access to the customer's Google Cloud project and its billing/identity configuration. The `/api/auth/demo` endpoint is for development only and must not be exposed as production authentication.
