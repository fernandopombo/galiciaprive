import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { logout } from "@/app/actions/auth";

const navItems = [
  { href: "/admin", label: "Panel" },
  { href: "/admin/reservas", label: "Reservas" },
  { href: "/admin/clientes", label: "Clientes" },
  { href: "/admin/comunicaciones", label: "Comunicaciones" },
  { href: "/admin/paquetes", label: "Paquetes" },
];

export default async function CrmLayout({ children }: LayoutProps<"/admin">) {
  const session = await auth();
  if (!session?.user) redirect("/admin/login");

  return (
    <div className="flex min-h-screen flex-1 flex-col">
      <header className="border-b border-stone-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-6 px-6 py-4">
          <Link
            href="/admin"
            className="text-base font-semibold tracking-[0.2em] text-stone-900"
          >
            ULTRAVIP
          </Link>
          <nav className="flex flex-wrap gap-5 text-sm text-stone-600">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="transition hover:text-stone-900"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="ml-auto flex items-center gap-4 text-sm text-stone-500">
            <span>{session.user.email}</span>
            <form action={logout}>
              <button
                type="submit"
                className="rounded-full border border-stone-300 px-3 py-1 transition hover:border-stone-900 hover:text-stone-900"
              >
                Salir
              </button>
            </form>
          </div>
        </div>
      </header>
      <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-10">{children}</main>
    </div>
  );
}
