import NextAuth from 'next-auth';
import DiscordProvider from 'next-auth/providers/discord';
import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI as string;
const MONGODB_DB = process.env.DB_NAME as string;

export default NextAuth({
  providers: [
    DiscordProvider({
      clientId: process.env.CLIENT_ID as string,
      clientSecret: process.env.CLIENT_SECRET as string,
      authorization: { params: { scope: 'identify guilds' } },
    }),
  ],
  pages: {
    signIn: '/signin',
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (account && user) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const response: any = await checkUserInDatabase(user.id);
        const userInGuild = await checkUserInGuild(
          account.access_token as string,
          process.env.GUILD_ID as string
        );

        return {
          user: { ...user, ...response.userData, userInGuild: userInGuild },
          ...token,
        };
      }
      return token;
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async session({ session, token }: any) {
      return {
        rank: token.user.rank,
        corps: token.user.corps,
        ...session,
      };
    },
  },

  secret: process.env.NEXTAUTH_SECRET as string,
  theme: { colorScheme: 'dark' },
});
type userData = {
  rank?: string;
  corps?: string;
  role?: string;
  accountActive?: boolean;
};
const checkUserInDatabase = async (userID: string) => {
  let newData: userData = {};
  let inDatabase = false;

  const client = new MongoClient(MONGODB_URI);
  try {
    await client.connect();
    const db = client.db(MONGODB_DB);

    const query = {
      userID: userID,
    };
    const options = {
      projection: { _id: 0 },
    };

    const userData = await db.collection('users').findOne(query, options);

    if (userData === null || !userData)
      return {
        inDatabase: inDatabase,
        userData: null,
      };

    newData = {
      rank: userData.rankData.rank,
      corps: userData.rankData.corps,
      role: userData.role,
      accountActive: userData.accountActive,
    };
    inDatabase = true;
  } catch (e) {
    console.log(e);
  } finally {
    await client.close();
  }

  return {
    inDatabase: inDatabase,
    userData: newData,
  };
};

type guildType = {
  id: string;
  name: string;
  icon: null | string;
  owner: boolean;
  permissions: string;
  features: Array<string>;
};

const checkUserInGuild = async (accesToken: string, guildID: string) => {
  const response = await fetch('https://discord.com/api/v10/users/@me/guilds', {
    method: 'GET',
    headers: { Authorization: `Bearer ${accesToken}` },
  });

  const array = await response.json();
  const guildExist = array.find((element: guildType) => element.id === guildID);

  if (!!guildExist) return true;

  return false;
};
