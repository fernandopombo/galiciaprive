#!/bin/bash
# Deja el entorno listo para ejecutar la app y las pruebas: dependencias,
# PostgreSQL arrancado, esquema migrado y datos mínimos sembrados.
set -euo pipefail

# Solo en los entornos remotos de Claude Code; en local cada uno gestiona lo suyo.
if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

cd "${CLAUDE_PROJECT_DIR:-$(pwd)}"

echo "[session-start] instalando dependencias"
npm install --legacy-peer-deps --no-audit --no-fund

# El contenedor se recicla y deja el clúster parado; sin esto fallan el build,
# las páginas que leen la base de datos y toda la suite e2e.
if command -v pg_ctlcluster > /dev/null 2>&1; then
  if ! pg_isready -h localhost -p 5432 > /dev/null 2>&1; then
    echo "[session-start] arrancando PostgreSQL"
    pg_ctlcluster 16 main start || true
    for _ in $(seq 1 20); do
      pg_isready -h localhost -p 5432 > /dev/null 2>&1 && break
      sleep 1
    done
  fi

  DB_USER="postgres"
  DB_PASSWORD="ultravip_dev"
  DB_NAME="galiciaprive"

  sudo -u postgres psql -tAc "ALTER USER ${DB_USER} PASSWORD '${DB_PASSWORD}';" > /dev/null 2>&1 || true
  if ! sudo -u postgres psql -tAc "SELECT 1 FROM pg_database WHERE datname='${DB_NAME}'" 2>/dev/null | grep -q 1; then
    echo "[session-start] creando la base de datos ${DB_NAME}"
    sudo -u postgres createdb "${DB_NAME}" || true
  fi

  if [ ! -f .env ]; then
    echo "[session-start] creando .env de desarrollo"
    cp .env.example .env
    sed -i "s|^DATABASE_URL=.*|DATABASE_URL=\"postgresql://${DB_USER}:${DB_PASSWORD}@localhost:5432/${DB_NAME}?schema=public\"|" .env
    sed -i "s|^AUTH_SECRET=.*|AUTH_SECRET=\"$(openssl rand -base64 32)\"|" .env
  fi

  echo "[session-start] aplicando migraciones y datos de ejemplo"
  npx prisma migrate deploy
  npx prisma generate
  npx tsx prisma/seed.ts
fi

echo "[session-start] listo"
