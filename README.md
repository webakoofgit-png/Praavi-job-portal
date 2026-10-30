# Praavi — Pune local job portal

Production-shaped monorepo for a hyperlocal recruitment portal serving Pune's eastern corridor.

## Apps

- `apps/web` — Next.js public site and candidate, employer, and admin portals
- `apps/api` — NestJS REST API with Prisma
- `apps/worker` — BullMQ worker entrypoint
- `packages/types` — shared domain types
- `packages/validation` — shared Zod schemas

## Local setup

1. Copy `.env.example` to `.env` and configure PostgreSQL/Redis.
2. Run `npm install`.
3. Run `npm run dev` for the web application.
4. Run `npm run dev:api` for the API.

Seed content in the UI is explicitly marked as demonstration data. External OTP, email, WhatsApp, S3, and resume-parsing providers remain adapters until credentials are configured.
