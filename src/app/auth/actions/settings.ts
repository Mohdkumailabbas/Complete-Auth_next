/* eslint-disable @typescript-eslint/no-unused-expressions */
"use server"
import bcrypt from "bcryptjs"
import { CurrentUser } from "@/lib/auth"
import { SettingSchema } from "@/schemas"
import { z } from "zod"
import { getUserByEmail, getUserById } from "@/app/auth/data/user"
import { db } from "@/lib/db"
import { generateVerificationToken } from "@/lib/token"
import { sendVerificationEmail } from "@/lib/mail"

export const settings = async (values: z.infer<typeof SettingSchema>) => {
    const user = await CurrentUser()
    if (!user || !user.id)
        return { error: "Access Restricted" }
    const databaseUser = await getUserById(user.id)
    if(user.isOAuth){
        values.email=undefined,
        values.isTwoFactorEnabled=undefined,
        values.password=undefined,
        values.newPassword=undefined
    }
    if(values.email && values.email !==user.email){
        const existingUser=await getUserByEmail(values.email)
        if(existingUser && existingUser.id !== user.id){
            return{error:"Email Already in Use"}
        }
        //now send verification E-mail
        const verificationToken= await generateVerificationToken(values.email)
        await sendVerificationEmail(
            verificationToken.email,
            verificationToken.token
        )
        return{success:"Verification Email Sent!"}
    }

    if(values.password && values.newPassword && databaseUser?.password){
       const passwordMatch=await bcrypt.compare(
        values.password,
        databaseUser.password
       )
       if(!passwordMatch) return{error:"Incorrect password!"}
       const hashedPassword=await bcrypt.hash(
           values.newPassword,
            10
       );
        values.password=hashedPassword
        values.newPassword=undefined
    }
    await db.user.update({
        where: { id: databaseUser?.id },
        data: {
            ...values,
        }
    })
    return{success:"Settings Updated"}
}