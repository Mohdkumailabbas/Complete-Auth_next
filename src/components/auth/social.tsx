"use client";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react"; // Make sure to import from next-auth/react
import { defaultLoggedInRedirect } from "@/routes";
import { useSearchParams } from "next/navigation";
export const Social = () => {
    const searchParms=useSearchParams()
    const callbackUrl=searchParms.get("callbackUrl")
    const handleGoogleSignIn = () => {
        signIn("google", {
            callbackUrl:callbackUrl|| defaultLoggedInRedirect, // Redirect after successful sign-in
        });
    };

    // Function to handle GitHub sign-in
    const handleGithubSignIn = () => {
        signIn("github", {
            callbackUrl: callbackUrl|| defaultLoggedInRedirect, // Redirect after successful sign-in
        });
    };

    return (
        <div className="flex items-center w-full">
            <Button
                className="w-full mr-2"
                size="lg"
                variant="outline"
                onClick={handleGoogleSignIn} 
            >
                <FcGoogle className="h-5 w-5" />
            </Button>
            <Button
                className="w-full"
                size="lg"
                variant="outline"
                onClick={handleGithubSignIn} // Use the GitHub sign-in handler
            >
                <FaGithub className="h-5 w-5" />
            </Button>
        </div>
    );
};
