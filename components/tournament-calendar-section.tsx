"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Trophy, Users, Clock, CalendarDays } from "lucide-react"
import { cn } from "@/lib/utils"

interface TournamentEvent {
  date: Date
  name: string
  time: string
  type: "solo" | "duo" | "squad"
  prize: string
}

const tournamentEvents: TournamentEvent[] = [
  {
    date: new Date(2026, 4, 16),
    name: "Clan Battles League CI",
    time: "20h00",
    type: "squad",
    prize: "360 UC",
  },
  {
    date: new Date(2026, 4, 19),
    name: "Tournois Duo Masters",
    time: "20h00",
    type: "duo",
    prize: "240 UC",
  },
  {
    date: new Date(2026, 4, 21),
    name: "Tournois Solo Champion",
    time: "20h00",
    type: "solo",
    prize: "120 UC",
  },
  {
    date: new Date(2026, 4, 25),
    name: "Squad Battle Royale",
    time: "19h00",
    type: "squad",
    prize: "500 UC",
  },
  {
    date: new Date(2026, 4, 28),
    name: "Duo Elite Cup",
    time: "20h00",
    type: "duo",
    prize: "300 UC",
  },
  {
    date: new Date(2026, 5, 2),
    name: "Solo Masters",
    time: "20h00",
    type: "solo",
    prize: "150 UC",
  },
  {
    date: new Date(2026, 5, 7),
    name: "Clan Wars Finals",
    time: "18h00",
    type: "squad",
    prize: "1000 UC",
  },
  {
    date: new Date(2026, 5, 14),
    name: "Duo Championship",
    time: "20h00",
    type: "duo",
    prize: "400 UC",
  },
]

const MONTHS_FR = [
  "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
  "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
]

const DAYS_FR = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"]

