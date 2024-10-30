"use client"
import React, { useState, useTransition } from 'react'
import * as z from "zod"
import { RegisterSchema } from '@/schemas'
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
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button'
import { FormError } from '@/components/form-error'
import { FormSuccess } from '../form-succes'
import { register } from '@/app/auth/actions/register'



export const RegisterForm = () => {
    const [isPending, startTransition] = useTransition();
    const [success, setSuccess] = useState<string | undefined>("");
    const [error, setError] = useState<string | undefined>("");
    //infer: This is a utility function provided by Zod. It extracts the TypeScript type from a defined schema.
    const form = useForm<z.infer<typeof RegisterSchema>>({
        //The resolver is a function that integrates Zod validation with the form library.
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            email: '',
            password: '',
            name: ""
        }//Overall, this code initializes a form using useForm from a library like react-hook-form, sets up Zod for schema validation, and defines default values for the form fields. 
    })
    const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
        setSuccess("")
        setError("")
        startTransition(() => {
            register(values)//sendin data to server
                .then((data) => {
                    if(data.error){
                        setError(data.error)
                    }
                    else{
                        setSuccess("Confirmation Email Sent")
                    }
                })
                .catch(()=>setError("An Unexpected Error"))
        })
    }
    return (
        <CardWrapper
            headerLable="Create an Account"
            backButtonLable="Already registered?"
            backButtonHref='/auth/login'
            showSocial
        >
            {/* this is the middle area of CardWrapper */}
            <Form {...form}>
                {/* Example: If form contains properties like onChange, onBlur, or any state variables, using {...form} effectively passes those to the Form component. */}
                <form className='space-y-6'
                    onSubmit={form.handleSubmit(onSubmit)}>
                    <div className='space-y-4'>
                        <FormField
                            control={form.control}
                            name='name'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type='string'
                                            placeholder='Enter your Name'
                                            disabled={isPending}
                                        />
                                        {/* FORMCONTROL Provides additional functionality or styling to the input, making it more manageable. */}
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        >

                        </FormField>
                        <FormField
                            control={form.control}
                            name='email'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type='email'
                                            placeholder='Enter your email'
                                            disabled={isPending}
                                            onChange={(e)=>{
                                                field.onChange(e)
                                                // When you call field.onChange(e), it updates the form state with the current value of the email input.
                                                if(error){
                                                    setError("")
                                                }
                                            }}
                                        />
                                        {/* FORMCONTROL Provides additional functionality or styling to the input, making it more manageable. */}
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        >

                        </FormField>
                        <FormField
                            control={form.control}
                            name='password'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type='password'
                                            placeholder='*******'
                                            disabled={isPending}
                                        />
                                        {/* FORMCONTROL Provides additional functionality or styling to the input, making it more manageable. */}
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        >

                        </FormField>
                    </div>
                    <FormSuccess message={success} />
                    <FormError message={error} />
                    <Button disabled={isPending} className=' w-full'>Create An Account</Button>
                </form>
            </Form>

        </CardWrapper>
    )
}

