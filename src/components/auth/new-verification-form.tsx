"use client"
import {BeatLoader} from "react-spinners"
import { CardWrapper } from "@/components/auth/card-wrapper"
import { useSearchParams } from "next/navigation"
import { useCallback, useEffect, useState } from "react"
import { newVerification } from "@/app/auth/actions/new-verification"
import { FormSuccess } from "@/components/form-succes"
import { FormError } from "@/components/form-error"

export const NewVerificationForm=()=>{
    const searchParams=useSearchParams()
    const token=searchParams.get("token")
    const[error,setError]=useState<string | undefined>(undefined)
    const[success,setSuccess]=useState<string | undefined>(undefined)

    const onSubmit=useCallback(()=>{
     if(!token){
        setError("Token Missing")
         return
    }
     newVerification(token)
     .then((data) => {
        if (data.success) {
          setSuccess(data.success);
          setError(undefined);
        } else if (data.error) {
          setError(data.error);
        } else {
          setError("Something went wrong");
        }
      })
      .catch((err) => {
        setError("Verification failed");
        console.error(err);
      });
  }, [token]);

    useEffect(()=>{
        onSubmit()
    },[onSubmit])
    return(
        <div>
            <CardWrapper
             headerLable="Confirming your Verification"
             backButtonHref="/auht/login"
             backButtonLable="Back to login"
             showSocial = {false}
             >
             <div className="flex justify-center items-center">
               {!success && !error &&(

                <BeatLoader/>
               )}
             <FormSuccess message={success}/>
             <FormError message={error}/>
             </div>
            </CardWrapper>
        </div>
    )
}