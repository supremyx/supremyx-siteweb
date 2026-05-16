"use client"

import Link from "next/link"
import Image from "next/image"
import { Menu, X, Target } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { RegistrationDialog } from "@/components/registration-dialog"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [registrationOpen, setRegistrationOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-card/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-lg bg-primary">
            <Image 
              src="Logo1 Supremyx.png" 
              alt="SUPREMYX CI Logo" 
              width={50} 
              height={50}
              className="size-9"
            />
          </div>
          <span className="text-xl font-bold tracking-tight">
            SUPREMYX <span className="text-primary">CI</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <Link
            href="/tournois"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            
          </Link>
          <Link
            href="/equipes"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Équipes
          </Link>
          <Link
            href="/classement"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Classement
          </Link>
          <Link
            href="/recompenses"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Récompenses
          </Link>
          <Link
            href="/regles"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Règles
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <Button className="hidden sm:inline-flex" onClick={() => setRegistrationOpen(true)}>
            <Target className="mr-2 size-4" />
            S&apos;inscrire
          </Button>
          <Button asChild className="hidden sm:inline-flex">
            <Link href="https://discord.gg/bT49UQFUMt" target="_blank" rel="noopener noreferrer">
              Rejoindre Discord
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="border-t border-border/50 bg-card md:hidden">
          <nav className="flex flex-col gap-1 p-4">
            <Link
              href="/tournois"
              className="rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-secondary"
              onClick={() => setMobileMenuOpen(false)}
            >
            </Link>
            <Link
              href="/equipes"
              className="rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-secondary"
              onClick={() => setMobileMenuOpen(false)}
            >
              Équipes
            </Link>
            <Link
              href="/classement"
              className="rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-secondary"
              onClick={() => setMobileMenuOpen(false)}
            >
              Classement
            </Link>
            <Link
              href="/recompenses"
              className="rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-secondary"
              onClick={() => setMobileMenuOpen(false)}
            >
              Récompenses
            </Link>
            <Link
              href="/regles"
              className="rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-secondary"
              onClick={() => setMobileMenuOpen(false)}
            >
              Règles
            </Link>
            <Button asChild className="mt-2 w-full sm:hidden">
              <Link href="https://discord.gg/bT49UQFUMt" target="_blank" rel="noopener noreferrer">
                Rejoindre Discord
              </Link>
            </Button>
            <Button className="mt-2 w-full sm:hidden" onClick={() => { setRegistrationOpen(true); setMobileMenuOpen(false); }}>
              <Target className="mr-2 size-4" />
              S&apos;inscrire
            </Button>
          </nav>
        </div>
      )}

      <RegistrationDialog open={registrationOpen} onOpenChange={setRegistrationOpen} />
    </header>
  )
}
