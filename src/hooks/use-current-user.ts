"use client"
import { useSession } from "next-auth/react";
import { ExtendedUser } from "../../next-auth"
export const useCurrentUser = () => {
    const { data: session, status } = useSession();
    const user = session?.user  as ExtendedUser | undefined;;
    return {
        user,
        status,
        
    };
};
