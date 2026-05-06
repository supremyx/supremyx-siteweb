import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { RulesSection } from "@/components/rules-section"

export default function ReglesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <RulesSection />
      </main>
      <Footer />
    </div>
  )
}
