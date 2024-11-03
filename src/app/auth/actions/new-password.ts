"use server"
import * as z from "zod"
import { NewPasswordSchema } from "@/schemas"
import { getPasswordResetTokenByToken } from "@/app/auth/data/reset-password"
import { getUserByEmail } from "../data/user"
import bcrypt from "bcryptjs"
import { db } from "@/lib/db"

export const newPassword =async(values:z.infer<typeof NewPasswordSchema>,token?:string | null)=>{
    if(!token)return{error:"Token Missing"}
    const validatedField= NewPasswordSchema.safeParse(values)
    if(!validatedField.success) return {error:"Invalid Field"}
    const {password}=validatedField.data
    const existingToken= await getPasswordResetTokenByToken(token);
    if(!existingToken) return {error:"Invalid token "}
    const hasExpired=new Date(existingToken.expires)<new Date()
    if(hasExpired) return{error:"Token is expired"}
    const existingUser= await getUserByEmail(existingToken.email)
    if(!existingUser) return {error:"Email Does not Exists"}
     const hashPassword= await bcrypt.hash(password,10)
     await db.user.update({
        where:{id:existingUser.id},
        data:{password:hashPassword}
     })
     await db.passwordResetToken.delete({
        where:{id:existingToken.id}
     })
    return {success:"Password Updated!"} 
}