import { auth } from "../auth";

export default auth((req) => {
  console.log("Middleware invoked");
  console.log("Request object:", req); // Log the entire request object to check properties
  console.log("Route:", req.nextUrl.pathname);
});

// Specify the paths to apply this middleware
export const config = {
  matcher: [
   
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
