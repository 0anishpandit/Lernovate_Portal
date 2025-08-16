"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Eye, EyeOff, Loader2, BookOpen, AlertCircle, WifiOff } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useToast } from "@/hooks/use-toast"
import { apiClient } from "@/lib/api"

export function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [emailError, setEmailError] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [isOnline, setIsOnline] = useState(true)
  const [retryCount, setRetryCount] = useState(0)
  const { toast } = useToast()

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validateForm = () => {
    let isValid = true
    setEmailError("")
    setPasswordError("")
    setError("")

    if (!email) {
      setEmailError("Email is required")
      isValid = false
    } else if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address")
      isValid = false
    }

    if (!password) {
      setPasswordError("Password is required")
      isValid = false
    } else if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters")
      isValid = false
    }

    return isValid
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    if (!navigator.onLine) {
      setIsOnline(false)
      setError("No internet connection. Please check your network and try again.")
      toast({
        variant: "destructive",
        title: "Connection Error",
        description: "Please check your internet connection and try again.",
      })
      return
    }

    setIsLoading(true)
    setError("")
    setIsOnline(true)

    try {
      const response = await apiClient.login(email, password, rememberMe)

      if (response.success) {
        const roleDisplayName = response.user.role.replace(/_/g, " ").replace(/\b\w/g, (l: string) => l.toUpperCase())

        toast({
          title: "Login Successful",
          description: `Welcome back, ${response.user.firstName} ${response.user.lastName}! Redirecting to ${roleDisplayName} dashboard...`,
        })

        setTimeout(() => {
          window.location.href = response.dashboardUrl || "/dashboard"
        }, 1500)
      } else {
        setError(response.message || "Login failed. Please try again.")
        toast({
          variant: "destructive",
          title: "Login Failed",
          description: response.message || "An unexpected error occurred.",
        })
      }
    } catch (err: any) {
      console.error("[v0] Login error:", err)
      setRetryCount((prev) => prev + 1)

      if (err.message.includes("Invalid email or password")) {
        setError("Invalid email or password. Please check your credentials.")
        toast({
          variant: "destructive",
          title: "Authentication Failed",
          description: "Invalid email or password.",
        })
      } else if (err.message.includes("fetch") || err.message.includes("network")) {
        setIsOnline(false)
        setError("Network error. Please check your connection and try again.")
        toast({
          variant: "destructive",
          title: "Network Error",
          description: "Unable to connect to the server. Please check your internet connection.",
        })
      } else if (err.message.includes("server") || err.message.includes("500")) {
        setError("Server error. Please try again in a moment.")
        toast({
          variant: "destructive",
          title: "Server Error",
          description: "Something went wrong on our end. Please try again.",
        })
      } else {
        setError("An unexpected error occurred. Please try again.")
        toast({
          variant: "destructive",
          title: "Error",
          description: "An unexpected error occurred. Please try again.",
        })
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleRetry = () => {
    setRetryCount(0)
    setError("")
    handleSubmit(new Event("submit") as any)
  }

  return (
    <Card className="w-full shadow-xl border-0 bg-card/95 backdrop-blur-sm">
      <CardHeader className="space-y-1 text-center pb-6">
        <div className="flex justify-center mb-4">
          <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center shadow-md">
            <BookOpen className="w-6 h-6 text-primary-foreground" />
          </div>
        </div>
        <CardTitle className="text-xl sm:text-2xl font-bold text-card-foreground">Sign In</CardTitle>
        <CardDescription className="text-muted-foreground text-sm sm:text-base">
          Enter your credentials to access your account
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 px-4 sm:px-6">
        {!isOnline && (
          <Alert className="border-destructive/20 bg-destructive/5">
            <WifiOff className="h-4 w-4" />
            <AlertDescription className="text-destructive text-sm">
              No internet connection detected. Please check your network.
            </AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium text-card-foreground">
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`transition-colors text-sm sm:text-base ${emailError ? "border-destructive focus:ring-destructive" : "focus:ring-primary"}`}
              disabled={isLoading}
            />
            {emailError && <p className="text-xs sm:text-sm text-destructive">{emailError}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-medium text-card-foreground">
              Password
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`pr-10 transition-colors text-sm sm:text-base ${passwordError ? "border-destructive focus:ring-destructive" : "focus:ring-primary"}`}
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-card-foreground transition-colors"
                disabled={isLoading}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {passwordError && <p className="text-xs sm:text-sm text-destructive">{passwordError}</p>}
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="remember"
                checked={rememberMe}
                onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                disabled={isLoading}
              />
              <Label htmlFor="remember" className="text-xs sm:text-sm text-muted-foreground cursor-pointer">
                Remember me
              </Label>
            </div>
            <a
              href="/forgot-password"
              className="text-xs sm:text-sm text-accent hover:text-accent/80 transition-colors"
            >
              Forgot password?
            </a>
          </div>

          {error && (
            <Alert className="border-destructive/20 bg-destructive/5">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="text-destructive flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <span className="text-xs sm:text-sm">{error}</span>
                {retryCount > 0 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleRetry}
                    disabled={isLoading}
                    className="ml-0 sm:ml-2 bg-transparent text-xs"
                  >
                    Retry
                  </Button>
                )}
              </AlertDescription>
            </Alert>
          )}

          <Button
            type="submit"
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-2.5 sm:py-3 transition-all duration-200 shadow-md hover:shadow-lg text-sm sm:text-base"
            disabled={isLoading || !isOnline}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Signing in...
              </>
            ) : (
              <>
                {!isOnline && <WifiOff className="w-4 h-4 mr-2" />}
                Sign In
              </>
            )}
          </Button>
        </form>

        <div className="text-center pt-4 border-t border-border">
          <p className="text-xs sm:text-sm text-muted-foreground">
            Use the demo credentials below to access your account
          </p>
        </div>

        <div className="text-center pt-2">
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">
              <strong>Super Admin:</strong> superadmin@lernovate.com / admin123
            </p>
            <p className="text-xs text-muted-foreground">
              <strong>Principal:</strong> principal@lernovate.com / principal123
            </p>
            <p className="text-xs text-muted-foreground">
              <strong>Teacher:</strong> teacher@lernovate.com / teacher123
            </p>
            <p className="text-xs text-muted-foreground">
              <strong>Student:</strong> student@lernovate.com / student123
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
