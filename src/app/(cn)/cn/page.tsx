import { connection } from "next/server";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Logo } from "@/components/logo";
import { VideoHero } from "@/components/video-hero";
import { SiteNav } from "@/components/site-nav";
import { Reveal } from "@/components/motion";
import { Cta, Eyebrow, Panel } from "@/components/ui";

const ROUTE_LABELS_CN: Record<string, string> = {
  FRANCES: "法国之路",
  PORTUGUES: "葡萄牙之路",
  PORTUGUES_COSTA: "葡萄牙海岸之路",
};

const PACKAGE_COPY: Record<string, { name: string; blurb: string; from: string }> = {
  FRANCES: {
    name: "法国之路 · 萨里亚—圣地亚哥",
    blurb:
      "最经典的一段。穿过加利西亚内陆的橡树林与石头村落，走完最后100公里，抵达大教堂。",
    from: "萨里亚 Sarria",
  },
  PORTUGUES: {
    name: "葡萄牙之路 · 图伊—圣地亚哥",
    blurb:
      "从葡萄牙边境一路向北，途经葡萄园与罗马古桥。人少、路平，是体力上最友好的选择。",
    from: "图伊 Tui",
  },
  PORTUGUES_COSTA: {
    name: "葡萄牙海岸之路",
    blurb:
      "大西洋沿线：悬崖、海湾与渔村，海就在肩侧。日落是这条路上最值得记录的时刻。",
    from: "大西洋海岸",
  },
};

const serif = { fontFamily: "var(--font-noto-serif-sc), serif" } as const;

