import SearchBook from '@/components/SearchBook';
import { db } from '@/database/drizzle';
import { books } from '@/database/schema';
import { desc } from 'drizzle-orm';
import React from 'react'

const page = async () => {

  const Books = (await db
    .select()
    .from(books)
    .limit(8)
    .orderBy(desc(books.createdAt))
  ) as Book[];

  return (
    <>
      <SearchBook Books={Books} />
    </>
  )
}

export default page