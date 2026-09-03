import assert from 'node:assert/strict';
import fs from 'node:fs';
const root=new URL('../',import.meta.url);
for(const f of ['api/migrations/001_schema.sql','api/src/auth.ts','api/src/server.ts','infra/Dockerfile']) assert.ok(fs.existsSync(new URL(f,root)),`missing ${f}`);
const sql=fs.readFileSync(new URL('api/migrations/001_schema.sql',root),'utf8');
for(const token of ['tenant_id uuid','inventory_ledger','orders','attendance','invoices','journal_lines','alerts','api_keys','production_orders','finished_goods']) assert.match(sql,new RegExp(token,'i'),`missing ${token}`);
assert.match(fs.readFileSync(new URL('api/src/server.ts',root),'utf8'),/where tenant_id=\$1/i);
console.log('Core architecture invariants: PASS');
