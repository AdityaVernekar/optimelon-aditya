import { withAuth } from "next-auth/middleware";

export default withAuth({
  // You can specify paths to protect
  pages: {
    signIn: "/login",  // Redirect to login page if the user is not authenticated
  },
  secret: process.env.NEXTAUTH_SECRET,
  // Optionally, specify the matcher to protect specific paths (if needed)
  matcher: ["/"], // Protect specific paths
});
