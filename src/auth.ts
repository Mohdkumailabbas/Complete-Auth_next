import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter"

import { db } from "./lib/db";
import { authConfig } from "./auth.config";
import { getUserById } from "@/app/auth/data/user";
import { UserRole } from "@prisma/client";
import { getTwoFactorConfirmationByUserId } from "./app/auth/data/two-factor-confirmation";

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages:{
    signIn:"/auth/login",
    error:"/auth/error" //if error it will be redirected
  },
   events:{
    async linkAccount({user}){
      await db.user.update({//updating so oauth user will verfiy email by there own
         where:{id:user.id},
        data:{emailVerified:new Date( )}
      })
    }
   },
  callbacks:{
    async signIn({user,account}){
      if(account?.provider !== "credentials") return true
      if (!user.id) {
        return false; // Prevent sign-in if user.id is not defined
      }
      
      const existingUser= await getUserById(user.id)
      //if 2fa enabled and token  not verified don't allow to login
    
      if(!existingUser?.emailVerified ) return false
       if( existingUser.isTwoFactorEnabled){
        const twoFactorConfirmation= await getTwoFactorConfirmationByUserId(existingUser.id)
         if(!twoFactorConfirmation) return false
        //  delte after confirmation
         await db.twoFactorConfirmation.delete({
          where:{id:twoFactorConfirmation.id}
        })
        }
     
      //todo 2FA
      return true
    },
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
    //ading isEnabled prop
    if(session.user){
      session.user.isTwoFactorEnabled=token.isTwoFactorEnabled as boolean
    }
    return session

   },
    async jwt({token}){
     if(!token.sub) return token;
     const existingUser=await getUserById(token.sub)
     if(!existingUser) return token
     token.role=existingUser.role//feteched user through id now add role to token
     token.isTwoFactorEnabled=existingUser.isTwoFactorEnabled//
     return token
   } 
  },
  adapter: PrismaAdapter(db),
  session:{strategy:"jwt"},
  ...authConfig,//providers are defined in auth-config
});
