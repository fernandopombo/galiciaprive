import Link from "next/link";
import { Logo } from "@/components/logo";

export default function UsThankYouPage() {
  return (
    <main className="flex flex-1 items-center justify-center px-6 py-28">
      <div className="max-w-lg text-center">
        <Logo className="justify-center" tagline="Camino de Santiago" />
        <h1 className="mt-10 font-serif text-4xl leading-tight text-sea-900">
          It reached us.
        </h1>
        <p className="mt-5 text-[0.95rem] leading-relaxed text-sea-900/70">
          One of us will write to you within a day — a real message with real
          questions, not an automated brochure. If your dates are tight, say so in
          your reply and we will move faster.
        </p>
        <Link
          href="/us"
          className="mt-10 inline-block border-b border-sea-700 pb-1 text-sm text-sea-700 transition hover:border-sea-900 hover:text-sea-900"
        >
          Back to the beginning
        </Link>
      </div>
    </main>
  );
}
