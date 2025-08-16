// Admin Dashboard - User and system management
import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, Settings, Shield, BarChart3, FileText, AlertTriangle } from "lucide-react"

export default function AdminDashboard() {
  return (
    <DashboardLayout title="Admin Dashboard" description="Manage users, system settings, and administrative tasks">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* User Management */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              User Management
            </CardTitle>
            <CardDescription>Manage system users and permissions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Total Users</span>
                <Badge variant="secondary">247</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Active Users</span>
                <Badge className="bg-green-100 text-green-800">189</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Pending Approvals</span>
                <Badge className="bg-yellow-100 text-yellow-800">12</Badge>
              </div>
            </div>
            <Button className="w-full">Manage Users</Button>
          </CardContent>
        </Card>

        {/* System Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              System Settings
            </CardTitle>
            <CardDescription>Configure system preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full bg-transparent" variant="outline">
              General Settings
            </Button>
            <Button className="w-full bg-transparent" variant="outline">
              Email Configuration
            </Button>
            <Button className="w-full bg-transparent" variant="outline">
              Backup Settings
            </Button>
            <Button className="w-full bg-transparent" variant="outline">
              Integration Settings
            </Button>
          </CardContent>
        </Card>

        {/* Security Management */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Security Management
            </CardTitle>
            <CardDescription>Monitor and manage security</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full bg-transparent" variant="outline">
              Access Logs
            </Button>
            <Button className="w-full bg-transparent" variant="outline">
              Permission Settings
            </Button>
            <Button className="w-full bg-transparent" variant="outline">
              Security Policies
            </Button>
            <Button className="w-full bg-transparent" variant="outline">
              Audit Reports
            </Button>
          </CardContent>
        </Card>

        {/* Analytics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              System Analytics
            </CardTitle>
            <CardDescription>Usage statistics and reports</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Daily Active Users</span>
                <Badge className="bg-blue-100 text-blue-800">156</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">System Uptime</span>
                <Badge className="bg-green-100 text-green-800">99.9%</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Storage Used</span>
                <Badge className="bg-orange-100 text-orange-800">67%</Badge>
              </div>
            </div>
            <Button className="w-full">View Full Analytics</Button>
          </CardContent>
        </Card>

        {/* Reports */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Reports & Logs
            </CardTitle>
            <CardDescription>Generate and view system reports</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full bg-transparent" variant="outline">
              User Activity Report
            </Button>
            <Button className="w-full bg-transparent" variant="outline">
              System Performance
            </Button>
            <Button className="w-full bg-transparent" variant="outline">
              Security Report
            </Button>
            <Button className="w-full bg-transparent" variant="outline">
              Export Data
            </Button>
          </CardContent>
        </Card>

        {/* System Alerts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              System Alerts
            </CardTitle>
            <CardDescription>Recent system notifications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2 bg-green-50 rounded border border-green-200">
                <span className="text-sm">System backup completed</span>
                <Badge variant="secondary" className="text-xs">
                  1h ago
                </Badge>
              </div>
              <div className="flex items-center justify-between p-2 bg-yellow-50 rounded border border-yellow-200">
                <span className="text-sm">12 users pending approval</span>
                <Badge variant="secondary" className="text-xs">
                  3h ago
                </Badge>
              </div>
            </div>
            <Button className="w-full bg-transparent" variant="outline">
              View All Alerts
            </Button>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
