/* eslint-disable @typescript-eslint/no-unused-vars */
import { 
    Card,
    CardFooter,
    CardHeader,
    CardContent
 } from "../ui/card"

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
        
    </Card>
)
}