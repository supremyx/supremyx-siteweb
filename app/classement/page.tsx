import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { LeaderboardSection } from "@/components/leaderboard-section"

export default function ClassementPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <LeaderboardSection />
      </main>
      <Footer />
    </div>
  )
}
