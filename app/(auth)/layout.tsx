import { auth } from '@/auth'
import Image from 'next/image'
import { redirect } from 'next/navigation';
import React, { ReactNode } from 'react'

const layout = async ({ children }: { children: ReactNode }) => {

    const session = await auth();

    if (session) redirect('/');

    return (
        <main className='auth-container'>
            <section className='auth-form'>
                <div className='auth-box'>
                    <div className='flex flex-row gap-2'>
                        <Image src="/icons/logo1.svg" alt='logo' height={37} width={37} />
                        <h1 className='text-2xl font-semibold text-white'>Sidly</h1>
                    </div>
                    <div>{children}</div>
                </div>
            </section>

            <section className='auth-illustration'>
                <Image
                    src="/images/noLogin.jpg"
                    alt='auth illustration'
                    height={1000}
                    width={1000}
                    className='size-full object-cover '
                />
                <div className="absolute inset-0 bg-black/50"></div>
            </section>
        </main>
    )
}

export default layout