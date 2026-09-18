import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { BookingForm, type BookingCopy } from "@/components/booking-form";
import { Logo } from "@/components/logo";

const copy: BookingCopy = {
  firstName: "First name",
  lastName: "Last name",
  email: "Email",
  phone: "Phone",
  country: "Where you live",
  market: "Market",
  marketOptions: {
    us: "United States",
    china: "China",
    germany: "Germany",
    other: "Other",
  },
  route: "Which road",
  date: "Approximate departure",
  format: "Who is walking",
  formatOptions: {
    solo: "On my own",
    couple: "The two of us",
    group: "A small circle",
  },
  pax: "How many",
  message: "What is bringing you to the Camino?",
  submit: "Send this to a person",
  submitting: "Sending…",
  disclaimer:
    "Nothing is charged and nothing is booked by sending this. We read it, we come back to you within a day with questions, and only then do we put a journey and a number in front of you.",
  routeLabels: {
    FRANCES: "The French Way — Sarria to Santiago",
    PORTUGUES: "The Portuguese Way — Tui to Santiago",
    PORTUGUES_COSTA: "The Portuguese Coastal Way",
  },
  days: "days on foot",
};

export default async function UsBookPage({
  searchParams,
}: PageProps<"/us/book">) {
  const params = await searchParams;
  const preselected =
    typeof params.package === "string" ? params.package : undefined;

  const packages = await prisma.package.findMany({
    where: { active: true },
    orderBy: { name: "asc" },
    select: { id: true, name: true, route: true, durationDays: true },
  });

  return (
    <main className="flex-1">
      <header className="border-b border-sand-200 bg-sand-50">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-6">
          <Link href="/us">
            <Logo tagline="Camino de Santiago" />
          </Link>
        </div>
      </header>

      <section className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="font-serif text-4xl leading-tight text-sea-900">
          Begin a conversation
        </h1>
        <p className="mt-5 max-w-xl text-[0.95rem] leading-relaxed text-sea-900/70">
          There is no form on this page that books anything. Tell us roughly when
          and who, and say as much or as little as you want about why. We will
          write back ourselves.
        </p>

        <div className="mt-12 border-t border-sand-200 pt-10">
          <BookingForm
            packages={packages}
            defaultPackageId={preselected}
            locale="us"
            fixedMarket="US"
            copy={copy}
          />
        </div>
      </section>
    </main>
  );
}
