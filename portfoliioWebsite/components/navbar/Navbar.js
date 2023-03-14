import Link from "next/link"
import { GoThreeBars } from "react-icons/go"
import { RxCross1 } from "react-icons/rx"
import { useState } from "react"
import Image from "next/image"

const Navbar = () => {
    const [navbar, setNavbar] = useState(false);

    return (
        <>
            <nav className={`w-full shadow sticky  top-0 bg-white `} style={{ zIndex:"999"}} >
                <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
                    <div>
                        <div className="flex items-center justify-between py-3 md:py-5 md:block">
                            <Link href="/">
                            <Image src="/logo-2.jpeg"
                        alt="img no available" width="150" height="50" ></Image> 
                     
                            </Link>
                            <div className="md:hidden">
                                <button
                                    className="p-1 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                                    onClick={() => setNavbar(!navbar)}
                                >
                                    {navbar ? <RxCross1 className="text-2xl" /> : <GoThreeBars className="text-2xl" />}
                                </button>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div
                            className={`flex-1 justify-self-center text-center pb-5 mt-8 md:block md:pb-0 md:mt-0 ${navbar ? "block" : "hidden"}`}
                        >
                            <ul className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0">
                                <li className="text-gray-600 font-bold text-lg hover:underline decoration-double hover:text-emerald-600 ">
                                    <Link href="/" >Home</Link>
                                </li>
                                <li className="text-gray-600 font-bold text-lg hover:underline decoration-double  hover:text-emerald-600 ">
                                    <Link href="/about" >About US</Link>
                                </li>
                                <li className="text-gray-600 font-bold text-lg hover:underline decoration-double  hover:text-emerald-600 ">
                                    <Link href="/services" >Services</Link>
                                </li>
                                <li className="text-gray-600 font-bold text-lg hover:underline decoration-double  hover:text-emerald-600 ">
                                    <Link href="/portfolio" >Portfolio</Link>
                                </li>
                                <li className="text-gray-600 font-bold text-lg hover:underline decoration-double  hover:text-emerald-500">
                                    <Link href="/contactus" >Contact US</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>

        </>
    )
}

export default Navbar