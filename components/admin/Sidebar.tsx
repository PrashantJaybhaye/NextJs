'use client'
import { adminSideBarLinks } from '@/constants'
import { cn, getInitials } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { Avatar, AvatarFallback } from '../ui/avatar'
import { Session } from 'next-auth'

const Sidebar = ({ session }: {session: Session}) => {
    const pathname = usePathname();

    return (
        <div className='admin-sidebar'>
            <div>
                <div className='logo items-center justify-center'>
                    <Image src="/icons/admin/logo1.svg" alt="logo" width={37} height={37} />
                    <h1>Sidly</h1>
                </div>
                <div className='mt-10 flex flex-col gap-5'>
                    {adminSideBarLinks.map((link) => {
                        const isSelected = (link.route === 'admin' && pathname.includes(link.route) && link.route.length > 1) || pathname === link.route;

                        return (
                            <Link href={link.route} key={link.route}>
                                <div className={cn('link', isSelected && 'bg-[#25388C] shadow-sm')}>
                                    <div className='relative size-5'>
                                        <Image src={link.img} alt="icon" fill className={`${isSelected ? "brightness-0 invert" : ""} object-contain`} />
                                    </div>
                                    <p className={cn(isSelected ? 'text-white' : 'text-[#16191E]')}>{link.text}</p>
                                </div>
                            </Link>
                        )
                    })}
                </div>
            </div>
            <div className='user justify-center items-center'>
                <Avatar>
                    <AvatarFallback className='bg-amber-100'>{getInitials(session?.user?.name || 'SL')}</AvatarFallback>
                </Avatar>
                <div className='flex flex-col max-md:hidden'>
                    <p className='font-semibold text-[#fff]'>{session?.user?.name}</p>
                    <p className='text-[#8D8D8D] text-xs'>{session?.user?.email}</p>
                </div>
            </div>
        </div>
    )
}

export default Sidebar