"use client "

import { useCurrentUser } from "@/hooks/use-current-user"
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu"
import { FaUser } from "react-icons/fa"
import { LogOutButton } from "@/components/auth/logout-button"
export const UserButton=()=>{
    const {user} =useCurrentUser()
    return(
        <div>
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <Avatar>
                      <AvatarImage src={user?.image || ""}/>
                      <AvatarFallback>
                        <FaUser/>
                      </AvatarFallback>
                    </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-40" align="start">
                    <LogOutButton>
                        <DropdownMenuItem>
                            <h1 className="text-red-600 w-16 p-1 mt-1 bg-transparent bg-gray-300 outline-none border-gray-300 rounded-lg   ml-8 border  "> 
                                Logout
                                </h1>
                        </DropdownMenuItem>
                    </LogOutButton>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}