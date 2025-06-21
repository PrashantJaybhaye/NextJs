import React from 'react'
import BookCover from './BookCover';

type BorrowedBookItem = {
    id: string;
    title: string;
    genre: string;
    coverColor: string;
    coverUrl: string;
    status: "BORROWED" | "RETURNED";
    dueDate: string;
    returnDate: string | null;
    userName: string;
};

const BorrowBookList = ({ books, title }: { books: BorrowedBookItem[], title: string; }) => (

    <section className='book-details'>
        <div className="book-list">
        <h2 className='font2 text-4xl text-[#D6E0FF]'>{title}</h2>
            {books.map((book) => (
                <div key={book.id} className="p-3 rounded-xl bg-white/5 shadow-lg text-white border border-white/10">
                    {/* Book Cover */}
                    <BookCover coverColor={book.coverColor} coverImage={book.coverUrl} />
                    

                    {/* Book Title & Genre */}
                    <div className="mt-4 max-sm:max-w-32 sm:max-w-44">
                        <h2 className="text-lg font-semibold line-clamp-1 leading-tight ">{book.title}</h2>
                        <p className="text-sm text-gray-400">{book.genre}</p>
                    </div>

                    {/* Status Badge */}
                    <div className="mt-3 flex items-center gap-2 text-sm">
                        <span className="text-gray-300">Status:</span>
                        <span
                            className={`px-2 py-0.5 rounded-full font-medium text-xs ${book.status === "BORROWED" ? "bg-yellow-500 text-black" : "bg-green-600"
                                }`}
                        >
                            {book.status}
                        </span>
                    </div>

                    {/* Due Date */}
                    <div className="mt-1 text-sm text-gray-300">
                        📅 <span className="font-medium">Due:</span>{" "}
                        {new Date(book.dueDate).toLocaleDateString()}
                    </div>

                    {/* Overdue or Returned */}
                    {book.returnDate ? (
                        <p className="text-sm mt-1 text-green-400 font-medium">
                            <span>✅ Return: </span> {new Date(book.returnDate).toLocaleDateString()}
                        </p>
                    ) : new Date(book.dueDate) < new Date() ? (
                        <p className="text-sm mt-1 text-red-500 font-semibold">
                            ⚠️ Overdue — Return Immediately
                        </p>
                    ) : (
                        <p className="text-sm mt-1 text-yellow-300">
                            ⏳ {Math.ceil((new Date(book.dueDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24))} days left
                        </p>
                    )}
                </div>

            ))}
        </div>
    </section>
);

export default BorrowBookList