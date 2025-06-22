import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

const page = () => {
  // Sample book data (replace with your actual data source)
  const books = [
    {
      title: "The Great Reclamation: A Novel",
      author: "Rachel Meng",
      genres: ["Strategic", "Fantasy"],
      date: "Dec 19 2023",
      action: "🔴"
    },
    {
      title: "Inside Evil: Inside Evil Series, Book 1",
      author: "Rachel Meng",
      genres: ["Strategic", "Fantasy"],
      date: "Dec 19 2023",
      action: "🔴"
    },
    {
      title: "Jayne Castle - People in Glass Houses",
      author: "Rachel Meng",
      genres: ["Strategic", "Fantasy"],
      date: "Dec 19 2023",
      action: "🔴"
    },
    // Add more books as needed
  ];

  return (
    <section className="w-full rounded-2xl bg-gray-600 p-4 md:p-7">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl font-semibold">All Books</h2>
        <Button className="bg-[#1E293B] text-white hover:bg-[#1E293B]/80" asChild>
          <Link href="/admin/books/new" className="text-white">+ Create a New Book</Link>
        </Button>
      </div>

      {/* Responsive Table/Card Container */}
      <div className="mt-7 w-full">
        {/* Table for md+ screens */}
        <div className="hidden md:block overflow-x-auto rounded-lg border border-gray-500 bg-gray-700/30 shadow">
          <table className="min-w-full divide-y divide-gray-500">
            <thead className="bg-gray-700">
              <tr>
                <th scope="col" className="px-4 py-3 text-left text-sm font-medium text-white sm:pl-6">Book Title</th>
                <th scope="col" className="px-3 py-3 text-left text-sm font-medium text-white">Author</th>
                <th scope="col" className="px-3 py-3 text-left text-sm font-medium text-white">Genres</th>
                <th scope="col" className="px-3 py-3 text-left text-sm font-medium text-white">Date Created</th>
                <th scope="col" className="px-3 py-3 text-left text-sm font-medium text-white">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-500 bg-gray-600">
              {books.map((book, index) => (
                <tr key={index} className="hover:bg-gray-700/50 transition-colors">
                  <td className="whitespace-nowrap px-4 py-4 text-sm text-white sm:pl-6">{book.title}</td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-white">{book.author}</td>
                  <td className="px-3 py-4 text-sm text-white">{book.genres.join(', ')}</td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-white">{book.date}</td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm font-medium">
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-red-500/10 text-red-400 font-semibold">{book.action} <span className="sr-only">Delete</span></span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Card layout for mobile */}
        <div className="flex flex-col gap-4 md:hidden mt-2">
          {books.map((book, index) => (
            <div key={index} className="rounded-xl bg-gray-700/40 border border-gray-500 shadow p-4 flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-base text-white">{book.title}</h3>
                <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-red-500/10 text-red-400 font-semibold">{book.action}</span>
              </div>
              <div className="text-sm text-gray-200"><span className="font-medium">Author:</span> {book.author}</div>
              <div className="text-sm text-gray-200"><span className="font-medium">Genres:</span> {book.genres.join(', ')}</div>
              <div className="text-sm text-gray-200"><span className="font-medium">Date:</span> {book.date}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default page