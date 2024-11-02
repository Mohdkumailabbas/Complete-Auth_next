/* eslint-disable @typescript-eslint/no-unused-vars */
import { db } from "@/lib/db"

export const getPasswordResetTokenByToken = async (token: string) => {
  try {
    const passwordResetToken = await db.passwordResetToken.findUnique({
      where: { token },
    });
    return passwordResetToken;
  } catch (error) {
    // console.error("Error fetching password reset token by token:", error);
    throw new Error("Failed to retrieve password reset token.");
  }
};

export const getPasswordResetTokenByEmail = async (email: string) => {
  try {
    const passwordResetToken = await db.passwordResetToken.findFirst({
      where: { email },
    });
    return passwordResetToken;
  } catch (error) {
    // console.error("Error fetching password reset token by email:", error);
    throw new Error("Failed to retrieve password reset token.");
  }
};
