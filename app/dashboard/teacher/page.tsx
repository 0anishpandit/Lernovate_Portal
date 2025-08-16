// Teacher Dashboard - Class management and educational tools
import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Users, Calendar, FileText, BarChart3, MessageSquare } from "lucide-react"

export default function TeacherDashboard() {
  return (
    <DashboardLayout title="Teacher Dashboard" description="Manage your classes, students, and educational content">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* My Classes */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              My Classes
            </CardTitle>
            <CardDescription>Current teaching assignments</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-orange-50 rounded border border-orange-200">
                <div>
                  <p className="font-medium">Mathematics - Grade 10</p>
                  <p className="text-sm text-gray-600">32 students</p>
                </div>
                <Badge className="bg-green-100 text-green-800">Active</Badge>
              </div>
              <div className="flex justify-between items-center p-3 bg-orange-50 rounded border border-orange-200">
                <div>
                  <p className="font-medium">Algebra - Grade 9</p>
                  <p className="text-sm text-gray-600">28 students</p>
                </div>
                <Badge className="bg-green-100 text-green-800">Active</Badge>
              </div>
            </div>
            <Button className="w-full">View All Classes</Button>
          </CardContent>
        </Card>

        {/* Student Management */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Student Management
            </CardTitle>
            <CardDescription>Manage your students and their progress</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full bg-transparent" variant="outline">
              View Students
            </Button>
            <Button className="w-full bg-transparent" variant="outline">
              Attendance Records
            </Button>
            <Button className="w-full bg-transparent" variant="outline">
              Grade Management
            </Button>
            <Button className="w-full bg-transparent" variant="outline">
              Student Reports
            </Button>
          </CardContent>
        </Card>

        {/* Schedule & Calendar */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Today's Schedule
            </CardTitle>
            <CardDescription>Your classes and appointments</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <div className="flex justify-between items-center p-2 bg-blue-50 rounded border border-blue-200">
                <span className="text-sm font-medium">Math - Grade 10</span>
                <span className="text-xs text-gray-600">9:00 AM</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-blue-50 rounded border border-blue-200">
                <span className="text-sm font-medium">Algebra - Grade 9</span>
                <span className="text-xs text-gray-600">11:00 AM</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-yellow-50 rounded border border-yellow-200">
                <span className="text-sm font-medium">Parent Meeting</span>
                <span className="text-xs text-gray-600">2:00 PM</span>
              </div>
            </div>
            <Button className="w-full bg-transparent" variant="outline">
              View Full Calendar
            </Button>
          </CardContent>
        </Card>

        {/* Assignments & Tests */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Assignments & Tests
            </CardTitle>
            <CardDescription>Create and manage assessments</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full bg-transparent" variant="outline">
              Create Assignment
            </Button>
            <Button className="w-full bg-transparent" variant="outline">
              Create Test
            </Button>
            <Button className="w-full bg-transparent" variant="outline">
              Grade Submissions
            </Button>
            <Button className="w-full bg-transparent" variant="outline">
              Assignment Reports
            </Button>
          </CardContent>
        </Card>

        {/* Performance Analytics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Class Performance
            </CardTitle>
            <CardDescription>Student progress and analytics</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Average Grade</span>
                <Badge className="bg-green-100 text-green-800">85%</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Attendance Rate</span>
                <Badge className="bg-blue-100 text-blue-800">92%</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Assignment Completion</span>
                <Badge className="bg-orange-100 text-orange-800">88%</Badge>
              </div>
            </div>
            <Button className="w-full">View Detailed Analytics</Button>
          </CardContent>
        </Card>

        {/* Communication */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Communication
            </CardTitle>
            <CardDescription>Messages and announcements</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full bg-transparent" variant="outline">
              Send Announcement
            </Button>
            <Button className="w-full bg-transparent" variant="outline">
              Message Parents
            </Button>
            <Button className="w-full bg-transparent" variant="outline">
              Student Messages
            </Button>
            <Button className="w-full bg-transparent" variant="outline">
              Message History
            </Button>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
