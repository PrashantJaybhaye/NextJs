import { Session } from 'next-auth'
import React from 'react'

const Header = ({ session }: { session: Session }) => {
    return (
        <header className='admin-header max-sm:mt-4'>
            <div>
                <h2 className='text-neutral-200 font-semibold text-2xl'>
                    {session?.user?.name || 'Admin Dashboard'}
                </h2>
                <p className="text-slate-400 text-base"> | Manage your site efficiently</p>
            </div>
            {/* <p>Search</p> */}
        </header>
    )
}

export default Header