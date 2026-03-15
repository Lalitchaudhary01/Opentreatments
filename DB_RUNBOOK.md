# DB Runbook (OpenTreatment)

This runbook is the production-safe Prisma workflow for this repo.

## 1) Golden Rules

- Use migrations for schema changes.
- Do not use `db push` on staging/production.
- Keep `prisma/migrations` in git.
- Take DB backup/snapshot before deploy migration.

## 2) Daily Dev Flow

1. Edit Prisma schema files in `prisma/`.
2. Create migration:
   - `npm run db:migrate:dev -- --name <change_name>`
3. Regenerate client (usually auto, but run if needed):
   - `npm run db:generate`
4. Commit:
   - schema changes
   - generated migration folder

## 3) Deploy Flow (Prod)

1. Deploy app build.
2. Run:
   - `npm run db:migrate:deploy`
3. Verify:
   - `npm run db:status`

## 4) Baseline Info

- Baseline migration snapshot exists at:
  - `prisma/migrations/20260313_baseline/migration.sql`
- It represents current schema as migration-managed baseline.

## 5) Incident Playbook

### A) Error: `table ... does not exist`

1. Check deploy env `DATABASE_URL` is correct.
2. Run `npm run db:status`.
3. Run `npm run db:migrate:deploy`.
4. If still broken, compare DB tables vs schema with `prisma db execute`/SQL and fix mapping drift.

### B) Error: Prisma drift detected

1. Stop using `db push`.
2. Confirm `prisma/migrations` is present in deployed commit.
3. Run `npm run db:status`.
4. If DB was changed manually, create corrective SQL migration and apply through migration system.

### C) Error after accidental rename/drop

1. Restore from backup if data-critical.
2. If no backup and fast recovery needed:
   - apply targeted SQL rename/fix,
   - then create migration that reflects final state,
   - redeploy with `db:migrate:deploy`.

## 6) Dangerous Commands

- `npm run db:push:danger`
- `prisma db push --accept-data-loss`
- `prisma migrate reset`

Use only for local throwaway/dev recovery, never on production.

## 7) Quick Commands

- Validate schema: `npm run db:validate`
- Migration status: `npm run db:status`
- Create migration: `npm run db:migrate:dev -- --name add_x`
- Apply migrations (prod): `npm run db:migrate:deploy`
