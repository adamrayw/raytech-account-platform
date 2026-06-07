# RayTech Account

Production-ready authentication platform for the RayTech ecosystem.

## Stack

- Next.js 16 (App Router)
- TypeScript
- PostgreSQL
- Prisma
- Better Auth
- Tailwind CSS
- Zod + React Hook Form

## What This App Provides

- Email/password registration and login
- Secure logout
- Session-based auth with HttpOnly cookies
- Cross-subdomain cookie strategy for `*.raytech.cloud`
- `GET /api/me` profile endpoint for RayTech products
- Device session tracking (`/api/sessions` + dashboard view)
- Server-side route protection + optimistic proxy redirects
- Modern SaaS dashboard with product launcher cards

## Domains

- `auth.raytech.cloud`
- `flownote.raytech.cloud`
- `flowpaste.raytech.cloud`
- `flowsummary.raytech.cloud`
- `flowsign.raytech.cloud`
- `flowtask.raytech.cloud`
- `flowcv.raytech.cloud`

## Quick Start

1. Install dependencies

```bash
npm install
```

2. Configure environment

```bash
cp .env.example .env
```

Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

3. Generate Prisma client

```bash
npm run prisma:generate
```

4. Run migrations

```bash
npm run prisma:migrate
```

5. Start development

```bash
npm run dev
```

## Environment Variables

Ready-to-use templates:

- `.env.development.example`
- `.env.staging.example`
- `.env.production.example`
- `.env.example` (default base)

Recommended flow:

1. Copy the right template to `.env`
2. Fill real credentials/secrets
3. Keep `BETTER_AUTH_SECRET` high-entropy (>=32 chars)
4. Keep `COOKIE_NAME=raytech_session` for cross-product consistency

Required core keys:

- `DATABASE_URL`
- `BETTER_AUTH_SECRET`
- `BETTER_AUTH_URL`
- `COOKIE_DOMAIN`
- `COOKIE_NAME`

## API

### `GET /api/me`

Returns authenticated user profile:

```json
{
  "id": "...",
  "name": "...",
  "email": "..."
}
```

### `GET /api/sessions`

Returns active session/device list for the current user.

## SSO Integration Guide

See [docs/sso-integration.md](docs/sso-integration.md).

## Future Extension Hooks

Architecture is prepared for:

- OAuth providers (Google/GitHub)
- Teams and organizations
- Product subscriptions
- Billing integration

No major auth refactor is required to add these features.
