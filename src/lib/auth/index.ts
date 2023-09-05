import prisma from "@/server/prisma";
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  // Secret for Next-auth, without this JWT encryption/decryption won't work
  secret: process.env.NEXTAUTH_SECRET,

  // Configure one or more authentication providers
  //   pages: {
  //     signIn: "/auth/signin",
  //     signOut: "/auth/signout",
  //     error: "/auth/error", // Error code passed in query string as ?error=
  //     verifyRequest: "/auth/verify-request", // (used for check email message)
  //     newUser: "/auth/new-user", // New users will be directed here on first sign in (leave the property out if not of interest)
  //   },

  callbacks: {
    async signIn({ user }) {
      try {
        await prisma.user.upsert({
          where: {
            email: user.email ? user.email : "",
          },
          update: {
            ...user,
            email: user.email ? user.email : "",
          },
          create: {
            ...user,
            email: user.email ? user.email : "",
          },
        });
      } catch (error) {
        console.log(error);
        return false;
      }

      return true;
    },
  },

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
};
