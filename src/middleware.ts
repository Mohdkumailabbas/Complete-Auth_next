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
 
    //     // Skip API auth routes
  if(isApiAuthRoute){
    return;
  }
    // Handle authentication for auth routes
  if(isAuthRoute){
    if(isLoggedIn){
      return Response.redirect(new URL(defaultLoggedInRedirect,nextUrl))
    }
    
  }
  if(!isLoggedIn && !isPublicRoute){
    
    return Response.redirect(new URL('/auth/login', nextUrl));
  }
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




