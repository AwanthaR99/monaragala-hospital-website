import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const pathname = req.nextUrl.pathname;

    if (token?.hasChangedInitialPassword === false) {
      if (pathname.startsWith('/staff') && pathname !== '/staff/change-password') {
        return NextResponse.redirect(new URL('/staff/change-password', req.url));
      }
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: ["/staff/:path*"],
};