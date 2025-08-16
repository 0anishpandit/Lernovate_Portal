// Super Admin Dashboard - Full system control and management
import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, Settings, Database, Shield, Activity, AlertTriangle } from "lucide-react"

export default function SuperAdminDashboard() {
  return (
    <DashboardLayout title="Super Admin Dashboard" description="Complete system control and management capabilities">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* System Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              System Overview
            </CardTitle>
            <CardDescription>Current system status and metrics</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Total Users</span>
              <Badge variant="secondary">1,247</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Active Sessions</span>
              <Badge variant="secondary">89</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">System Health</span>
              <Badge className="bg-green-100 text-green-800">Healthy</Badge>
            </div>
            <Button className="w-full mt-4">View Detailed Analytics</Button>
          </CardContent>
        </Card>

        {/* User Management */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              User Management
            </CardTitle>
            <CardDescription>Manage all system users and roles</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full bg-transparent" variant="outline">
              Manage Users
            </Button>
            <Button className="w-full bg-transparent" variant="outline">
              Role Assignments
            </Button>
            <Button className="w-full bg-transparent" variant="outline">
              Permission Settings
            </Button>
            <Button className="w-full bg-transparent" variant="outline">
              Bulk Operations
            </Button>
          </CardContent>
        </Card>

        {/* System Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              System Configuration
            </CardTitle>
            <CardDescription>Configure system-wide settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full bg-transparent" variant="outline">
              General Settings
            </Button>
            <Button className="w-full bg-transparent" variant="outline">
              Security Policies
            </Button>
            <Button className="w-full bg-transparent" variant="outline">
              Integration Settings
            </Button>
            <Button className="w-full bg-transparent" variant="outline">
              Backup & Recovery
            </Button>
          </CardContent>
        </Card>

        {/* Database Management */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              Database Management
            </CardTitle>
            <CardDescription>Database operations and maintenance</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full bg-transparent" variant="outline">
              Database Status
            </Button>
            <Button className="w-full bg-transparent" variant="outline">
              Backup Management
            </Button>
            <Button className="w-full bg-transparent" variant="outline">
              Query Console
            </Button>
            <Button className="w-full bg-transparent" variant="outline">
              Performance Metrics
            </Button>
          </CardContent>
        </Card>

        {/* Security Center */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Security Center
            </CardTitle>
            <CardDescription>Monitor and manage system security</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full bg-transparent" variant="outline">
              Security Logs
            </Button>
            <Button className="w-full bg-transparent" variant="outline">
              Access Control
            </Button>
            <Button className="w-full bg-transparent" variant="outline">
              Threat Detection
            </Button>
            <Button className="w-full bg-transparent" variant="outline">
              Audit Reports
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
            <CardDescription>Recent system notifications and alerts</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2 bg-yellow-50 rounded border border-yellow-200">
                <span className="text-sm">Database backup completed</span>
                <Badge variant="secondary" className="text-xs">
                  2h ago
                </Badge>
              </div>
              <div className="flex items-center justify-between p-2 bg-green-50 rounded border border-green-200">
                <span className="text-sm">System update available</span>
                <Badge variant="secondary" className="text-xs">
                  1d ago
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
