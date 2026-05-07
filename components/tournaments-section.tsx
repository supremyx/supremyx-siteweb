"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Users, Trophy, Clock } from "lucide-react"

interface Tournament {
  id: string
  name: string
  date: string
  time: string
  prize: string
  slots: number
  registered: number
  status: "open" | "full" | "upcoming" | "live"
  type: "solo" | "duo" | "squad"
}

const tournaments: Tournament[] = [
  {
    id: "1",
    name: "Clan Battles League CI",
    date: "16 Mai 2026",
    time: "20h00",
    prize: "360 UC",
    slots: 20,
    registered: 0,
    status: "open",
    type: "squad",
  },
  {
    id: "2",
    name: "Tournois Duo Masters",
    date: "19 Mai 2026",
    time: "20h00",
    prize: "240 UC",
    slots: 50,
    registered: 0,
    status: "full",
    type: "duo",
  },
  {
    id: "3",
    name: "Tournois Solo Champion",
    date: "21 Mai 2026",
    time: "20h00",
    prize: "120 UC",
    slots: 100,
    registered: 0,
    status: "live",
    type: "solo",
  },
  {
    id: "4",
    name: "Elite Rush League CI",
    date: "BIENTÔT",
    time: "",
    prize: "",
    slots: 24,
    registered: 0,
    status: "upcoming",
    type: "squad",
  },
]

interface TournamentsSectionProps {
  onOpenRegistration: () => void
}

export function TournamentsSection({ onOpenRegistration }: TournamentsSectionProps) {
  return (
    <section id="tournois" className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Tournois <span className="text-primary">Disponibles</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Rejoignez nos compétitions et affrontez les meilleurs joueurs de Côte d&apos;Ivoire
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {tournaments.map((tournament) => (
            <TournamentCard
              key={tournament.id}
              tournament={tournament}
              onRegister={onOpenRegistration}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function TournamentCard({
  tournament,
  onRegister,
}: {
  tournament: Tournament
  onRegister: () => void
}) {
  const getStatusBadge = (status: Tournament["status"]) => {
    switch (status) {
      case "open":
        return <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Ouvert</Badge>
      case "full":
        return <Badge className="bg-red-500/20 text-red-400 border-red-500/30">Complet</Badge>
      case "upcoming":
        return <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">À venir</Badge>
      case "live":
        return <Badge className="bg-primary/20 text-primary border-primary/30 animate-pulse">EN DIRECT</Badge>
    }
  }

  const getTypeBadge = (type: Tournament["type"]) => {
    const labels = { solo: "Solo", duo: "Duo", squad: "Squad" }
    return <Badge variant="outline">{labels[type]}</Badge>
  }

  const progress = (tournament.registered / tournament.slots) * 100

  return (
    <Card className="group relative overflow-hidden transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5">
      {tournament.status === "live" && (
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
      )}
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-lg">{tournament.name}</CardTitle>
          {getStatusBadge(tournament.status)}
        </div>
        <CardDescription className="flex items-center gap-4 pt-2">
          <span className="flex items-center gap-1">
            <Calendar className="size-4" />
            {tournament.date}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="size-4" />
            {tournament.time}
          </span>
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Trophy className="size-5 text-primary" />
            <span className="font-semibold">{tournament.prize}</span>
          </div>
          {getTypeBadge(tournament.type)}
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-1 text-muted-foreground">
              <Users className="size-4" />
              Places
            </span>
            <span className="font-medium">
              {tournament.registered}/{tournament.slots}
            </span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-secondary">
            <div
              className="h-full rounded-full bg-primary transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <Button
          className="w-full"
          disabled={tournament.status === "full" || tournament.status === "live"}
          onClick={onRegister}
        >
          {tournament.status === "full"
            ? "Complet"
            : tournament.status === "live"
            ? "En cours"
            : "S'inscrire"}
        </Button>
      </CardContent>
    </Card>
  )
}
