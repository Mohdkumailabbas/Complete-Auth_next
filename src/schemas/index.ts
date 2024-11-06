
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
    name:z.optional(z.string())
})