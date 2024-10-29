import { BackButon } from "@/components/auth/backbutton";
import { Header } from "@/components/auth/header";
import {
    Card,
    CardFooter,
    CardHeader
} from "@/components/ui/card"
export const ErrorCard = () => {
    return (
        <Card className="w-[400px] shadow-md">
            <CardHeader>
                <Header label="Opps! Something Went Wrong" />
            </CardHeader>
            <CardFooter>
                <BackButon label="Back to Login" href="/auth/login"/>
            </CardFooter>
        </Card>
    )
}
