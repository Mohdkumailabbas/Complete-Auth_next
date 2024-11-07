/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { useRouter } from "next/navigation"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Loginform } from "./login-form"

interface LogInButtonProp{
    children:React.ReactNode,
    mode?:"redirect"| "modal",
    asChild?:boolean
};
export const LogInButton=({
  children,
  mode="redirect",
  asChild
}:LogInButtonProp)=>{
  const router =useRouter()
  const onClick =()=>{
    router.push("/auth/login")  
  }
  if(mode==="modal"){
    return(
      <Dialog>
        <DialogTrigger asChild={asChild}>
         {children}
        </DialogTrigger>
        <DialogContent className="p-0 w-auto bg-transparent border-none">
          <Loginform/>
        </DialogContent>
      </Dialog>
    )
  }
    return(
     <>
      <span onClick={onClick} className="cursor-pointer">
        {children}
      </span>
     </>
    )
}