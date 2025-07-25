// src/lib/auth.ts
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { client } from "@/lib/sanityClient";
import bcrypt from 'bcryptjs';

interface SanityUser {
    _id: string; name: string; email: string; password?: string; hasChangedInitialPassword?: boolean;
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: "Username", type: "text" },
        password: {  label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        if (!credentials?.username || !credentials.password) return null;
        
        const query = `*[_type == "staffMember" && email == $email][0]{ _id, name, email, password, hasChangedInitialPassword }`;
        const user: SanityUser = await client.fetch(query, { email: credentials.username });

        if (!user || !user.password) return null;
        
        const passwordsMatch = await bcrypt.compare(credentials.password, user.password);
        
        if (passwordsMatch) {
          return { 
            id: user._id, 
            name: user.name, 
            email: user.email,
            hasChangedInitialPassword: user.hasChangedInitialPassword 
          }
        }
        return null
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.hasChangedInitialPassword = (user as any).hasChangedInitialPassword;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).hasChangedInitialPassword = token.hasChangedInitialPassword;
      }
      return session;
    },
  },
  pages: { signIn: '/login' },
  session: { strategy: 'jwt' },
  secret: process.env.NEXTAUTH_SECRET,
};