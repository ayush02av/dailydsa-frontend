"use client"
import { context } from "@/app/context"
import { useContext, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function Header() {
    const { profile } = useContext(context)
    const router = useRouter()

    useEffect(function () {
        if (profile == undefined || profile == null)
            router.push('/')
    }, [profile])

    return (
        <div
            className="bg-blue-500 text-white w-screen p-5 md:px-20 text-lg font-semibold flex justify-between"
        >
            <Link href='/dashboard'>Daily DSA Tracker</Link>
            {profile && (
                <div>
                    <Link href='/dashboard/profile'><i className="fa-solid fa-user"></i></Link>
                </div>
            )}
        </div>
    )
}