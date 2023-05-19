import Header from "@/components/header"
import DashboardMiddleware from "./middleware"

export default function DashboardLayout({ children }) {
    return (
        <>
            <DashboardMiddleware />
            <Header />
            <div className="w-screen p-10 md:px-20">
                {children}
            </div>
        </>
    )
}
