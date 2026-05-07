"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { TournamentCalendarSection } from "@/components/tournament-calendar-section"
import { Footer } from "@/components/footer"
import { RegistrationDialog } from "@/components/registration-dialog"

export default function Home() {
  const [registrationOpen, setRegistrationOpen] = useState(false)

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1">
        <HeroSection onOpenRegistration={() => setRegistrationOpen(true)} />
        <TournamentCalendarSection />
      </main>

      <Footer />

      <RegistrationDialog 
        open={registrationOpen} 
        onOpenChange={setRegistrationOpen} 
      />
    </div>
  )
}
