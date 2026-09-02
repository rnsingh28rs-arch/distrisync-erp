# DistriSync ERP — All 8 Stages Design

## Goal
Transform the current DistriSync prototype into a production-oriented, true multi-tenant Sales & Distribution SaaS with a later Manufacturing edition, using Google Cloud as the production infrastructure.

## Architecture
All clients use one secure API. Web, Android, iOS and Windows clients never access the database directly. Cloud Run hosts the API, Cloud SQL PostgreSQL stores transactional ERP data, and Cloud Storage stores files. Every tenant-owned row is scoped by `tenant_id`, and authorization is enforced server-side.

```text
Web / Android / iOS / Windows
            |
        HTTPS API
            |
       Cloud Run API
       /          \
 Cloud SQL       Cloud Storage
 PostgreSQL      Files
```

## Stage 1 — Foundation
- TypeScript/Node backend with Express.
- PostgreSQL schema and migrations.
- Secure authentication with short-lived access tokens and refresh-token rotation.
- Tenant/company model.
- Server-side RBAC and permission matrix.
- User/session management.
- Audit log for security and business mutations.
- Central API error format, validation, request IDs and health endpoint.
- Cloud Run deployment configuration and environment-variable documentation.

## Stage 2 — Core ERP
- Companies/branches/warehouses.
- Product categories, products/SKUs, units, pack sizes, MRP, cost and selling prices.
- Customers and customer addresses.
- Inventory ledger with immutable stock movements.
- Stock balances derived from movements.
- Purchase/stock receipt concepts.
- Sales orders, order lines, totals, discounts, tax and payment status.
- Dispatch/delivery records.
- Reorder and low-stock indicators.

## Stage 3 — Distribution
- C&F, distributor, wholesaler, retailer and sales-executive entities.
- Hierarchical customer/channel relationships.
- Territory and route assignment.
- Stock dispatch from higher level to lower level.
- Distributor/customer credit limits and balances.
- Scheme definitions and scheme application records.
- Sales-executive targets and assigned customers.
- Retailer order capture and receipts.

## Stage 4 — Field Force
- Attendance records with device timestamp and GPS coordinates when permission is granted.
- Selfie/photo evidence stored in Cloud Storage with metadata in PostgreSQL.
- Daily Sales Report (DSR).
- Visit/check-in and retailer interaction history.
- Offline-first mutation queue in the client with idempotency keys.
- Conflict-safe synchronization.
- GPS/photo permission and failure states handled explicitly.

## Stage 5 — Finance
- Cash/online collection records.
- Customer and distributor ledger entries.
- Receivable/payable balances.
- Tax/GST fields and configurable tax rates.
- Credit/debit adjustments.
- Expense records.
- Salary, incentives and payroll calculations.
- Profit & Loss from transactional data rather than hardcoded demo figures.
- Exportable financial reports.

## Stage 6 — Intelligence
- Role-specific dashboards.
- Sales, collection, inventory and outstanding KPIs.
- Product/channel/territory analytics.
- Mismatch and exception alerts.
- Reorder recommendations.
- Target-vs-achievement analytics.
- Basic forecasting using historical transactional data; forecasts are clearly labeled estimates.

## Stage 7 — Ecosystem
- Versioned REST API.
- API keys/service accounts with scoped permissions.
- Webhook/event foundation.
- WhatsApp integration boundary for notifications, invoices and payment reminders.
- Accounting integration boundary using export/import adapters.
- Payment gateway abstraction with transaction references and reconciliation status.
- Notification preferences and delivery logs.

## Stage 8 — Manufacturing Edition
- Raw materials, finished goods and production units.
- Bills of material (BOM).
- Production orders.
- Material issue/consumption.
- Finished-goods receipt.
- Wastage/scrap tracking.
- Batch/lot and expiry fields where applicable.
- Manufacturing cost roll-up.
- Link finished goods into the same distribution inventory/order pipeline.

## Cross-cutting requirements
- True tenant isolation at API and database query boundaries.
- No client-side-only authentication or authorization.
- No transactional ERP data in Google Drive/Cloud Storage.
- No hardcoded financial or stock balances in production flows.
- All sensitive configuration comes from environment/secret management.
- Public/demo screens must not expose real-looking personal identifiers.
- Business operations use database transactions and idempotency where duplicate submissions are possible.
- Auditability is required for security-sensitive and stock/finance mutations.
- All stages include automated tests for critical business rules and API behavior.

## Definition of done
A stage is not marked complete until its code, tests, database migrations/configuration, documentation, and integration with the preceding stages are present in GitHub and verification has been run. Production deployment credentials and third-party provider credentials are supplied separately and are never committed to the repository.
