# DistriSync ERP All 8 Stages Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Convert the prototype into a secure, cloud-ready, true multi-tenant Sales & Distribution ERP with a shared API and a later manufacturing edition.

**Architecture:** React/Vite web client and Node/Express API, PostgreSQL as the transactional source of truth, Cloud Run for the API, Cloud SQL for PostgreSQL, and Cloud Storage for binary documents. Every business record is tenant-scoped and every client uses the same API contracts.

**Tech Stack:** React 19, TypeScript, Vite, Express, PostgreSQL, pg, JWT, Zod, Docker, Google Cloud Run/Cloud SQL/Cloud Storage, GitHub Actions.

**Spec:** `docs/superpowers/specs/2026-09-02-distrisync-all-8-stages-design.md`

## Global Constraints
- Google Cloud is the production infrastructure.
- PostgreSQL is the transactional ERP database.
- True multi-tenancy is mandatory; tenant data must never cross boundaries.
- Authentication and authorization are server-side; no demo/localStorage authentication.
- Inventory and finance use immutable transaction/ledger concepts.
- Web, Android, iOS and Windows clients consume the same backend API.
- Manufacturing is an extension of the same platform, not a separate database.
- No secrets are committed to GitHub.

---

### Task 1: Foundation
- [ ] Create monorepo structure for web, API, database migrations and deployment.
- [ ] Add environment validation and secure JWT authentication.
- [ ] Add tenants, users, roles, permissions, sessions and audit tables.
- [ ] Add tenant middleware and role/permission guards.
- [ ] Add health/readiness endpoints and Docker/Cloud Run configuration.
- [ ] Add automated typecheck/build/API tests.

### Task 2: Core ERP
- [ ] Add products/SKUs/categories/pricing.
- [ ] Add customers/retailers/locations.
- [ ] Add warehouses and inventory balances.
- [ ] Add immutable stock ledger and order/order-line/dispatch transactions.
- [ ] Add APIs and dashboard screens for the core workflows.

### Task 3: Distribution
- [ ] Add C&F, distributor, wholesaler and sales-executive relationships.
- [ ] Add territory/channel assignment.
- [ ] Add stock/scheme dispatch workflows.
- [ ] Add role-aware dashboards and operational reports.

### Task 4: Field Force
- [ ] Add attendance/check-in/check-out records with GPS coordinates.
- [ ] Add secure photo metadata and Cloud Storage upload contracts.
- [ ] Add DSR/order capture with idempotency keys.
- [ ] Add offline outbox/sync contracts and conflict handling.

### Task 5: Finance
- [ ] Add invoices, collections, receivables/payables and account ledger.
- [ ] Add GST-ready tax fields and configurable tax rates.
- [ ] Add double-entry journal primitives and period controls.
- [ ] Add P&L/collection dashboards backed by transactional data.

### Task 6: Intelligence
- [ ] Add KPI aggregation endpoints.
- [ ] Add alerts/mismatch management.
- [ ] Add sales/inventory trend analytics.
- [ ] Add demand/reorder forecasting hooks without fabricating financial transactions.

### Task 7: Ecosystem
- [ ] Add versioned public API keys/service accounts.
- [ ] Add webhook/event infrastructure.
- [ ] Add WhatsApp/payment/accounting integration adapters with configuration stored per tenant.
- [ ] Add integration audit and retry status.

### Task 8: Manufacturing
- [ ] Add raw materials, BOMs and production orders.
- [ ] Add production consumption/output stock transactions.
- [ ] Add finished-goods lots/batches and quality/status fields.
- [ ] Connect finished goods to existing distribution inventory and dispatch workflows.

### Cross-stage verification
- [ ] Run full typecheck/build/test suite.
- [ ] Verify tenant isolation with cross-tenant access tests.
- [ ] Verify role permissions on protected endpoints.
- [ ] Verify stock ledger invariants and finance balancing invariants.
- [ ] Verify Docker build.
- [ ] Verify Cloud Run configuration has no committed secrets.
- [ ] Review changed code before integration.
