import { JWT } from 'next-auth/jwt';
import { formatError } from '@/lib/utils';
import GoogleProvider from 'next-auth/providers/google';
import type { NextAuthOptions, Session, User } from 'next-auth';
import credentialsProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
  providers: [
    credentialsProvider({
      id: 'credentials',
      name: 'credentials',
      type: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(
        credentials: Record<'email' | 'password', string> | undefined
      ): Promise<User | null> {
        if (!credentials) return null;
        const { email, password } = credentials;
        try {
          const response = await fetch('/api/v1/auth/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email,
              password,
            }),
          });
          const user = await response.json();
          return user;
        } catch (error) {
          throw formatError(error);
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
    }),
  ],
  pages: {
    signIn: '/signin',
    error: '/error',
  },
  jwt: {
    maxAge: 3600,
  },
  session: {
    strategy: 'jwt',
    maxAge: 3600,
  },
  callbacks: {
    async jwt({ token, user, profile, account }): Promise<JWT> {
      if (user) {
        token = {
          ...token,
          ...user,
          ...account,
          ...profile,
        };
      }
      return Promise.resolve(token);
    },
    async session({
      session,
      token,
    }: {
      session: Session;
      token: JWT;
    }): Promise<Session> {
      if (token) {
        session = {
          ...session,
          ...token,
        };
      }
      session.provider = token.provider;
      session.id = token.jti ?? token.id;
      session.accessToken =
        token.type === 'oauth' ? token.id_token : token.accessToken;

      return Promise.resolve(session);
    },
  },
};
