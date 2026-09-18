import type { Metadata } from "next";
import { fraunces, geistMono, geistSans } from "@/lib/fonts";
import "../globals.css";

export const metadata: Metadata = {
  title: "Galicia Privé — Camino de Santiago",
  description:
    "Peregrinaciones privadas por el Camino de Santiago: Camino Francés, Camino Portugués y Camino Portugués da Costa.",
};

export default function EsLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-sand-50 text-sea-900">
        {children}
      </body>
    </html>
  );
}
