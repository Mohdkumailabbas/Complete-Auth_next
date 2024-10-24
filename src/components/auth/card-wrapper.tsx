/* eslint-disable @typescript-eslint/no-unused-vars */
import { 
    Card,
    CardFooter,
    CardHeader,
    CardContent
 } from "@/components/ui/card"
import { Header } from "@/components/auth/header"
import { Social } from "@/components/auth/social"
import { BackButon } from "@/components/auth/backbutton"

interface CardWrapperProps{
    children:React.ReactNode,
    headerLable:string,
    backButtonLable:string,
    backButtonHref:string,
    showSocial:boolean
}
export const CardWrapper =({
    children,
    headerLable,
    backButtonLable,
    backButtonHref,
    showSocial
}:CardWrapperProps)=>{
return(
    <Card className="w-[400px] shadow-md">
     <CardHeader>
        <Header label={headerLable}></Header>
     </CardHeader>
     <CardContent>
        {children}
     </CardContent>
     {showSocial &&(
        <CardFooter>
            <Social></Social>
        </CardFooter>
     )}
     <CardFooter>
        <BackButon 
         label={backButtonLable}
         href={backButtonHref}
        >

        </BackButon>
     </CardFooter>
    </Card>
)
}