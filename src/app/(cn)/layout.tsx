import type { Metadata } from "next";
import { notoSansSC, notoSerifSC } from "@/lib/fonts";
import "../globals.css";

export const metadata: Metadata = {
  title: "Galicia Privé — 圣地亚哥朝圣之路 · 私人定制",
  description:
    "西班牙加利西亚原生团队打造的朝圣之路私人旅程：中文向导全程陪同、历史古堡酒店、专业摄影随行，走完最后100公里，领取朝圣者证书。",
};

export default function CnLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="zh-Hans"
      className={`${notoSansSC.variable} ${notoSerifSC.variable} h-full antialiased`}
    >
      <body
        className="min-h-full flex flex-col bg-sand-50 text-sea-900"
        style={{ fontFamily: "var(--font-noto-sans-sc), system-ui, sans-serif" }}
      >
        {children}
      </body>
    </html>
  );
}
