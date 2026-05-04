"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Trophy, Medal, Award, TrendingUp, TrendingDown, Minus } from "lucide-react"

interface Team {
  rank: number
  name: string
  points: number
  wins: number
  kills: number
  matches: number
  trend: "up" | "down" | "same"
}

const teams: Team[] = [
  { rank: 1, name: "Phoenix Elite", points: 2450, wins: 12, kills: 186, matches: 20, trend: "same" },
  { rank: 2, name: "CI Warriors", points: 2380, wins: 10, kills: 172, matches: 20, trend: "up" },
  { rank: 3, name: "Abidjan Legends", points: 2290, wins: 9, kills: 165, matches: 20, trend: "up" },
  { rank: 4, name: "Storm Riders", points: 2180, wins: 8, kills: 158, matches: 20, trend: "down" },
  { rank: 5, name: "Ghost Squad CI", points: 2050, wins: 7, kills: 145, matches: 19, trend: "up" },
  { rank: 6, name: "Ivory Predators", points: 1980, wins: 7, kills: 142, matches: 19, trend: "down" },
  { rank: 7, name: "Cocody Snipers", points: 1920, wins: 6, kills: 138, matches: 18, trend: "same" },
  { rank: 8, name: "Treichville FC", points: 1850, wins: 6, kills: 130, matches: 18, trend: "up" },
  { rank: 9, name: "Yopougon Stars", points: 1780, wins: 5, kills: 125, matches: 18, trend: "down" },
  { rank: 10, name: "Plateau Kings", points: 1720, wins: 5, kills: 120, matches: 17, trend: "same" },
]

export function LeaderboardSection() {
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="size-5 text-yellow-500" />
      case 2:
        return <Medal className="size-5 text-gray-400" />
      case 3:
        return <Award className="size-5 text-amber-600" />
      default:
        return <span className="text-muted-foreground">{rank}</span>
    }
  }

  const getTrendIcon = (trend: Team["trend"]) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="size-4 text-green-500" />
      case "down":
        return <TrendingDown className="size-4 text-red-500" />
      case "same":
        return <Minus className="size-4 text-muted-foreground" />
    }
  }

  return (
    <section id="classement" className="bg-card/50 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Classement <span className="text-primary">Live</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Les meilleures équipes de la saison 2026
          </p>
        </div>

        {/* Top 3 Cards */}
        <div className="mb-12 grid gap-4 md:grid-cols-3">
          {teams.slice(0, 3).map((team, index) => (
            <div
              key={team.rank}
              className={`relative overflow-hidden rounded-xl border p-6 text-center ${
                index === 0
                  ? "border-yellow-500/30 bg-gradient-to-br from-yellow-500/10 to-transparent"
                  : index === 1
                  ? "border-gray-400/30 bg-gradient-to-br from-gray-400/10 to-transparent"
                  : "border-amber-600/30 bg-gradient-to-br from-amber-600/10 to-transparent"
              }`}
            >
              <div className="mb-4 flex justify-center">
                {index === 0 ? (
                  <Trophy className="size-12 text-yellow-500" />
                ) : index === 1 ? (
                  <Medal className="size-12 text-gray-400" />
                ) : (
                  <Award className="size-12 text-amber-600" />
                )}
              </div>
              <Badge variant="outline" className="mb-2">
                #{team.rank}
              </Badge>
              <h3 className="text-xl font-bold">{team.name}</h3>
              <p className="mt-2 text-3xl font-bold text-primary">{team.points}</p>
              <p className="text-sm text-muted-foreground">points</p>
              <div className="mt-4 flex justify-center gap-4 text-sm text-muted-foreground">
                <span>{team.wins} victoires</span>
                <span>{team.kills} kills</span>
              </div>
            </div>
          ))}
        </div>

        {/* Full Table */}
        <div className="overflow-hidden rounded-xl border bg-card">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="w-16 text-center">#</TableHead>
                <TableHead>Équipe</TableHead>
                <TableHead className="text-center">Points</TableHead>
                <TableHead className="hidden text-center sm:table-cell">Victoires</TableHead>
                <TableHead className="hidden text-center md:table-cell">Kills</TableHead>
                <TableHead className="hidden text-center lg:table-cell">Matchs</TableHead>
                <TableHead className="w-16 text-center">Trend</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {teams.map((team) => (
                <TableRow
                  key={team.rank}
                  className={
                    team.rank <= 3
                      ? "bg-primary/5 hover:bg-primary/10"
                      : ""
                  }
                >
                  <TableCell className="text-center font-medium">
                    {getRankIcon(team.rank)}
                  </TableCell>
                  <TableCell className="font-medium">{team.name}</TableCell>
                  <TableCell className="text-center font-bold text-primary">
                    {team.points}
                  </TableCell>
                  <TableCell className="hidden text-center sm:table-cell">
                    {team.wins}
                  </TableCell>
                  <TableCell className="hidden text-center md:table-cell">
                    {team.kills}
                  </TableCell>
                  <TableCell className="hidden text-center lg:table-cell">
                    {team.matches}
                  </TableCell>
                  <TableCell className="text-center">
                    {getTrendIcon(team.trend)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </section>
  )
}
