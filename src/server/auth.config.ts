import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";

/**
 * Edge-compatible auth config.
 * This file should NOT import Prisma or any Node.js-specific libraries.
 * It's used by the middleware which runs on the Edge runtime.
 */
export const authConfig: NextAuthConfig = {
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/sign-in",
  },
  providers: [
    // Credentials provider is declared here for typing,
    // but the actual authorize logic is in auth.ts
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      // This authorize function is overridden in auth.ts
      authorize: () => null,
    }),
  ],
  callbacks: {
    authorized({ auth, request }) {
      // Redirect deactivated users to sign-out flow
      if (auth?.user?.deactivated) {
        return Response.redirect(new URL("/deactivated", request.url));
      }
      return !!auth?.user;
    },
  },
};
