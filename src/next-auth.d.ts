/* eslint-disable @typescript-eslint/no-explicit-any */
import { DefaultSession } from "next-auth";

// This module augmentation extends the User, Session, and JWT types
// with your custom properties.
declare module "next-auth" {
  interface Session {
    user: {
      // Add your custom properties here
      databaseUser?: any; // The property you're trying to access
      discordId?: string;
    } & DefaultSession["user"];
  }

  interface User {
    // Extend the User type to include your custom properties
    // This is useful if you're using a database adapter
    databaseUser?: any;
    discordId?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    // Extend the JWT type to include your custom properties
    // This is where you would store the data from your `jwt` callback
    discordId?: string;
  }
}
