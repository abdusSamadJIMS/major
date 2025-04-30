import React from 'react'
import SearchComplaint from './search-complaint'
import Link from 'next/link'
import WalletConnect from './wallet-connect'

const Navbar = () => {
    return (
        <div className="navbar h-[10vh] bg-transparent shadow-sm justify-between">
            <Link href={"/"} className="font-bold text-xl">
                Complaint Box
            </Link>
            <div className='flex gap-x-10'>
                <SearchComplaint />
                <WalletConnect />
            </div>
        </div>
    )
}

export default Navbar