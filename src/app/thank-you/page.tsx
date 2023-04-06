"use client"
import { useRouter } from "next/navigation"
import { useEffect } from "react";

export default function ThankYou() {
    const router = useRouter();
    useEffect(() => {
        setTimeout(()=>{
            router.push('/')
        }, 2000)
    }, [])

    return (
        <main>
            <h1 className="text-3xl grid place-content-center min-h-screen">
                Thank you for your feedback!
            </h1>
        </main>
    )
}