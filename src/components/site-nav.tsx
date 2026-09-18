"use client";

import Link from "next/link";
import { useState } from "react";
import { Logo } from "@/components/logo";

export type NavLink = { href: string; label: string };

// Isla flotante despegada del borde, no una barra pegada arriba.
export function SiteNav({
  links,
  cta,
  tagline,
}: {
  links: NavLink[];
  cta: NavLink;
  tagline: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="relative z-30 mx-auto mt-6 w-[calc(100%-2rem)] max-w-6xl px-0 sm:mt-8">
        <div className="flex items-center justify-between rounded-full bg-sea-900/25 py-2.5 pl-6 pr-2.5 ring-1 ring-sand-50/15 backdrop-blur-xl">
          <Link href="/" className="shrink-0">
            <Logo tagline={tagline} tone="light" size="sm" />
          </Link>

          <div className="hidden items-center gap-7 md:flex">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs uppercase tracking-[0.2em] text-sand-50/70 transition-colors duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:text-sand-50"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href={cta.href}
              className="rounded-full bg-sand-50 px-6 py-2.5 text-sm text-sea-900 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-white active:scale-[0.98]"
            >
              {cta.label}
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
            className="flex h-11 w-11 items-center justify-center rounded-full ring-1 ring-sand-50/20 md:hidden"
          >
            <span className="relative block h-3 w-4">
              <span
                className={`absolute left-0 block h-px w-4 bg-sand-50 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                  open ? "top-1.5 rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 block h-px w-4 bg-sand-50 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                  open ? "top-1.5 -rotate-45" : "top-3"
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Revelado a pantalla completa con entrada escalonada de los enlaces. */}
      <div
        className={`fixed inset-0 z-20 bg-sea-900/[0.97] backdrop-blur-3xl transition-opacity duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] md:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <nav className="flex h-full flex-col justify-center gap-8 px-8">
          {[...links, cta].map((link, index) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              style={{ transitionDelay: open ? `${120 + index * 60}ms` : "0ms" }}
              className={`font-serif text-3xl text-sand-50 transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                open ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}
