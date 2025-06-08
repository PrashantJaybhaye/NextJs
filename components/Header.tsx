"use client"
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const Header = () => {
    const pathname = usePathname();

    return (
        <header className='my-10 flex justify-between gap-5'>
            <Link href="/">
                <Image src='/icons/logo.svg' alt='logo' width={40} height={40}/>
            </Link>
            <ul className='flex flex-row items-center gap-8'>
                <li>
                    <Link href="/Library" className={cn('text-base cursor-pointer capitalize', pathname === '/library' ? 'text-[#EED1AC]' : 'text-[#D6E0FF]')}>
                        Library
                    </Link>
                </li>
            </ul>
        </header>
    )
}

export default Header