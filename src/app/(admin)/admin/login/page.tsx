import { LoginForm } from "./login-form";

export default function LoginPage() {
  return (
    <main className="flex flex-1 items-center justify-center px-6 py-24">
      <div className="w-full max-w-sm">
        <p className="text-center text-lg font-semibold tracking-[0.2em] text-stone-900">
          Galicia Privé
        </p>
        <h1 className="mt-2 text-center text-sm uppercase tracking-[0.2em] text-stone-500">
          CRM interno
        </h1>
        <div className="mt-8 rounded-2xl border border-stone-200 bg-white p-8">
          <LoginForm />
        </div>
      </div>
    </main>
  );
}
