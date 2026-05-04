"use client"

import { Button } from "@/components/ui/button"
import { Trophy, Users, Zap, Target } from "lucide-react"

interface HeroSectionProps {
  onOpenRegistration: () => void
}

export function HeroSection({ onOpenRegistration }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent" />
      <div className="absolute -top-40 -right-40 size-80 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute -bottom-40 -left-40 size-80 rounded-full bg-primary/5 blur-3xl" />
      
      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-32 lg:px-8">
        <div className="text-center">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            <Zap className="size-4" />
            Saison 2026 - Inscriptions ouvertes
          </div>

          {/* Title */}
          <h1 className="mx-auto max-w-4xl text-balance text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            Plateforme Esport{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              PUBG Mobile
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg text-muted-foreground sm:text-xl">
            Tournois automatiques • Classement en temps réel • Compétition nationale
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" className="w-full gap-2 sm:w-auto" onClick={onOpenRegistration}>
              <Target className="size-5" />
              S&apos;inscrire maintenant
            </Button>
            <Button variant="outline" size="lg" className="w-full sm:w-auto" asChild>
              <a href="#tournois">
                Voir les tournois
              </a>
            </Button>
          </div>

          {/* Stats */}
          <div className="mx-auto mt-16 grid max-w-3xl grid-cols-2 gap-6 sm:grid-cols-4">
            <StatCard icon={Users} value="200+" label="Joueurs" />
            <StatCard icon={Trophy} value="3+" label="Tournois" />
            <StatCard icon={Target} value="60+" label="Équipes" />
            <StatCard icon={Zap} value="4/7" label="Compétitions" />
          </div>
        </div>
      </div>
    </section>
  )
}

function StatCard({
  icon: Icon,
  value,
  label,
}: {
  icon: React.ElementType
  value: string
  label: string
}) {
  return (
    <div className="flex flex-col items-center gap-2 rounded-xl border border-border/50 bg-card/50 p-4 backdrop-blur-sm">
      <Icon className="size-5 text-primary" />
      <span className="text-2xl font-bold">{value}</span>
      <span className="text-sm text-muted-foreground">{label}</span>
    </div>
  )
}
