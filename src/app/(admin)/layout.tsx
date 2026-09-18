import type { Metadata } from "next";
import { geistMono, geistSans } from "@/lib/fonts";
import "../globals.css";

export const metadata: Metadata = {
  title: "CRM — Galicia Privé",
  description: "Gestión interna de reservas y clientes.",
};

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-stone-50 text-stone-900">
        {children}
      </body>
    </html>
  );
}
