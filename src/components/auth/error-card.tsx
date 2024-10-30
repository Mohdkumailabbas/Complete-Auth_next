import { BackButon } from "@/components/auth/backbutton";
import { Header } from "@/components/auth/header";
import {
    Card,
    CardFooter,
    CardHeader
} from "@/components/ui/card"
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
export const ErrorCard = () => {
    return (
        <Card className="w-[400px] shadow-md">
            <CardHeader>
                <Header label="Opps! Something Went Wrong" />
            </CardHeader>
            <CardFooter>
                <BackButon  label ="Back to login "href="/auth/login"/>
            </CardFooter>
            <div className="w-full flex items-center justify-center">
                <ExclamationTriangleIcon className="text-destructive"/>
            </div>
        </Card>
    )
}
