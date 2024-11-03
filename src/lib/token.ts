/* eslint-disable @typescript-eslint/no-unused-vars */
import { getVerficationTokenByEmail } from "@/app/auth/data/verificationToken";
import {v4 as uuidv4} from "uuid";
import { db } from "./db";
import { getPasswordResetTokenByEmail } from "@/app/auth/data/reset-password";
import crypto from "crypto"
import { getTwoFactorTokenByEmail } from "@/app/auth/data/two-factor-token";



export const generateVerificationToken=async(email:string)=>{
    const token =uuidv4()//enerates a new unique identifier using the uuidv4 function, which creates a universally unique identifier (UUID) in version 4 format
    const expires= new Date((new Date().getTime()+3600 *1000));

    const existingToken = await getVerficationTokenByEmail(email);
    if(existingToken){
        await db.verificationToken.delete({
            where:{
                id:existingToken.id
            }
        })
    }
    const verificationToken= await db.verificationToken.create({
        data:{
            email,
            token,
            expires
        }
    })
    return verificationToken;
}
export const generateTwoFactorToken = async(email:string)=>{
    const token =crypto.randomInt(100_000,1_000_000)
    // it generates a random integer between 100,000 (inclusive) and 1,000,000 (exclusive). This means the possible values for token will be in the range of 100,000 to 999,999.
     const expires=new Date(new Date().getTime()+3600*1000)

     const existingToken=await getTwoFactorTokenByEmail(email);
     if(existingToken){
        await db.twoFactorToken.delete({
            where:{id:existingToken.id}
        })
     }  
     const twoFactorToken= await db.twoFactorToken.create({
        data:{
            email,
            token:token.toString(),
            expires
        }
     })
     return twoFactorToken
}


export const generatePasswordResetToken=async(email:string)=>{
    const token=uuidv4()
    const expires =new Date((new Date().getTime()+3600*1000))
    
    const existingToken= await getPasswordResetTokenByEmail(email)
    if(existingToken){
        await db.passwordResetToken.delete({
            where:{id:existingToken.id}
        })
    }
    const passwordResetToken= await db.passwordResetToken.create({
        data:{
            email,
            token,
            expires
        }
    })
    return passwordResetToken
}