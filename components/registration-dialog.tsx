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
import { CheckCircle, Users, User, Gamepad2 } from "lucide-react"

interface RegistrationDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function RegistrationDialog({ open, onOpenChange }: RegistrationDialogProps) {
  const [formState, setFormState] = useState<"idle" | "loading" | "success">("idle")
  const [formData, setFormData] = useState({
    team: "",
    leader: "",
    pubgId: "",
    phonenumber: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormState("loading")

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setFormState("success")

    // Reset after showing success
    setTimeout(() => {
      setFormState("idle")
      setFormData({ team: "", leader: "", pubgId: "", phonenumber: "" })
      onOpenChange(false)
    }, 2000)
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
              Votre équipe a été inscrite avec succès. Vous recevrez les détails du tournoi sur Discord.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Gamepad2 className="size-5 text-primary" />
            Inscription équipe
          </DialogTitle>
          <DialogDescription>
            Inscrivez votre équipe au prochain tournoi PUBG Mobile de SUPREMYX
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="mt-4">
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="team">
                <Users className="mr-2 inline size-4" />
                Nom de l&apos;équipe
              </FieldLabel>
              <Input
                id="team"
                placeholder="Ex: CI Warriors"
                value={formData.team}
                onChange={(e) => setFormData({ ...formData, team: e.target.value })}
                required
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="leader">
                <User className="mr-2 inline size-4" />
                Pseudo du leader
              </FieldLabel>
              <Input
                id="leader"
                placeholder="Ex: PunishMan"
                value={formData.leader}
                onChange={(e) => setFormData({ ...formData, leader: e.target.value })}
                required
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="pubgId">
                <Gamepad2 className="mr-2 inline size-4" />
                UID PUBG Mobile
              </FieldLabel>
              <Input
                id="pubgId"
                placeholder="Ex: 5XXXXXXXXX"
                value={formData.pubgId}
                onChange={(e) => setFormData({ ...formData, pubgId: e.target.value })}
                required
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="phonenumber">
                <Mobile className="mr-2 inline size-4" />
                Numéro Mobile Money
              </FieldLabel>
              <Input
                id="phonenumber"
                placeholder="Ex: 0000000000"
                value={formData.phonenumber}
                onChange={(e) => setFormData({ ...formData, phonenumber: e.target.value })}
                required
              />
            </Field>
          </FieldGroup>

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
