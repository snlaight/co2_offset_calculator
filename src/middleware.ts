import { authMiddleware, redirectToSignIn } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

export default authMiddleware({
  apiRoutes: ['/api/trpc(/.*)?'],
  publicRoutes: ['/', '/api/webhook', '/sign-in', '/sign-up'],
  afterAuth(auth, req) {
    if (auth.userId && auth.isPublicRoute) {
      const path = '/dashboard';

      const redirectPath = new URL(path, req.url);
      return NextResponse.redirect(redirectPath);
    }

    if (!auth.userId && !auth.isPublicRoute) {
      return redirectToSignIn({ returnBackUrl: req.url });
    }

    return null;
  },
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
