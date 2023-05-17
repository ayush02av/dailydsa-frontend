import Header from "@/components/header"

export default function DashboardLayout({ children }) {
    return (
        <>
            <Header />
            <div className="w-screen p-10 md:px-20">
                {children}
            </div>
        </>
    )
}
