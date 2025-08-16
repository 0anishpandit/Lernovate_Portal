"use client"

import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Calendar, FileText, BarChart3, Trophy, Clock, Users, TrendingUp } from "lucide-react"

export default function StudentDashboard() {
  const courses = [
    { name: "Mathematics", teacher: "Mr. John Smith", grade: "A-", color: "bg-blue-50 border-blue-200" },
    { name: "English Literature", teacher: "Ms. Sarah Johnson", grade: "B+", color: "bg-green-50 border-green-200" },
    { name: "Physics", teacher: "Dr. Michael Brown", grade: "B", color: "bg-purple-50 border-purple-200" },
    { name: "Chemistry", teacher: "Dr. Lisa Wilson", grade: "A", color: "bg-orange-50 border-orange-200" },
  ]

  const todaySchedule = [
    { subject: "Mathematics", time: "9:00 AM", room: "Room 101" },
    { subject: "English Literature", time: "11:00 AM", room: "Room 205" },
    { subject: "Physics Lab", time: "2:00 PM", room: "Lab 301" },
    { subject: "Study Hall", time: "4:00 PM", room: "Library" },
  ]

  const assignments = [
    { title: "Math Assignment #5", subject: "Mathematics", due: "Tomorrow", status: "urgent" },
    { title: "Physics Lab Report", subject: "Physics", due: "Friday", status: "pending" },
    { title: "English Essay", subject: "English", due: "Next Week", status: "draft" },
  ]

  return (
    <DashboardLayout
      title="Student Dashboard"
      description="Track your academic progress and manage your studies"
      requiredRole="Students"
    >
      <div className="space-y-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-white/80 backdrop-blur-sm border-blue-100">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Current Courses</CardTitle>
              <BookOpen className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">4</div>
              <p className="text-xs text-blue-600 mt-1">Active this semester</p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-blue-100">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Overall GPA</CardTitle>
              <TrendingUp className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">3.7</div>
              <p className="text-xs text-green-600 mt-1">+0.2 from last semester</p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-blue-100">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Attendance</CardTitle>
              <Users className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">95%</div>
              <p className="text-xs text-green-600 mt-1">Excellent attendance</p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-blue-100">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Study Time</CardTitle>
              <Clock className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">2.5h</div>
              <p className="text-xs text-blue-600 mt-1">Today's progress</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* My Courses */}
          <Card className="bg-white/80 backdrop-blur-sm border-blue-100">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BookOpen className="w-5 h-5 text-blue-600" />
                <span>My Courses</span>
              </CardTitle>
              <CardDescription>Current enrolled subjects and grades</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {courses.map((course, index) => (
                  <div key={index} className={`p-4 rounded-lg border ${course.color}`}>
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900">{course.name}</h4>
                      <Badge variant="outline">{course.grade}</Badge>
                    </div>
                    <p className="text-sm text-gray-600">{course.teacher}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Today's Schedule */}
          <Card className="bg-white/80 backdrop-blur-sm border-blue-100">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-blue-600" />
                <span>Today's Schedule</span>
              </CardTitle>
              <CardDescription>Your classes and activities for today</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {todaySchedule.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                      <div>
                        <h4 className="font-medium text-gray-900">{item.subject}</h4>
                        <p className="text-sm text-gray-500">{item.room}</p>
                      </div>
                    </div>
                    <span className="font-medium text-gray-900">{item.time}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Assignments */}
          <Card className="bg-white/80 backdrop-blur-sm border-blue-100">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="w-5 h-5 text-blue-600" />
                <span>Assignments</span>
              </CardTitle>
              <CardDescription>Upcoming deadlines</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {assignments.map((assignment, index) => (
                  <div key={index} className="p-3 rounded-lg border border-gray-200 bg-white">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium text-gray-900 text-sm">{assignment.title}</h4>
                      <Badge
                        variant={
                          assignment.status === "urgent"
                            ? "destructive"
                            : assignment.status === "pending"
                              ? "secondary"
                              : "outline"
                        }
                      >
                        {assignment.status}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-500">{assignment.subject}</p>
                    <p className="text-xs text-gray-600 mt-1">Due: {assignment.due}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Performance */}
          <Card className="bg-white/80 backdrop-blur-sm border-blue-100">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="w-5 h-5 text-blue-600" />
                <span>Performance</span>
              </CardTitle>
              <CardDescription>Academic metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Assignments Completed</span>
                  <Badge className="bg-green-100 text-green-800">92%</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Test Average</span>
                  <Badge className="bg-blue-100 text-blue-800">87%</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Class Participation</span>
                  <Badge className="bg-orange-100 text-orange-800">Excellent</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Achievements */}
          <Card className="bg-white/80 backdrop-blur-sm border-blue-100">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Trophy className="w-5 h-5 text-blue-600" />
                <span>Achievements</span>
              </CardTitle>
              <CardDescription>Recent accomplishments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
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
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
