import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";

const handler = NextAuth({
  providers: [
    // manually
    CredentialsProvider({
      name: "Email",
      credentials: {
        email: { label: "email", type: "text", placeholder: "user@gmail.com" },
        password: { label: "password", type: "text", placeholder: "****" },
      },
      async authorize(credentials, req) {
        const email = credentials?.email;
        const password = credentials?.password;

        const user = {
          name: "user",
          id: "43jd",
          email: email,
          password: password,
        };
        if (user) {
          return user;
        } else {
          return null;
        }
      },
    }),

    // by google
    GoogleProvider({
      clientId: "ads",
      clientSecret: "ads",
    }),
    // by github
    GithubProvider({
      clientId: "ads",
      clientSecret: "ads",
    }),
  ],
  secret:process.env.NEXTAUTH_SECRET
});

export { handler as GET, handler as POST };
