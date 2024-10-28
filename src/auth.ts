import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter"

import { db } from "./lib/db";
import { authConfig } from "./auth.config";

export const { handlers, signIn, signOut, auth } = NextAuth({
  callbacks:{
    // Callbacks are asynchronous functions you can use to control what happens when an action is performed.
   async session({token,session}){
    console.log({sessionToken:token, session})
    if(token.sub && session.user){
      session.user.id=token.sub//sendin token sub(id) in to session
    }
    return session

   },
    async jwt({token}){
    console.log({token})
    token.customFiled="test"
    return token
   } 
  },
  adapter: PrismaAdapter(db),
  session:{strategy:"jwt"},
  ...authConfig,//providers are defined in auth-config
});
