import { auth } from '@/auth'
import { redirect } from 'next/navigation';
import '@/styles/admin.css'
import React, { ReactNode } from 'react'
import Sidebar from '@/components/admin/Sidebar';
import Header from '@/components/admin/Header';

const layout = async ({ children }: { children: ReactNode }) => {
    const session = await auth();

    if (!session?.user?.id) redirect('/sign-in');


    return (
        <main className='flex min-h-screen w-full flex-row bg-gray-100'>
            <Sidebar session={session} />

            <div className='admin-container flex-1 p-8 m-6 bg-white rounded-xl shadow-md border border-gray-200'>
                <Header session={session} />
                {children}
            </div>
        </main>
    )
}

export default layout