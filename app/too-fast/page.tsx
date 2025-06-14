import React from 'react'

const page = () => {
  return (
    <main className="root-container flex min-h-screen flex-col items-center justify-center px-4">
      <h1 className="font2 text-5xl font-extrabold text-primary text-center">
        Whoa, Slow Down There, Speedy!
      </h1>
      <p className="mt-5 text-lg text-center max-w-xl text-[#D6E0FF] font-medium">
        You’ve hit the rate limit. Please wait a moment before trying again.<br />
        <span className="text-primary font-semibold text-lg">We’re keeping things safe and fair for everyone.</span>
      </p>
    </main>
  )
}

export default page