import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Clock, Users, AlertTriangle, Trophy, CheckCircle } from "lucide-react"

const rules = [
  {
    icon: Users,
    title: "Format Squad",
    description: "Équipes de 6 joueurs maximum (4 principaux et 2 remplaçants). Les membres peuvent être remplacés entre les tournois.",
  },
  {
    icon: Clock,
    title: "Ponctualité",
    description: "Présence obligatoire 10 minutes avant le début du match. Retards non tolérés.",
  },
  {
    icon: Shield,
    title: "Fair-play",
    description: "Toute forme de triche (hacks, exploits, teaming) entraîne une disqualification immédiate.",
  },
  {
    icon: Trophy,
    title: "Points",
    description: "Système de points basé sur le placement (1er: 10pts, 2ème: 6pts, 3ème: 5pts...) + kills (1pt chacun).",
  },
  {
    icon: AlertTriangle,
    title: "Sanctions",
    description: "Comportement toxique = avertissement. 3 avertissements = ban de la saison.",
  },
  {
    icon: CheckCircle,
    title: "Validation",
    description: "Scores validés par les admins. Captures d'écran obligatoires en cas de litige.",
  },
]

export function RulesSection() {
  return (
    <section id="regles" className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Règles du <span className="text-primary">Tournoi</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Respectez les règles pour une compétition juste et équitable
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {rules.map((rule, index) => (
            <Card key={index} className="transition-all hover:border-primary/30">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-3 text-lg">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                    <rule.icon className="size-5 text-primary" />
                  </div>
                  {rule.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{rule.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
