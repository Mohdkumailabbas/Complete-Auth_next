"use client"
import {FcGoogle} from "react-icons/fc"
import {FaGithub} from "react-icons/fa"
import { Button } from "@/components/ui/button"
export const Social =()=>{
    return(
        <div className="flex   items-center w-full">
         <Button className="w-full mr-2 "
         size="lg"
         variant="outline"
         onClick={()=>{}}
         >
         <FcGoogle className="h-5 w-5"/>
         </Button>
         <Button className="w-full "
         size="lg"
         variant="outline"
         onClick={()=>{}}
         >
         <FaGithub className="h-5 w-5"/>
         </Button>
        </div>
    )
}
