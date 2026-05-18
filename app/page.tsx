"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { TournamentsSection } from "@/components/tournaments-section"
import { TournamentCalendarSection } from "@/components/tournament-calendar-section"
import { Footer } from "@/components/footer"
import { RegistrationDialog } from "@/components/registration-dialog"
import { type Tournament, tournaments } from "@/lib/tournaments-data"

export default function Home() {
  const [registrationOpen, setRegistrationOpen] = useState(false)
  const [selectedTournament, setSelectedTournament] = useState<Tournament | null>(null)

  const handleOpenRegistration = (tournament?: Tournament) => {
    // Si un tournoi est passé, on l'utilise, sinon on prend le premier tournoi ouvert
    const tournamentToUse = tournament || tournaments.find(t => t.status === "open") || null
    setSelectedTournament(tournamentToUse)
    setRegistrationOpen(true)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1">
        <HeroSection onOpenRegistration={() => handleOpenRegistration()} />
        <TournamentsSection onOpenRegistration={handleOpenRegistration} />
        <TournamentCalendarSection />
      </main>

      <Footer />

      <RegistrationDialog 
        open={registrationOpen} 
        onOpenChange={setRegistrationOpen}
        tournament={selectedTournament}
      />
    </div>
  )
}
