import { connection } from "next/server";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Logo } from "@/components/logo";
import { VideoHero } from "@/components/video-hero";
import { SiteNav } from "@/components/site-nav";
import { Reveal } from "@/components/motion";
import { Cta, Eyebrow, Panel } from "@/components/ui";

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

export default async function UsHomePage() {
  await connection();

  const packages = await prisma.package.findMany({
    where: { active: true },
    orderBy: { name: "asc" },
  });

  return (
    <main className="flex-1">
      <div className="grain-overlay" aria-hidden="true" />

      {/* Hero: tiempo, presencia y ausencia de fricción — el lenguaje que
          resuena en el comprador de lujo americano. */}
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
          <Reveal delay={220}>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-sand-50/80">
              You walk every kilometer. We take care of everything that
              isn&apos;t walking — the beds, the bags, the table, the language,
              the timing of the day. What&apos;s left is the part you came for.
            </p>
          </Reveal>
          <Reveal delay={320}>
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

      {/* Miedo nº1 documentado en foros americanos: la masificación. */}
      <section className="border-b border-sand-200 bg-sand-100">
        <div className="mx-auto max-w-6xl px-4 py-28 sm:px-6 sm:py-36">
          <div className="grid gap-14 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
            <Reveal>
              <Eyebrow>The crowds</Eyebrow>
              <h2 className="mt-7 font-serif text-[2.1rem] leading-[1.12] text-sea-900 sm:text-[2.9rem]">
                Half a million people walked to Santiago last year. You will
                rarely see them.
              </h2>
            </Reveal>
            <div className="grid gap-8 sm:grid-cols-2">
              {[
                "Sarria at eight in the morning in August is the busiest hour of the busiest month on the busiest stretch of the whole network. We simply don't walk in it. Your day starts before that wave or well after it, and the road ahead of you is empty either way.",
                "You sleep outside the crowded town centers, in houses that were monasteries and manors long before they were hotels. No queuing for a bunk, no racing anyone to the next village to find a bed.",
                "Where a variant exists that carries a fraction of the traffic and costs you nothing in authenticity, we take it — and your guide will tell you exactly what you're trading and why.",
              ].map((paragraph, index) => (
                <Reveal key={index} delay={index * 90}>
                  <p className="text-[0.95rem] leading-relaxed text-sea-900/70">
                    {paragraph}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Neutraliza el estigma "turigrino": profundidad demostrable. */}
      <section className="mx-auto max-w-6xl px-4 py-28 sm:px-6 sm:py-36">
        <div className="grid gap-16 lg:grid-cols-2">
          <div>
            <Reveal>
              <Eyebrow>What this is not</Eyebrow>
              <h2 className="mt-7 font-serif text-[2.1rem] leading-[1.12] text-sea-900 sm:text-[2.9rem]">
                This is not the shortcut version of the Camino.
              </h2>
            </Reveal>
            <Reveal delay={120}>
              <div className="mt-8 space-y-5 text-[0.95rem] leading-relaxed text-sea-900/70">
                <p>
                  There is a quiet suspicion among long-distance pilgrims about
                  people who arrive with a light pack and a hotel key. We take it
                  seriously, so we built the trip to answer it.
                </p>
                <p>
                  Every kilometer between your starting point and the Cathedral
                  is walked on your own feet. You carry the credential. You
                  collect the stamps yourself, at the churches and kitchens along
                  the way. You earn the Compostela the way it has been earned
                  since the Middle Ages.
                </p>
              </div>
            </Reveal>
          </div>

          <div className="space-y-5">
            {[
              {
                title: "Walked, not driven",
                body: "The support vehicle carries luggage, not people — unless a knee or a blister says otherwise, and then without a word about it.",
              },
              {
                title: "Hours with Galicians, not beside them",
                body: "The cheesemaker, the parish priest with the key to a locked Romanesque church, the family whose vines you walk through. Your guide knows them by name.",
              },
              {
                title: "Discreet on the road",
                body: "No branded vans trailing you, no logos, nothing that announces what you paid. On the path you are a pilgrim like any other. The difference waits for you at the end of the day.",
              },
            ].map((item, index) => (
              <Reveal key={item.title} delay={index * 90}>
                <Panel>
                  <h3 className="font-serif text-xl text-sea-900">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-[0.95rem] leading-relaxed text-sea-900/70">
                    {item.body}
                  </p>
                </Panel>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Patrimonio como legitimador del lujo. */}
      <section className="border-y border-sand-200 bg-sand-100">
        <div className="mx-auto max-w-6xl px-4 py-28 sm:px-6 sm:py-36">
          <Reveal>
            <Eyebrow>Where you sleep</Eyebrow>
            <h2 className="mt-7 max-w-3xl font-serif text-[2.1rem] leading-[1.12] text-sea-900 sm:text-[2.9rem]">
              Twelfth-century stone, and a bath deep enough to undo twenty
              kilometers.
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {[
              "Paradores set inside former monasteries and castles. Galician pazos — the granite manor houses of the old landed families — still owned by the families themselves.",
              "In Santiago, the Hostal dos Reis Católicos: founded in 1499 as a hospital for pilgrims, on the square facing the Cathedral. You finish your walk and step into five hundred years of the same purpose.",
              "Dinner is never the pilgrim menu. It is the estuary's scallops and percebes, an Albariño tasted in the cellar it came from, and, when the day calls for it, a table with a Michelin star.",
            ].map((paragraph, index) => (
              <Reveal key={index} delay={index * 90}>
                <p className="text-[0.95rem] leading-relaxed text-sea-900/70">
                  {paragraph}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* El guía como persona con nombre. */}
      <section className="mx-auto max-w-6xl px-4 py-28 sm:px-6 sm:py-36">
        <div className="grid gap-16 lg:grid-cols-2">
          <Reveal>
            <Eyebrow>Who walks with you</Eyebrow>
            <h2 className="mt-7 font-serif text-[2.1rem] leading-[1.12] text-sea-900 sm:text-[2.9rem]">
              One guide, yours, for the whole road.
            </h2>
            <p className="mt-8 text-[0.95rem] leading-relaxed text-sea-900/70">
              Not a group leader with a flag and a headcount. A Galician who has
              walked these paths for years, who speaks your language and the
              region&apos;s, who knows which chapel is worth the detour and which
              stretch is better walked in silence. They handle the reservations,
              the doctors if it comes to that, the dinner that needs
              rearranging. You are never managing anything.
            </p>
          </Reveal>

          <div className="space-y-5 lg:pt-20">
            <Reveal delay={90}>
              <Panel>
                <h3 className="font-serif text-xl text-sea-900">
                  You will not need a word of Spanish.
                </h3>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-sea-900/70">
                  Not at the table, not at the pharmacy, not at the stamp desk.
                </p>
              </Panel>
            </Reveal>
            <Reveal delay={180}>
              <Panel>
                <h3 className="font-serif text-xl text-sea-900">
                  The pace is set by you, not by the itinerary.
                </h3>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-sea-900/70">
                  Most guests walk between twelve and twenty-two kilometers a
                  day. We will tell you honestly what your body is in for, and we
                  send a conditioning plan months before you fly.
                </p>
              </Panel>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Ritual simbólico: territorio emocional poco explotado. */}
      <section className="relative isolate overflow-hidden bg-sea-900 text-sand-50">
        <div
          className="absolute inset-0 -z-10 bg-[radial-gradient(90%_70%_at_15%_0%,rgba(47,107,76,0.35)_0%,transparent_65%)]"
          aria-hidden="true"
        />
        <div className="mx-auto max-w-6xl px-4 py-28 sm:px-6 sm:py-36">
          <Reveal>
            <Eyebrow tone="light">Why people come</Eyebrow>
            <h2 className="mt-7 max-w-3xl font-serif text-[2.1rem] leading-[1.12] sm:text-[2.9rem]">
              Almost nobody walks this road for the scenery alone.
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-10 md:grid-cols-2">
            <Reveal delay={90}>
              <p className="text-[0.95rem] leading-relaxed text-sand-50/70">
                They walk it after a death, after a diagnosis, after the last
                child leaves, after forty years of work ends on a Friday
                afternoon. They walk it for a marriage that reached its thirtieth
                year, or a daughter who is about to become someone she
                hasn&apos;t been before. Faith is welcome here and never assumed.
              </p>
            </Reveal>
            <Reveal delay={180}>
              <p className="text-[0.95rem] leading-relaxed text-sand-50/70">
                If you are carrying something, tell us before you come. Pilgrims
                have been leaving things on this road for a thousand years — a
                stone, a name, a photograph. We will find the right place and the
                right hour, and then we will leave you alone in it.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Formatos de compañía documentados en el mercado americano. */}
      <section className="mx-auto max-w-6xl px-4 py-28 sm:px-6 sm:py-36">
        <Reveal>
          <Eyebrow>How people come</Eyebrow>
          <h2 className="mt-7 max-w-3xl font-serif text-[2.1rem] leading-[1.12] text-sea-900 sm:text-[2.9rem]">
            Alone, as two, or with the people you chose.
          </h2>
        </Reveal>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
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
          ].map((item, index) => (
            <Reveal key={item.title} delay={index * 90}>
              <Panel className="h-full">
                <h3 className="font-serif text-xl text-sea-900">{item.title}</h3>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-sea-900/70">
                  {item.body}
                </p>
              </Panel>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Rutas. */}
      <section id="routes" className="border-t border-sand-200 bg-sand-100">
        <div className="mx-auto max-w-6xl px-4 py-28 sm:px-6 sm:py-36">
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
                  <Panel className="h-full" as="article">
                    <Eyebrow>{ROUTE_LABELS_EN[pkg.route]}</Eyebrow>
                    <h3 className="mt-5 font-serif text-2xl leading-tight text-sea-900">
                      {copy.name}
                    </h3>
                    <p className="mt-4 flex-1 text-[0.95rem] leading-relaxed text-sea-900/70">
                      {copy.blurb}
                    </p>
                    <dl className="mt-8 space-y-2 border-t border-sand-200 pt-5 text-sm text-sea-900/60">
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
                      className="mt-7 w-fit border-b border-sea-700/40 pb-1 text-sm text-sea-700 transition-colors duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:border-sea-900 hover:text-sea-900"
                    >
                      Ask about this road
                    </Link>
                  </Panel>
                </Reveal>
              );
            })}
          </div>

          <Reveal delay={120}>
            <p className="mt-12 max-w-2xl text-[0.95rem] leading-relaxed text-sea-900/60">
              Journeys are quoted individually, because no two are built the
              same. As a guide, a fully private week with a dedicated guide,
              historic houses and curated dining runs from roughly $1,000 per
              person per day. We will give you a real number before you commit to
              anything.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-32 sm:px-6 sm:py-40">
        <Reveal>
          <h2 className="max-w-2xl font-serif text-[2.1rem] leading-[1.12] text-sea-900 sm:text-[2.9rem]">
            Tell us who is walking, and when.
          </h2>
          <p className="mt-6 max-w-xl text-[0.95rem] leading-relaxed text-sea-900/70">
            One of us reads every message. You will hear back within a day, from
            a person, with questions rather than a brochure.
          </p>
          <div className="mt-10">
            <Cta href="/us/book">Begin a conversation</Cta>
          </div>
        </Reveal>
      </section>

      <footer className="border-t border-sand-200 bg-sand-100">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-6 px-4 py-10 text-sm text-sea-900/50 sm:px-6">
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
