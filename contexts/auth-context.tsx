"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface User {
  id: string
  pseudo: string
  pubgId: string
  phone: string
  email: string
  createdAt: Date
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<boolean>
  signup: (userData: Omit<User, "id" | "createdAt"> & { password: string }) => Promise<boolean>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Vérifier si un utilisateur est déjà connecté (localStorage)
    const storedUser = localStorage.getItem("supremyx_user")
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch {
        localStorage.removeItem("supremyx_user")
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simuler une connexion (vérifier localStorage pour les utilisateurs enregistrés)
    const storedUsers = JSON.parse(localStorage.getItem("supremyx_users") || "[]")
    const foundUser = storedUsers.find(
      (u: User & { password: string }) => u.email === email && u.password === password
    )
    
    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser
      setUser(userWithoutPassword)
      localStorage.setItem("supremyx_user", JSON.stringify(userWithoutPassword))
      return true
    }
    return false
  }

  const signup = async (userData: Omit<User, "id" | "createdAt"> & { password: string }): Promise<boolean> => {
    // Vérifier si l'email existe déjà
    const storedUsers = JSON.parse(localStorage.getItem("supremyx_users") || "[]")
    const emailExists = storedUsers.some((u: User) => u.email === userData.email)
    
    if (emailExists) {
      return false
    }

    const newUser: User = {
      id: crypto.randomUUID(),
      pseudo: userData.pseudo,
      pubgId: userData.pubgId,
      phone: userData.phone,
      email: userData.email,
      createdAt: new Date(),
    }

    // Sauvegarder l'utilisateur avec son mot de passe
    storedUsers.push({ ...newUser, password: userData.password })
    localStorage.setItem("supremyx_users", JSON.stringify(storedUsers))

    // Connecter automatiquement l'utilisateur
    setUser(newUser)
    localStorage.setItem("supremyx_user", JSON.stringify(newUser))

    return true
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("supremyx_user")
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
