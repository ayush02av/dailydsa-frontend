"use client"
import { context } from "@/app/context"
import { useContext } from "react"
import Link from "next/link"

export default function Header() {
    const { profile } = useContext(context)

    return (
        <div
            className="bg-blue-500 text-white w-screen p-5 md:px-20 text-lg font-semibold flex justify-between"
        >
            <Link href='/dashboard'>Daily DSA Tracker</Link>
            <div>
                {profile && <Link href='/dashboard/profile'><i className="fa-solid fa-user"></i></Link>}
                {profile && profile.is_admin && <Link href='/dashboard/admin' className="mx-5"><i className="fa-solid fa-user-lock"></i></Link>}
            </div>
        </div>
    )
}