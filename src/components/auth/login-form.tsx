"use client"
import React, { useState, useTransition } from 'react'
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
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button'
import { FormError } from '@/components/form-error'
import { FormSuccess } from '../form-succes'
import { login } from '@/app/auth/actions/login'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
export const Loginform = () => {
    const searchParms = useSearchParams(); // The useSearchParams hook manages and manipulates URL query parameters for syncing UI state with the URL.
    const urlError = searchParms.get("error") === "OAuthAccountNotLinked"
        ? "Email already in use with diffrent provider"
        : ""
    const [showTwoFactor, setShowTwoFactor] = useState(false)
    const [isPending, startTransition] = useTransition();
    const [success, setSuccess] = useState<string | undefined>("");
    const [error, setError] = useState<string | undefined>("");
    //infer: This is a utility function provided by Zod. It extracts the TypeScript type from a defined schema.
    const form = useForm<z.infer<typeof LoginSchema>>({
        //The resolver is a function that integrates Zod validation with the form library.
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: '',
            password: '',
            code:''
        }//Overall, this code initializes a form using useForm from a library like react-hook-form, sets up Zod for schema validation, and defines default values for the form fields. 
    })
    const onSubmit = (values: z.infer<typeof LoginSchema>) => {
        setSuccess("")
        setError("")
        startTransition(() => {
            login(values)//sendin data to server
                .then((data) => {
                    if (data?.error) {
                        form.reset()
                        setError(data.error)
                        setSuccess("")
                    }
                    else if (data?.success) {
                        form.reset()
                        setSuccess(data.success);
                        setError("")
                    }
                    else if (data?.twoFactor) {
                        setShowTwoFactor(true)
                    }
                    else {
                        setSuccess("Login Created")
                        setError("")
                    }
                })
                .catch(() => {
                    setError("Something Went Wrong")
                })
        })
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
                        {showTwoFactor &&(
                            <FormField
                            control={form.control}
                            name='code'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Two Factor Code</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder='Enter your Code'
                                            disabled={isPending}
                                        />
                                        {/* FORMCONTROL Provides additional functionality or styling to the input, making it more manageable. */}
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        >

                        </FormField>
                        )}
                        {!showTwoFactor &&(
                            <>
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
                                            <Button size="default"
                                                variant="link"
                                                className='px-0 text-black  hover:text-gray-700'
                                            >
                                                <Link href="/auth/reset-password">
                                                    Forgot Password?
                                                </Link>
                                            </Button>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                >

                                </FormField>
                            </>
                        )}
                    </div>
                    <FormSuccess message={success} />
                    <FormError message={error || urlError} />
                    <Button disabled={isPending} className=' w-full'>{showTwoFactor ? "Confirm":"Login"}</Button>
                </form>
            </Form>

        </CardWrapper>
    )
}

