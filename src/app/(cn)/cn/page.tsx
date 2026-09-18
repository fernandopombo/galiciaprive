import { connection } from "next/server";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { LogoMark } from "@/components/logo";

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
    <section className="mx-auto max-w-5xl px-6 py-20">
      <p className="text-[0.7rem] tracking-[0.3em] text-field-700">{eyebrow}</p>
      <h2
        style={serif}
        className="mt-5 max-w-2xl text-3xl leading-[1.35] text-sea-900 sm:text-4xl"
      >
        {title}
      </h2>
      <div className="mt-8">{children}</div>
    </section>
  );
}

export default async function CnHomePage() {
  await connection();

  const packages = await prisma.package.findMany({
    where: { active: true },
    orderBy: { name: "asc" },
  });

  return (
    <main className="flex-1">
      <header className="border-b border-sand-200 bg-sand-50/90 backdrop-blur-sm">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
          <span className="inline-flex items-center gap-3">
            <LogoMark className="h-8 w-8" />
            <span className="flex flex-col leading-none">
              <span
                style={serif}
                className="text-[0.95rem] tracking-[0.18em] text-sea-700"
              >
                GALICIA PRIVÉ
              </span>
              <span className="mt-1.5 text-[0.65rem] tracking-[0.25em] text-field-700">
                圣地亚哥朝圣之路
              </span>
            </span>
          </span>
          <div className="flex items-center gap-6">
            <Link
              href="/us"
              className="hidden text-xs tracking-[0.2em] text-sea-700/60 transition hover:text-sea-700 sm:block"
            >
              EN
            </Link>
            <Link
              href="/cn/book"
              className="rounded-full bg-sea-700 px-6 py-2.5 text-sm text-white transition hover:bg-sea-900"
            >
              预约咨询
            </Link>
          </div>
        </div>
      </header>

      {/* 治愈 / 与自我对话：中文市场已验证的叙事框架，而非宗教框架。 */}
      <section className="relative overflow-hidden grain">
        <div className="mx-auto max-w-5xl px-6 pt-24 pb-20">
          <p className="text-[0.7rem] tracking-[0.3em] text-field-700">
            西班牙 · 加利西亚
          </p>
          <h1
            style={serif}
            className="mt-7 max-w-3xl text-[2.5rem] leading-[1.3] text-sea-900 sm:text-[3.5rem]"
          >
            用一百公里，
            <br />
            和自己好好说一次话。
          </h1>
          <p className="mt-8 max-w-xl text-[1.05rem] leading-[1.9] text-sea-900/70">
            没有赶路，没有打卡清单，没有需要你操心的任何事。
            中文向导全程陪同，行李有人搬，餐厅有人订，语言有人讲——
            你只需要走路、看海、把这段时间还给自己。
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-5">
            <Link
              href="/cn/book"
              className="rounded-full bg-sea-700 px-8 py-3.5 text-sm text-white transition hover:bg-sea-900"
            >
              预约咨询
            </Link>
            <span className="text-sm text-sea-900/50">
              5–7 天 · 2–8 人小团或私人定制 · 全程中文
            </span>
          </div>
        </div>
      </section>

      {/* 安全感：中文市场最大的实际顾虑，必须正面回应。 */}
      <div className="border-y border-sand-200 bg-sand-100">
        <Section eyebrow="关于安全" title="你担心的西班牙，和这条路上的西班牙，不是一回事。">
          <div className="grid gap-10 md:grid-cols-3">
            <p className="text-[0.95rem] leading-[1.9] text-sea-900/70">
              新闻里的治安问题集中在马德里、巴塞罗那的旅游热点区域。
              朝圣之路走的是加利西亚的乡村和小镇——几百人的村子，
              居民世代在此生活，路上遇到的是来自世界各地的徒步者。
            </p>
            <p className="text-[0.95rem] leading-[1.9] text-sea-900/70">
              全程私人专车点对点接送，不需要搭乘公共交通、不需要自己拖行李、
              不需要在陌生的城市街头找路。向导从接机到送机始终与你同行。
            </p>
            <p className="text-[0.95rem] leading-[1.9] text-sea-900/70">
              24 小时中文应急联络，随时可以找到人。
              医疗、保险、突发状况，由我们处理，不需要你用外语和任何人交涉。
            </p>
          </div>
        </Section>
      </div>

      {/* 体力顾虑：市场内容已把 Sarria/Tui 验证为合理入门。 */}
      <Section eyebrow="关于体力" title="这不是一场徒步挑战赛。">
        <div className="grid gap-12 md:grid-cols-2">
          <div className="space-y-5 text-[0.95rem] leading-[1.9] text-sea-900/70">
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
          <dl className="space-y-6 border-l border-sand-200 pl-8">
            <div>
              <dt style={serif} className="text-lg text-sea-900">
                每天 15–20 公里
              </dt>
              <dd className="mt-1.5 text-[0.95rem] leading-[1.9] text-sea-900/70">
                上午走路，下午休息。不是从早赶到晚的行程。
              </dd>
            </div>
            <div>
              <dt style={serif} className="text-lg text-sea-900">
                随行车辆全程跟随
              </dt>
              <dd className="mt-1.5 text-[0.95rem] leading-[1.9] text-sea-900/70">
                车在，选择权就在你手里。
              </dd>
            </div>
            <div>
              <dt style={serif} className="text-lg text-sea-900">
                双人/闺蜜同行最受欢迎
              </dt>
              <dd className="mt-1.5 text-[0.95rem] leading-[1.9] text-sea-900/70">
                也可以独自出发——向导全程在身边，不会让你一个人应付任何事。
              </dd>
            </div>
          </dl>
        </div>
      </Section>

      {/* 朝圣护照与证书：已被验证为"成就感 + 内容"的核心。 */}
      <div className="border-y border-sand-200 bg-sea-900 text-sand-50">
        <section className="mx-auto max-w-5xl px-6 py-20">
          <p className="text-[0.7rem] tracking-[0.3em] text-field-500">
            朝圣护照 · 证书
          </p>
          <h2
            style={serif}
            className="mt-5 max-w-2xl text-3xl leading-[1.35] sm:text-4xl"
          >
            每天一枚印章，最后换一张写着你名字的证书。
          </h2>
          <div className="mt-8 grid gap-10 md:grid-cols-3">
            <p className="text-[0.95rem] leading-[1.9] text-sand-50/70">
              出发时你会拿到一本朝圣护照。沿途的教堂、酒馆、老修道院都有自己的印章，
              盖满这本护照是这段路上每天的小仪式，也是最好记录的画面。
            </p>
            <p className="text-[0.95rem] leading-[1.9] text-sand-50/70">
              步行满100公里，就可以在圣地亚哥的朝圣者办公室领取官方证书 Compostela，
              上面用拉丁文写着你的名字。这是九百年来没有变过的规矩。
            </p>
            <p className="text-[0.95rem] leading-[1.9] text-sand-50/70">
              终点在大教堂。可以登上祭坛后方拥抱圣雅各像——
              这是每一个走完这条路的人都会做的事，无论信仰与否。
            </p>
          </div>
        </section>
      </div>

      {/* 摄影：中文奢华市场感知性价比最高的增项。 */}
      <Section eyebrow="关于记录" title="专业摄影师随行，不用再互相帮忙拍照。">
        <div className="grid gap-12 md:grid-cols-2">
          <p className="text-[0.95rem] leading-[1.9] text-sea-900/70">
            我们在关键的几天安排专业摄影师同行：清晨薄雾里的石头村落、
            海岸线上的日落、抵达大教堂广场的那一刻。
            拍完当天修图，行程结束时交付全部原片与成片。
            你不必为了拍照停下来，也不必回来之后才发现没有一张像样的照片。
          </p>
          <div className="space-y-5 text-[0.95rem] leading-[1.9] text-sea-900/70">
            <p>
              <span style={serif} className="text-lg text-sea-900">
                住的地方本身就是画面。
              </span>{" "}
              我们选的是国营古堡酒店 Parador（修道院、城堡改建）与加利西亚
              pazo 庄园——西班牙最有辨识度的历史住宿体系。
            </p>
            <p>
              <span style={serif} className="text-lg text-sea-900">
                终点住在大教堂正对面。
              </span>{" "}
              圣地亚哥的 Parador 建于1499年，最初就是为朝圣者建的医院，
              现在是全欧洲最古老的在营酒店之一。
            </p>
          </div>
        </div>
      </Section>

      {/* 世界遗产 + 跨文化相遇：两个已验证的情绪价值点。 */}
      <div className="border-y border-sand-200 bg-sand-100">
        <Section eyebrow="为什么是这条路" title="全世界只有两条被列入世界遗产的朝圣之路。">
          <div className="grid gap-10 md:grid-cols-2">
            <p className="text-[0.95rem] leading-[1.9] text-sea-900/70">
              圣地亚哥之路在1993年被联合国教科文组织列入世界文化遗产，
              也是欧洲委员会认定的第一条"欧洲文化线路"。
              一千两百年来，人们为各种各样的理由走上这条路，宗教只是其中之一。
            </p>
            <p className="text-[0.95rem] leading-[1.9] text-sea-900/70">
              路上真正打动人的，往往不是风景，是人。
              一起走过一段的德国医生、刚退休的美国夫妇、请了三周假的韩国姑娘——
              大家在同一张桌子上吃饭，讲各自为什么出发。
              这种相遇在别的旅行里几乎不会发生。
            </p>
          </div>
        </Section>
      </div>

      {/* 美食：中文市场对西班牙菜的接受度高于预期，正面讲。 */}
      <Section eyebrow="关于吃" title="加利西亚是西班牙人自己公认最会吃海鲜的地方。">
        <div className="grid gap-10 md:grid-cols-3">
          <p className="text-[0.95rem] leading-[1.9] text-sea-900/70">
            章鱼、鹅颈藤壶、扇贝、海螯虾，都是当天上岸的。
            口味清淡不辣，中国胃几乎没有适应问题。
          </p>
          <p className="text-[0.95rem] leading-[1.9] text-sea-900/70">
            我们带你去的是当地人吃饭的地方，和几家米其林星级餐厅，
            不是发给朝圣者的固定套餐。
          </p>
          <p className="text-[0.95rem] leading-[1.9] text-sea-900/70">
            也会安排一次 Albariño 白葡萄酒庄参观——
            这片产区的酒在国内不容易喝到。有中餐需求可以提前说，我们安排。
          </p>
        </div>
      </Section>

      {/* 路线。 */}
      <div className="border-t border-sand-200 bg-sand-100">
        <Section eyebrow="三条路线" title="选择你的最后一百公里。">
          <div className="grid gap-6 md:grid-cols-3">
            {packages.map((pkg) => {
              const copy = PACKAGE_COPY[pkg.route];
              return (
                <article
                  key={pkg.id}
                  className="flex flex-col rounded-sm border border-sand-200 bg-sand-50 p-7"
                >
                  <p className="text-[0.65rem] tracking-[0.25em] text-field-700">
                    {ROUTE_LABELS_CN[pkg.route]}
                  </p>
                  <h3
                    style={serif}
                    className="mt-4 text-xl leading-[1.5] text-sea-900"
                  >
                    {copy.name}
                  </h3>
                  <p className="mt-4 flex-1 text-[0.95rem] leading-[1.9] text-sea-900/70">
                    {copy.blurb}
                  </p>
                  <dl className="mt-7 space-y-2 border-t border-sand-200 pt-5 text-sm text-sea-900/60">
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
                    className="mt-7 border-b border-sea-700 pb-1 text-sm text-sea-700 transition hover:border-sea-900 hover:text-sea-900"
                  >
                    咨询这条路线
                  </Link>
                </article>
              );
            })}
          </div>
          <p className="mt-10 max-w-2xl text-[0.95rem] leading-[1.9] text-sea-900/60">
            每一程都是按人数、日期和需求单独报价的私人行程，没有固定套餐价。
            我们会在你确认任何事情之前，给出一个明确的数字。
          </p>
        </Section>
      </div>

      <section className="mx-auto max-w-5xl px-6 py-24">
        <h2
          style={serif}
          className="max-w-2xl text-3xl leading-[1.35] text-sea-900 sm:text-4xl"
        >
          告诉我们几个人、什么时候走。
        </h2>
        <p className="mt-5 max-w-xl text-[0.95rem] leading-[1.9] text-sea-900/70">
          留下信息后，我们会在24小时内用中文回复你，由真人回复，先问问题，不群发资料。
        </p>
        <Link
          href="/cn/book"
          className="mt-9 inline-block rounded-full bg-sea-700 px-8 py-3.5 text-sm text-white transition hover:bg-sea-900"
        >
          预约咨询
        </Link>
      </section>

      <footer className="border-t border-sand-200 bg-sand-100">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 px-6 py-8 text-sm text-sea-900/50">
          <span className="inline-flex items-center gap-3">
            <LogoMark className="h-7 w-7" />
            <span style={serif} className="tracking-[0.18em] text-sea-700">
              GALICIA PRIVÉ
            </span>
          </span>
          <div className="flex gap-6">
            <Link href="/us" className="transition hover:text-sea-700">
              English
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
