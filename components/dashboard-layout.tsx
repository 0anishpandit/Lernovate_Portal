"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { LogOut, User, Settings, Bell } from "lucide-react"
import { apiClient } from "@/lib/api"

interface DashboardUser {
  id: string
  firstName: string
  lastName: string
  email: string
  role: string
  dashboardUrl?: string
}

interface DashboardLayoutProps {
  children: React.ReactNode
  title: string
  description: string
  requiredRole: string
}

function DashboardLayout({ children, title, description, requiredRole }: DashboardLayoutProps) {
  const router = useRouter()
  const [user, setUser] = useState<DashboardUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const response = await apiClient.verifyToken()
        if (response.success && response.user) {
          // Check if user has required role
          if (response.user.role !== requiredRole) {
            router.push("/unauthorized")
            return
          }
          setUser(response.user)
        } else {
          router.push("/")
        }
      } catch (error) {
        console.error("[v0] Auth verification failed:", error)
        router.push("/")
      } finally {
        setLoading(false)
      }
    }

    verifyAuth()
  }, [router, requiredRole])

  const handleLogout = async () => {
    try {
      await apiClient.logout()
      router.push("/")
    } catch (error) {
      console.error("[v0] Logout error:", error)
      router.push("/")
    }
  }

  const getRoleDisplayName = (role: string): string => {
    return role.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())
  }

  const getRoleBadgeColor = (role: string): string => {
    const colors: Record<string, string> = {
      Super_Admin: "bg-purple-100 text-purple-800 border-purple-200",
      Institutional_Admin: "bg-blue-100 text-blue-800 border-blue-200",
      Principal: "bg-indigo-100 text-indigo-800 border-indigo-200",
      "Vice-Principal": "bg-indigo-100 text-indigo-800 border-indigo-200",
      Teaching_Staff: "bg-orange-100 text-orange-800 border-orange-200",
      Students: "bg-cyan-100 text-cyan-800 border-cyan-200",
      "Parents/Guardian": "bg-green-100 text-green-800 border-green-200",
      Librarian: "bg-pink-100 text-pink-800 border-pink-200",
      School_CoOrdinator: "bg-emerald-100 text-emerald-800 border-emerald-200",
      Hostel_Warden: "bg-yellow-100 text-yellow-800 border-yellow-200",
      Hostel_Matron: "bg-rose-100 text-rose-800 border-rose-200",
      Mentor: "bg-violet-100 text-violet-800 border-violet-200",
      "Non-Teaching_Staff": "bg-gray-100 text-gray-800 border-gray-200",
    }
    return colors[role] || "bg-gray-100 text-gray-800 border-gray-200"
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  const fullName = `${user.firstName} ${user.lastName}`

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-blue-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-blue-600">Lernovate</h1>
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
                  <AvatarFallback className="bg-blue-100 text-blue-600">
                    {user.firstName[0]}
                    {user.lastName[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="hidden sm:block">
                  <p className="text-sm font-medium text-gray-900">{fullName}</p>
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
        <Card className="mb-8 bg-white/80 backdrop-blur-sm border-blue-100">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5 text-blue-600" />
              User Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Name</p>
                <p className="text-lg font-semibold text-gray-900">{fullName}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Role</p>
                <Badge className={getRoleBadgeColor(user.role)}>{getRoleDisplayName(user.role)}</Badge>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Email</p>
                <p className="text-lg font-semibold text-gray-900">{user.email}</p>
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

export { DashboardLayout }
export default DashboardLayout