export function TournamentCalendarSection() {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 4, 1))
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()

  const firstDayOfMonth = new Date(year, month, 1)
  const lastDayOfMonth = new Date(year, month + 1, 0)
  const daysInMonth = lastDayOfMonth.getDate()

  // Get the day of the week for the first day (0 = Sunday, 1 = Monday, etc.)
  let startDay = firstDayOfMonth.getDay()
  // Adjust for Monday start (0 = Monday, 6 = Sunday)
  startDay = startDay === 0 ? 6 : startDay - 1

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1))
    setSelectedDate(null)
  }

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1))
    setSelectedDate(null)
  }

  const getTournamentsForDate = (day: number) => {
    return tournamentEvents.filter(event => {
      return event.date.getFullYear() === year &&
             event.date.getMonth() === month &&
             event.date.getDate() === day
    })
  }

  const getTournamentsForSelectedDate = () => {
    if (!selectedDate) return []
    return tournamentEvents.filter(event => {
      return event.date.getFullYear() === selectedDate.getFullYear() &&
             event.date.getMonth() === selectedDate.getMonth() &&
             event.date.getDate() === selectedDate.getDate()
    })
  }

  const getTypeBadgeColor = (type: TournamentEvent["type"]) => {
    switch (type) {
      case "solo":
        return "bg-yellow-500/20 text-blue-400 border-yellow-500/30"
      case "duo":
        return "bg-purple-500/20 text-green-400 border-purple-500/30"
      case "squad":
        return "bg-pink-500/20 text-primary border-pink-500/30"
    }
  }

  const renderCalendarDays = () => {
    const days = []
    const today = new Date()

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startDay; i++) {
      days.push(
        <div key={`empty-${i}`} className="aspect-square p-1" />
      )
    }

    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const tournaments = getTournamentsForDate(day)
      const hasTournament = tournaments.length > 0
      const isToday = today.getFullYear() === year && today.getMonth() === month && today.getDate() === day
      const isSelected = selectedDate?.getFullYear() === year && 
                         selectedDate?.getMonth() === month && 
                         selectedDate?.getDate() === day

      days.push(
        <button
          key={day}
          onClick={() => setSelectedDate(new Date(year, month, day))}
          className={cn(
            "aspect-square p-1 rounded-lg relative transition-all flex flex-col items-center justify-center gap-0.5",
            "hover:bg-secondary/50",
            isToday && "ring-2 ring-primary/50",
            isSelected && "bg-primary/20 ring-2 ring-primary",
            hasTournament && "font-semibold"
          )}
        >
          <span className={cn(
            "text-sm sm:text-base",
            hasTournament && "text-primary"
          )}>
            {day}
          </span>
          {hasTournament && (
            <div className="flex gap-0.5">
              {tournaments.slice(0, 3).map((t, i) => (
                <div
                  key={i}
                  className={cn(
                    "size-1.5 sm:size-2 rounded-full",
                    t.type === "solo" && "bg-yellow-500",
                    t.type === "duo" && "bg-purple-500",
                    t.type === "squad" && "bg-pink-500"
                  )}
                />
              ))}
            </div>
          )}
        </button>
      )
    }

    return days
  }

  const selectedTournaments = getTournamentsForSelectedDate()

  return (
    <section id="calendrier" className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Calendrier des <span className="text-primary">Tournois</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Consultez les dates de tous nos tournois et ne manquez aucune compétition
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Calendar */}
          <Card className="lg:col-span-2">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={prevMonth}
                  className="size-10"
                >
                  <ChevronLeft className="size-5" />
                </Button>
                <CardTitle className="text-xl sm:text-2xl">
                  {MONTHS_FR[month]} {year}
                </CardTitle>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={nextMonth}
                  className="size-10"
                >
                  <ChevronRight className="size-5" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {/* Days header */}
              <div className="grid grid-cols-7 gap-1 mb-2">
                {DAYS_FR.map((day) => (
                  <div
                    key={day}
                    className="text-center text-xs sm:text-sm font-medium text-muted-foreground py-2"
                  >
                    {day}
                  </div>
                ))}
              </div>
              
              {/* Calendar grid */}
              <div className="grid grid-cols-7 gap-1">
                {renderCalendarDays()}
              </div>

              {/* Legend */}
              <div className="flex flex-wrap items-center justify-center gap-4 mt-6 pt-4 border-t">
                <div className="flex items-center gap-2">
                  <div className="size-3 rounded-full bg-yellow-500" />
                  <span className="text-sm text-muted-foreground">Solo</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="size-3 rounded-full bg-purple-500" />
                  <span className="text-sm text-muted-foreground">Duo</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="size-3 rounded-full bg-pink-500" />
                  <span className="text-sm text-muted-foreground">Squad</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Selected day details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarDays className="size-5 text-primary" />
                {selectedDate ? (
                  <span>
                    {selectedDate.getDate()} {MONTHS_FR[selectedDate.getMonth()]}
                  </span>
                ) : (
                  <span>Sélectionnez un jour</span>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {selectedDate ? (
                selectedTournaments.length > 0 ? (
                  <div className="space-y-4">
                    {selectedTournaments.map((tournament, index) => (
                      <div
                        key={index}
                        className="rounded-lg border bg-card p-4 space-y-3"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="font-semibold">{tournament.name}</h4>
                          <Badge className={getTypeBadgeColor(tournament.type)}>
                            {tournament.type.charAt(0).toUpperCase() + tournament.type.slice(1)}
                          </Badge>
                        </div>
                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock className="size-4" />
                            {tournament.time}
                          </span>
                          <span className="flex items-center gap-1">
                            <Trophy className="size-4 text-primary" />
                            {tournament.prize}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <CalendarDays className="size-12 text-muted-foreground/30 mb-4" />
                    <p className="text-muted-foreground">
                      Aucun tournoi prévu ce jour
                    </p>
                  </div>
                )
              ) : (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <Users className="size-12 text-muted-foreground/30 mb-4" />
                  <p className="text-muted-foreground">
                    Cliquez sur un jour du calendrier pour voir les tournois
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
