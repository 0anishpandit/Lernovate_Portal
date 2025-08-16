// Shared dashboard layout component for consistent design across all roles
"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { LogOut, User, Settings, Bell } from "lucide-react"
import type { UserRole } from "@/lib/auth-utils"

interface DashboardUser {
  id: string
  name: string
  email: string
  role: UserRole
  permissions: string[]
  updatedAt?: string
}

interface DashboardLayoutProps {
  children: React.ReactNode
  title: string
  description: string
}

export default function DashboardLayout({ children, title, description }: DashboardLayoutProps) {
  const router = useRouter()
  const [user, setUser] = useState<DashboardUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Verify authentication and get user info
    fetch("/api/auth/verify")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setUser(data.user)
        } else {
          router.push("/")
        }
      })
      .catch((error) => {
        console.error("[v0] Auth verification failed:", error)
        router.push("/")
      })
      .finally(() => {
        setLoading(false)
      })
  }, [router])

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" })
      router.push("/")
    } catch (error) {
      console.error("[v0] Logout error:", error)
      router.push("/")
    }
  }

  const getRoleDisplayName = (role: UserRole): string => {
    return role.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())
  }

  const getRoleBadgeColor = (role: UserRole): string => {
    const colors: Record<UserRole, string> = {
      "super-admin": "bg-purple-100 text-purple-800 border-purple-200",
      admin: "bg-blue-100 text-blue-800 border-blue-200",
      principal: "bg-indigo-100 text-indigo-800 border-indigo-200",
      "vice-principal": "bg-indigo-100 text-indigo-800 border-indigo-200",
      teacher: "bg-orange-100 text-orange-800 border-orange-200",
      student: "bg-cyan-100 text-cyan-800 border-cyan-200",
      parent: "bg-green-100 text-green-800 border-green-200",
      librarian: "bg-pink-100 text-pink-800 border-pink-200",
      accountant: "bg-emerald-100 text-emerald-800 border-emerald-200",
      receptionist: "bg-yellow-100 text-yellow-800 border-yellow-200",
      driver: "bg-gray-100 text-gray-800 border-gray-200",
      guard: "bg-slate-100 text-slate-800 border-slate-200",
      cleaner: "bg-neutral-100 text-neutral-800 border-neutral-200",
    }
    return colors[role] || "bg-gray-100 text-gray-800 border-gray-200"
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-orange-100">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600"></div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-orange-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-orange-600">Lernovate</h1>
              <div className="hidden sm:block">
                <Badge className={getRoleBadgeColor(user.role)}>{getRoleDisplayName(user.role)}</Badge>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Bell className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
              <div className="flex items-center space-x-3">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-orange-100 text-orange-600">
                    {user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="hidden sm:block">
                  <p className="text-sm font-medium text-gray-900">{user.name}</p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>
              </div>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
          <p className="text-gray-600 mt-2">{description}</p>
        </div>

        {/* User Info Card */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              User Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Name</p>
                <p className="text-lg font-semibold text-gray-900">{user.name}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Role</p>
                <Badge className={getRoleBadgeColor(user.role)}>{getRoleDisplayName(user.role)}</Badge>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Last Updated</p>
                <p className="text-lg font-semibold text-gray-900">
                  {user.updatedAt ? new Date(user.updatedAt).toLocaleDateString() : "N/A"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Dashboard Content */}
        {children}
      </main>
    </div>
  )
}
