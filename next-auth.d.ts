import { type DefaultSession } from "next-auth";
import { UserRole } from "@prisma/client";
// To add custom properties like role to the session (since role isn’t part of DefaultSession by default), we use TypeScript’s module augmentation to extend DefaultSession with the ExtendedUser type.
export type ExtendedUser =DefaultSession["user"]&{// Create a new type called ExtendedUser, based on DefaultSession's user
    role:UserRole; //userrole =ADMIN||USER
    isTwoFactorEnabled:boolean;
    isOAuth:boolean;
    name: string; 
}
declare module "next-auth"{// is tells TypeScript to add (or augment) the types in the next-auth module. .
    interface Session{ //Changes the Session interface so that user in session.user now follows the ExtendedUser type, which includes role.
        user:ExtendedUser
    }
}