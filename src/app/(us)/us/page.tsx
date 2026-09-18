import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Logo } from "@/components/logo";

const ROUTE_LABELS_EN: Record<string, string> = {
  FRANCES: "The French Way",
  PORTUGUES: "The Portuguese Way",
  PORTUGUES_COSTA: "The Portuguese Coastal Way",
};

const PACKAGE_COPY: Record<string, { name: string; blurb: string; from: string }> = {
  FRANCES: {
    name: "The French Way — Sarria to Santiago",
    blurb:
      "The final hundred kilometers, through the oak woods and stone hamlets of inland Galicia. The classic, walked the way it deserves.",
    from: "Sarria",
  },
  PORTUGUES: {
    name: "The Portuguese Way — Tui to Santiago",
    blurb:
      "From the Portuguese border north through vineyards and Roman bridges. Quieter than the French Way, and gentler underfoot.",
    from: "Tui",
  },
  PORTUGUES_COSTA: {
    name: "The Portuguese Coastal Way",
    blurb:
      "The Atlantic route: cliffs, estuaries and fishing towns, with the ocean at your shoulder until the path turns inland for Santiago.",
    from: "The coast",
  },
};

function Section({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mx-auto max-w-5xl px-6 py-20 sm:py-24">
      <p className="text-[0.7rem] uppercase tracking-[0.32em] text-field-700">
        {eyebrow}
      </p>
      <h2 className="mt-5 max-w-2xl font-serif text-3xl leading-[1.15] text-sea-900 sm:text-4xl">
        {title}
      </h2>
      <div className="mt-8">{children}</div>
    </section>
  );
}

