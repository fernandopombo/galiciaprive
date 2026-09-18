import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { BookingForm, type BookingCopy } from "@/components/booking-form";
import { Logo } from "@/components/logo";

const serif = { fontFamily: "var(--font-noto-serif-sc), serif" } as const;

const copy: BookingCopy = {
  firstName: "名",
  lastName: "姓",
  email: "邮箱",
  phone: "手机 / 微信",
  country: "常住城市",
  market: "市场",
  marketOptions: {
    us: "美国",
    china: "中国",
    germany: "德国",
    other: "其他",
  },
  route: "想走哪条路线",
  date: "大致出发日期",
  format: "同行方式",
  formatOptions: {
    solo: "独自出发",
    couple: "两人同行",
    group: "小团（3人以上）",
  },
  pax: "人数",
  message: "这趟想走成什么样？（可以随便写）",
  submit: "提交咨询",
  submitting: "提交中…",
  disclaimer:
    "提交不产生任何费用，也不代表下单。我们会在24小时内用中文回复你，先了解需求，再给出具体行程和报价。",
  routeLabels: {
    FRANCES: "法国之路 · 萨里亚—圣地亚哥",
    PORTUGUES: "葡萄牙之路 · 图伊—圣地亚哥",
    PORTUGUES_COSTA: "葡萄牙海岸之路",
  },
  days: "天",
};

export default async function CnBookPage({
  searchParams,
}: PageProps<"/cn/book">) {
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
        <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-5">
          <Link href="/cn">
            <Logo tagline="圣地亚哥朝圣之路" />
          </Link>
        </div>
      </header>

      <section className="mx-auto max-w-3xl px-6 py-16">
        <h1 style={serif} className="text-3xl leading-[1.4] text-sea-900">
          预约咨询
        </h1>
        <p className="mt-5 max-w-xl text-[0.95rem] leading-[1.9] text-sea-900/70">
          留下信息，我们会在24小时内用中文联系你。
          不确定日期、不确定走哪条路都没关系，可以先聊。
        </p>

        <div className="mt-12 border-t border-sand-200 pt-10">
          <BookingForm
            packages={packages}
            defaultPackageId={preselected}
            locale="cn"
            fixedMarket="CHINA"
            copy={copy}
          />
        </div>
      </section>
    </main>
  );
}
