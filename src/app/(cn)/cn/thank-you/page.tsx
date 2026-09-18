import Link from "next/link";
import { Logo } from "@/components/logo";

const serif = { fontFamily: "var(--font-noto-serif-sc), serif" } as const;

export default function CnThankYouPage() {
  return (
    <main className="flex flex-1 items-center justify-center px-6 py-28">
      <div className="max-w-lg text-center">
        <Logo className="items-center" tagline="圣地亚哥朝圣之路" />
        <h1 style={serif} className="mt-10 text-3xl leading-[1.4] text-sea-900">
          已经收到了
        </h1>
        <p className="mt-5 text-[0.95rem] leading-[1.9] text-sea-900/70">
          我们会在24小时内用中文回复你，由真人回复。
          如果你的日期比较紧，回信时说一声，我们会优先处理。
        </p>
        <Link
          href="/cn"
          className="mt-10 inline-block border-b border-sea-700 pb-1 text-sm text-sea-700 transition hover:border-sea-900 hover:text-sea-900"
        >
          返回首页
        </Link>
      </div>
    </main>
  );
}
