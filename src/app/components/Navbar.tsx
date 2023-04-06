import Link from 'next/link'
import React from 'react'
import { FaYoutube, FaTwitter, FaGithub, FaLaptop } from 'react-icons/fa'

const Navbar = () => {
    return (
        <nav className='bg-slate-600 p-4 sticky top-0 drop-shadow-lg z-10'>
            <div className='prose prose-xl mx-auto flex justify-between flex-col sm:flex-row'>
                <h1 className="text-3xl font-bold text-white grid place-content-center mb-2 md:mb-0">
                    <Link href={'/'} className='text-white/90 no-underline hover:text-white'>
                        Raman Nagar
                    </Link>
                </h1>
                <div className='flex flex-row justify-center sm:justify-evenly align-middle gap-4 text-white text-4xl lg:text-5xl'>
                    <Link href={'/https://google.com'} target='_blank' className='text-white/90 no-underline hover:text-white'>
                        <FaYoutube />
                    </Link>
                    <Link href={'/https://google.com'} target='_blank' className='text-white/90 no-underline hover:text-white'>
                        <FaLaptop />
                    </Link>
                    <Link href={'/https://google.com'} target='_blank' className='text-white/90 no-underline hover:text-white'>
                        <FaGithub />
                    </Link>
                    <Link href={'/https://google.com'} target='_blank' className='text-white/90 no-underline hover:text-white'>
                        <FaTwitter />
                    </Link>

                </div>

            </div>
        </nav>
    )
}

export default Navbar