import { NextResponse } from "next/server";
import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";

const protectedRoutes = [
  '/',
  '/upcoming',
  '/meeting(.*)',
  '/previous',
  '/recordings',
  '/personal-room',
];

export default authMiddleware({
  afterAuth(auth, req, evt) {
    // Handle users who aren't authenticated and are trying to access a protected route
    if (!auth.userId && protectedRoutes.includes(req.nextUrl.pathname)) {
      return redirectToSignIn({ returnBackUrl: req.url });
    }
    // Redirect signed in users to organization selection page if they are not active in an organization
    
    // Allow users visiting public routes to access them
    return NextResponse.next();
  },
});


   
export const config = {
    matcher: [
      // Exclude files with a "." followed by an extension, which are typically static files.
      // Exclude files in the _next directory, which are Next.js internals.
      "/((?!.+\\.[\\w]+$|_next).*)",
      // Re-include any files in the api or trpc folders that might have an extension
      "/(api|trpc)(.*)"
    ]
};