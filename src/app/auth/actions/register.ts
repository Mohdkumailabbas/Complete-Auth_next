"use server";
import * as z from "zod";
import { RegisterSchema } from "@/schemas";
import bcrypt from "bcrypt";
import { db } from "@/lib/db";
import { getUserByEmail } from "../data/user";

export async function register(values: z.infer<typeof RegisterSchema>) {
  // Validate the fields using safeParse
  const VailidatedFields = RegisterSchema.safeParse(values);
  
  if (!VailidatedFields.success) {  // Check if parsing succeeded
    return { error: "Invalid Fields" };
  }

  const { name, email, password } = VailidatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  // Check if user already exists before creating a new user
  const existingUser = await getUserByEmail(email)

  if (existingUser) {
    return { error: "Email already in use" }; // Return and stop execution
  }

  // Create the user only if the email is not in use
  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  // TODO: send verification email
  return { success: "Email Sent" };
}
