import { Session } from 'next-auth'
import React from 'react'

const Header = ({ session }: { session: Session }) => {
    return (
        <header className='admin-header'>
            <div>
                <h2 className='text-[#1E293B] font-semibold text-2xl'>
                    {session?.user?.name || 'Admin Dashboard'}
                </h2>
                <p className="text-slate-500 text-base"> | Manage your site efficiently</p>
            </div>
            {/* <p>Search</p> */}
        </header>
    )
}

export default Header