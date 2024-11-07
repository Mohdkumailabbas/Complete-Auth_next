
import { UserRole } from "@prisma/client"
import * as z from "zod"
export const LoginSchema = z.object({
    email: z.string().email({
        message: "Email is required"
    }),
    password: z.string().min(1, {
        message: "Password is required"
    }),
    code:z.optional(z.string())
})
export const ResetSchema = z.object({
    email: z.string().email({
        message: "Email is required"
    })

})
export const NewPasswordSchema = z.object({
    password: z.string().min(6, {
        message: "Minimum password should be at least 6 characters"

    })
})
export const RegisterSchema = z.object({
    email: z.string().email({
        message: "Email is required"
    }),
    password: z.string().min(6, {
        message: "Minimum password should be at least 6 characters"
    }),
    name: z.string().min(2, {
        message: "Name is required and should be at least 2 characters long"
    })
})
export const SettingSchema =z.object({
    name:z.optional(z.string()),
    isTwoFactorEnabled:z.optional(z.boolean()),
    role:z.enum([UserRole.ADMIN,UserRole.USER]),
    email:z.optional(z.string()),
    password:z.optional(z.string().min(6)),
    newPassword:z.optional(z.string().min(6)),
})
.refine((data)=>{
    if(!data.password && data.newPassword){
        return false
    }
    return 
    
},{
    message:"Enter Current Password",
    path:["password"]
})
.refine((data)=>{
    if(data.password && !data.newPassword){
        return false
    }
    return 
    
},{
    message:"Please! Enter New Password",
    path:["newPassword"]
})