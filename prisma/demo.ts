import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

// Datos de demostración para poder recorrer el CRM con contenido creíble.
// No se ejecuta en el arranque: `npm run db:demo` cuando haga falta.
const CUSTOMERS = [
  {
    firstName: "Margaret",
    lastName: "Whitfield",
    email: "m.whitfield@example.com",
    phone: "+1 415 555 0134",
    country: "United States",
    market: "US" as const,
    preferredLanguage: "Inglés",
    source: "WEB-USA",
    tags: ["Aniversario", "Pareja"],
    route: "FRANCES" as const,
    partySize: "PAREJA" as const,
    pax: 2,
    status: "CONFIRMED" as const,
    daysAgo: 54,
    startsIn: 120,
    message:
      "Thirtieth anniversary. We want privacy above everything, and my husband's knee means we cannot do long days.",
    notes: [
      "Llamada inicial: prefieren mayo. Alergia a mariscos en el marido — avisar a todos los restaurantes.",
      "Confirmado Parador de Santiago para la última noche. Piden habitación con vistas a la plaza.",
    ],
    comms: [
      {
        subject: "Your proposal — The French Way",
        body: "Dear Margaret, here is the itinerary we discussed, with the shorter stages on days three and four.",
        direction: "OUTBOUND" as const,
        channel: "EMAIL" as const,
      },
      {
        subject: "Re: Your proposal",
        body: "This looks wonderful. Could we add one more night in Santiago at the end?",
        direction: "INBOUND" as const,
        channel: "EMAIL" as const,
      },
    ],
  },
  {
    firstName: "Eleanor",
    lastName: "Hayes",
    email: "e.hayes@example.com",
    phone: "+1 202 555 0111",
    country: "United States",
    market: "US" as const,
    preferredLanguage: "Inglés",
    source: "WEB-USA",
    tags: ["Solo", "Jubilación"],
    route: "PORTUGUES_COSTA" as const,
    partySize: "SOLO" as const,
    pax: 1,
    status: "CONTACTED" as const,
    daysAgo: 12,
    startsIn: 200,
    message:
      "Walking after my retirement. I would rather not be in a group, but I would like company at dinner.",
    notes: [
      "Perfil clásico del informe: mujer 60+, viaja sola, busca transformación personal, no religiosa.",
    ],
    comms: [
      {
        subject: "A few questions before we design your week",
        body: "Eleanor, thank you for writing. Before we propose anything: how many hours a day do you like to walk?",
        direction: "OUTBOUND" as const,
        channel: "EMAIL" as const,
      },
    ],
  },
  {
    firstName: "Yiwen",
    lastName: "Zhang",
    email: "yiwen.zhang@example.com",
    phone: "+86 138 0000 0000",
    country: "上海",
    market: "CHINA" as const,
    preferredLanguage: "Mandarín",
    source: "WEB-CHINA",
    tags: ["闺蜜同行", "摄影"],
    route: "PORTUGUES" as const,
    partySize: "PAREJA" as const,
    pax: 2,
    status: "CONFIRMED" as const,
    daysAgo: 31,
    startsIn: 75,
    message: "想和闺蜜两个人走，最重要的是摄影和住宿。不想赶路。",
    notes: [
      "Pide fotógrafo los tres días completos, no solo dos. Cotizar suplemento.",
      "Prefiere cenas temprano (19:00). Adaptar reservas.",
    ],
    comms: [
      {
        subject: "您的行程建议",
        body: "张女士您好，附上为您和朋友设计的行程，摄影师全程随行。",
        direction: "OUTBOUND" as const,
        channel: "EMAIL" as const,
      },
      {
        subject: "微信沟通",
        body: "通过微信确认了出发日期和摄影需求。",
        direction: "INBOUND" as const,
        channel: "WHATSAPP" as const,
      },
    ],
  },
  {
    firstName: "Li",
    lastName: "Wei",
    email: "li.wei@example.com",
    phone: "+86 139 0000 0000",
    country: "北京",
    market: "CHINA" as const,
    preferredLanguage: "Mandarín",
    source: "WEB-CHINA",
    tags: ["独自出发"],
    route: "FRANCES" as const,
    partySize: "SOLO" as const,
    pax: 1,
    status: "PENDING" as const,
    daysAgo: 3,
    startsIn: 240,
    message: "第一次去西班牙，有点担心安全问题。想了解中文向导的安排。",
    notes: [],
    comms: [],
  },
  {
    firstName: "Robert",
    lastName: "Callahan",
    email: "r.callahan@example.com",
    phone: "+1 312 555 0155",
    country: "United States",
    market: "US" as const,
    preferredLanguage: "Inglés",
    source: "Recomendación",
    tags: ["Grupo", "Familia"],
    route: "FRANCES" as const,
    partySize: "GRUPO" as const,
    pax: 6,
    status: "COMPLETED" as const,
    daysAgo: 96,
    startsIn: -20,
    message: "Three generations of the family. My mother is 78 and walks slowly but insists on walking.",
    notes: ["Viaje completado. Enviar carta manuscrita y fotos impresas."],
    comms: [
      {
        subject: "Thank you",
        body: "Robert, it was a privilege to walk with your family. The photographs are on their way.",
        direction: "OUTBOUND" as const,
        channel: "EMAIL" as const,
      },
    ],
  },
  {
    firstName: "Sophie",
    lastName: "Nguyen",
    email: "s.nguyen@example.com",
    phone: "+1 646 555 0190",
    country: "United States",
    market: "US" as const,
    preferredLanguage: "Inglés",
    source: "WEB-USA",
    tags: ["Sabático"],
    route: "PORTUGUES_COSTA" as const,
    partySize: "SOLO" as const,
    pax: 1,
    status: "CANCELLED" as const,
    daysAgo: 67,
    startsIn: 30,
    message: "Career break between jobs. Flexible on dates.",
    notes: ["Cancela por cambio de trabajo. Quiere retomarlo el año que viene — recontactar en enero."],
    comms: [],
  },
];

