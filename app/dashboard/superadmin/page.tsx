"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Users, School, Settings, BarChart3, Shield, Database, UserCheck } from "lucide-react"

export default function SuperAdminDashboard() {
  const stats = [
    { title: "Total Users", value: "1,234", icon: Users, change: "+12%" },
    { title: "Active Institutions", value: "45", icon: School, change: "+3%" },
    { title: "System Health", value: "99.9%", icon: Shield, change: "0%" },
    { title: "Database Size", value: "2.4 GB", icon: Database, change: "+5%" },
  ]

  const recentActivities = [
    { action: "New institution registered", user: "Metro High School", time: "2 hours ago", type: "success" },
    { action: "System backup completed", user: "System", time: "4 hours ago", type: "info" },
    { action: "User role updated", user: "john.doe@school.edu", time: "6 hours ago", type: "warning" },
    { action: "Security scan completed", user: "Security System", time: "8 hours ago", type: "success" },
  ]

  return (
    <DashboardLayout
      title="Super Admin Dashboard"
      description="Complete system overview and management"
      requiredRole="Super_Admin"
    >
      <div className="space-y-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-white/80 backdrop-blur-sm border-blue-100">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
                <stat.icon className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <p className="text-xs text-green-600 mt-1">{stat.change} from last month</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <Card className="bg-white/80 backdrop-blur-sm border-blue-100">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Settings className="w-5 h-5 text-blue-600" />
              <span>Quick Actions</span>
            </CardTitle>
            <CardDescription>Frequently used administrative functions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Button variant="outline" className="h-20 flex flex-col space-y-2 bg-transparent">
                <Users className="w-6 h-6 text-blue-600" />
                <span className="text-sm">Manage Users</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col space-y-2 bg-transparent">
                <School className="w-6 h-6 text-blue-600" />
                <span className="text-sm">Institutions</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col space-y-2 bg-transparent">
                <BarChart3 className="w-6 h-6 text-blue-600" />
                <span className="text-sm">Analytics</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col space-y-2 bg-transparent">
                <Shield className="w-6 h-6 text-blue-600" />
                <span className="text-sm">Security</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activities */}
        <Card className="bg-white/80 backdrop-blur-sm border-blue-100">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <UserCheck className="w-5 h-5 text-blue-600" />
              <span>Recent System Activities</span>
            </CardTitle>
            <CardDescription>Latest system events and user activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                  <div className="flex items-center space-x-3">
                    <Badge
                      variant={
                        activity.type === "success" ? "default" : activity.type === "warning" ? "secondary" : "outline"
                      }
                      className="w-2 h-2 p-0 rounded-full"
                    />
                    <div>
                      <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                      <p className="text-xs text-gray-500">{activity.user}</p>
                    </div>
                  </div>
                  <span className="text-xs text-gray-400">{activity.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
