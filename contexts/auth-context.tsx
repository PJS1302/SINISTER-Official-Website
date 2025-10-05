"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface User {
  name: string
  email: string
  password: string // Added password field for validation
  loginTime?: string
}

interface StoredUser {
  name: string
  email: string
  password: string
  createdAt: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  signup: (userData: { name: string; email: string; password: string }) => Promise<boolean>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for existing user session on app load
    const checkAuth = () => {
      try {
        const storedSession = localStorage.getItem("sinister-session")
        if (storedSession) {
          const sessionData = JSON.parse(storedSession)
          setUser(sessionData)
        }
      } catch (error) {
        console.error("Error loading user session:", error)
        localStorage.removeItem("sinister-session")
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  const signup = async (userData: { name: string; email: string; password: string }): Promise<boolean> => {
    try {
      // Get existing users
      const existingUsers = JSON.parse(localStorage.getItem("sinister-users") || "[]") as StoredUser[]

      // Check if user already exists
      if (existingUsers.find((u) => u.email === userData.email)) {
        return false // User already exists
      }

      // Add new user
      const newUser: StoredUser = {
        ...userData,
        createdAt: new Date().toISOString(),
      }

      existingUsers.push(newUser)
      localStorage.setItem("sinister-users", JSON.stringify(existingUsers))

      // Auto-login after signup
      const userSession = {
        name: userData.name,
        email: userData.email,
        password: userData.password,
        loginTime: new Date().toISOString(),
      }

      localStorage.setItem("sinister-session", JSON.stringify(userSession))
      setUser(userSession)

      return true
    } catch (error) {
      console.error("Signup error:", error)
      return false
    }
  }

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const existingUsers = JSON.parse(localStorage.getItem("sinister-users") || "[]") as StoredUser[]
      const foundUser = existingUsers.find((u) => u.email === email && u.password === password)

      if (!foundUser) {
        return false // Invalid credentials
      }

      const userSession = {
        name: foundUser.name,
        email: foundUser.email,
        password: foundUser.password,
        loginTime: new Date().toISOString(),
      }

      localStorage.setItem("sinister-session", JSON.stringify(userSession))
      setUser(userSession)

      return true
    } catch (error) {
      console.error("Login error:", error)
      return false
    }
  }

  const logout = () => {
    localStorage.removeItem("sinister-session")
    setUser(null)
  }

  return <AuthContext.Provider value={{ user, login, signup, logout, isLoading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
