import Image from 'next/image'
import React from 'react'
import BookCover from './BookCover'
import BorrowBook from './BorrowBook'
import { db } from '@/database/drizzle'
import { users } from '@/database/schema'
import { eq } from 'drizzle-orm'

interface Props extends Book {
    userId: string;
}

const BookOverview = async ({
    title,
    author,
    genre,
    rating,
    totalCopies,
    avaliableCopies,
    description,
    coverColor,
    coverUrl,
    id,
    userId
}: Props) => {
    const [user] = await db
        .select()
        .from(users)
        .where(eq(users.id, userId))
        .limit(1)

    if (!user) return null;

    const borrowingEligibility = {
        isEligible: avaliableCopies > 0 && user.status === "APPROVED",
        message:
            avaliableCopies <= 0
                ? 'Book is not available'
                : 'You are not eligible to borrow book'
    }

    return (
        <section className='book-overview'>
            <div className='flex flex-1 flex-col gap-5'>
                <h1>{title}</h1>

                <div className='book-info'>
                    <p>
                        by <span className='font-semibold text-[#EED1AC]'>{author}</span>
                    </p>

                    <p>
                        Category{" "} <span className='font-semibold text-[#EED1AC]'>{genre}</span>
                    </p>

                    <div className='flex flex-row gap-1'>
                        <Image src='/icons/star.svg' alt='star' width={22} height={22} />
                        <p>{rating}</p>
                    </div>
                </div>

                <div className='book-copies'>
                    <p>
                        Total Books: <span>{totalCopies}</span>
                    </p>

                    <p>
                        Avaliable Books: <span>{avaliableCopies}</span>
                    </p>
                </div>

                <p className='book-description'>
                    {description}
                </p>

                <BorrowBook
                    bookId={id}
                    userId={userId}
                    borrowingEligibility={borrowingEligibility}
                />

            </div>

            <div className='relative flex flex-1 justify-center'>
                <div className='relative'>
                    <BookCover
                        varient='wide'
                        className="z-10"
                        coverColor={coverColor}
                        coverImage={coverUrl}
                    />

                    <div className='absolute left-16 top-10 rotate-12 opacity-40 max-sm:hidden'>
                        <BookCover
                            varient='wide'
                            coverColor={coverColor}
                            coverImage={coverUrl}
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default BookOverview