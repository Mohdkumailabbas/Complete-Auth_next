"use client"
import React from 'react'
import * as z from "zod"
import { LoginSchema } from '@/schemas'
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
export const Loginform = () => {
    //infer: This is a utility function provided by Zod. It extracts the TypeScript type from a defined schema.
    const form = useForm<z.infer<typeof LoginSchema>>({
        //The resolver is a function that integrates Zod validation with the form library.
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: '',
            password: ''
        }//Overall, this code initializes a form using useForm from a library like react-hook-form, sets up Zod for schema validation, and defines default values for the form fields. 
    })
    const onSubmit =(values:z.infer<typeof LoginSchema>)=> {
    console.log(values);
    }
    return (
        <CardWrapper
            headerLable='Welcome Back'
            backButtonLable=" Don't have an account"
            backButtonHref='/auth/register'
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
                  name='email'
                  render={({field})=>(
                    <FormItem>
                     <FormLabel>Email</FormLabel>
                     <FormControl>
                        <Input
                         {...field}
                         type='email'
                         placeholder='Enter your email'
                        />
                        {/* FORMCONTROL Provides additional functionality or styling to the input, making it more manageable. */}
                     </FormControl>
                     <FormMessage/>
                    </FormItem>
                  )}
                 >

                 </FormField>
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
                         placeholder='*******'
                        />
                        {/* FORMCONTROL Provides additional functionality or styling to the input, making it more manageable. */}
                     </FormControl>
                     <FormMessage/>
                    </FormItem>
                  )}
                 >

                 </FormField>
                </div>
                 <FormError/>
                 <Button className=' w-full'> Login</Button>
                </form>
            </Form>

        </CardWrapper>
    )
}

