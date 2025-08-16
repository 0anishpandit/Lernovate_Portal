// Principal Dashboard - School leadership and oversight
import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { School, Users, BarChart3, FileText, Calendar, MessageSquare } from "lucide-react"

export default function PrincipalDashboard() {
  return (
    <DashboardLayout title="Principal Dashboard" description="School leadership, oversight, and strategic management">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* School Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <School className="h-5 w-5" />
              School Overview
            </CardTitle>
            <CardDescription>Current school statistics</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Total Students</span>
                <Badge className="bg-blue-100 text-blue-800">1,247</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Total Teachers</span>
                <Badge className="bg-green-100 text-green-800">89</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Overall Attendance</span>
                <Badge className="bg-orange-100 text-orange-800">94%</Badge>
              </div>
            </div>
            <Button className="w-full">View Detailed Report</Button>
          </CardContent>
        </Card>

        {/* Staff Management */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Staff Management
            </CardTitle>
            <CardDescription>Manage teaching and support staff</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full bg-transparent" variant="outline">
              Teacher Evaluations
            </Button>
            <Button className="w-full bg-transparent" variant="outline">
              Staff Directory
            </Button>
            <Button className="w-full bg-transparent" variant="outline">
              Performance Reviews
            </Button>
            <Button className="w-full bg-transparent" variant="outline">
              Professional Development
            </Button>
          </CardContent>
        </Card>

        {/* Academic Performance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Academic Performance
            </CardTitle>
            <CardDescription>School-wide academic metrics</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Average GPA</span>
                <Badge className="bg-green-100 text-green-800">3.4</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Graduation Rate</span>
                <Badge className="bg-blue-100 text-blue-800">96%</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">College Acceptance</span>
                <Badge className="bg-purple-100 text-purple-800">87%</Badge>
              </div>
            </div>
            <Button className="w-full">Academic Reports</Button>
          </CardContent>
        </Card>

        {/* Policy & Administration */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Policy & Administration
            </CardTitle>
            <CardDescription>School policies and administrative tasks</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full bg-transparent" variant="outline">
              School Policies
            </Button>
            <Button className="w-full bg-transparent" variant="outline">
              Budget Management
            </Button>
            <Button className="w-full bg-transparent" variant="outline">
              Compliance Reports
            </Button>
            <Button className="w-full bg-transparent" variant="outline">
              Strategic Planning
            </Button>
          </CardContent>
        </Card>

        {/* School Calendar */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              School Calendar
            </CardTitle>
            <CardDescription>Important dates and events</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <div className="flex justify-between items-center p-2 bg-blue-50 rounded border border-blue-200">
                <span className="text-sm font-medium">Board Meeting</span>
                <span className="text-xs text-gray-600">Today 3:00 PM</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-green-50 rounded border border-green-200">
                <span className="text-sm font-medium">Parent-Teacher Conference</span>
                <span className="text-xs text-gray-600">Tomorrow</span>
              </div>
            </div>
            <Button className="w-full bg-transparent" variant="outline">
              View Full Calendar
            </Button>
          </CardContent>
        </Card>

        {/* Communications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Communications
            </CardTitle>
            <CardDescription>School-wide communications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full bg-transparent" variant="outline">
              Send Announcement
            </Button>
            <Button className="w-full bg-transparent" variant="outline">
              Parent Communications
            </Button>
            <Button className="w-full bg-transparent" variant="outline">
              Staff Memos
            </Button>
            <Button className="w-full bg-transparent" variant="outline">
              Community Updates
            </Button>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
