import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import NextAuth, { Session, User } from "next-auth"
import DiscordProvider from 'next-auth/providers/discord'
import { getToken } from "next-auth/jwt"
import { MongoClient } from "mongodb"

const MONGODB_URI = process.env.MONGODB_URI as string;
const MONGODB_DB = process.env.DB_NAME as string;

interface customSession extends Session {
  rank: string
  corps: string
}

export default NextAuth({
  providers: [
    DiscordProvider({
      clientId: process.env.CLIENT_ID as string,
      clientSecret: process.env.CLIENT_SECRET as string,
      authorization: { params: { "scope": 'identify guilds' } }
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {

      if (account && user) {
        let userInDatabase = false;
        let userInGuild = false;

        const response = await checkUserInDatabase(user.id);
        userInGuild = await checkUserInGuild(account.access_token as string, process.env.GUILD_ID as string);
        userInDatabase = response.inDatabase;

        if (userInDatabase && userInGuild)
          token.userRole = "guildMember";

        return {
          user: { ...user, ...response.userData },
          ...token,
        }
      }
      return token;
    },
    async session({ session, token } : any) {
      return { 
        rank: token.user.rank,
        corps: token.user.corps,
        ...session 
      };
    }
  },

  secret: process.env.NEXTAUTH_SECRET as string,
  theme: { colorScheme: 'dark' }
})

const checkUserInDatabase = async (userID: string) => {
  let newData = new Object;
  let inDatabase = false;

  let client = new MongoClient(MONGODB_URI);
  try {
    await client.connect();
    let db = client.db(MONGODB_DB);

    const query = {
      "userID": userID
    }
    const options = {
      projection: { _id: 0 },
    };

    const userData = await db.collection('users').findOne(query, options);

    if (userData === null || !userData)
      return {
        inDatabase: inDatabase,
        userData: null
      };

    newData = {
      rank: userData.rankData.rank,
      corps: userData.rankData.corps
    };
    inDatabase = true;

  } catch (e) {
    console.log(e)
  } finally {
    await client.close();
  }

  return {
    inDatabase: inDatabase,
    userData: newData
  }
}

type guildType = {
  id: string,
  name: string,
  icon: null | string,
  owner: boolean,
  permissions: string,
  features: Array<String>
}

const checkUserInGuild = async (accesToken: string, guildID: string) => {
  const response = await fetch('https://discord.com/api/v10/users/@me/guilds', {
    method: 'GET',
    headers: { 'Authorization': `Bearer ${accesToken}` }
  })

  const array = await response.json();
  const guildExist = array.find((element: guildType) => element.id === guildID)

  if (!!guildExist)
    return true;

  return false;
}