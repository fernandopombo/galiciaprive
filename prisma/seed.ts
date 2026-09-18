import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  const adminEmail = process.env.SEED_ADMIN_EMAIL ?? "admin@ultravip.example";
  const adminPassword = process.env.SEED_ADMIN_PASSWORD ?? "CambiaEstaClave123!";

  const passwordHash = await bcrypt.hash(adminPassword, 10);

  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      name: "Administrador ULTRAVIP",
      email: adminEmail,
      passwordHash,
      role: "ADMIN",
    },
  });

  console.log(`Usuario admin listo: ${admin.email} (contraseña: ${adminPassword})`);

  const packages = [
    {
      name: "Camino Francés VIP — Sarria a Santiago",
      route: "FRANCES" as const,
      description:
        "Los últimos 100 km del Camino Francés en formato ultra-exclusivo: paradores, pazos y hoteles 5 estrellas, guía-concierge dedicado y gastronomía de autor.",
      durationDays: 5,
      basePricePerson: 4500,
    },
    {
      name: "Camino Portugués VIP — Tui a Santiago",
      route: "PORTUGUES" as const,
      description:
        "El Camino Portugués central desde Tui, con alojamientos históricos y experiencias privadas seleccionadas para un público exclusivo.",
      durationDays: 5,
      basePricePerson: 4200,
    },
    {
      name: "Camino Portugués da Costa VIP",
      route: "PORTUGUES_COSTA" as const,
      description:
        "La variante costera del Camino Portugués: acantilados, rías y atardeceres atlánticos, con la misma experiencia ultra-exclusiva de guía dedicado y alojamiento de lujo.",
      durationDays: 6,
      basePricePerson: 4800,
    },
  ];

  for (const pkg of packages) {
    const existing = await prisma.package.findFirst({ where: { name: pkg.name } });
    if (!existing) {
      await prisma.package.create({ data: pkg });
    }
  }

  console.log("Paquetes de ejemplo listos.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
