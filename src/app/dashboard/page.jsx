import Daily from "@/components/dashboard/index/daily"
import History from "@/components/dashboard/index/history"
// import Stats from "@/components/dashboard/index/stats"
// import Leaderboard from "@/components/dashboard/index/leaderboard"

export default function Dashboard() {
    return (
        <div>
            <div className="md:grid md:grid-cols-3">
                <div className="md:col-span-2">
                    <Daily />
                    <History />
                </div>
                {/* <Stats /> */}
            </div>
            {/* <Leaderboard /> */}
        </div>
    )
}