export default async function CnHomePage() {
  await connection();

  const packages = await prisma.package.findMany({
    where: { active: true },
    orderBy: { name: "asc" },
  });

  return (
    <main className="flex-1">
      <div className="grain-overlay" aria-hidden="true" />

      {/* 治愈 / 与自我对话：中文市场已验证的叙事框架，而非宗教框架。 */}
      <VideoHero>
        <SiteNav
          tagline="圣地亚哥朝圣之路"
          links={[
            { href: "#routes", label: "路线" },
            { href: "/us", label: "EN" },
          ]}
          cta={{ href: "/cn/book", label: "预约咨询" }}
        />

        <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col justify-end px-4 pb-24 sm:px-6 sm:pb-28">
          <Reveal>
            <Eyebrow tone="light">西班牙 · 加利西亚</Eyebrow>
          </Reveal>
          <Reveal delay={120}>
            <h1
              style={serif}
              className="mt-8 max-w-3xl text-[2.4rem] leading-[1.3] text-sand-50 sm:text-[3.9rem]"
            >
              用一百公里，
              <br />
              和自己好好说一次话。
            </h1>
          </Reveal>
          <Reveal delay={220}>
            <p className="mt-8 max-w-xl text-[1.05rem] leading-[1.9] text-sand-50/80">
              没有赶路，没有打卡清单，没有需要你操心的任何事。
              中文向导全程陪同，行李有人搬，餐厅有人订，语言有人讲——
              你只需要走路、看海、把这段时间还给自己。
            </p>
          </Reveal>
          <Reveal delay={320}>
            <div className="mt-11 flex flex-wrap items-center gap-6">
              <Cta href="/cn/book" tone="light">
                预约咨询
              </Cta>
              <span className="text-sm text-sand-50/60">
                5–7 天 · 2–8 人小团或私人定制 · 全程中文
              </span>
            </div>
          </Reveal>
        </div>
      </VideoHero>

      {/* 安全感：中文市场最大的实际顾虑，必须正面回应。 */}
      <section className="border-b border-sand-200 bg-sand-100">
        <div className="mx-auto max-w-6xl px-4 py-28 sm:px-6 sm:py-36">
          <div className="grid gap-14 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
            <Reveal>
              <Eyebrow>关于安全</Eyebrow>
              <h2
                style={serif}
                className="mt-7 text-[1.9rem] leading-[1.4] text-sea-900 sm:text-[2.6rem]"
              >
                你担心的西班牙，和这条路上的西班牙，不是一回事。
              </h2>
            </Reveal>
            <div className="grid gap-8 sm:grid-cols-2">
              {[
                "新闻里的治安问题集中在马德里、巴塞罗那的旅游热点区域。朝圣之路走的是加利西亚的乡村和小镇——几百人的村子，居民世代在此生活，路上遇到的是来自世界各地的徒步者。",
                "全程私人专车点对点接送，不需要搭乘公共交通、不需要自己拖行李、不需要在陌生的城市街头找路。向导从接机到送机始终与你同行。",
                "24 小时中文应急联络，随时可以找到人。医疗、保险、突发状况，由我们处理，不需要你用外语和任何人交涉。",
              ].map((paragraph, index) => (
                <Reveal key={index} delay={index * 90}>
                  <p className="text-[0.95rem] leading-[1.9] text-sea-900/70">
                    {paragraph}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 体力顾虑：市场内容已把 Sarria/Tui 验证为合理入门。 */}
      <section className="mx-auto max-w-6xl px-4 py-28 sm:px-6 sm:py-36">
        <div className="grid gap-16 lg:grid-cols-2">
          <div>
            <Reveal>
              <Eyebrow>关于体力</Eyebrow>
              <h2
                style={serif}
                className="mt-7 text-[1.9rem] leading-[1.4] text-sea-900 sm:text-[2.6rem]"
              >
                这不是一场徒步挑战赛。
              </h2>
            </Reveal>
            <Reveal delay={120}>
              <div className="mt-8 space-y-5 text-[0.95rem] leading-[1.9] text-sea-900/70">
                <p>
                  最后100公里分成5到7天走完，平均每天15到20公里，全程几乎没有爬升。
                  我们不比速度，也不设定到达时间。
                </p>
                <p>
                  累了随时可以上车，这不算放弃，也不会有人说什么。
                  行李每天由专车运到下一家酒店，你身上只需要一个小背包。
                </p>
                <p>出发前我们会提供一份中文的行前准备与训练建议，让你心里有底。</p>
              </div>
            </Reveal>
          </div>

          <div className="space-y-5 lg:pt-20">
            {[
              { title: "每天 15–20 公里", body: "上午走路，下午休息。不是从早赶到晚的行程。" },
              { title: "随行车辆全程跟随", body: "车在，选择权就在你手里。" },
              {
                title: "双人/闺蜜同行最受欢迎",
                body: "也可以独自出发——向导全程在身边，不会让你一个人应付任何事。",
              },
            ].map((item, index) => (
              <Reveal key={item.title} delay={index * 90}>
                <Panel>
                  <h3 style={serif} className="text-lg text-sea-900">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-[0.95rem] leading-[1.9] text-sea-900/70">
                    {item.body}
                  </p>
                </Panel>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 朝圣护照与证书：已被验证为“成就感 + 内容”的核心。 */}
      <section className="relative isolate overflow-hidden bg-sea-900 text-sand-50">
        <div
          className="absolute inset-0 -z-10 bg-[radial-gradient(90%_70%_at_15%_0%,rgba(47,107,76,0.35)_0%,transparent_65%)]"
          aria-hidden="true"
        />
        <div className="mx-auto max-w-6xl px-4 py-28 sm:px-6 sm:py-36">
          <Reveal>
            <Eyebrow tone="light">朝圣护照 · 证书</Eyebrow>
            <h2
              style={serif}
              className="mt-7 max-w-3xl text-[1.9rem] leading-[1.4] sm:text-[2.6rem]"
            >
              每天一枚印章，最后换一张写着你名字的证书。
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-10 md:grid-cols-3">
            {[
              "出发时你会拿到一本朝圣护照。沿途的教堂、酒馆、老修道院都有自己的印章，盖满这本护照是这段路上每天的小仪式，也是最好记录的画面。",
              "步行满100公里，就可以在圣地亚哥的朝圣者办公室领取官方证书 Compostela，上面用拉丁文写着你的名字。这是九百年来没有变过的规矩。",
              "终点在大教堂。可以登上祭坛后方拥抱圣雅各像——这是每一个走完这条路的人都会做的事，无论信仰与否。",
            ].map((paragraph, index) => (
              <Reveal key={index} delay={index * 90}>
                <p className="text-[0.95rem] leading-[1.9] text-sand-50/70">
                  {paragraph}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 摄影：中文奢华市场感知性价比最高的增项。 */}
      <section className="mx-auto max-w-6xl px-4 py-28 sm:px-6 sm:py-36">
        <div className="grid gap-16 lg:grid-cols-2">
          <Reveal>
            <Eyebrow>关于记录</Eyebrow>
            <h2
              style={serif}
              className="mt-7 text-[1.9rem] leading-[1.4] text-sea-900 sm:text-[2.6rem]"
            >
              专业摄影师随行，不用再互相帮忙拍照。
            </h2>
            <p className="mt-8 text-[0.95rem] leading-[1.9] text-sea-900/70">
              我们在关键的几天安排专业摄影师同行：清晨薄雾里的石头村落、
              海岸线上的日落、抵达大教堂广场的那一刻。
              拍完当天修图，行程结束时交付全部原片与成片。
              你不必为了拍照停下来，也不必回来之后才发现没有一张像样的照片。
            </p>
          </Reveal>

          <div className="space-y-5 lg:pt-20">
            <Reveal delay={90}>
              <Panel>
                <h3 style={serif} className="text-lg text-sea-900">
                  住的地方本身就是画面。
                </h3>
                <p className="mt-3 text-[0.95rem] leading-[1.9] text-sea-900/70">
                  我们选的是国营古堡酒店 Parador（修道院、城堡改建）与加利西亚
                  pazo 庄园——西班牙最有辨识度的历史住宿体系。
                </p>
              </Panel>
            </Reveal>
            <Reveal delay={180}>
              <Panel>
                <h3 style={serif} className="text-lg text-sea-900">
                  终点住在大教堂正对面。
                </h3>
                <p className="mt-3 text-[0.95rem] leading-[1.9] text-sea-900/70">
                  圣地亚哥的 Parador 建于1499年，最初就是为朝圣者建的医院，
                  现在是全欧洲最古老的在营酒店之一。
                </p>
              </Panel>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 世界遗产 + 跨文化相遇。 */}
      <section className="border-y border-sand-200 bg-sand-100">
        <div className="mx-auto max-w-6xl px-4 py-28 sm:px-6 sm:py-36">
          <Reveal>
            <Eyebrow>为什么是这条路</Eyebrow>
            <h2
              style={serif}
              className="mt-7 max-w-3xl text-[1.9rem] leading-[1.4] text-sea-900 sm:text-[2.6rem]"
            >
              全世界只有两条被列入世界遗产的朝圣之路。
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-10 md:grid-cols-2">
            <Reveal delay={90}>
              <p className="text-[0.95rem] leading-[1.9] text-sea-900/70">
                圣地亚哥之路在1993年被联合国教科文组织列入世界文化遗产，
                也是欧洲委员会认定的第一条“欧洲文化线路”。
                一千两百年来，人们为各种各样的理由走上这条路，宗教只是其中之一。
              </p>
            </Reveal>
            <Reveal delay={180}>
              <p className="text-[0.95rem] leading-[1.9] text-sea-900/70">
                路上真正打动人的，往往不是风景，是人。
                一起走过一段的德国医生、刚退休的美国夫妇、请了三周假的韩国姑娘——
                大家在同一张桌子上吃饭，讲各自为什么出发。
                这种相遇在别的旅行里几乎不会发生。
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 美食。 */}
      <section className="mx-auto max-w-6xl px-4 py-28 sm:px-6 sm:py-36">
        <Reveal>
          <Eyebrow>关于吃</Eyebrow>
          <h2
            style={serif}
            className="mt-7 max-w-3xl text-[1.9rem] leading-[1.4] text-sea-900 sm:text-[2.6rem]"
          >
            加利西亚是西班牙人自己公认最会吃海鲜的地方。
          </h2>
        </Reveal>
        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {[
            "章鱼、鹅颈藤壶、扇贝、海螯虾，都是当天上岸的。口味清淡不辣，中国胃几乎没有适应问题。",
            "我们带你去的是当地人吃饭的地方，和几家米其林星级餐厅，不是发给朝圣者的固定套餐。",
            "也会安排一次 Albariño 白葡萄酒庄参观——这片产区的酒在国内不容易喝到。有中餐需求可以提前说，我们安排。",
          ].map((paragraph, index) => (
            <Reveal key={index} delay={index * 90}>
              <p className="text-[0.95rem] leading-[1.9] text-sea-900/70">
                {paragraph}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 路线。 */}
      <section id="routes" className="border-t border-sand-200 bg-sand-100">
        <div className="mx-auto max-w-6xl px-4 py-28 sm:px-6 sm:py-36">
          <Reveal>
            <Eyebrow>三条路线</Eyebrow>
            <h2
              style={serif}
              className="mt-7 max-w-3xl text-[1.9rem] leading-[1.4] text-sea-900 sm:text-[2.6rem]"
            >
              选择你的最后一百公里。
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {packages.map((pkg, index) => {
              const copy = PACKAGE_COPY[pkg.route];
              return (
                <Reveal key={pkg.id} delay={index * 90}>
                  <Panel className="h-full" as="article">
                    <Eyebrow>{ROUTE_LABELS_CN[pkg.route]}</Eyebrow>
                    <h3
                      style={serif}
                      className="mt-5 text-xl leading-[1.5] text-sea-900"
                    >
                      {copy.name}
                    </h3>
                    <p className="mt-4 flex-1 text-[0.95rem] leading-[1.9] text-sea-900/70">
                      {copy.blurb}
                    </p>
                    <dl className="mt-8 space-y-2 border-t border-sand-200 pt-5 text-sm text-sea-900/60">
                      <div className="flex justify-between">
                        <dt>出发点</dt>
                        <dd className="text-sea-900">{copy.from}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt>步行天数</dt>
                        <dd className="text-sea-900">{pkg.durationDays} 天</dd>
                      </div>
                    </dl>
                    <Link
                      href={`/cn/book?package=${pkg.id}`}
                      className="mt-7 w-fit border-b border-sea-700/40 pb-1 text-sm text-sea-700 transition-colors duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:border-sea-900 hover:text-sea-900"
                    >
                      咨询这条路线
                    </Link>
                  </Panel>
                </Reveal>
              );
            })}
          </div>

          <Reveal delay={120}>
            <p className="mt-12 max-w-2xl text-[0.95rem] leading-[1.9] text-sea-900/60">
              每一程都是按人数、日期和需求单独报价的私人行程，没有固定套餐价。
              我们会在你确认任何事情之前，给出一个明确的数字。
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-32 sm:px-6 sm:py-40">
        <Reveal>
          <h2
            style={serif}
            className="max-w-2xl text-[1.9rem] leading-[1.4] text-sea-900 sm:text-[2.6rem]"
          >
            告诉我们几个人、什么时候走。
          </h2>
          <p className="mt-6 max-w-xl text-[0.95rem] leading-[1.9] text-sea-900/70">
            留下信息后，我们会在24小时内用中文回复你，由真人回复，先问问题，不群发资料。
          </p>
          <div className="mt-10">
            <Cta href="/cn/book">预约咨询</Cta>
          </div>
        </Reveal>
      </section>

      <footer className="border-t border-sand-200 bg-sand-100">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-6 px-4 py-10 text-sm text-sea-900/50 sm:px-6">
          <Logo tagline="圣地亚哥朝圣之路" size="sm" />
          <div className="flex gap-7">
            <Link
              href="/us"
              className="transition-colors duration-500 hover:text-sea-700"
            >
              English
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
