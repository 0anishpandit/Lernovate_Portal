// Unauthorized access page for users without proper permissions
"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, Home, LogOut } from "lucide-react"

interface UserInfo {
  name: string
  role: string
  email: string
}

export default function UnauthorizedPage() {
  const router = useRouter()
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get current user info to show personalized message
    fetch("/api/auth/verify")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setUserInfo({
            name: data.user.name,
            role: data.user.role,
            email: data.user.email,
          })
        }
      })
      .catch((error) => {
        console.error("[v0] Failed to get user info:", error)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  const handleGoToDashboard = () => {
    router.push("/dashboard")
  }

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" })
      router.push("/")
    } catch (error) {
      console.error("[v0] Logout error:", error)
      router.push("/")
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-orange-100">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-orange-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
            <AlertTriangle className="h-8 w-8 text-red-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">Access Denied</CardTitle>
          <CardDescription className="text-gray-600">You don't have permission to access this page</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {userInfo && (
            <div className="rounded-lg bg-orange-50 p-4 border border-orange-200">
              <h3 className="font-semibold text-orange-900 mb-2">Current User</h3>
              <div className="space-y-1 text-sm text-orange-800">
                <p>
                  <span className="font-medium">Name:</span> {userInfo.name}
                </p>
                <p>
                  <span className="font-medium">Role:</span>{" "}
                  {userInfo.role.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                </p>
                <p>
                  <span className="font-medium">Email:</span> {userInfo.email}
                </p>
              </div>
            </div>
          )}

          <div className="text-center text-sm text-gray-600">
            <p>This page requires different permissions than your current role allows.</p>
            <p className="mt-2">Contact your administrator if you believe this is an error.</p>
          </div>

          <div className="flex flex-col gap-3">
            <Button onClick={handleGoToDashboard} className="w-full">
              <Home className="mr-2 h-4 w-4" />
              Go to My Dashboard
            </Button>
            <Button variant="outline" onClick={handleLogout} className="w-full bg-transparent">
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
