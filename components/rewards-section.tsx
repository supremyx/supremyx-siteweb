"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trophy, Gift, Star, Crown, Medal, Zap } from "lucide-react"

interface Reward {
  id: string
  title: string
  description: string
  prize: string
  icon: React.ReactNode
  tier: "gold" | "silver" | "bronze" | "special"
  category: string
}

const rewards: Reward[] = [
  {
    id: "1",
    title: "Champion Clan Battles",
    description: "1ère place de la ligue Clan Battles League CI",
    prize: "20000 FCFA",
    icon: <Crown className="size-6" />,
    tier: "gold",
    category: "Squad",
  },
  {
    id: "2",
    title: "Vice-Champion Clan Battles",
    description: "2ème place de la ligue Clan Battles League CI",
    prize: "10000 FCFA",
    icon: <Trophy className="size-6" />,
    tier: "silver",
    category: "Squad",
  },
  {
    id: "3",
    title: "3ème Clan Battles",
    description: "3ème place de la ligue Clan Battles League CI",
    prize: "5000 FCFA",
    icon: <Medal className="size-6" />,
    tier: "bronze",
    category: "Squad",
  },
  {
    id: "4",
    title: "MVP de la ligue",
    description: "Meilleur joueur avec le plus de kills",
    prize: "5000 FCFA",
    icon: <Star className="size-6" />,
    tier: "special",
    category: "Bonus",
  },
  {
    id: "5",
    title: "Champion Duo Masters",
    description: "1ère place du tournoi Duo Masters",
    prize: "6000 FCFA",
    icon: <Crown className="size-6" />,
    tier: "gold",
    category: "Duo",
  },
  {
    id: "6",
    title: "Champion Solo",
    description: "1ère place du tournoi Solo Champion",
    prize: "3000 FCFA",
    icon: <Crown className="size-6" />,
    tier: "gold",
    category: "Solo",
  },
  {
    id: "7",
    title: "Fidélité SUPREMYX",
    description: "Participation à 5 tournois consécutifs",
    prize: "Bonus mystère",
    icon: <Gift className="size-6" />,
    tier: "special",
    category: "Bonus",
  },
]

export function RewardsSection() {
  const getTierStyles = (tier: Reward["tier"]) => {
    switch (tier) {
      case "gold":
        return "bg-yellow-500/10 border-yellow-500/30 hover:border-yellow-500/50"
      case "silver":
        return "bg-slate-400/10 border-slate-400/30 hover:border-slate-400/50"
      case "bronze":
        return "bg-amber-600/10 border-amber-600/30 hover:border-amber-600/50"
      case "special":
        return "bg-primary/10 border-primary/30 hover:border-primary/50"
    }
  }

  const getTierBadge = (tier: Reward["tier"]) => {
    switch (tier) {
      case "gold":
        return <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">Or</Badge>
      case "silver":
        return <Badge className="bg-slate-400/20 text-slate-300 border-slate-400/30">Argent</Badge>
      case "bronze":
        return <Badge className="bg-amber-600/20 text-amber-400 border-amber-600/30">Bronze</Badge>
      case "special":
        return <Badge className="bg-primary/20 text-primary border-primary/30">Spécial</Badge>
    }
  }

  const getIconColor = (tier: Reward["tier"]) => {
    switch (tier) {
      case "gold":
        return "text-yellow-400"
      case "silver":
        return "text-slate-300"
      case "bronze":
        return "text-amber-500"
      case "special":
        return "text-primary"
    }
  }

  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Récompenses <span className="text-primary">SUPREMYX</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Découvrez les prix à gagner dans nos différents tournois et compétitions
          </p>
        </div>

        {/* Stats Summary */}
        <div className="mb-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-primary">1000+</div>
              <div className="text-sm text-muted-foreground">UC distribués</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-primary">4+</div>
              <div className="text-sm text-muted-foreground">Types de tournois</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-primary">10+</div>
              <div className="text-sm text-muted-foreground">Récompenses</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-primary">∞</div>
              <div className="text-sm text-muted-foreground">Opportunités</div>
            </CardContent>
          </Card>
        </div>

        {/* Rewards Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {rewards.map((reward) => (
            <Card 
              key={reward.id} 
              className={`group relative overflow-hidden transition-all ${getTierStyles(reward.tier)}`}
            >
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between gap-2">
                  <div className={`rounded-lg bg-background/50 p-2 ${getIconColor(reward.tier)}`}>
                    {reward.icon}
                  </div>
                  <div className="flex gap-2">
                    <Badge variant="outline">{reward.category}</Badge>
                    {getTierBadge(reward.tier)}
                  </div>
                </div>
                <CardTitle className="mt-4 text-lg">{reward.title}</CardTitle>
                <CardDescription>{reward.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <Gift className="size-5 text-primary" />
                  <span className="text-xl font-bold">{reward.prize}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Info Banner */}
        <Card className="mt-12 border-primary/30 bg-primary/5">
          <CardContent className="flex flex-col items-center gap-4 py-8 text-center sm:flex-row sm:text-left">
            <div className="rounded-full bg-primary/20 p-4">
              <Trophy className="size-8 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold">Comment recevoir vos récompenses ?</h3>
              <p className="mt-1 text-muted-foreground">
                Les UC sont envoyés directement sur votre compte PUBG Mobile dans les 24h suivant la fin du tournoi. 
                Assurez-vous que votre UID PUBG est correct lors de l&apos;inscription !
                Les récompenses financières sont envoyés sur votre compte Mobile Money dans les 72h suivant la fin du tournoi. 
                Assurez-vous que votre Numéro Mobile Money est correct lors de l&apos;inscription !
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
