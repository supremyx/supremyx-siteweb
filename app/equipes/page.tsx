import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { TeamsSection } from "@/components/teams-section"

export default function EquipesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <TeamsSection />
      </main>
      <Footer />
    </div>
  )
}
