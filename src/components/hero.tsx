import Link from 'next/link'
import React from 'react'

const Hero = () => {
    return (
        <div
            className="hero min-h-screen rounded-2xl"
            style={{
                backgroundImage:
                    "url(https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp)",
            }}
        >
            <div className="hero-overlay"></div>
            <div className="hero-content text-neutral-content text-center">
                <div className="max-w-md">
                    <h1 className="mb-5 text-5xl font-bold">Welcome to the Complaint Box</h1>
                    <p className="mb-5">
                        Your voice matters.
                        File a complaint against anyone who has wronged you — we are here to listen, act, and resolve.
                        Your identity will always remain confidential, and no compromise will be made in ensuring your safety.                    </p>
                    <Link href={"/complaint/new"} className="btn">File your Complaint</Link>
                </div>
            </div>
        </div>
    )
}

export default Hero