import Credentials from 'next-auth/providers/credentials'; 
import { LoginSchema } from './schemas';
import bcrypt from 'bcryptjs';
 // import GitHub from "next-auth/providers/github"
import type { NextAuthConfig } from "next-auth"
import { getUserByEmail } from '@/app/auth/data/user';
 
export const authConfig:NextAuthConfig=
 { providers: [ 
    Credentials({
        async authorize(credentials){
            const validatedfields=LoginSchema.safeParse(credentials)
          if(validatedfields.success){
            const {email,password}=validatedfields.data
            const user =await getUserByEmail(email)
            if(!user || !user.password){
                return null
            }    
             const passwordMatch = await bcrypt.compare(
              password,
              user.password
             )
            if(passwordMatch) return user
          }
          return null
        }
        
    })
 ] } satisfies NextAuthConfig
