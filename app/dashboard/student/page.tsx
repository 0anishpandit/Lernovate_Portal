// Student Dashboard - Learning focused interface
import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Calendar, FileText, BarChart3, Trophy, Clock } from "lucide-react"

export default function StudentDashboard() {
  return (
    <DashboardLayout title="Student Dashboard" description="Track your academic progress and manage your studies">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* My Courses */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              My Courses
            </CardTitle>
            <CardDescription>Current enrolled subjects</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-blue-50 rounded border border-blue-200">
                <div>
                  <p className="font-medium">Mathematics</p>
                  <p className="text-sm text-gray-600">Mr. John Smith</p>
                </div>
                <Badge className="bg-green-100 text-green-800">A-</Badge>
              </div>
              <div className="flex justify-between items-center p-3 bg-blue-50 rounded border border-blue-200">
                <div>
                  <p className="font-medium">English Literature</p>
                  <p className="text-sm text-gray-600">Ms. Sarah Johnson</p>
                </div>
                <Badge className="bg-blue-100 text-blue-800">B+</Badge>
              </div>
              <div className="flex justify-between items-center p-3 bg-blue-50 rounded border border-blue-200">
                <div>
                  <p className="font-medium">Physics</p>
                  <p className="text-sm text-gray-600">Dr. Michael Brown</p>
                </div>
                <Badge className="bg-yellow-100 text-yellow-800">B</Badge>
              </div>
            </div>
            <Button className="w-full">View All Courses</Button>
          </CardContent>
        </Card>

        {/* Upcoming Classes */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Today's Schedule
            </CardTitle>
            <CardDescription>Your classes and activities</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <div className="flex justify-between items-center p-2 bg-green-50 rounded border border-green-200">
                <span className="text-sm font-medium">Mathematics</span>
                <span className="text-xs text-gray-600">9:00 AM</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-blue-50 rounded border border-blue-200">
                <span className="text-sm font-medium">English Literature</span>
                <span className="text-xs text-gray-600">11:00 AM</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-purple-50 rounded border border-purple-200">
                <span className="text-sm font-medium">Physics Lab</span>
                <span className="text-xs text-gray-600">2:00 PM</span>
              </div>
            </div>
            <Button className="w-full bg-transparent" variant="outline">
              View Full Schedule
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
            <CardDescription>Upcoming deadlines and submissions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <div className="flex justify-between items-center p-2 bg-red-50 rounded border border-red-200">
                <div>
                  <p className="text-sm font-medium">Math Assignment #5</p>
                  <p className="text-xs text-gray-600">Due: Tomorrow</p>
                </div>
                <Badge className="bg-red-100 text-red-800">Urgent</Badge>
              </div>
              <div className="flex justify-between items-center p-2 bg-yellow-50 rounded border border-yellow-200">
                <div>
                  <p className="text-sm font-medium">Physics Test</p>
                  <p className="text-xs text-gray-600">Due: Friday</p>
                </div>
                <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
              </div>
            </div>
            <Button className="w-full">View All Assignments</Button>
          </CardContent>
        </Card>

        {/* Academic Performance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Academic Performance
            </CardTitle>
            <CardDescription>Your grades and progress</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Overall GPA</span>
                <Badge className="bg-green-100 text-green-800">3.7</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Attendance Rate</span>
                <Badge className="bg-blue-100 text-blue-800">95%</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Assignments Completed</span>
                <Badge className="bg-orange-100 text-orange-800">92%</Badge>
              </div>
            </div>
            <Button className="w-full">View Detailed Report</Button>
          </CardContent>
        </Card>

        {/* Achievements */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5" />
              Achievements
            </CardTitle>
            <CardDescription>Your academic milestones</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <div className="flex items-center gap-3 p-2 bg-yellow-50 rounded border border-yellow-200">
                <Trophy className="h-4 w-4 text-yellow-600" />
                <span className="text-sm font-medium">Perfect Attendance</span>
              </div>
              <div className="flex items-center gap-3 p-2 bg-blue-50 rounded border border-blue-200">
                <Trophy className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-medium">Honor Roll</span>
              </div>
              <div className="flex items-center gap-3 p-2 bg-green-50 rounded border border-green-200">
                <Trophy className="h-4 w-4 text-green-600" />
                <span className="text-sm font-medium">Math Excellence</span>
              </div>
            </div>
            <Button className="w-full bg-transparent" variant="outline">
              View All Achievements
            </Button>
          </CardContent>
        </Card>

        {/* Study Time */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Study Tracker
            </CardTitle>
            <CardDescription>Track your study time and habits</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Today's Study Time</span>
                <Badge variant="secondary">2h 30m</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Weekly Goal</span>
                <Badge className="bg-green-100 text-green-800">15h / 20h</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Study Streak</span>
                <Badge className="bg-orange-100 text-orange-800">7 days</Badge>
              </div>
            </div>
            <Button className="w-full">Start Study Session</Button>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
