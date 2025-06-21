import { auth, signOut } from '@/auth'
import BorrowBookList from '@/components/BorrowBookList'
import { Button } from '@/components/ui/button'
import { db } from '@/database/drizzle'
import { books, borrowRecords, users } from '@/database/schema'
import { desc, eq } from 'drizzle-orm'
import React from 'react'
import { LogOut } from 'lucide-react';

const page = async () => {
    const session = await auth();

    const latestBooks = await db
        .select({
            id: books.id,
            title: books.title,
            genre: books.genre,
            coverColor: books.coverColor,
            coverUrl: books.coverUrl,
            status: borrowRecords.status,
            dueDate: borrowRecords.dueDate,
            returnDate: borrowRecords.returnDate,
            userName: users.fullName,
            borrowDate: borrowRecords.borrowDate
        })
        .from(borrowRecords)
        .innerJoin(books, eq(borrowRecords.bookId, books.id))
        .innerJoin(users, eq(borrowRecords.userId, users.id))
        .orderBy(desc(borrowRecords.borrowDate)); 

    console.log(latestBooks)

    return <>
        <div className='sm:flex sm:flex-row'>
            <div className="mb-6 w-full h-fit p-4 rounded-xl bg-[#1e293b] shadow border border-slate-700">
                <p className="text-sm text-gray-300 mb-3">
                    Welcome, <span className="font-semibold">{session?.user?.name}</span>
                </p>
                <form action={async () => {
                    "use server"

                    await signOut();
                }}
                    className='mb-10 '
                >
                    <Button> <LogOut size={16} />Logout</Button>
                </form>
            </div>

            <BorrowBookList
                title="Borrowed Books"
                books={(latestBooks).map(book => ({
                    ...book,
                }))}
            />
        </div>
    </>
}

export default page