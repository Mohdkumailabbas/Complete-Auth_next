/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { useRouter } from "next/navigation"

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
    return(
     <>
      <span onClick={onClick} className="cursor-pointer">
        {children}
      </span>
     </>
    )
}