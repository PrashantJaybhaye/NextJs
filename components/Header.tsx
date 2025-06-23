"use client"
import { cn, getInitials } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { Avatar, AvatarFallback } from './ui/avatar'
import { Session } from 'next-auth'

const Header = ({ session }: { session: Session }) => {
    const pathname = usePathname();

    return (
        <header className='my-10 flex justify-between gap-5'>
            <Link href="/" className='flex flex-row items-center justify-center gap-1 text-[#D6E0FF] text-2xl'>
                <Image src='/icons/logo1.svg' alt='logo' width={40} height={40} />
                <span>Sidly</span>
            </Link>
            <ul className='flex flex-row items-center gap-8'>
                <li>
                    <Link href="/library" className={cn('text-base cursor-pointer capitalize', pathname === '/library' ? 'text-[#EED1AC]' : 'text-[#D6E0FF]')}>
                        Library
                    </Link>
                </li>
                <li>
                    <Link href='/my-profile'>
                        <Avatar>
                            <AvatarFallback className='bg-amber-100'>{getInitials(session?.user?.name || 'SL')}</AvatarFallback>
                        </Avatar>
                    </Link>
                </li>
            </ul>
        </header>
    )
}

export default Header