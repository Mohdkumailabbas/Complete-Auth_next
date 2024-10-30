"use server";
import * as z from "zod";
import { LoginSchema } from "@/schemas";
import { signIn } from "@/auth";
import { defaultLoggedInRedirect } from "@/routes";
import { AuthError } from "next-auth";
import { getUserByEmail } from "../data/user";

import { generateVerificationToken } from "@/lib/token";
import { sendVerificationEmail } from "@/lib/mail";


export async function login(values: z.infer<typeof LoginSchema>) {
// LoginSchema.safeParse(values) checks if values match the LoginSchema format without throwing an error.
  const VailidatedFields = LoginSchema.safeParse(values)
  if(!VailidatedFields.success) {
    return {error:"Invalid Fields"}
  }
  const {email ,password} =VailidatedFields.data;
  const existingUser = await getUserByEmail(email);
  if(!existingUser || !existingUser.email || !existingUser.password){
    return {error:"Email does not exist"}
  }
  if(!existingUser.emailVerified){
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const verficationToken = await generateVerificationToken(existingUser.email)
    await sendVerificationEmail(
     verficationToken.email,
     verficationToken.token  
    )
    return{success:"Confirmation email sent"} //returning if email is not verified
  }

  try {
    await signIn("credentials",{
      email,
      password,
      redirectTo:defaultLoggedInRedirect
    })
  } catch (error) {
    if(error instanceof AuthError){
      switch(error.type){
        case "CredentialsSignin":
        return{error:"Invalid credentials"}
        default:
        return{error:"something went wrong"}
      }
    }
    throw error;
  }
}
