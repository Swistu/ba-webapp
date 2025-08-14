import NextAuth from "next-auth";
import Discord from "next-auth/providers/discord";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Discord],
  callbacks: {
    authorized: async ({ auth }) => {
      console.log("Auth callback:", auth);
      return !!auth; // Allow access if user exists
    },
    async session({ session, token }) {
      if (session.user && token.discordId) {
        session.user.discordId = token.discordId as string; // Attach user ID to session
        session.user.databaseUser = token.databaseUser; // Attach database user data to sessionw
      }
      return session;
    },
    async jwt({ token, user, profile }) {
      if (user && profile) {
        try {
          const response = await fetch(
            `http://backend-nestjs:3000/users/${profile.id}`
          );
          const databaseUser = await response.json();

          token.discordId = profile.id; // Store user ID in token
          token.databaseUser = databaseUser; // Store user data from database
        } catch (error) {
          console.error("Error fetching user from database:", error);
        }
      }
      return token;
    },
  },
});
