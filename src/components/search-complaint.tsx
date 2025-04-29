import React from 'react'
import Form from 'next/form'


const SearchComplaint = () => {
    return (
        <Form action="/complaint/status" className='flex gap-1'>
            <label className="input bg-transparent">
                <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <g
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        strokeWidth="2.5"
                        fill="none"
                        stroke="currentColor"
                    >
                        <circle cx="11" cy="11" r="8"></circle>
                        <path d="m21 21-4.3-4.3"></path>
                    </g>
                </svg>
                <input type="search" name='id' className="grow" placeholder="Complaint Status By ID" />
                {/* <kbd className="kbd kbd-sm">⌘</kbd>
                    <kbd className="kbd kbd-sm">K</kbd> */}
            </label>
            <button className='btn'>
                Search
            </button>
        </Form>
    )
}

export default SearchComplaint