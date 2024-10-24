import React from 'react'
import { CardWrapper } from './card-wrapper'

export const Loginform = () => {
    return (
        <CardWrapper
        headerLable='Welcome Back'
        backButtonLable=" don't have an account"
        backButtonHref='/auth/register'
        showSocial
        >

            <div className=' text-white'>
                <h1 className='text-xl'>login</h1>
            </div>
        </CardWrapper>
    )
}

