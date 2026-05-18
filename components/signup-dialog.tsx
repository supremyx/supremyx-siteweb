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
import { CheckCircle, User, Gamepad2, Phone, Mail, Lock, LogIn } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

interface SignupDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

type FormMode = "signup" | "login"

export function SignupDialog({ open, onOpenChange }: SignupDialogProps) {
  const { signup, login } = useAuth()
  const [mode, setMode] = useState<FormMode>("signup")
  const [formState, setFormState] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")

  // Signup form data
  const [signupData, setSignupData] = useState({
    pseudo: "",
    pubgId: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  // Login form data
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  })

  const resetForms = () => {
    setSignupData({
      pseudo: "",
      pubgId: "",
      phone: "",
      email: "",
      password: "",
      confirmPassword: "",
    })
    setLoginData({
      email: "",
      password: "",
    })
    setErrorMessage("")
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage("")

    if (signupData.password !== signupData.confirmPassword) {
      setErrorMessage("Les mots de passe ne correspondent pas")
      return
    }

    if (signupData.password.length < 6) {
      setErrorMessage("Le mot de passe doit contenir au moins 6 caractères")
      return
    }

    setFormState("loading")

    const success = await signup({
      pseudo: signupData.pseudo,
      pubgId: signupData.pubgId,
      phone: signupData.phone,
      email: signupData.email,
      password: signupData.password,
    })

    if (success) {
      setFormState("success")
      setTimeout(() => {
        setFormState("idle")
        resetForms()
        onOpenChange(false)
      }, 2000)
    } else {
      setFormState("error")
      setErrorMessage("Cette adresse email est déjà utilisée")
    }
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage("")
    setFormState("loading")

    const success = await login(loginData.email, loginData.password)

    if (success) {
      setFormState("success")
      setTimeout(() => {
        setFormState("idle")
        resetForms()
        onOpenChange(false)
      }, 1500)
    } else {
      setFormState("error")
      setErrorMessage("Email ou mot de passe incorrect")
    }
  }

  const switchMode = () => {
    setMode(mode === "signup" ? "login" : "signup")
    setErrorMessage("")
    setFormState("idle")
  }

  if (formState === "success") {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md">
          <div className="flex flex-col items-center gap-4 py-8 text-center">
            <div className="flex size-16 items-center justify-center rounded-full bg-green-500/20">
              <CheckCircle className="size-8 text-green-500" />
            </div>
            <h3 className="text-xl font-bold">
              {mode === "signup" ? "Inscription réussie !" : "Connexion réussie !"}
            </h3>
            <p className="text-muted-foreground">
              {mode === "signup" 
                ? "Votre compte a été créé avec succès. Vous pouvez maintenant vous inscrire aux tournois."
                : "Vous êtes maintenant connecté. Vous pouvez vous inscrire aux tournois."}
            </p>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-2">
            {mode === "signup" ? (
              <User className="size-5 text-primary" />
            ) : (
              <LogIn className="size-5 text-primary" />
            )}
            <DialogTitle>
              {mode === "signup" ? "Créer un compte" : "Se connecter"}
            </DialogTitle>
          </div>
          <DialogDescription>
            {mode === "signup" 
              ? "Inscrivez-vous pour participer aux tournois SUPREMYX CI"
              : "Connectez-vous pour accéder à votre compte"}
          </DialogDescription>
        </DialogHeader>

        {mode === "signup" ? (
          <form onSubmit={handleSignup} className="mt-4 space-y-4">
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="signup-pseudo">
                  <User className="mr-2 inline size-4" />
                  Pseudo du joueur
                </FieldLabel>
                <Input
                  id="signup-pseudo"
                  placeholder="Ex: RushMan"
                  value={signupData.pseudo}
                  onChange={(e) => setSignupData({ ...signupData, pseudo: e.target.value })}
                  required
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="signup-pubgId">
                  <Gamepad2 className="mr-2 inline size-4" />
                  UID PUBG Mobile
                </FieldLabel>
                <Input
                  id="signup-pubgId"
                  placeholder="Ex: 5XXXXXXXXX"
                  value={signupData.pubgId}
                  onChange={(e) => setSignupData({ ...signupData, pubgId: e.target.value })}
                  required
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="signup-phone">
                  <Phone className="mr-2 inline size-4" />
                  Numéro Mobile
                </FieldLabel>
                <Input
                  id="signup-phone"
                  placeholder="Ex: +225XXXXXXXXXX"
                  value={signupData.phone}
                  onChange={(e) => setSignupData({ ...signupData, phone: e.target.value })}
                  required
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="signup-email">
                  <Mail className="mr-2 inline size-4" />
                  Adresse Email
                </FieldLabel>
                <Input
                  id="signup-email"
                  type="email"
                  placeholder="Ex: joueur@email.com"
                  value={signupData.email}
                  onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                  required
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="signup-password">
                  <Lock className="mr-2 inline size-4" />
                  Mot de passe
                </FieldLabel>
                <Input
                  id="signup-password"
                  type="password"
                  placeholder="Au moins 6 caractères"
                  value={signupData.password}
                  onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                  required
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="signup-confirm-password">
                  <Lock className="mr-2 inline size-4" />
                  Confirmer le mot de passe
                </FieldLabel>
                <Input
                  id="signup-confirm-password"
                  type="password"
                  placeholder="Confirmez votre mot de passe"
                  value={signupData.confirmPassword}
                  onChange={(e) => setSignupData({ ...signupData, confirmPassword: e.target.value })}
                  required
                />
              </Field>
            </FieldGroup>

            {errorMessage && (
              <p className="text-sm text-destructive">{errorMessage}</p>
            )}

            <div className="flex gap-3">
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
                    Inscription...
                  </>
                ) : (
                  "S'inscrire"
                )}
              </Button>
            </div>

            <div className="text-center text-sm text-muted-foreground">
              Déjà un compte ?{" "}
              <button
                type="button"
                onClick={switchMode}
                className="text-primary hover:underline"
              >
                Se connecter
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleLogin} className="mt-4 space-y-4">
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="login-email">
                  <Mail className="mr-2 inline size-4" />
                  Adresse Email
                </FieldLabel>
                <Input
                  id="login-email"
                  type="email"
                  placeholder="Ex: joueur@email.com"
                  value={loginData.email}
                  onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                  required
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="login-password">
                  <Lock className="mr-2 inline size-4" />
                  Mot de passe
                </FieldLabel>
                <Input
                  id="login-password"
                  type="password"
                  placeholder="Votre mot de passe"
                  value={loginData.password}
                  onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                  required
                />
              </Field>
            </FieldGroup>

            {errorMessage && (
              <p className="text-sm text-destructive">{errorMessage}</p>
            )}

            <div className="flex gap-3">
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
                    Connexion...
                  </>
                ) : (
                  "Se connecter"
                )}
              </Button>
            </div>

            <div className="text-center text-sm text-muted-foreground">
              Pas encore de compte ?{" "}
              <button
                type="button"
                onClick={switchMode}
                className="text-primary hover:underline"
              >
                S&apos;inscrire
              </button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
