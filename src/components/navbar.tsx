import React from 'react'
import SearchComplaint from './search-complaint'
import Link from 'next/link'

const Navbar = () => {
    return (
        <div className="navbar h-[10vh] bg-transparent shadow-sm justify-between">
            <Link href={"/"} className="font-bold text-xl">
                Complaint Box
            </Link>
            <div>
                <SearchComplaint />
            </div>
        </div>
    )
}

export default Navbar