create extension if not exists pgcrypto;
create table if not exists tenants(id uuid primary key default gen_random_uuid(),name text not null,slug text unique not null,status text not null default 'active',created_at timestamptz not null default now());
create table if not exists users(id uuid primary key default gen_random_uuid(),tenant_id uuid not null references tenants(id),email text not null,password_hash text not null,name text not null,status text not null default 'active',created_at timestamptz not null default now(),unique(tenant_id,email));
create table if not exists roles(id uuid primary key default gen_random_uuid(),tenant_id uuid references tenants(id),name text not null,unique(tenant_id,name));
create table if not exists permissions(id uuid primary key default gen_random_uuid(),code text unique not null);
create table if not exists role_permissions(role_id uuid references roles(id) on delete cascade,permission_id uuid references permissions(id) on delete cascade,primary key(role_id,permission_id));
create table if not exists audit_log(id uuid primary key default gen_random_uuid(),tenant_id uuid not null references tenants(id),user_id uuid references users(id),action text not null,entity_type text,entity_id uuid,metadata jsonb not null default '{}',created_at timestamptz not null default now());
create index if not exists audit_tenant_created on audit_log(tenant_id,created_at desc);
