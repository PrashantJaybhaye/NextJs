"use client"
import { Search } from 'lucide-react'
import React, { useState } from 'react'
import BookCover from './BookCover'


interface Props {
    Books: Book[]
}

const SearchBook = ({ Books }: Props) => {
    const [searchQuery, setSearchQuery] = useState('')

    const filteredBooks = Books.filter(book =>
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Hero Section */}
            <div className="text-center mb-12">
                <h1 className="sm:text-lg text-sm font-medium text-white mb-3 uppercase tracking-wider">
                    Start Your Next Reading Adventure
                </h1>
                <p className="text-6xl max-sm:text-4xl text-gray-300 font-extrabold mb-8 leading-tight">
                    Browse and <span className='bg-gradient-to-r from-orange-500 via-pink-500 to-purple-400 bg-clip-text text-transparent'>Search Books</span> from Our Digital Library
                </p>

                {/* Search Bar */}
                <div className="max-w-2xl mx-auto relative">
                    <input
                        type="text"
                        placeholder="Search for books or authors..."
                        className="w-full px-6 py-4 rounded-full border border-gray-700 bg-gray-900 placeholder:text-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-red-500 shadow-lg transition-all duration-200"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <Search className="absolute right-6 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                </div>
            </div>

            {/* Search Results */}
            <div className="mb-8">
                <h2 className="text-2xl font2 font-semibold text-gray-400 mb-6">Search Results</h2>

                {filteredBooks.length === 0 ? (
                    <div className="text-center py-12">
                        <div className="border border-dashed border-gray-600 rounded-xl p-8 text-center bg-gray-900/50 max-w-md mx-auto">
                            <div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Search className="w-10 h-10 text-gray-500" />
                            </div>
                            <p className="text-lg font-semibold text-gray-300 mb-2">No books found</p>
                            <p className="text-sm text-gray-500">Try different keywords or check back later</p>
                            <button
                                onClick={() => setSearchQuery('')}
                                className="mt-4 px-4 py-2 text-sm bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg transition-colors"
                            >
                                Clear Search
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredBooks.map((book, index) => (
                            <div
                                key={book.id || index}
                                className="group relative bg-gray-800 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-700"
                            >
                                {/* Book Cover */}
                                <div className="h-64 bg-gray-700 flex items-center justify-center relative overflow-hidden">
                                    <BookCover
                                        coverColor={book.coverColor || '#FFDE59'}
                                        coverImage={book.coverUrl}
                                    />
                                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>
                                </div>

                                {/* Book Details */}
                                <div className="p-5">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="font-bold text-lg text-white line-clamp-1">
                                                {book.title}
                                            </h3>
                                            <p className="text-gray-400 text-sm mt-1 line-clamp-1">by {book.author}</p>
                                        </div>
                                        <span className="flex-shrink-0 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-900 text-blue-200 line-clamp-1">
                                            {book.genre || 'General'}
                                        </span>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="mt-4 flex space-x-2">
                                        <button className="flex-1 bg-gray-700 hover:bg-gray-600 text-gray-200 py-2 px-4 rounded-md text-sm font-medium transition-colors">
                                            Preview
                                        </button>
                                        <button className="flex-1 bg-blue-600 hover:bg-blue-500 text-white py-2 px-4 rounded-md text-sm font-medium transition-colors shadow-sm">
                                            Borrow
                                        </button>
                                    </div>
                                </div>

                                {/* Hover effect overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>

    )
}

export default SearchBook