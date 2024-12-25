import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers:[
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET, // Set this in your .env file
  callbacks: {
    async session({ session, token }) {
      // You can modify the session object here if needed
      session.user.id = token.sub; // Attach user ID to session
      return session;
    },
  },
})

export { handler as GET, handler as POST }