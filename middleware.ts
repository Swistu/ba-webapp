import { withAuth } from 'next-auth/middleware';
import { NextRequest } from 'next/server';

export default withAuth({
  callbacks: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    authorized({ req, token }: { req: NextRequest; token: any }) {
      if (req.nextUrl.pathname === '/panel') {
        return !!(token?.user?.role === 'member' && token?.user.accountActive);
      }
      return !!token;
    },
  },
});

export const config = {
  matcher: '/panel/:path*',
};
