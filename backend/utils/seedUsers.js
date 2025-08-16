const User = require("../models/User")
const { ROLES } = require("../models/User")

// Default users for testing
const defaultUsers = [
  {
    email: "superadmin@lernovate.com",
    password: "admin123",
    firstName: "Super",
    lastName: "Admin",
    role: "Super_Admin",
    employeeId: "EMP001",
    department: "Administration",
  },
  {
    email: "principal@lernovate.com",
    password: "principal123",
    firstName: "John",
    lastName: "Principal",
    role: "Principal",
    employeeId: "EMP002",
    department: "Administration",
  },
  {
    email: "teacher@lernovate.com",
    password: "teacher123",
    firstName: "Jane",
    lastName: "Teacher",
    role: "Teaching_Staff",
    employeeId: "EMP003",
    department: "Mathematics",
  },
  {
    email: "student@lernovate.com",
    password: "student123",
    firstName: "Alice",
    lastName: "Student",
    role: "Students",
    studentId: "STU001",
    department: "Grade 10",
  },
  {
    email: "admin@lernovate.com",
    password: "admin123",
    firstName: "Institution",
    lastName: "Admin",
    role: "Institutional_Admin",
    employeeId: "EMP004",
    department: "Administration",
  },
]

async function seedUsers() {
  try {
    // Check if users already exist
    const existingUsers = await User.countDocuments()

    if (existingUsers > 0) {
      console.log("👥 Users already exist in database")
      return
    }

    // Create default users
    const users = await User.create(defaultUsers)
    console.log(`✅ Successfully created ${users.length} default users`)

    // Log created users (without passwords)
    users.forEach((user) => {
      console.log(`   📧 ${user.email} (${user.role})`)
    })
  } catch (error) {
    console.error("❌ Error seeding users:", error.message)
    throw error
  }
}

module.exports = { seedUsers, defaultUsers }
