import { withAuth } from "next-auth/middleware"

export default withAuth({
  callbacks: {
    authorized({ req, token }) {
      if (req.nextUrl.pathname === "/panel") {
        return token?.userRole === "guildMember"
      }
      return !!token
    },
  },
})

export const config = {
  matcher: '/panel/:path*',
}