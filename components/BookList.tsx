import React from 'react'
import BookCard from './BookCard'

interface Props {
  title: string,
  books: Book[],
  containerClassName?: string,
}

const BookList = ({ title, books, containerClassName }: Props) => {
  return (
    <section className={containerClassName}>
      <h2 className='font2 text-4xl text-[#D6E0FF]'>{title}</h2>

      <ul className='book-list'>
        {books.map((book)=>(
          <BookCard key={book.title} {...book}/>
        ))}
      </ul>
    </section>
  )
}

export default BookList