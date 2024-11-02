"use server"
import { ResetSchema } from "@/schemas"
import { getUserByEmail } from "../data/user"
import * as z from"zod"


export const reset= async(values:z.infer<typeof ResetSchema>)=>{
    const vailidatedFields=ResetSchema.safeParse(values);
    if(!vailidatedFields.success){
        return{error:"Invalid Email"}
    }
    const {email}=vailidatedFields.data
    const existingUser= await getUserByEmail(email)
    if(!existingUser){
        return{error:"No account associated with this email"}
    }
    //Genrate token and send email
    return{success:"Email with reset details has been dispatched"}
}