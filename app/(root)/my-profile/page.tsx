import { auth, signOut } from '@/auth'
import BorrowBookList from '@/components/BorrowBookList'
import { Button } from '@/components/ui/button'
import { db } from '@/database/drizzle'
import { books, borrowRecords, users } from '@/database/schema'
import { desc, eq } from 'drizzle-orm'
import React from 'react'
import { LogOut } from 'lucide-react'
import ProfileId from '@/components/ProfileId'

const page = async () => {
    const session = await auth()
    const userId = session?.user?.id

    if (!userId) throw new Error('User not authenticated.')

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
        .where(eq(borrowRecords.userId, userId))
        .orderBy(desc(borrowRecords.borrowDate))

    const userInfo = await db
        .select({
            fullName: users.fullName,
            email: users.email,
            studentId: users.universityId,
            verificationStatus: users.status,
            avatarUrl: users.universityCard,
            Created: users?.lastActivityDate,
        })
        .from(users)
        .where(eq(users.id, userId))
        .then(res => res[0])

    return (
        <>
            <section className="flex flex-col sm:flex-row gap-20 w-full max-sm:-mt-5 mb-10">
                {/* Left: Profile Card */}
                <div className="relative w-full sm:w-[420px] p-6 rounded-xl bg-black border border-slate-700 shadow-xl overflow-hidden h-fit">
                    {/* Decorative elements */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 rounded-full transform translate-x-16 -translate-y-12" />
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-r from-amber-600/20 to-orange-600/20 rounded-full transform -translate-x-8 translate-y-8" />

                    <div className="relative z-10 flex flex-col">
                        
                        <ProfileId userInfo={userInfo} session={session} />

                        {/* Logout Button */}
                        <form
                            action={async () => {
                                'use server'
                                await signOut()
                            }}
                        >
                            <Button
                                variant="outline"
                                className="w-full border-slate-700 bg-slate-800/50 hover:bg-slate-700 text-gray-300 hover:text-white"
                            >
                                <LogOut size={16} className="mr-2" />
                                Sign Out
                            </Button>
                        </form>
                    </div>
                </div>

                {/* Right: Borrowed Books */}
                <div className="flex-1 min-w-0 ">
                    <BorrowBookList
                        title="Borrowed Books"
                        books={latestBooks}
                    />
                </div>
            </section>
        </>
    )
}

export default page
