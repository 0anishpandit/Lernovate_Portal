"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, Home, LogOut } from "lucide-react"
import { apiClient } from "@/lib/api"

interface UserInfo {
  firstName: string
  lastName: string
  role: string
  email: string
}

export default function UnauthorizedPage() {
  const router = useRouter()
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const response = await apiClient.verifyToken()
        if (response.success && response.user) {
          setUserInfo({
            firstName: response.user.firstName,
            lastName: response.user.lastName,
            role: response.user.role,
            email: response.user.email,
          })
        }
      } catch (error) {
        console.error("[v0] Failed to get user info:", error)
      } finally {
        setLoading(false)
      }
    }

    getUserInfo()
  }, [])

  const handleGoToDashboard = () => {
    if (userInfo) {
      // Redirect to appropriate dashboard based on role
      const dashboardMap: Record<string, string> = {
        Super_Admin: "/dashboard/superadmin",
        Institutional_Admin: "/dashboard/institution",
        Principal: "/dashboard/principal",
        "Vice-Principal": "/dashboard/viceprincipal",
        Hostel_Warden: "/dashboard/hostelwarden",
        Hostel_Matron: "/dashboard/hostelmatron",
        Librarian: "/dashboard/librarian",
        School_CoOrdinator: "/dashboard/schoolcoordinator",
        Mentor: "/dashboard/mentor",
        Teaching_Staff: "/dashboard/teachingstaff",
        "Non-Teaching_Staff": "/dashboard/nonteachingstaff",
        "Parents/Guardian": "/dashboard/parents",
        Students: "/dashboard/student",
      }

      const dashboardUrl = dashboardMap[userInfo.role] || "/dashboard"
      router.push(dashboardUrl)
    } else {
      router.push("/")
    }
  }

  const handleLogout = async () => {
    try {
      await apiClient.logout()
      router.push("/")
    } catch (error) {
      console.error("[v0] Logout error:", error)
      router.push("/")
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white p-4">
      <Card className="w-full max-w-md bg-white/80 backdrop-blur-sm border-blue-100">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
            <AlertTriangle className="h-8 w-8 text-red-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">Access Denied</CardTitle>
          <CardDescription className="text-gray-600">You don't have permission to access this page</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {userInfo && (
            <div className="rounded-lg bg-blue-50 p-4 border border-blue-200">
              <h3 className="font-semibold text-blue-900 mb-2">Current User</h3>
              <div className="space-y-1 text-sm text-blue-800">
                <p>
                  <span className="font-medium">Name:</span> {userInfo.firstName} {userInfo.lastName}
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