function daysFromNow(days: number) {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date;
}

async function main() {
  const admin = await prisma.user.findFirst({ where: { role: "ADMIN" } });
  if (!admin) throw new Error("Falta el usuario admin: ejecuta antes npm run db:seed");

  const packages = await prisma.package.findMany();
  if (packages.length === 0) throw new Error("Faltan paquetes: ejecuta antes npm run db:seed");

  for (const entry of CUSTOMERS) {
    const pkg = packages.find((p) => p.route === entry.route);
    if (!pkg) continue;

    const customer = await prisma.customer.upsert({
      where: { email: entry.email },
      update: {},
      create: {
        firstName: entry.firstName,
        lastName: entry.lastName,
        email: entry.email,
        phone: entry.phone,
        country: entry.country,
        market: entry.market,
        preferredLanguage: entry.preferredLanguage,
        source: entry.source,
        tags: entry.tags,
        createdAt: daysFromNow(-entry.daysAgo),
      },
    });

    const booking = await prisma.booking.create({
      data: {
        customerId: customer.id,
        packageId: pkg.id,
        status: entry.status,
        partySize: entry.partySize,
        pax: entry.pax,
        requestedStartDate: daysFromNow(entry.startsIn),
        estimatedTotal: Number(pkg.basePricePerson) * entry.pax,
        message: entry.message,
        createdAt: daysFromNow(-entry.daysAgo),
      },
    });

    for (const [index, body] of entry.notes.entries()) {
      await prisma.note.create({
        data: {
          customerId: customer.id,
          authorId: admin.id,
          body,
          createdAt: daysFromNow(-entry.daysAgo + index + 1),
        },
      });
    }

    for (const [index, comm] of entry.comms.entries()) {
      await prisma.communication.create({
        data: {
          customerId: customer.id,
          bookingId: booking.id,
          authorId: admin.id,
          channel: comm.channel,
          direction: comm.direction,
          subject: comm.subject,
          body: comm.body,
          sentAt: daysFromNow(-entry.daysAgo + index + 1),
        },
      });
    }
  }

  const [customers, bookings] = await Promise.all([
    prisma.customer.count(),
    prisma.booking.count(),
  ]);
  console.log(`Demo lista: ${customers} clientes, ${bookings} reservas.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
