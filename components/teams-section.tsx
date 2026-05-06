"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Users, Trophy, Target, Star } from "lucide-react"

interface Team {
  id: string
  name: string
  tag: string
  members: number
  wins: number
  kills: number
  rating: number
  featured: boolean
}

const teams: Team[] = [
  {
    id: "1",
    name: "",
    tag: "",
    members: 0,
    wins: 0,
    kills: 0,
    rating: 0,
    featured: true,
  },
  {
    id: "2",
    name: "",
    tag: "",
    members: 0,
    wins: 0,
    kills: 0,
    rating: 0,
    featured: true,
  },
  {
    id: "3",
    name: "",
    tag: "",
    members: 0,
    wins: 0,
    kills: 0,
    rating: 0,
    featured: false,
  },
  {
    id: "4",
    name: "",
    tag: "",
    members: 0,
    wins: 0,
    kills: 0,
    rating: 0,
    featured: false,
  },
  {
    id: "5",
    name: "",
    tag: "",
    members: 0,
    wins: 0,
    kills: 0,
    rating: 0,
    featured: false,
  },
]

export function TeamsSection() {
  const featuredTeams = teams.filter((team) => team.featured)
  const otherTeams = teams.filter((team) => !team.featured)

  return (
    <section id="equipes" className="bg-card/50 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Équipes <span className="text-primary">Participantes</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Découvrez les meilleures équipes qui participent à nos tournois
          </p>
        </div>

        {/* Featured Teams */}
        <div className="mb-8 grid gap-6 md:grid-cols-3">
          {featuredTeams.map((team) => (
            <Card
              key={team.id}
              className="group relative overflow-hidden transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5"
            >
              <div className="absolute right-4 top-4">
                <Badge className="bg-primary/20 text-primary border-primary/30">
                  <Star className="mr-1 size-3" />
                  Équipe Vedette
                </Badge>
              </div>
              <CardHeader className="pb-4 pt-12">
                <div className="flex items-center gap-4">
                  <Avatar className="size-16 border-2 border-primary/30">
                    <AvatarFallback className="bg-primary/10 text-lg font-bold text-primary">
                      {team.tag}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-xl">{team.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">[{team.tag}]</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="rounded-lg bg-secondary/50 p-3">
                    <Trophy className="mx-auto mb-1 size-5 text-primary" />
                    <p className="text-lg font-bold">{team.wins}</p>
                    <p className="text-xs text-muted-foreground">Victoires</p>
                  </div>
                  <div className="rounded-lg bg-secondary/50 p-3">
                    <Target className="mx-auto mb-1 size-5 text-primary" />
                    <p className="text-lg font-bold">{team.kills}</p>
                    <p className="text-xs text-muted-foreground">Kills</p>
                  </div>
                  <div className="rounded-lg bg-secondary/50 p-3">
                    <Users className="mx-auto mb-1 size-5 text-primary" />
                    <p className="text-lg font-bold">{team.members}</p>
                    <p className="text-xs text-muted-foreground">Membres</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Other Teams Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {otherTeams.map((team) => (
            <Card
              key={team.id}
              className="group transition-all hover:border-primary/50"
            >
              <CardContent className="flex items-center gap-4 p-4">
                <Avatar className="size-12 border border-border">
                  <AvatarFallback className="bg-secondary text-sm font-bold">
                    {team.tag}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="font-semibold">{team.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {team.members} membres • {team.wins} victoires
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-primary">{team.kills}</p>
                  <p className="text-xs text-muted-foreground">kills</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
