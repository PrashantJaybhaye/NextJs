import { auth, signOut } from '@/auth'
import BorrowBookList from '@/components/BorrowBookList'
import { Button } from '@/components/ui/button'
import { db } from '@/database/drizzle'
import { books, borrowRecords, users } from '@/database/schema'
import { desc, eq } from 'drizzle-orm'
import React from 'react'
import { LogOut, CheckCircle, XCircle, Clock } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { getInitials } from '@/lib/utils'

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
            avatarUrl: users.universityCard
        })
        .from(users)
        .where(eq(users.id, userId))
        .then(res => res[0])

    return (
        <>
            <section className="flex flex-col sm:flex-row gap-20 w-full max-sm:-mt-5 mb-10">
                {/* Left: Profile Card */}
                <div className="relative w-full sm:w-[420px] p-6 rounded-xl bg-black border border-slate-700 shadow-xl overflow-hidden">
                    {/* Decorative elements */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 rounded-full transform translate-x-16 -translate-y-12" />
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-r from-amber-600/20 to-orange-600/20 rounded-full transform -translate-x-8 translate-y-8" />

                    <div className="relative z-10 flex flex-col">
                        {/* User header with avatar and name */}
                        <div className="flex items-center gap-4 mb-6">
                            <div className="relative">
                                <Avatar className="w-20 h-20 rounded-full ring-4 ring-slate-700/80 ring-offset-2 ring-offset-slate-900">
                                    <AvatarFallback className="bg-gradient-to-br from-amber-500/80 to-amber-700 text-white text-2xl">
                                        {getInitials(session?.user?.name || '?')}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="absolute -bottom-1 -right-1 bg-slate-800 rounded-full p-1 border-2 border-slate-900">
                                    <div className="w-6 h-6 rounded-full flex items-center justify-center bg-gradient-to-br from-green-500 to-emerald-600">
                                        <div className="w-1.5 h-1.5 rounded-full bg-white" />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h2 className="text-xl font-bold text-gray-100">{userInfo?.fullName}</h2>
                                <p className="text-xs text-gray-400 mt-1">Member</p>
                            </div>
                        </div>

                        {/* Verification badge with improved styling */}
                        <div className="mb-6">
                            <div className="flex items-center gap-1 mb-1">
                                {userInfo?.verificationStatus === 'APPROVED' && (
                                    <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-emerald-900/30 border border-emerald-800 w-full">
                                        <div className="p-1 rounded-full bg-emerald-600/20">
                                            <CheckCircle size={16} className="text-emerald-400" />
                                        </div>
                                        <span className="text-sm font-medium text-emerald-300">
                                            Verified Student
                                        </span>
                                    </div>
                                )}
                                {userInfo?.verificationStatus === 'PENDING' && (
                                    <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-amber-900/30 border border-amber-800 w-full">
                                        <div className="p-1 rounded-full bg-amber-600/20">
                                            <Clock size={16} className="text-amber-400" />
                                        </div>
                                        <span className="text-sm font-medium text-amber-300">
                                            Verification Pending
                                        </span>
                                    </div>
                                )}
                                {userInfo?.verificationStatus === 'REJECTED' && (
                                    <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-rose-900/30 border border-rose-800 w-full">
                                        <div className="p-1 rounded-full bg-rose-600/20">
                                            <XCircle size={16} className="text-rose-400" />
                                        </div>
                                        <span className="text-sm font-medium text-rose-300">
                                            Verification Rejected
                                        </span>
                                    </div>
                                )}
                            </div>
                            <p className="text-xs text-gray-500 mt-2 px-1">
                                {userInfo?.verificationStatus === 'APPROVED'
                                    ? "Your student status is verified and you can borrow books"
                                    : userInfo?.verificationStatus === 'PENDING'
                                        ? "Your documents are under review. Verification usually takes 1-2 business days"
                                        : "Your verification was rejected. Please contact support for more information"}
                            </p>
                        </div>

                        {/* User information in a clean layout */}
                        <div className="grid grid-cols-2 gap-3 mb-6">
                            <div>
                                <p className="text-xs text-gray-500 mb-1">Student ID</p>
                                <p className="text-sm text-gray-300 font-medium">{userInfo?.studentId}</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 mb-1">Email</p>
                                <p className="text-sm text-gray-300 font-medium truncate">{userInfo?.email}</p>
                            </div>
                            <div className="col-span-2">
                                <p className="text-xs text-gray-500 mb-1">Account Status</p>
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                    <p className="text-sm text-gray-300 font-medium">Active</p>
                                </div>
                            </div>
                        </div>



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
