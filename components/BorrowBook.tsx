"use client";

import React, { useState } from 'react'
import { Button } from './ui/button'
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { borrowBook } from '@/lib/actions/book';

interface Props {
    userId: string
    bookId: string
    borrowingEligibility: {
        isEligible: boolean
        message: string
    }
}

const BorrowBook = ({ bookId, userId, borrowingEligibility: { isEligible, message } }: Props) => {
    const router = useRouter()
    const [borrowing, setBorrowing] = useState(false)

    const handleBorrowBook = async () => {
        if (!isEligible) {
            toast.error(message, {
                style: {
                    background: "linear-gradient(90deg, #4a1e1e 0%, #b71c1c 100%)",
                    color: "#fff",
                    borderRadius: "1rem",
                    border: "none",
                    boxShadow: "0 6px 32px rgba(183,28,28,0.18)",
                    fontWeight: 700,
                    letterSpacing: "0.03em",
                    fontSize: "0.9rem",
                    padding: "0.8rem 2rem",
                    minWidth: "320px",
                },
                position: "top-right",
                icon: (
                    <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="12" fill="#ff5252" />
                        <path d="M8 8l8 8M16 8l-8 8" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                ),
            });

            return;
        }

        setBorrowing(true)

        try {
            const result = await borrowBook({ bookId, userId })

            if (result.success) {
                toast.success("Book borrowed successfully", {
                    style: {
                        background: "linear-gradient(90deg, #1e4a20 0%, #2e7d32 100%)",
                        color: "#fff",
                        borderRadius: "1rem",
                        border: "none",
                        boxShadow: "0 6px 32px rgba(46,125,50,0.18)",
                        fontWeight: 700,
                        letterSpacing: "0.03em",
                        fontSize: "0.9rem",
                        padding: "0.8rem 2rem",
                        minWidth: "320px",
                    },
                    position: "top-right",
                    icon: (
                        <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
                            <circle cx="12" cy="12" r="12" fill="#43ea7a" />
                            <path d="M8 12.5l2.5 2.5 5-5" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    ),
                });

                router.push("/my-profile")
            } else {
                toast.error(result.error, {
                    style: {
                        background: "linear-gradient(90deg, #4a1e1e 0%, #b71c1c 100%)",
                        color: "#fff",
                        borderRadius: "1rem",
                        border: "none",
                        boxShadow: "0 6px 32px rgba(183,28,28,0.18)",
                        fontWeight: 700,
                        letterSpacing: "0.03em",
                        fontSize: "0.9rem",
                        padding: "0.8rem 2rem",
                        minWidth: "320px",
                    },
                    position: "top-right",
                    icon: (
                        <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                            <circle cx="12" cy="12" r="12" fill="#ff5252" />
                            <path d="M8 8l8 8M16 8l-8 8" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    ),
                });
            }

        } catch (error) {
            toast.error("An error occurred while borrowing the book", {
                style: {
                    background: "linear-gradient(90deg, #4a1e1e 0%, #b71c1c 100%)",
                    color: "#fff",
                    borderRadius: "1rem",
                    border: "none",
                    boxShadow: "0 6px 32px rgba(183,28,28,0.18)",
                    fontWeight: 700,
                    letterSpacing: "0.03em",
                    fontSize: "0.9rem",
                    padding: "0.8rem 2rem",
                    minWidth: "320px",
                },
                position: "top-right",
                icon: (
                    <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="12" fill="#ff5252" />
                        <path d="M8 8l8 8M16 8l-8 8" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                ),
            });
        } finally {
            setBorrowing(false)
        }
    }

    return (
        <Button className='book-overview_btn' onClick={handleBorrowBook} disabled={borrowing}>
            <Image src='/icons/book.svg' alt='book' height={20} width={20} />
            <p className='font2 text-xl text-[#16191E]'>{borrowing ? 'Borrowing...': 'Borrow Book'}</p>
        </Button>

    )
}

export default BorrowBook