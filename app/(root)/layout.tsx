import { auth } from '@/auth';
import Header from '@/components/Header'
import { db } from '@/database/drizzle';
import { users } from '@/database/schema';
import { eq } from 'drizzle-orm';
import { redirect } from 'next/navigation';
import { after } from 'next/server';
import React, { ReactNode } from 'react'

const layout = async ({ children }: { children: ReactNode }) => {

    const session = await auth();

    if (!session) redirect('/sign-in'); // Redirect to sign-in page if not authenticated


    after(async () => {
        if (!session?.user?.id) return;

        const user = await db
            .select()
            .from(users)
            .where(eq(users.id, session?.user?.id))
            .limit(1);

        if (user[0].lastActivityDate === new Date().toISOString().slice(0, 10)) return;

        await db.update(users)
            .set({ lastActivityDate: new Date().toISOString().slice(0, 10) })
            .where(eq(users.id, session?.user?.id))
    });

    return <main className='root-container'>
        <div className='mx-auto max-w-7xl'>
            <Header session={session} />

            <section className='mt-20 pb-2'>{children}</section>
        </div>
    </main>
}

export default layout