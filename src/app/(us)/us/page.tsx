import { connection } from "next/server";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Logo } from "@/components/logo";
import { VideoHero } from "@/components/video-hero";
import { SiteNav } from "@/components/site-nav";
import { Reveal } from "@/components/motion";
import { Figure } from "@/components/figure";
import { Cta, Eyebrow } from "@/components/ui";

const ROUTE_LABELS_EN: Record<string, string> = {
  FRANCES: "The French Way",
  PORTUGUES: "The Portuguese Way",
  PORTUGUES_COSTA: "The Portuguese Coastal Way",
};

const PACKAGE_COPY: Record<
  string,
  { name: string; blurb: string; from: string; slot: "routeFrances" | "routePortugues" | "routeCosta" }
> = {
  FRANCES: {
    name: "The French Way",
    blurb:
      "The final hundred kilometers, through the oak woods and stone hamlets of inland Galicia.",
    from: "Sarria",
    slot: "routeFrances",
  },
  PORTUGUES: {
    name: "The Portuguese Way",
    blurb:
      "From the Portuguese border north through vineyards and Roman bridges. Quieter, and gentler underfoot.",
    from: "Tui",
    slot: "routePortugues",
  },
  PORTUGUES_COSTA: {
    name: "The Coastal Way",
    blurb:
      "Cliffs, estuaries and fishing towns, with the Atlantic at your shoulder until the path turns inland.",
    from: "The coast",
    slot: "routeCosta",
  },
};

