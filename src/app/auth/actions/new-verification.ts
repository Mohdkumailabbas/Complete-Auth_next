"use server"
import { db } from "@/lib/db"
import { getVerficationTokenByToken } from "@/app/auth/data/verificationToken"
import { getUserByEmail } from "../data/user"


export const newVerification=async(token:string)=>{
    const existingToken = await getVerficationTokenByToken(token);
    if(!existingToken){
        return {error:"Token Does not exist"}
    }
    const hasExpired= new Date(existingToken.expires) < new Date();
    if(hasExpired){
        return {error:"Token is Expired "}

    }
    const existingUser= await getUserByEmail(existingToken.email)
    if(!existingUser){
        return {error:"Email Does Not Exists"}
    }
    await db.user.update({
        where:{
            id:existingUser.id
        },
        data:{
            emailVerified: new Date(),
            email:existingToken.email
        }
    })
    await db.verificationToken.delete({
        where:{id:existingToken.id}
    })
    return{success:"Email Verified!"}
}