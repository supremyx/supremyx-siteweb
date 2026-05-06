"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { TournamentsSection } from "@/components/tournaments-section"
import { TeamsSection } from "@/components/teams-section"
import { LeaderboardSection } from "@/components/leaderboard-section"
import { RulesSection } from "@/components/rules-section"
import { Footer } from "@/components/footer"
import { RegistrationDialog } from "@/components/registration-dialog"

export default function Home() {
  const [registrationOpen, setRegistrationOpen] = useState(false)

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1">
        <HeroSection onOpenRegistration={() => setRegistrationOpen(true)} />
        <TournamentsSection onOpenRegistration={() => setRegistrationOpen(true)} />
        <TeamsSection />
        <LeaderboardSection />
        <RulesSection />
      </main>

      <Footer />

      <RegistrationDialog 
        open={registrationOpen} 
        onOpenChange={setRegistrationOpen} 
      />
    </div>
  )
}
