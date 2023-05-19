import Link from "next/link"

export default function Header() {

    return (
        <div
            className="bg-blue-500 text-white w-screen p-5 md:px-20 text-lg font-semibold flex justify-between"
        >
            <Link href='/dashboard'>Daily DSA Tracker</Link>
            <Link href='/dashboard/profile'><i className="fa-solid fa-user"></i></Link>
        </div>
    )
}