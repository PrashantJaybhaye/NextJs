import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <section className='w-full rounded-2xl bg-white p-7'>
      <div className='flex flex-wrap items-center justify-between gap-2'>
        <h2 className='text-xl font-semibold'>All Books</h2>
        <Button className='bg-[#1E293B] text-white hover:bg-[#1E293B]/80' asChild>
          <Link href="/admin/books/new" className='text-white'>+ Create a New Book</Link>
        </Button>
      </div>

      <div className='mt-7 w-full overflow-hidden'>
        <p>Table</p>
      </div>
    </section>
  )
}

export default page