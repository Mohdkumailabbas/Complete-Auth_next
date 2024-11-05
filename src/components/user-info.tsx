/* eslint-disable @typescript-eslint/no-unused-vars */
import { ExtendedUser } from "../../next-auth";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "./ui/badge";

interface UserInfoProps{
user?:ExtendedUser
label:string
}

export const UserInfo= ({user,label}:UserInfoProps)=>{
    
    return(
        <div>
          <Card className="mt-4 w-[550px] shadow-lg">
            <CardHeader>
                <p className="text-xl font-semibold text-center ">
                 {label}
                </p>
            </CardHeader>
            <CardContent>
            <div className="flex flex-row justify-between items-center rounded-lg border p-3 shadow-sm">
                  <p className="text-sm font-medium">Name</p>
                  <p className="truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">{user?.name}</p>
                </div>
                <div className="flex flex-row justify-between items-center rounded-lg border p-3 shadow-sm">
                  <p className="text-sm font-medium">ID</p>
                  <p className="truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">{user?.id}</p>
                </div>
                <div className="flex flex-row justify-between items-center rounded-lg border p-3 shadow-sm">
                  <p className="text-sm font-medium">E-mail</p>
                  <p className="truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">{user?.email}</p>
                </div>
                <div className="flex flex-row justify-between items-center rounded-lg border p-3 shadow-sm">
                  <p className="text-sm font-medium">Role</p>
                  <p className="truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">{user?.role}</p>
                </div>
                <div className="flex flex-row justify-between items-center rounded-lg border p-3 shadow-sm">
                  <p className="text-sm font-medium">Two-Factor Authentication</p>
                   <Badge variant={user?.isTwoFactorEnabled ?"success":"destructive"}> {user?.isTwoFactorEnabled ?"ON" :"OFF"} </Badge>
                </div>
            </CardContent>
          </Card>
        </div>
    )
}