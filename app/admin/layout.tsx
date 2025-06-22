import { auth } from '@/auth'
import { redirect } from 'next/navigation';
import '@/styles/admin.css'
import React, { ReactNode } from 'react'
import Sidebar from '@/components/admin/Sidebar';
import Header from '@/components/admin/Header';
import { db } from '@/database/drizzle';
import { users } from '@/database/schema';
import { eq } from 'drizzle-orm';
import { Toaster } from 'react-hot-toast';

const layout = async ({ children }: { children: ReactNode }) => {
    const session = await auth();

    if (!session?.user?.id) redirect('/sign-in');

    // Check it is a user or admin 
    const isAdmin = await db
        .select({ isAdmin: users.role })
        .from(users)
        .where(eq(users.id, session.user.id))
        .limit(1)
        .then((res) => res[0]?.isAdmin === "ADMIN");

    if (!isAdmin) redirect("/");


    return (
        <main className='flex min-h-screen w-full flex-row'>
            <Sidebar session={session} />

            <div className='admin-container '>
                <Header session={session} />
                {children}
                <Toaster
                    position="top-right"
                    toastOptions={{
                        style: {
                            background: '#1f2937',
                            color: '#f9fafb',
                            border: '1px solid #374151'
                        }
                    }}
                />
            </div>
        </main>
    )
}

export default layout