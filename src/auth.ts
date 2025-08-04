import NextAuth from "next-auth";
import Discord from "next-auth/providers/discord";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Discord],
  callbacks: {
    authorized: async ({ auth }) => {
      return !!auth; // Allow access if user exists
    },
  },
});
