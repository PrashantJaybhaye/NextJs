"use client"

import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { DefaultValues, FieldValues, Path, SubmitHandler, useForm, UseFormReturn } from "react-hook-form"
import { ZodType } from 'zod'
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Link from 'next/link'
import { FIELD_NAMES, FIELD_TYPES } from '@/constants'
import { toast } from "sonner"
import { useRouter } from 'next/navigation'
import FileUpload from './FileUpload'


interface Props<T extends FieldValues> {
    schema: ZodType<T>;
    defaultValues: T;
    onSubmit: (data: T) => Promise<{ success: boolean, error?: string }>
    type: "SIGN_IN" | "SIGN_UP"
}

const AuthForm = <T extends FieldValues>({ type, schema, defaultValues, onSubmit }: Props<T>) => {

    const router = useRouter();
    const isSignIn = type === "SIGN_IN"

    const form: UseFormReturn<T> = useForm({
        resolver: zodResolver(schema),
        defaultValues: defaultValues as DefaultValues<T>
    })

    // 2. Define a submit handler.
    const handleSubmit: SubmitHandler<T> = async (data) => {
        const result = await onSubmit(data);

        if (result.success) {
            toast.success(isSignIn ? 'Welcome back!' : 'Your account has been created successfully.', {
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
            router.push('/')
        } else {
            toast.error(result.error || `Error ${isSignIn ? 'Signing In' : 'Signing Up'}`, {
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
        <div className='flex flex-col gap-4'>
            <h1 className='text-2xl font-semibold text-white'>
                {isSignIn ? 'Welcome back to Sidly' : 'Create your library account'}
            </h1>
            <p className='text-[#D6E0FF] text-base'>
                {isSignIn
                    ? "Discover new interests, connect with like-minded people, and explore a world of possibilities."
                    : "Join us to fuel your curiosity, share your passions, and be part of something inspiring."}
            </p>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(handleSubmit)}
                    className="space-y-6 w-full"
                >
                    {Object.keys(defaultValues).map((field) => (
                        <FormField key={field}
                            control={form.control}
                            name={field as Path<T>}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className='capitalize'>{FIELD_NAMES[field.name as keyof typeof FIELD_NAMES]}</FormLabel>
                                    <FormControl>
                                        {field.name === 'universityCard'
                                            ? <FileUpload
                                                type='image'
                                                accept='image/*'
                                                placeholder='Upload your ID'
                                                folder="ids"
                                                varient="dark"
                                                onFileChange={field.onChange}
                                            />
                                            : <Input
                                                required
                                                type={
                                                    FIELD_TYPES[field.name as keyof typeof FIELD_TYPES]
                                                } {...field}
                                                className='form-input'
                                            />
                                        }
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    ))}

                    <Button type="submit" className='form-btn'>{isSignIn ? 'Sign In' : 'Sign Up'}</Button>
                </form>
            </Form>

            <p className='text-center text-base font-medium'>
                {isSignIn ? 'New to Sidly? ' : 'Already have an account? '}
                <Link href={isSignIn ? '/sign-up' : '/sign-in'} className='font-bold text-primary'>
                    {isSignIn ? 'Create an account' : 'SignIn'}
                </Link>
            </p>
        </div>
    )
}

export default AuthForm