"use server";
import * as z from "zod";
import { LoginSchema } from "@/schemas";
import { signIn } from "@/auth";
// import { defaultLoggedInRedirect } from "@/routes";
import { AuthError } from "next-auth";
import { getUserByEmail } from "@/app/auth/data/user";
import { generateTwoFactorToken, generateVerificationToken } from "@/lib/token";
import { sendTwoFactorTokenEmail, sendVerificationEmail } from "@/lib/mail";
import { getTwoFactorTokenByEmail } from "@/app/auth/data/two-factor-token";
import { db } from "@/lib/db";
import { getTwoFactorConfirmationByUserId } from "@/app/auth/data/two-factor-confirmation";

export async function login(values: z.infer<typeof LoginSchema>,
  callbacksUrl?:string | undefined
) {
  const validatedFields = LoginSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid Fields" };
  }

  const { email, password, code } = validatedFields.data;
  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "Email does not exist" };
  }

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(existingUser.email);
    await sendVerificationEmail(verificationToken.email, verificationToken.token);
    return { success: "Confirmation email sent" }; // Returning if email is not verified
  }

  if (existingUser.isTwoFactorEnabled && existingUser.email) {
    if (code) {
      const twoFactorToken = await getTwoFactorTokenByEmail(existingUser.email);
      if (!twoFactorToken || twoFactorToken.token !== code) {
        return { error: "Invalid or Wrong Code!" };
      }

      const hasExpired = new Date(twoFactorToken.expires) < new Date();
      if (hasExpired) return { error: "Token Expired" };

      // Delete the token since it is validated
      await db.twoFactorToken.delete({ where: { id: twoFactorToken.id } });

      // Check for existing confirmation
      const existingConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id);
      // console.log("Existing confirmation:", existingConfirmation); // Log found confirmation

      if (existingConfirmation) {
        await db.twoFactorConfirmation.delete({
          where: { id: existingConfirmation.id }
        })
      }

      // Create a new confirmation for the user
      await db.twoFactorConfirmation.create({
        data: { userId: existingUser.id }
      });
      // console.log("Created two-factor confirmation:", newConfirmation); 
    } else {
      const twoFactorToken = await generateTwoFactorToken(existingUser.email); // Creating
      await sendTwoFactorTokenEmail(twoFactorToken.email,
        twoFactorToken.token
      );
      return { twoFactor: true };
    }
  }
  interface SignInResult {
    error?: string; // Define the structure you expect
    success?: string;
    // Add other properties if needed
  }
  try {
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false
    }) as SignInResult;
    console.log("result",result)
    if (!result) {
      return { error: "No response from sign-in." };
    }
    if (result.error) {
      return { error: result.error };
    }
    return { success: "Login successful!", redirectTo:  callbacksUrl ||  '/settings' };
  } catch (error) {
    // console.error("Sign-in error:", error);
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials" };
        default:
          return { error: "Something went wrong" };
      }
    }
    return null
  }
}





// try {
//   const result = await signIn("credentials", {
//     email,
//     password,
//     redirect:false
//   }) as SignInResult;
//   if (!result) {
//     return { error: "No response from sign-in." };
//   }
//   if (result.error) {
//     return { error: result.error };
//   }else{
//     window.location.href=defaultLoggedInRedirect
//     return { success: "Login successful!" };
//   }
// } catch (error) {
//   console.error("Sign-in error:", error);
//   if (error instanceof AuthError) {
//     switch (error.type) {
//       case "CredentialsSignin":
//         return { error: "Invalid credentials" };
//       default:
//         return { error: "Something went wrong" };
//     }
//   }
//   return null
// }
// }