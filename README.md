# Galicia Privé

Web de reservas + CRM interno para una empresa de peregrinaciones de lujo por el
Camino de Santiago (Camino Francés, Camino Portugués y Camino Portugués da Costa).

## Qué incluye

**Web pública**
- Landing con las rutas publicadas y precios de referencia.
- Formulario de solicitud de reserva (`/reservar`). La reserva entra como
  solicitud *pendiente*: no hay cobro online, el equipo confirma manualmente.

**CRM interno** (`/admin`, protegido por login)
- Panel con analíticas: reservas totales, clientes, confirmadas, conversión,
  valor confirmado, pipeline abierto, reservas por mes y distribución por ruta y
  por mercado.
- Reservas: listado filtrable por estado y detalle con cambio de estado
  (pendiente → contactado → confirmada → completada / cancelada).
- Clientes: listado y ficha completa con datos editables, etiquetas, historial de
  compras, notas internas e historial de comunicaciones.
- Comunicaciones: se lanzan desde la ficha del cliente (email, teléfono,
  WhatsApp u otro) y quedan registradas con autor y fecha.
- Paquetes: rutas publicadas con sus precios y reservas activas.

## Stack

Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · PostgreSQL · Prisma 7 ·
Auth.js v5 · Recharts.

## Puesta en marcha

```bash
npm install
cp .env.example .env     # rellena DATABASE_URL y AUTH_SECRET
npm run db:migrate       # crea las tablas
npm run db:seed          # usuario admin + paquetes de ejemplo
npm run dev
```

`AUTH_SECRET` se genera con `openssl rand -base64 32`.

El seed crea un usuario administrador. Puedes fijar sus credenciales con las
variables `SEED_ADMIN_EMAIL` y `SEED_ADMIN_PASSWORD` antes de ejecutarlo; si no,
usa unas por defecto que **deben cambiarse** antes de publicar.

No hay alta pública de usuarios internos: las cuentas del equipo se crean desde
el seed o directamente en base de datos.

## Envío de emails

El envío real está desactivado mientras no haya proveedor configurado. Con
`RESEND_API_KEY` y `EMAIL_FROM` en el entorno, el CRM envía por
[Resend](https://resend.com) al marcar la casilla de envío. Sin esas variables
las comunicaciones se registran igualmente, pero no sale ningún email.

## Scripts

| Script | Qué hace |
| --- | --- |
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Genera el cliente Prisma y compila |
| `npm run db:migrate` | Aplica migraciones de Prisma |
| `npm run db:seed` | Usuario admin y paquetes de ejemplo |
| `npm run db:studio` | Explorador visual de la base de datos |
