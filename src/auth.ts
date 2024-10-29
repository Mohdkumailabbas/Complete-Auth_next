import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter"

import { db } from "./lib/db";
import { authConfig } from "./auth.config";
import { getUserById } from "@/app/auth/data/user";
import { UserRole } from "@prisma/client";

export const { handlers, signIn, signOut, auth } = NextAuth({
  callbacks:{
    // async signIn({user}){
    //   if (!user.id) return false;
    //   const existingUser= await getUserById(user.id)
    //   if(!existingUser || !existingUser.emailVerified ){
    //     return false
    //   }
    //     return true // Allow sign-in if conditions are met
    // },
    // Callbacks are asynchronous functions you can use to control what happens when an action is performed.
   async session({token,session}){
    // console.log({sessionToken:token})
    if(token.sub && session.user){
      session.user.id=token.sub
      //sendin token sub(id) in to session

    }
    if(token.role && session.user){
      session.user.role=token.role as UserRole //now role will be added to session
    }
    return session

   },
    async jwt({token}){
     if(!token.sub) return token;
     const existingUser=await getUserById(token.sub)
     if(!existingUser) return token
     token.role=existingUser.role//feteched user through id now add role to token
    return token
   } 
  },
  adapter: PrismaAdapter(db),
  session:{strategy:"jwt"},
  ...authConfig,//providers are defined in auth-config
});
