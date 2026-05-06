"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { TournamentsSection } from "@/components/tournaments-section"
import { RegistrationDialog } from "@/components/registration-dialog"
import { useState } from "react"

export default function TournoisPage() {
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false)

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <TournamentsSection onOpenRegistration={() => setIsRegistrationOpen(true)} />
      </main>
      <Footer />
      <RegistrationDialog 
        open={isRegistrationOpen} 
        onOpenChange={setIsRegistrationOpen} 
      />
    </div>
  )
}
