"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { TournamentsSection } from "@/components/tournaments-section"
import { TournamentCalendarSection } from "@/components/tournament-calendar-section"
import { Footer } from "@/components/footer"
import { RegistrationDialog } from "@/components/registration-dialog"
import { SignupDialog } from "@/components/signup-dialog"
import { type Tournament } from "@/lib/tournaments-data"
import { useAuth } from "@/contexts/auth-context"

export default function Home() {
  const [registrationOpen, setRegistrationOpen] = useState(false)
  const [signupOpen, setSignupOpen] = useState(false)
  const [selectedTournament, setSelectedTournament] = useState<Tournament | null>(null)
  const { isAuthenticated } = useAuth()

  const handleOpenRegistration = (tournament: Tournament) => {
    // Si l'utilisateur n'est pas connecté, ouvrir le formulaire d'inscription
    if (!isAuthenticated) {
      setSignupOpen(true)
      return
    }
    setSelectedTournament(tournament)
    setRegistrationOpen(true)
  }

  const handleOpenSignup = () => {
    setSignupOpen(true)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1">
        <HeroSection onOpenSignup={handleOpenSignup} />
        <TournamentsSection 
          onOpenRegistration={handleOpenRegistration} 
          onOpenSignup={handleOpenSignup}
        />
        <TournamentCalendarSection />
      </main>

      <Footer />

      <RegistrationDialog 
        open={registrationOpen} 
        onOpenChange={setRegistrationOpen}
        tournament={selectedTournament}
      />

      <SignupDialog
        open={signupOpen}
        onOpenChange={setSignupOpen}
      />
    </div>
  )
}
