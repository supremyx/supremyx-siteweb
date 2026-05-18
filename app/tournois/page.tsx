"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { TournamentsSection } from "@/components/tournaments-section"
import { RegistrationDialog } from "@/components/registration-dialog"
import { SignupDialog } from "@/components/signup-dialog"
import { type Tournament } from "@/lib/tournaments-data"
import { useAuth } from "@/contexts/auth-context"

export default function TournoisPage() {
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false)
  const [signupOpen, setSignupOpen] = useState(false)
  const [selectedTournament, setSelectedTournament] = useState<Tournament | null>(null)
  const { isAuthenticated } = useAuth()

  const handleOpenRegistration = (tournament: Tournament) => {
    if (!isAuthenticated) {
      setSignupOpen(true)
      return
    }
    setSelectedTournament(tournament)
    setIsRegistrationOpen(true)
  }

  const handleOpenSignup = () => {
    setSignupOpen(true)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <TournamentsSection 
          onOpenRegistration={handleOpenRegistration}
          onOpenSignup={handleOpenSignup}
        />
      </main>
      <Footer />
      <RegistrationDialog 
        open={isRegistrationOpen} 
        onOpenChange={setIsRegistrationOpen}
        tournament={selectedTournament}
      />
      <SignupDialog
        open={signupOpen}
        onOpenChange={setSignupOpen}
      />
    </div>
  )
}
