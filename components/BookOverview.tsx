import Image from 'next/image'
import React from 'react'
import { Button } from './ui/button'

const BookOverview = ({
    title,
    author,
    genre,
    rating,
    totalCopies,
    availableCopies,
    description,
    color,
    cover
}: Book) => {
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
                        Avaliable Books: <span>{availableCopies}</span>
                    </p>
                </div>

                <p className='book-description'>
                    {description}
                </p>

                <Button className='book-overview_btn'>
                    <Image src='/icons/book.svg' alt='book' height={20} width={20}/>
                    <p className='font2 text-xl text-[#16191E]'>Borrow Book</p>
                </Button>


            </div>
        </section>
    )
}

export default BookOverview