"use server";
import * as z from "zod";
import { LoginSchema } from "@/schemas";


export async function login(values: z.infer<typeof LoginSchema>) {
// LoginSchema.safeParse(values) checks if values match the LoginSchema format without throwing an error.
  const VailidatedFields = LoginSchema.safeParse(values)
  if(!VailidatedFields) {
    return {error:"Invalid Fields"}
  }
  return{success:"Successfully created"}
}
