import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import jwt from "jsonwebtoken"; 

const handler = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        try {
          process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
          const res = await fetch('https://localhost:7268/api/Auth/Login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              Email: credentials.username,
              Password: credentials.password 
            })
          });

          if (res.ok) {
            const user = await res.json();
            return user;
          } else {
            console.error("Fetch request failed with status:", res.status);
            return null;
          }
        } catch (error) {
          console.error("An error occurred:", error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: '/auth/login',
    error: '/auth/error'
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.expiration = user.expiration;
        token.refreshToken = user.refreshToken;
        token.jwtToken = user.accessToken; 
      }
      return token;
    },
    async session({ session, token }) {
  
      const decoded = jwt.decode(token.jwtToken);
console.log(decoded)
      session.user = {
        accessToken: token.accessToken,
        expiration: token.expiration,
        refreshToken: token.refreshToken,
        userId:decoded.Id,
        email: decoded.email, 
        role: decoded.role 
      };
      return session;
    },
  },
});

export { handler as GET, handler as POST };
