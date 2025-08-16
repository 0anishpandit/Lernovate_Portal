"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, BookOpen, Calendar, FileText, Clock, TrendingUp, CheckCircle, AlertCircle } from "lucide-react"

export default function TeachingStaffDashboard() {
  const classes = [
    { name: "Mathematics Grade 10", students: 28, nextClass: "Today 9:00 AM", room: "Room 101" },
    { name: "Advanced Calculus", students: 15, nextClass: "Today 2:00 PM", room: "Room 205" },
    { name: "Statistics", students: 22, nextClass: "Tomorrow 10:00 AM", room: "Room 103" },
  ]

  const assignments = [
    { title: "Algebra Quiz", class: "Mathematics Grade 10", submitted: 25, total: 28, dueDate: "Yesterday" },
    { title: "Calculus Problem Set", class: "Advanced Calculus", submitted: 12, total: 15, dueDate: "Today" },
    { title: "Statistics Project", class: "Statistics", submitted: 18, total: 22, dueDate: "Tomorrow" },
  ]

  const todaySchedule = [
    { time: "9:00 AM", subject: "Mathematics Grade 10", room: "Room 101", type: "lecture" },
    { time: "11:00 AM", subject: "Office Hours", room: "Office 302", type: "office" },
    { time: "2:00 PM", subject: "Advanced Calculus", room: "Room 205", type: "lecture" },
    { time: "4:00 PM", subject: "Faculty Meeting", room: "Conference Room", type: "meeting" },
  ]

  return (
    <DashboardLayout
      title="Teaching Staff Dashboard"
      description="Manage your classes, students, and academic activities"
      requiredRole="Teaching_Staff"
    >
      <div className="space-y-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-white/80 backdrop-blur-sm border-blue-100">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Students</CardTitle>
              <Users className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">65</div>
              <p className="text-xs text-blue-600 mt-1">Across 3 classes</p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-blue-100">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Classes Today</CardTitle>
              <Calendar className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">2</div>
              <p className="text-xs text-green-600 mt-1">Next at 9:00 AM</p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-blue-100">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Pending Grades</CardTitle>
              <FileText className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">12</div>
              <p className="text-xs text-orange-600 mt-1">Assignments to grade</p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-blue-100">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Avg. Performance</CardTitle>
              <TrendingUp className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">87%</div>
              <p className="text-xs text-green-600 mt-1">+3% this month</p>
            </CardContent>
          </Card>
        </div>

        {/* Today's Schedule */}
        <Card className="bg-white/80 backdrop-blur-sm border-blue-100">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-blue-600" />
              <span>Today's Schedule</span>
            </CardTitle>
            <CardDescription>Your classes and meetings for today</CardDescription>
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
                  <div className="text-right">
                    <p className="font-medium text-gray-900">{item.time}</p>
                    <Badge
                      variant={item.type === "lecture" ? "default" : item.type === "office" ? "secondary" : "outline"}
                    >
                      {item.type}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* My Classes */}
          <Card className="bg-white/80 backdrop-blur-sm border-blue-100">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BookOpen className="w-5 h-5 text-blue-600" />
                <span>My Classes</span>
              </CardTitle>
              <CardDescription>Overview of your current classes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {classes.map((classItem, index) => (
                  <div key={index} className="p-4 rounded-lg border border-gray-200 bg-white">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900">{classItem.name}</h4>
                      <Badge variant="outline">{classItem.students} students</Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span className="flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {classItem.nextClass}
                      </span>
                      <span>{classItem.room}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Assignment Status */}
          <Card className="bg-white/80 backdrop-blur-sm border-blue-100">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="w-5 h-5 text-blue-600" />
                <span>Assignment Status</span>
              </CardTitle>
              <CardDescription>Track student submissions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {assignments.map((assignment, index) => (
                  <div key={index} className="p-4 rounded-lg border border-gray-200 bg-white">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900">{assignment.title}</h4>
                      <Badge variant={assignment.submitted === assignment.total ? "default" : "secondary"}>
                        {assignment.submitted}/{assignment.total}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>{assignment.class}</span>
                      <span className="flex items-center">
                        {assignment.submitted === assignment.total ? (
                          <CheckCircle className="w-3 h-3 mr-1 text-green-600" />
                        ) : (
                          <AlertCircle className="w-3 h-3 mr-1 text-orange-600" />
                        )}
                        Due: {assignment.dueDate}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
