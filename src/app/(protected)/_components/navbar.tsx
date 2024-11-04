"use client"
import { UserButton } from '@/components/auth/user-button'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const Navbar = () => {
    const pathname=usePathname()
  return (
    <div className='bg-secondary w-[650px] h-[85px] flex p-4 text-black rounded-xl shadow-md items-center justify-between'>
     <div className='flex gap-x-2 shadow-lg'>
      <Button
       asChild
       variant={pathname === "/settings" ? "default":"outline" }
      >
        <Link href="/settings">
          Settings
        </Link>
      </Button>
      <Button
       asChild
       variant={pathname === "/server" ? "default":"outline" }
      >
        <Link href="/server">
          Server
        </Link>
      </Button>
      <Button
       asChild
       variant={pathname === "/client" ? "default":"outline" }
      >
        <Link href="/client">
          Client
        </Link>
      </Button>
      <Button
       asChild
       variant={pathname === "/admin" ? "default":"outline" }
      >
        <Link href="/admin">
          Admin
        </Link>
      </Button>


     </div>
       <UserButton/>
    </div>
  )
}

export default Navbar