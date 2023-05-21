"use client"
import { context } from "@/app/context"
import { useContext, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function Header() {
    const { profile } = useContext(context)
    const [burgerOpen, setBurgerOpen] = useState(false)
    const router = useRouter()

    function navigate(link) {
        router.push(link)
        setBurgerOpen(false)
    }

    return (
        <div
            className="bg-gray-200 text-black block"
        >
            <div
                className="p-5 md:px-20 flex justify-between"
            >
                <Link className="font-bold text-lg" href='/'>Dailyy</Link>
                <div className="hidden lg:block">
                    {profile && <Link href='/dashboard' className="mx-5">Dashboard</Link>}
                    {profile && <Link href='/dashboard/profile' className="mx-5"><i className="fa-solid fa-user"></i> Profile</Link>}
                    {profile && profile.is_admin && <Link href='/dashboard/admin' className="mx-5"><i className="fa-solid fa-user-lock"></i> Admin</Link>}
                </div>
                {profile && <button className="block lg:hidden text-xl rounded" onClick={() => setBurgerOpen(!burgerOpen)}>
                    <i className="fas fa-bars"></i>
                </button>}
            </div>
            <div
                className={
                    "items-center pb-5 pl-10 block lg:hidden" +
                    (burgerOpen ? " block" : " hidden")
                }
            >
                {profile && <div onClick={() => navigate('/dashboard')} className="mx-5 my-2 block">Dashboard</div>}
                {profile && <div onClick={() => navigate('/dashboard/profile')} className="mx-5 my-2 block"><i className="fa fa-user"></i> Profile</div>}
                {profile && profile.is_admin && <div onClick={() => navigate('/dashboard/admin')} className="mx-5 my-2 block"><i className="fa fa-user-lock"></i> Admin</div>}
            </div>
        </div>
    )
}