export default async function UsHomePage() {
  const packages = await prisma.package.findMany({
    where: { active: true },
    orderBy: { name: "asc" },
  });

  return (
    <main className="flex-1">
      <header className="border-b border-sand-200 bg-sand-50/90 backdrop-blur-sm">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-6">
          <Logo tagline="Camino de Santiago" />
          <div className="flex items-center gap-6">
            <Link
              href="/cn"
              className="hidden text-xs uppercase tracking-[0.2em] text-sea-700/60 transition hover:text-sea-700 sm:block"
            >
              中文
            </Link>
            <Link
              href="/us/book"
              className="rounded-full bg-sea-700 px-6 py-2.5 text-sm text-white transition hover:bg-sea-900"
            >
              Begin a conversation
            </Link>
          </div>
        </div>
      </header>

      {/* Hero: tiempo, presencia y ausencia de fricción — el lenguaje que
          resuena en el comprador de lujo americano (mindful luxury). */}
      <section className="relative overflow-hidden grain">
        <div className="mx-auto max-w-5xl px-6 pt-24 pb-20 sm:pt-32">
          <p className="text-[0.7rem] uppercase tracking-[0.32em] text-field-700">
            Galicia · Northern Spain
          </p>
          <h1 className="mt-7 max-w-3xl font-serif text-[2.75rem] leading-[1.08] text-sea-900 sm:text-6xl">
            A thousand-year-old road, and nothing in the way of walking it.
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-sea-900/70">
            You walk every kilometer. We take care of everything that isn&apos;t
            walking — the beds, the bags, the table, the language, the timing of
            the day. What&apos;s left is the part you came for.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-5">
            <Link
              href="/us/book"
              className="rounded-full bg-sea-700 px-8 py-3.5 text-sm text-white transition hover:bg-sea-900"
            >
              Begin a conversation
            </Link>
            <span className="text-sm text-sea-900/50">
              Five to seven days · Two to eight walkers · A guide who stays with you
            </span>
          </div>
        </div>
      </section>

      {/* Miedo nº1 documentado en foros americanos: la masificación. */}
      <div className="border-y border-sand-200 bg-sand-100">
        <Section
          eyebrow="The crowds"
          title="Half a million people walked to Santiago last year. You will rarely see them."
        >
          <div className="grid gap-10 md:grid-cols-3">
            <p className="text-[0.95rem] leading-relaxed text-sea-900/70">
              Sarria at eight in the morning in August is the busiest hour of the
              busiest month on the busiest stretch of the whole network. We simply
              don&apos;t walk in it. Your day starts before that wave or well after
              it, and the road ahead of you is empty either way.
            </p>
            <p className="text-[0.95rem] leading-relaxed text-sea-900/70">
              You sleep outside the crowded town centers, in houses that were
              monasteries and manors long before they were hotels. No queuing for a
              bunk, no racing anyone to the next village to find a bed.
            </p>
            <p className="text-[0.95rem] leading-relaxed text-sea-900/70">
              Where a variant exists that carries a fraction of the traffic and
              costs you nothing in authenticity, we take it — and your guide will
              tell you exactly what you&apos;re trading and why.
            </p>
          </div>
        </Section>
      </div>

      {/* Neutraliza el estigma "turigrino": profundidad demostrable. */}
      <Section
        eyebrow="What this is not"
        title="This is not the shortcut version of the Camino."
      >
        <div className="grid gap-12 md:grid-cols-2">
          <div className="space-y-5 text-[0.95rem] leading-relaxed text-sea-900/70">
            <p>
              There is a quiet suspicion among long-distance pilgrims about people
              who arrive with a light pack and a hotel key. We take it seriously,
              so we built the trip to answer it.
            </p>
            <p>
              Every kilometer between your starting point and the Cathedral is
              walked on your own feet. You carry the credential. You collect the
              stamps yourself, at the churches and kitchens along the way. You earn
              the Compostela the way it has been earned since the Middle Ages.
            </p>
          </div>
          <dl className="space-y-6 border-l border-sand-200 pl-8">
            <div>
              <dt className="font-serif text-lg text-sea-900">Walked, not driven</dt>
              <dd className="mt-1.5 text-[0.95rem] leading-relaxed text-sea-900/70">
                The support vehicle carries luggage, not people — unless a knee or
                a blister says otherwise, and then without a word about it.
              </dd>
            </div>
            <div>
              <dt className="font-serif text-lg text-sea-900">
                Hours with Galicians, not beside them
              </dt>
              <dd className="mt-1.5 text-[0.95rem] leading-relaxed text-sea-900/70">
                The cheesemaker, the parish priest with the key to a locked
                Romanesque church, the family whose vines you walk through. Your
                guide knows them by name.
              </dd>
            </div>
            <div>
              <dt className="font-serif text-lg text-sea-900">Discreet on the road</dt>
              <dd className="mt-1.5 text-[0.95rem] leading-relaxed text-sea-900/70">
                No branded vans trailing you, no logos, nothing that announces what
                you paid. On the path you are a pilgrim like any other. The
                difference waits for you at the end of the day.
              </dd>
            </div>
          </dl>
        </div>
      </Section>

      {/* Patrimonio como legitimador del lujo. */}
      <div className="border-y border-sand-200 bg-sand-100">
        <Section
          eyebrow="Where you sleep"
          title="Twelfth-century stone, and a bath deep enough to undo twenty kilometers."
        >
          <div className="grid gap-10 md:grid-cols-3">
            <p className="text-[0.95rem] leading-relaxed text-sea-900/70">
              Paradores set inside former monasteries and castles. Galician pazos —
              the granite manor houses of the old landed families — still owned by
              the families themselves.
            </p>
            <p className="text-[0.95rem] leading-relaxed text-sea-900/70">
              In Santiago, the Hostal dos Reis Católicos: founded in 1499 as a
              hospital for pilgrims, on the square facing the Cathedral. You finish
              your walk and step into five hundred years of the same purpose.
            </p>
            <p className="text-[0.95rem] leading-relaxed text-sea-900/70">
              Dinner is never the pilgrim menu. It is the estuary&apos;s scallops
              and percebes, an Albariño tasted in the cellar it came from, and, when
              the day calls for it, a table with a Michelin star.
            </p>
          </div>
        </Section>
      </div>

      {/* El guía como persona con nombre — modelo Duperier. */}
      <Section
        eyebrow="Who walks with you"
        title="One guide, yours, for the whole road."
      >
        <div className="grid gap-12 md:grid-cols-2">
          <p className="text-[0.95rem] leading-relaxed text-sea-900/70">
            Not a group leader with a flag and a headcount. A Galician who has
            walked these paths for years, who speaks your language and the region&apos;s,
            who knows which chapel is worth the detour and which stretch is better
            walked in silence. They handle the reservations, the doctors if it comes
            to that, the dinner that needs rearranging. You are never managing
            anything.
          </p>
          <div className="space-y-5 text-[0.95rem] leading-relaxed text-sea-900/70">
            <p>
              <span className="font-serif text-lg text-sea-900">
                You will not need a word of Spanish.
              </span>{" "}
              Not at the table, not at the pharmacy, not at the stamp desk.
            </p>
            <p>
              <span className="font-serif text-lg text-sea-900">
                The pace is set by you, not by the itinerary.
              </span>{" "}
              Most guests walk between twelve and twenty-two kilometers a day. We
              will tell you honestly what your body is in for, and we send a
              conditioning plan months before you fly.
            </p>
          </div>
        </div>
      </Section>

      {/* Ritual simbólico: territorio emocional poco explotado. */}
      <div className="border-y border-sand-200 bg-sea-900 text-sand-50">
        <section className="mx-auto max-w-5xl px-6 py-20 sm:py-24">
          <p className="text-[0.7rem] uppercase tracking-[0.32em] text-field-500">
            Why people come
          </p>
          <h2 className="mt-5 max-w-2xl font-serif text-3xl leading-[1.15] sm:text-4xl">
            Almost nobody walks this road for the scenery alone.
          </h2>
          <div className="mt-8 grid gap-10 md:grid-cols-2">
            <p className="text-[0.95rem] leading-relaxed text-sand-50/70">
              They walk it after a death, after a diagnosis, after the last child
              leaves, after forty years of work ends on a Friday afternoon. They
              walk it for a marriage that reached its thirtieth year, or a daughter
              who is about to become someone she hasn&apos;t been before. Faith is
              welcome here and never assumed.
            </p>
            <p className="text-[0.95rem] leading-relaxed text-sand-50/70">
              If you are carrying something, tell us before you come. Pilgrims have
              been leaving things on this road for a thousand years — a stone, a
              name, a photograph. We will find the right place and the right hour,
              and then we will leave you alone in it.
            </p>
          </div>
        </section>
      </div>

      {/* Formatos de compañía documentados en el mercado americano. */}
      <Section
        eyebrow="How people come"
        title="Alone, as two, or with the people you chose."
      >
        <div className="grid gap-8 md:grid-cols-3">
          {[
            {
              title: "On your own",
              body: "More than half our American guests arrive alone, most of them women. You will have your guide's full attention, the freedom to walk in silence, and, if you want it, the company of other walkers at dinner.",
            },
            {
              title: "As a couple",
              body: "Anniversaries, retirements, the trip postponed three times already. Two people, one guide, nobody else's schedule to accommodate.",
            },
            {
              title: "A small circle",
              body: "A mother and daughter. Four friends who have been threatening to do this since college. Three generations of one family. We cap it at eight, and we never merge you with strangers.",
            },
          ].map((item) => (
            <article key={item.title} className="border-t border-sand-200 pt-6">
              <h3 className="font-serif text-xl text-sea-900">{item.title}</h3>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-sea-900/70">
                {item.body}
              </p>
            </article>
          ))}
        </div>
      </Section>

      {/* Rutas. */}
      <div className="border-t border-sand-200 bg-sand-100">
        <Section eyebrow="The three roads" title="Choose your last hundred kilometers.">
          <div className="grid gap-6 md:grid-cols-3">
            {packages.map((pkg) => {
              const copy = PACKAGE_COPY[pkg.route];
              return (
                <article
                  key={pkg.id}
                  className="flex flex-col rounded-sm border border-sand-200 bg-sand-50 p-7"
                >
                  <p className="text-[0.65rem] uppercase tracking-[0.25em] text-field-700">
                    {ROUTE_LABELS_EN[pkg.route]}
                  </p>
                  <h3 className="mt-4 font-serif text-2xl leading-tight text-sea-900">
                    {copy.name}
                  </h3>
                  <p className="mt-4 flex-1 text-[0.95rem] leading-relaxed text-sea-900/70">
                    {copy.blurb}
                  </p>
                  <dl className="mt-7 space-y-2 border-t border-sand-200 pt-5 text-sm text-sea-900/60">
                    <div className="flex justify-between">
                      <dt>Begins at</dt>
                      <dd className="text-sea-900">{copy.from}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt>On foot</dt>
                      <dd className="text-sea-900">{pkg.durationDays} days</dd>
                    </div>
                  </dl>
                  <Link
                    href={`/us/book?package=${pkg.id}`}
                    className="mt-7 border-b border-sea-700 pb-1 text-sm text-sea-700 transition hover:border-sea-900 hover:text-sea-900"
                  >
                    Ask about this road
                  </Link>
                </article>
              );
            })}
          </div>
          <p className="mt-10 max-w-2xl text-[0.95rem] leading-relaxed text-sea-900/60">
            Journeys are quoted individually, because no two are built the same.
            As a guide, a fully private week with a dedicated guide, historic
            houses and curated dining runs from roughly $1,000 per person per day.
            We will give you a real number before you commit to anything.
          </p>
        </Section>
      </div>

      <section className="mx-auto max-w-5xl px-6 py-24">
        <h2 className="max-w-2xl font-serif text-3xl leading-[1.15] text-sea-900 sm:text-4xl">
          Tell us who is walking, and when.
        </h2>
        <p className="mt-5 max-w-xl text-[0.95rem] leading-relaxed text-sea-900/70">
          One of us reads every message. You will hear back within a day, from a
          person, with questions rather than a brochure.
        </p>
        <Link
          href="/us/book"
          className="mt-9 inline-block rounded-full bg-sea-700 px-8 py-3.5 text-sm text-white transition hover:bg-sea-900"
        >
          Begin a conversation
        </Link>
      </section>

      <footer className="border-t border-sand-200 bg-sand-100">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 px-6 py-8 text-sm text-sea-900/50">
          <Logo tagline="Camino de Santiago" />
          <div className="flex gap-6">
            <Link href="/cn" className="transition hover:text-sea-700">
              中文
            </Link>
            <Link href="/" className="transition hover:text-sea-700">
              Español
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
