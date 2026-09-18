import type { Metadata } from "next";
import { fraunces, geistMono, geistSans } from "@/lib/fonts";
import "../globals.css";

export const metadata: Metadata = {
  title: "Galicia Privé — The Camino de Santiago, walked properly",
  description:
    "Private, guided journeys on the final stretch of the Camino de Santiago. Every kilometer on foot, a dedicated guide, historic paradores and pazos, and none of the logistics.",
};

export default function UsLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-sand-50 text-sea-900">
        {children}
      </body>
    </html>
  );
}
