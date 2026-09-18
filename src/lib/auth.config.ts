import type { NextAuthConfig } from "next-auth";

// Configuración compartida y segura para el Edge Runtime: no importa Prisma ni
// ningún módulo de Node. El proveedor de credenciales (que sí usa Prisma) se
// añade en auth.ts, que solo se ejecuta en el runtime de Node.
export const authConfig = {
  session: { strategy: "jwt" },
  pages: {
    signIn: "/admin/login",
  },
  providers: [],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
} satisfies NextAuthConfig;
