"use client"

import type React from "react"
import { useState } from "react"
import { useAuth } from "../contexts/auth-context"
import { User, Lock, Eye, EyeOff } from "lucide-react"

interface LoginFormProps {
  onSwitchToSignup: () => void
}

export default function LoginForm({ onSwitchToSignup }: LoginFormProps) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const { login } = useAuth()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.email) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email"
    }

    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsLoading(true)
    setErrors({})

    // Simulate login process
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const success = await login(formData.email, formData.password)

    if (!success) {
      setErrors({ submit: "Invalid email or password. Please check your credentials or sign up first." })
    }

    setIsLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="relative inline-block">
            <h1 className="font-creepster text-4xl md:text-6xl text-red-600 blood-drip">
              ENTER THE DARKNESS
              <span className="blood-drop"></span>
              <span className="blood-drop"></span>
              <span className="blood-drop"></span>
            </h1>
          </div>
          <p className="text-gray-400 mt-4">Sign in to access your sinister collection</p>
        </div>

        <div className="bg-gray-900 rounded-lg p-8 border-2 border-red-900 shadow-2xl relative overflow-hidden">
          {/* Blood splatter decorations */}
          <div className="absolute top-0 left-0 w-full h-3 bg-gradient-to-r from-transparent via-red-600 to-transparent opacity-80"></div>
          <div className="absolute bottom-0 left-0 w-full h-3 bg-gradient-to-r from-transparent via-red-600 to-transparent opacity-80"></div>

          {/* Realistic blood drops */}
          <div className="absolute top-2 left-1/4 w-6 h-8 bg-red-600 rounded-full opacity-70 transform rotate-12"></div>
          <div className="absolute top-4 right-1/3 w-4 h-6 bg-red-700 rounded-full opacity-60 transform -rotate-6"></div>
          <div className="absolute bottom-2 left-1/3 w-5 h-7 bg-red-600 rounded-full opacity-65 transform rotate-45"></div>

          <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">Email Address</label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="creepy-input w-full pl-10 pr-4 py-3 rounded-lg"
                  placeholder="Enter your email"
                />
              </div>
              {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="creepy-input w-full pl-10 pr-12 py-3 rounded-lg"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-400 hover:text-red-400 transition-colors"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password}</p>}
            </div>

            {errors.submit && (
              <div className="bg-red-900 border border-red-600 text-red-200 px-4 py-3 rounded-lg">{errors.submit}</div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="creepy-button w-full py-3 px-4 rounded-lg font-semibold"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2 inline-block"></div>
                  Entering...
                </>
              ) : (
                "ENTER THE SINISTER REALM"
              )}
            </button>
          </form>

          <div className="mt-6 text-center relative z-10">
            <p className="text-gray-400">
              New to the darkness?{" "}
              <button onClick={onSwitchToSignup} className="text-red-400 hover:text-red-300 font-semibold">
                Join the cult
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
