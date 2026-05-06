import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { RewardsSection } from "@/components/rewards-section"

export default function RecompensesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <RewardsSection />
      </main>
      <Footer />
    </div>
  )
}
