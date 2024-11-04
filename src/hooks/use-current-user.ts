"use client"
import { useSession } from "next-auth/react";
import {User} from "@/app/types/types"
export const useCurrentUser = () => {
    const { data: session, status } = useSession();
    const user = session?.user as User | undefined;
    return {
        user,
        status,
        
    };
};
