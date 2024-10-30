/* eslint-disable @typescript-eslint/no-unused-vars */
import { db } from "@/lib/db";

export const getVerficationTokenByToken=async(token:string)=>{
    try {
        const verificationToken = await db.verificationToken.findUnique({
            where:{token}
        })
        return verificationToken
    } catch (error) {
       return  
    }
}


export const getVerficationTokenByEmail=async(email:string)=>{
    try {
        const verificationToken = await db.verificationToken.findFirst({
            where:{email}
        })
        return verificationToken
    } catch (error) {
       return  
    }
}
//asynchronous function getVerificationTokenByEmail that retrieves a verification token record from the database based on a given email address.