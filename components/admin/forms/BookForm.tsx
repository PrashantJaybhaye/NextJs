"use client"

import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from 'zod'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useRouter } from 'next/navigation'
import { bookSchema } from '@/lib/validations'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import FileUpload from '@/components/FileUpload'
import ColorPicker from '../ColorPicker'
import { createBook } from '@/lib/admin/actions/book'
import { toast } from 'sonner'


interface Props extends Partial<Book> {
    type?: 'create' | 'update'
}

const BookForm = ({
    type,
}: Props) => {
    const router = useRouter()


    const form = useForm<z.infer<typeof bookSchema>>({
        resolver: zodResolver(bookSchema),
        defaultValues: {
            title: '',
            description: '',
            author: '',
            genre: '',
            rating: 1,
            totalCopies: 1,
            coverUrl: '',
            coverColor: '',
            videoUrl: '',
            summary: '',
        }
    })

    const onSubmit = async (values: z.infer<typeof bookSchema>) => {
        const result = await createBook(values);

        if (result.success) {
            toast.success('Book created successfully', {
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

            router.push(`/admin/books/${result.data.id}`);

        } else {
            toast.error(`${result.message}`, {
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
    }


    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
            >

                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem className='flex flex-col gap-1'>
                            <FormLabel className='text-base text-black/80'>
                                Book Title
                            </FormLabel>
                            <FormControl>

                                <Input
                                    {...field}
                                    required
                                    placeholder='Book title'
                                    className='book-form_input'
                                />

                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="author"
                    render={({ field }) => (
                        <FormItem className='flex flex-col gap-1'>
                            <FormLabel className='text-base text-black/80'>
                                Author
                            </FormLabel>
                            <FormControl>

                                <Input
                                    {...field}
                                    required
                                    placeholder='Book Author'
                                    className='book-form_input'
                                />

                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="genre"
                    render={({ field }) => (
                        <FormItem className='flex flex-col gap-1'>
                            <FormLabel className='text-base text-black/80'>
                                Genre
                            </FormLabel>
                            <FormControl>

                                <Input
                                    {...field}
                                    required
                                    placeholder='Book Genre'
                                    className='book-form_input'
                                />

                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="rating"
                    render={({ field }) => (
                        <FormItem className='flex flex-col gap-1'>
                            <FormLabel className='text-base text-black/80'>
                                Rating
                            </FormLabel>
                            <FormControl>

                                <Input
                                    type='number'
                                    min={1}
                                    max={5}
                                    {...field}
                                    required
                                    placeholder='Book Rating'
                                    className='book-form_input w-fit'
                                />

                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="totalCopies"
                    render={({ field }) => (
                        <FormItem className='flex flex-col gap-1'>
                            <FormLabel className='text-base text-black/80'>
                                Total Copies
                            </FormLabel>
                            <FormControl>

                                <Input
                                    type='number'
                                    min={1}
                                    max={1000}
                                    {...field}
                                    required
                                    placeholder='Total Copies'
                                    className='book-form_input w-fit'
                                />


                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="coverUrl"
                    render={({ field }) => (
                        <FormItem className='flex flex-col gap-1'>
                            <FormLabel className='text-base text-black/80'>
                                Book Image
                            </FormLabel>
                            <FormControl className=''>
                                <FileUpload
                                    type="image"
                                    accept="image/*"
                                    placeholder="Upload Book Cover"
                                    folder="books/covers"
                                    varient="light"
                                    onFileChange={field.onChange}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="coverColor"
                    render={({ field }) => (
                        <FormItem className='flex flex-col gap-1'>
                            <FormLabel className='text-base text-black/80'>
                                Primary Color
                            </FormLabel>
                            <FormControl>
                                <ColorPicker
                                    value={field.value}
                                    onPickerChange={field.onChange}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem className='flex flex-col gap-1'>
                            <FormLabel className='text-base text-black/80'>
                                Book Description
                            </FormLabel>
                            <FormControl>
                                <Textarea
                                    {...field}
                                    required
                                    placeholder='Book Description'
                                    className='book-form_input'
                                    rows={10}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="videoUrl"
                    render={({ field }) => (
                        <FormItem className='flex flex-col gap-1'>
                            <FormLabel className='text-base text-black/80'>
                                Book Trailer
                            </FormLabel>
                            <FormControl>
                                <FileUpload
                                    type="video"
                                    accept="video/*"
                                    placeholder="Upload Book Trailer"
                                    folder="books/videos"
                                    varient="light"
                                    onFileChange={field.onChange}
                                // value={field.value}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="summary"
                    render={({ field }) => (
                        <FormItem className='flex flex-col gap-1'>
                            <FormLabel className='text-base text-black/80'>
                                Book Summary
                            </FormLabel>
                            <FormControl>
                                <Textarea
                                    {...field}
                                    required
                                    placeholder='Book Summary'
                                    className='book-form_input'
                                    rows={5}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type='submit' className='book-form_btn text-white'>
                    Add Book to Library
                </Button>
            </form>
        </Form>
    )
}

export default BookForm