"use client"

import RoleGate from "@/components/auth/role-gate";
import { FormSuccess } from "@/components/form-succes";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { UserRole } from "@prisma/client";
import { toast } from "sonner";
 const Page=()=>{
  const onApiRouteClick=()=>{
   fetch("/api/admin")
    .then((response)=>{
      if(response.ok){
        toast.success("Access granted!")
      }
      else{
        toast.error("Oops! You’re not authorized to access this API")
      }
    })
  }
    return(
        <div>
          <Card className="mt-4 w-[550px] shadow-lg">
            <CardHeader>
              🗝️Admin
            </CardHeader>
            <CardContent>
              <RoleGate allowedRole={UserRole.ADMIN}>
                <FormSuccess message="Hey Admin! You are allowed to view this content"/>
              </RoleGate>
              <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md mt-2">
               <p className="text-sm font-medium">
                Admin only Api Route
               </p>
               <Button onClick={onApiRouteClick}>
                Click to Test
               </Button>
              </div>
              <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md mt-2">
               <p className="text-sm font-medium">
                Admin only Server Action
               </p>
               <Button>
                Click to Test
               </Button>
              </div>
            </CardContent>
          </Card>
        
        </div>
    )
}
export default Page;


// const role =CurrentRole() for server side
    // const role =useCurrentRole() for clinet