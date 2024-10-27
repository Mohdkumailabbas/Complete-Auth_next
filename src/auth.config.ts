import GitHub from "next-auth/providers/github"
import type { NextAuthConfig } from "next-auth"
 
export const authConfig:NextAuthConfig= { providers: [GitHub] } satisfies NextAuthConfig
