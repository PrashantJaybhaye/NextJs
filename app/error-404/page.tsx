import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <main className="root-container flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <h1 className="text-6xl sm:text-7xl font-bold text-primary">404</h1>

      <p className="mt-4 text-xl font-semibold text-white">Page Not Found</p>

      <p className="mt-2 text-base text-[#D6E0FF] max-w-md">
        The page you’re looking for doesn’t exist or has been moved.
      </p>

      <Link
        href="/"
        className="mt-6 inline-block rounded-md bg-primary px-6 py-2 text-black font-medium hover:bg-primary/50 transition"
      >
        Go back home
      </Link>
    </main>
  )
}

export default page