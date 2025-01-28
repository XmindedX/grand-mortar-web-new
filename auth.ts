import NextAuth, { User } from "next-auth"
import Google from "next-auth/providers/google"

import CredentialsProvider from "next-auth/providers/credentials"
import { compare } from "bcryptjs"
import { db } from "./database/drizzle"
import { users } from "./database/schema"
import { eq } from "drizzle-orm"
 
export const { handlers, auth, signIn, signOut } = NextAuth({
  // Configure one or more authentication providers
  session: {
    strategy: "jwt",
  },

  providers: [
    CredentialsProvider({
        async authorize(credentials) {
            if (!credentials?.email || !credentials.password) {
                return null
            }
            const user = await db
                .select()
                .from(users)
                .where(eq(users.email, credentials.email.toString()))
                .limit(1)
            if(user.length === 0) {
                return null;
            }

            const isPasswordValid = await compare(credentials.password.toString(), user[0].password,
            );

            if (!isPasswordValid) {
                return null;
            }
            return {
                id: user[0].id,
                email: user[0].email,
                name: user[0].name,
                role: user[0].role,
            } as User;
        }
    })
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
      }
      return session
    },
  },
})