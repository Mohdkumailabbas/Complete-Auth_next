"use server";
import * as z from "zod";
import { LoginSchema } from "@/schemas";

export async function login(values: z.infer<typeof LoginSchema>) {
  console.log(values);
}
