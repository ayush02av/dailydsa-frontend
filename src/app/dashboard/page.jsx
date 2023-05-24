import Daily from "@/components/dashboard/index/daily"
import History from "@/components/dashboard/index/history"
import Previous from "@/components/dashboard/index/previous"
// import Stats from "@/components/dashboard/index/stats"
// import Leaderboard from "@/components/dashboard/index/leaderboard"

export default function Dashboard() {
    return (
        <div>
            <div className="lg:grid lg:grid-cols-5">
                <div className="lg:col-span-3">
                    <Daily />
                    <History />
                </div>
                <div className="lg:col-span-2">
                    <Previous />
                </div>
                {/* <Stats /> */}
            </div>
            {/* <Leaderboard /> */}
        </div>
    )
}