export default async function UsHomePage() {
  await connection();

  const packages = await prisma.package.findMany({
    where: { active: true },
    orderBy: { name: "asc" },
  });

  return (
    <main className="flex-1">
      <div className="grain-overlay" aria-hidden="true" />

      <VideoHero>
        <SiteNav
          tagline="Camino de Santiago"
          links={[
            { href: "#routes", label: "Routes" },
            { href: "/cn", label: "中文" },
          ]}
          cta={{ href: "/us/book", label: "Begin a conversation" }}
        />

        <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col justify-end px-4 pb-24 sm:px-6 sm:pb-28">
          <Reveal>
            <Eyebrow tone="light">Galicia · Northern Spain</Eyebrow>
          </Reveal>
          <Reveal delay={120}>
            <h1 className="mt-8 max-w-3xl font-serif text-[2.6rem] leading-[1.04] text-sand-50 sm:text-[4.5rem]">
              A thousand-year-old road, and nothing in the way of walking it.
            </h1>
          </Reveal>
          <Reveal delay={240}>
            <div className="mt-11 flex flex-wrap items-center gap-6">
              <Cta href="/us/book" tone="light">
                Begin a conversation
              </Cta>
              <span className="text-sm text-sand-50/60">
                Five to seven days · Two to eight walkers · A guide who stays
                with you
              </span>
            </div>
          </Reveal>
        </div>
      </VideoHero>

      {/* Split editorial: imagen a un lado, argumento al otro. El miedo nº1
          documentado en los foros americanos es la masificación. */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <Figure slot="crowds" ratio="5 / 4" />
          </Reveal>
          <Reveal delay={120}>
            <Eyebrow>The crowds</Eyebrow>
            <h2 className="mt-7 font-serif text-[2.1rem] leading-[1.12] text-sea-900 sm:text-[2.9rem]">
              Half a million people walked to Santiago last year. You will
              rarely see them.
            </h2>
            <div className="mt-8 space-y-5 text-[0.95rem] leading-relaxed text-sea-900/70">
              <p>
                Sarria at eight in the morning in August is the busiest hour of
                the busiest month on the busiest stretch of the whole network.
                We simply don&apos;t walk in it. Your day starts before that
                wave or well after it.
              </p>
              <p>
                You sleep outside the crowded town centers, in houses that were
                monasteries and manors long before they were hotels.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Banda a sangre: la imagen manda y el texto se pone encima. */}
      <section className="relative isolate">
        <Figure slot="parador" ratio="21 / 9" className="min-h-[70svh] w-full" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-sea-900/85 via-sea-900/25 to-transparent" />
        <div className="absolute inset-x-0 bottom-0">
          <div className="mx-auto max-w-7xl px-4 pb-14 sm:px-6 sm:pb-20">
            <Reveal>
              <Eyebrow tone="light">Where you sleep</Eyebrow>
              <h2 className="mt-7 max-w-3xl font-serif text-[2.1rem] leading-[1.12] text-sand-50 sm:text-[3.1rem]">
                Twelfth-century stone, and a bath deep enough to undo twenty
                kilometers.
              </h2>
              <p className="mt-6 max-w-xl text-[0.95rem] leading-relaxed text-sand-50/75">
                Paradores inside former monasteries and castles. Galician pazos
                still owned by the families themselves. In Santiago, a hospital
                for pilgrims founded in 1499, on the square facing the
                Cathedral.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Split invertido. Neutraliza el estigma "turigrino". */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal className="lg:order-2">
            <Figure slot="credential" ratio="4 / 5" />
          </Reveal>
          <Reveal delay={120} className="lg:order-1">
            <Eyebrow>What this is not</Eyebrow>
            <h2 className="mt-7 font-serif text-[2.1rem] leading-[1.12] text-sea-900 sm:text-[2.9rem]">
              This is not the shortcut version of the Camino.
            </h2>
            <div className="mt-8 space-y-5 text-[0.95rem] leading-relaxed text-sea-900/70">
              <p>
                Every kilometer between your starting point and the Cathedral is
                walked on your own feet. You carry the credential. You collect
                the stamps yourself, at the churches and kitchens along the way.
              </p>
              <p>
                The support vehicle carries luggage, not people — unless a knee
                or a blister says otherwise, and then without a word about it.
                No branded vans, no logos, nothing that announces what you paid.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Tríptico de imagen: gente, mesa y guía. */}
      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 sm:pb-32">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              slot: "locals" as const,
              title: "Hours with Galicians",
              body: "The cheesemaker, the priest with the key to a locked Romanesque church, the family whose vines you walk through.",
            },
            {
              slot: "table" as const,
              title: "Never the pilgrim menu",
              body: "The estuary's scallops and percebes, an Albariño tasted in the cellar it came from, and a starred table when the day calls for it.",
            },
            {
              slot: "guide" as const,
              title: "One guide, yours",
              body: "A Galician who has walked these paths for years, who speaks your language and the region's. You are never managing anything.",
            },
          ].map((item, index) => (
            <Reveal key={item.slot} delay={index * 90}>
              <Figure slot={item.slot} ratio="4 / 5" />
              <h3 className="mt-6 font-serif text-xl text-sea-900">
                {item.title}
              </h3>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-sea-900/70">
                {item.body}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Banda oscura a sangre: el ritual, territorio emocional no explotado. */}
      <section className="relative isolate">
        <Figure slot="ritual" ratio="21 / 9" className="min-h-[60svh] w-full" />
        <div className="pointer-events-none absolute inset-0 bg-sea-900/70" />
        <div className="absolute inset-0 flex items-center">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
            <Reveal>
              <Eyebrow tone="light">Why people come</Eyebrow>
              <h2 className="mt-7 max-w-2xl font-serif text-[2.1rem] leading-[1.12] text-sand-50 sm:text-[3.1rem]">
                Almost nobody walks this road for the scenery alone.
              </h2>
              <p className="mt-7 max-w-xl text-[0.95rem] leading-relaxed text-sand-50/75">
                They walk it after a death, after a diagnosis, after forty years
                of work end on a Friday afternoon. If you are carrying
                something, tell us before you come. Pilgrims have been leaving
                things on this road for a thousand years. We will find the right
                place and the right hour, and then we will leave you alone in
                it.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Rutas como tarjetas fotográficas, no como cajas. */}
      <section id="routes" className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32">
        <Reveal>
          <Eyebrow>The three roads</Eyebrow>
          <h2 className="mt-7 max-w-3xl font-serif text-[2.1rem] leading-[1.12] text-sea-900 sm:text-[2.9rem]">
            Choose your last hundred kilometers.
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {packages.map((pkg, index) => {
            const copy = PACKAGE_COPY[pkg.route];
            return (
              <Reveal key={pkg.id} delay={index * 90}>
                <article>
                  <Link href={`/us/book?package=${pkg.id}`} className="block">
                    <Figure slot={copy.slot} ratio="3 / 4" />
                  </Link>
                  <p className="mt-6 text-[0.65rem] uppercase tracking-[0.25em] text-field-700">
                    {ROUTE_LABELS_EN[pkg.route]}
                  </p>
                  <h3 className="mt-3 font-serif text-2xl leading-tight text-sea-900">
                    {copy.name}
                  </h3>
                  <p className="mt-3 text-[0.95rem] leading-relaxed text-sea-900/70">
                    {copy.blurb}
                  </p>
                  <dl className="mt-6 flex gap-8 border-t border-sand-200 pt-5 text-sm text-sea-900/60">
                    <div>
                      <dt className="text-[0.7rem] uppercase tracking-[0.15em]">
                        Begins at
                      </dt>
                      <dd className="mt-1 text-sea-900">{copy.from}</dd>
                    </div>
                    <div>
                      <dt className="text-[0.7rem] uppercase tracking-[0.15em]">
                        On foot
                      </dt>
                      <dd className="mt-1 text-sea-900">
                        {pkg.durationDays} days
                      </dd>
                    </div>
                  </dl>
                </article>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={120}>
          <p className="mt-14 max-w-2xl text-[0.95rem] leading-relaxed text-sea-900/60">
            Journeys are quoted individually, because no two are built the same.
            As a guide, a fully private week runs from roughly $1,000 per person
            per day. We will give you a real number before you commit to
            anything.
          </p>
        </Reveal>
      </section>

      {/* Cierre sobre la llegada. */}
      <section className="relative isolate">
        <Figure slot="cathedral" ratio="21 / 9" className="min-h-[65svh] w-full" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-sea-900/90 via-sea-900/35 to-transparent" />
        <div className="absolute inset-x-0 bottom-0">
          <div className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 sm:pb-24">
            <Reveal>
              <h2 className="max-w-2xl font-serif text-[2.1rem] leading-[1.12] text-sand-50 sm:text-[3.1rem]">
                Tell us who is walking, and when.
              </h2>
              <p className="mt-6 max-w-xl text-[0.95rem] leading-relaxed text-sand-50/75">
                One of us reads every message. You will hear back within a day,
                from a person, with questions rather than a brochure.
              </p>
              <div className="mt-10">
                <Cta href="/us/book" tone="light">
                  Begin a conversation
                </Cta>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <footer className="border-t border-sand-200 bg-sand-100">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-6 px-4 py-10 text-sm text-sea-900/50 sm:px-6">
          <Logo tagline="Camino de Santiago" size="sm" />
          <div className="flex gap-7">
            <Link
              href="/cn"
              className="transition-colors duration-500 hover:text-sea-700"
            >
              中文
            </Link>
            <Link
              href="/"
              className="transition-colors duration-500 hover:text-sea-700"
            >
              Español
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
