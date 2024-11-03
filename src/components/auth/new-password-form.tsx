"use client"
import React, { useState, useTransition } from 'react'
import * as z from "zod"
import {  NewPasswordSchema } from '@/schemas'
import { CardWrapper } from '@/components/auth/card-wrapper'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
    Form,
    FormControl,
    FormLabel,
    FormMessage,
    FormItem,
    FormField

} from "@/components/ui/form"
import {Input} from "@/components/ui/input"
import { Button } from '@/components/ui/button'
import { FormError } from '@/components/form-error'
import { FormSuccess } from '../form-succes'
import {newPassword} from "@/app/auth/actions/new-password"
import { useSearchParams } from 'next/navigation'


export const NewPasswordForm = () => {
    const searchParms=useSearchParams()
    const token=searchParms.get("token");
    const[isPending,startTransition]=useTransition();
    const[success,setSuccess]=useState<string | undefined>("");
    const[error,setError]= useState<string | undefined>("");
    //infer: This is a utility function provided by Zod. It extracts the TypeScript type from a defined schema.
    const form = useForm<z.infer<typeof NewPasswordSchema>>({
        //The resolver is a function that integrates Zod validation with the form library.
        resolver: zodResolver(NewPasswordSchema),
        defaultValues: {
            password: '',

        }//Overall, this code initializes a form using useForm from a library like react-hook-form, sets up Zod for schema validation, and defines default values for the form fields. 
    })
    const onSubmit =(values:z.infer<typeof NewPasswordSchema>)=> {
        setSuccess("")
        setError("")
        console.log(values)
     startTransition(()=>{
         newPassword(values,token)//sendin data to server
          .then((data)=>{
             if(data?.error){
                setError(data.error)
                setSuccess("")
             } 
             else if(data?.success){
                setSuccess(data.success);
                setError("")
             }
             else{
                setSuccess("Login Created")
                setError("")
             }
          })
        })
    }
    return (
        <CardWrapper
            headerLable='Forgot Password ?'
            backButtonLable="Back to Login"
            backButtonHref='/auth/login'
            showSocial={false}
        >
            {/* this is the middle area of CardWrapper */}
            <Form {...form}>
                {/* Example: If form contains properties like onChange, onBlur, or any state variables, using {...form} effectively passes those to the Form component. */}
                <form className='space-y-6'
                 onSubmit={form.handleSubmit(onSubmit)}>
                <div className='space-y-4'>
                 <FormField
                  control={form.control}
                  name='password'
                  render={({field})=>(
                    <FormItem>
                     <FormLabel>Password</FormLabel>
                     <FormControl>
                        <Input
                         {...field}
                         type='password'
                         placeholder='Enter new password'
                         disabled={isPending}
                         onChange={(e) => {
                            field.onChange(e); // keep the original input behavior
                            setError(""); // clear the error message
                            setSuccess(""); // clear the success message
                        }}
                        />
                        {/* FORMCONTROL Provides additional functionality or styling to the input, making it more manageable. */}
                     </FormControl>
                     <FormMessage/>
                    </FormItem>
                  )}
                 >

                 </FormField>
                 
                </div>
                <FormSuccess message={success} />
                 <FormError message= {error }/>
                 <Button disabled={isPending} className=' w-full'>Reset Password</Button>
                </form>
            </Form>

        </CardWrapper>
    )
}
export default NewPasswordForm

