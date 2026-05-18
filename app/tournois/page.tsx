"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { TournamentsSection } from "@/components/tournaments-section"
import { RegistrationDialog } from "@/components/registration-dialog"
import { type Tournament } from "@/lib/tournaments-data"

export default function TournoisPage() {
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false)
  const [selectedTournament, setSelectedTournament] = useState<Tournament | null>(null)

  const handleOpenRegistration = (tournament: Tournament) => {
    setSelectedTournament(tournament)
    setIsRegistrationOpen(true)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <TournamentsSection onOpenRegistration={handleOpenRegistration} />
      </main>
      <Footer />
      <RegistrationDialog 
        open={isRegistrationOpen} 
        onOpenChange={setIsRegistrationOpen}
        tournament={selectedTournament}
      />
    </div>
  )
}
