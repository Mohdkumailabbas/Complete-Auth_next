"use server";
import * as z from "zod";
import { RegisterSchema } from "@/schemas";


export async function register(values: z.infer<typeof RegisterSchema>) {
// RegisterSchema.safeParse(values) checks if values match the RegisterSchema format without throwing an error.
  const VailidatedFields = RegisterSchema.safeParse(values)
  if(!VailidatedFields) {
    return {error:"Invalid Fields"}
  }
  return{success:"Successfully created"}
}
