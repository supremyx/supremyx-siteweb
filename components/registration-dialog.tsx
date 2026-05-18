"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Field, FieldLabel, FieldGroup } from "@/components/ui/field"
import { Spinner } from "@/components/ui/spinner"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, User, Gamepad2, Phone, Trophy, Calendar, Clock, Users, UserPlus, X } from "lucide-react"
import { type Tournament } from "@/lib/tournaments-data"

interface RegistrationDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  tournament: Tournament | null
}

interface PlayerData {
  pseudo: string
  pubgId: string
  phone: string
}

interface SoloFormData {
  player: PlayerData
}

interface DuoFormData {
  player1: PlayerData
  player2: PlayerData
}

interface SquadFormData {
  teamName: string
  players: PlayerData[]
}

const emptyPlayer = (): PlayerData => ({
  pseudo: "",
  pubgId: "",
  phone: "",
})

export function RegistrationDialog({ open, onOpenChange, tournament }: RegistrationDialogProps) {
  const [formState, setFormState] = useState<"idle" | "loading" | "success">("idle")

  // Solo form data
  const [soloData, setSoloData] = useState<SoloFormData>({
    player: emptyPlayer(),
  })

  // Duo form data
  const [duoData, setDuoData] = useState<DuoFormData>({
    player1: emptyPlayer(),
    player2: emptyPlayer(),
  })

  // Squad form data
  const [squadData, setSquadData] = useState<SquadFormData>({
    teamName: "",
    players: [emptyPlayer(), emptyPlayer(), emptyPlayer(), emptyPlayer()],
  })

  const resetForms = () => {
    setSoloData({ player: emptyPlayer() })
    setDuoData({ player1: emptyPlayer(), player2: emptyPlayer() })
    setSquadData({
      teamName: "",
      players: [emptyPlayer(), emptyPlayer(), emptyPlayer(), emptyPlayer()],
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormState("loading")

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setFormState("success")

    // Reset after showing success
    setTimeout(() => {
      setFormState("idle")
      resetForms()
      onOpenChange(false)
    }, 2000)
  }

  const updateSoloPlayer = (field: keyof PlayerData, value: string) => {
    setSoloData({
      player: { ...soloData.player, [field]: value },
    })
  }

  const updateDuoPlayer = (playerNum: 1 | 2, field: keyof PlayerData, value: string) => {
    if (playerNum === 1) {
      setDuoData({ ...duoData, player1: { ...duoData.player1, [field]: value } })
    } else {
      setDuoData({ ...duoData, player2: { ...duoData.player2, [field]: value } })
    }
  }

  const updateSquadPlayer = (index: number, field: keyof PlayerData, value: string) => {
    const newPlayers = [...squadData.players]
    newPlayers[index] = { ...newPlayers[index], [field]: value }
    setSquadData({ ...squadData, players: newPlayers })
  }

  const addSquadPlayer = () => {
    if (squadData.players.length < 6) {
      setSquadData({
        ...squadData,
        players: [...squadData.players, emptyPlayer()],
      })
    }
  }

  const removeSquadPlayer = (index: number) => {
    if (squadData.players.length > 4) {
      const newPlayers = squadData.players.filter((_, i) => i !== index)
      setSquadData({ ...squadData, players: newPlayers })
    }
  }

  if (!tournament) {
    return null
  }

  if (formState === "success") {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md">
          <div className="flex flex-col items-center gap-4 py-8 text-center">
            <div className="flex size-16 items-center justify-center rounded-full bg-green-500/20">
              <CheckCircle className="size-8 text-green-500" />
            </div>
            <h3 className="text-xl font-bold">Inscription réussie !</h3>
            <p className="text-muted-foreground">
              Votre inscription au tournoi <span className="font-semibold text-primary">{tournament.name}</span> a été enregistrée avec succès. 
              Vous recevrez les détails sur Discord.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  const getTypeBadge = (type: Tournament["type"]) => {
    const config = {
      solo: { label: "Solo", className: "bg-blue-500/20 text-blue-400 border-blue-500/30" },
      duo: { label: "Duo", className: "bg-purple-500/20 text-purple-400 border-purple-500/30" },
      squad: { label: "Squad", className: "bg-orange-500/20 text-orange-400 border-orange-500/30" },
    }
    return <Badge className={config[type].className}>{config[type].label}</Badge>
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <Trophy className="size-5 text-primary" />
            <DialogTitle>{tournament.name}</DialogTitle>
          </div>
          <DialogDescription className="pt-2">
            <div className="flex flex-wrap items-center gap-3 text-sm">
              {getTypeBadge(tournament.type)}
              {tournament.date && (
                <span className="flex items-center gap-1">
                  <Calendar className="size-4" />
                  {tournament.date}
                </span>
              )}
              {tournament.time && (
                <span className="flex items-center gap-1">
                  <Clock className="size-4" />
                  {tournament.time}
                </span>
              )}
              {tournament.prize && (
                <span className="flex items-center gap-1 text-primary font-medium">
                  <Trophy className="size-4" />
                  {tournament.prize}
                </span>
              )}
            </div>
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="mt-4">
          {/* FORMULAIRE SOLO */}
          {tournament.type === "solo" && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <User className="size-4" />
                Informations du joueur
              </div>
              <PlayerFields
                player={soloData.player}
                onUpdate={(field, value) => updateSoloPlayer(field, value)}
                prefix="solo"
              />
            </div>
          )}

          {/* FORMULAIRE DUO */}
          {tournament.type === "duo" && (
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                  <User className="size-4" />
                  Joueur 1 (Leader)
                </div>
                <PlayerFields
                  player={duoData.player1}
                  onUpdate={(field, value) => updateDuoPlayer(1, field, value)}
                  prefix="duo-1"
                />
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">Coéquipier</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                  <User className="size-4" />
                  Joueur 2
                </div>
                <PlayerFields
                  player={duoData.player2}
                  onUpdate={(field, value) => updateDuoPlayer(2, field, value)}
                  prefix="duo-2"
                />
              </div>
            </div>
          )}

          {/* FORMULAIRE SQUAD */}
          {tournament.type === "squad" && (
            <div className="space-y-6">
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="teamName">
                    <Users className="mr-2 inline size-4" />
                    Nom de l&apos;équipe
                  </FieldLabel>
                  <Input
                    id="teamName"
                    placeholder="Ex: Les Invincibles"
                    value={squadData.teamName}
                    onChange={(e) => setSquadData({ ...squadData, teamName: e.target.value })}
                    required
                  />
                </Field>
              </FieldGroup>

              {squadData.players.map((player, index) => (
                <div key={index} className="space-y-4">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-background px-2 text-muted-foreground">
                        {index === 0 ? "Leader" : `Joueur ${index + 1}`}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                        <User className="size-4" />
                        {index === 0 ? "Joueur 1 (Leader)" : `Joueur ${index + 1}`}
                        {index < 4 && <Badge variant="outline" className="text-xs">Requis</Badge>}
                        {index >= 4 && <Badge variant="secondary" className="text-xs">Remplaçant</Badge>}
                      </div>
                      {index >= 4 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeSquadPlayer(index)}
                          className="size-8 p-0 text-destructive hover:text-destructive"
                        >
                          <X className="size-4" />
                        </Button>
                      )}
                    </div>
                    <PlayerFields
                      player={player}
                      onUpdate={(field, value) => updateSquadPlayer(index, field, value)}
                      prefix={`squad-${index}`}
                      required={index < 4}
                    />
                  </div>
                </div>
              ))}

              {squadData.players.length < 6 && (
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={addSquadPlayer}
                >
                  <UserPlus className="mr-2 size-4" />
                  Ajouter un remplaçant ({squadData.players.length}/6)
                </Button>
              )}
            </div>
          )}

          <div className="mt-6 flex gap-3">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => onOpenChange(false)}
            >
              Annuler
            </Button>
            <Button type="submit" className="flex-1" disabled={formState === "loading"}>
              {formState === "loading" ? (
                <>
                  <Spinner className="mr-2" />
                  Envoi...
                </>
              ) : (
                "S'inscrire"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

interface PlayerFieldsProps {
  player: PlayerData
  onUpdate: (field: keyof PlayerData, value: string) => void
  prefix: string
  required?: boolean
}

function PlayerFields({ player, onUpdate, prefix, required = true }: PlayerFieldsProps) {
  return (
    <FieldGroup>
      <Field>
        <FieldLabel htmlFor={`${prefix}-pseudo`}>
          <User className="mr-2 inline size-4" />
          Pseudo du joueur
        </FieldLabel>
        <Input
          id={`${prefix}-pseudo`}
          placeholder="Ex: RushMan"
          value={player.pseudo}
          onChange={(e) => onUpdate("pseudo", e.target.value)}
          required={required}
        />
      </Field>

      <Field>
        <FieldLabel htmlFor={`${prefix}-pubgId`}>
          <Gamepad2 className="mr-2 inline size-4" />
          UID PUBG Mobile
        </FieldLabel>
        <Input
          id={`${prefix}-pubgId`}
          placeholder="Ex: 5XXXXXXXXX"
          value={player.pubgId}
          onChange={(e) => onUpdate("pubgId", e.target.value)}
          required={required}
        />
      </Field>

      <Field>
        <FieldLabel htmlFor={`${prefix}-phone`}>
          <Phone className="mr-2 inline size-4" />
          Numéro Mobile
        </FieldLabel>
        <Input
          id={`${prefix}-phone`}
          placeholder="Ex: +225XXXXXXXXXX"
          value={player.phone}
          onChange={(e) => onUpdate("phone", e.target.value)}
          required={required}
        />
      </Field>
    </FieldGroup>
  )
}
