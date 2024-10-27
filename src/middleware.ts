// import { authConfig } from "./auth.config";
import { authConfig } from "./auth.config";
import NextAuth from "next-auth"
import {
  publicRoutes,
  defaultLoggedInRedirect,
  apiAuthPrefix,
  authRoutes
} from "@/routes"
const { auth } = NextAuth(authConfig)//destructind auth
export default auth((req) => {
  const { nextUrl } = req
  const isLoggedIn = !!req.auth

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname)
  const isAuthRoute = authRoutes.includes(nextUrl.pathname)
  console.log("Request URL:", nextUrl.pathname);
  console.log("Is Logged In:", isLoggedIn);
  console.log("Is API Auth Route:", isApiAuthRoute);
  console.log("Is Public Route:", isPublicRoute);
  console.log("Is Auth Route:", isAuthRoute);
    //     // Skip API auth routes
  if(isApiAuthRoute){
    return;
  }
    // Handle authentication for auth routes
  if(isAuthRoute){
    if(isLoggedIn){
      console.log("Redirecting to default logged in redirect:", defaultLoggedInRedirect);
      return Response.redirect(new URL(defaultLoggedInRedirect,nextUrl))
    }
    
  }
  if(!isLoggedIn && !isPublicRoute){
    console.log("Redirecting to login page.")
    return Response.redirect(new URL("/auth/login",nextUrl))
  }
  console.log("Access granted, no redirection.");
  return
})


// Specify the paths to apply this middleware
export const config = {
  matcher: [

    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};




