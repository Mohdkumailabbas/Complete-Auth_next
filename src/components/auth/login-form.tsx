import React from 'react'
import { CardWrapper } from '@/components/auth/card-wrapper'

export const Loginform = () => {
    return (
        <CardWrapper
        headerLable='Welcome Back'
        backButtonLable=" Don't have an account"
        backButtonHref='/auth/register'
        showSocial
        >

            <div className=''>
                <h1 className='text-xl capitalize '>login</h1>
            </div>
        </CardWrapper>
    )
}

