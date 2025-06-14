import React from 'react'

const page = () => {
  return (
    <main className="root-container flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-[#1A2238] to-[#283E51] px-4">
      <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 shadow-lg flex flex-col items-center">
        <svg
          className="mb-4 text-[#D6E0FF]"
          width="64"
          height="64"
          fill="none"
          viewBox="0 0 64 64"
        >
          <circle cx="32" cy="32" r="30" stroke="#D6E0FF" strokeWidth="4" />
          <path
            d="M32 18v16"
            stroke="#D6E0FF"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <circle cx="32" cy="44" r="2.5" fill="#D6E0FF" />
        </svg>
        <h1 className="font2 text-4xl md:text-5xl font-bold text-[#D6E0FF] text-center">
          Whoa, Slow Down There, Speedy!
        </h1>
        <p className="mt-4 text-lg text-center max-w-xl text-[#A0AEC0]">
          You’ve hit the rate limit. Please wait a moment before trying again.
        </p>
      </div>
    </main>
  )
}

export default page