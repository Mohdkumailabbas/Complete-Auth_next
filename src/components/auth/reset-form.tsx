"use client"
import React, { useState, useTransition } from 'react'
import * as z from "zod"
import {  ResetSchema } from '@/schemas'
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
import { reset } from '@/app/auth/actions/reset'


export const ResetForm = () => {
    const[isPending,startTransition]=useTransition();
    const[success,setSuccess]=useState<string | undefined>("");
    const[error,setError]= useState<string | undefined>("");
    //infer: This is a utility function provided by Zod. It extracts the TypeScript type from a defined schema.
    const form = useForm<z.infer<typeof ResetSchema>>({
        //The resolver is a function that integrates Zod validation with the form library.
        resolver: zodResolver(ResetSchema),
        defaultValues: {
            email: '',

        }//Overall, this code initializes a form using useForm from a library like react-hook-form, sets up Zod for schema validation, and defines default values for the form fields. 
    })
    const onSubmit =(values:z.infer<typeof ResetSchema>)=> {
        setSuccess("")
        setError("")
        console.log(values)
     startTransition(()=>{
         reset(values)//sendin data to server
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
                  name='email'
                  render={({field})=>(
                    <FormItem>
                     <FormLabel>Email</FormLabel>
                     <FormControl>
                        <Input
                         {...field}
                         type='email'
                         placeholder='Enter your email'
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
                 <Button disabled={isPending} className=' w-full'>Request Password Reset</Button>
                </form>
            </Form>

        </CardWrapper>
    )
}
export default ResetForm

