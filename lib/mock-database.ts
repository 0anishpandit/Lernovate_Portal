// Mock database for user authentication and role management
// This will be replaced with real database integration later

export interface User {
  id: string
  email: string
  password: string // In real implementation, this would be hashed
  name: string
  role: UserRole
  department?: string
  permissions: string[]
  isActive: boolean
  createdAt: Date
  lastLogin?: Date
}

export type UserRole =
  | "super_admin"
  | "admin"
  | "teacher"
  | "student"
  | "librarian"
  | "accountant"
  | "hr_manager"
  | "principal"
  | "vice_principal"
  | "department_head"
  | "counselor"
  | "it_support"
  | "guest"

export const mockUsers: User[] = [
  {
    id: "1",
    email: "superadmin@lernovate.com",
    password: "admin123",
    name: "Super Administrator",
    role: "super_admin",
    permissions: ["*"], // All permissions
    isActive: true,
    createdAt: new Date("2024-01-01"),
    lastLogin: new Date(),
  },
  {
    id: "2",
    email: "admin@lernovate.com",
    password: "admin123",
    name: "System Admin",
    role: "admin",
    permissions: ["user_management", "system_settings", "reports"],
    isActive: true,
    createdAt: new Date("2024-01-01"),
  },
  {
    id: "3",
    email: "teacher@lernovate.com",
    password: "teacher123",
    name: "John Smith",
    role: "teacher",
    department: "Mathematics",
    permissions: ["class_management", "grade_entry", "attendance"],
    isActive: true,
    createdAt: new Date("2024-01-01"),
  },
  {
    id: "4",
    email: "student@lernovate.com",
    password: "student123",
    name: "Jane Doe",
    role: "student",
    department: "Grade 10",
    permissions: ["view_grades", "submit_assignments"],
    isActive: true,
    createdAt: new Date("2024-01-01"),
  },
  {
    id: "5",
    email: "librarian@lernovate.com",
    password: "library123",
    name: "Mary Johnson",
    role: "librarian",
    department: "Library",
    permissions: ["book_management", "issue_books", "library_reports"],
    isActive: true,
    createdAt: new Date("2024-01-01"),
  },
  {
    id: "6",
    email: "accountant@lernovate.com",
    password: "account123",
    name: "Robert Wilson",
    role: "accountant",
    department: "Finance",
    permissions: ["fee_management", "financial_reports", "expense_tracking"],
    isActive: true,
    createdAt: new Date("2024-01-01"),
  },
  {
    id: "7",
    email: "hr@lernovate.com",
    password: "hr123",
    name: "Sarah Davis",
    role: "hr_manager",
    department: "Human Resources",
    permissions: ["employee_management", "payroll", "recruitment"],
    isActive: true,
    createdAt: new Date("2024-01-01"),
  },
  {
    id: "8",
    email: "principal@lernovate.com",
    password: "principal123",
    name: "Dr. Michael Brown",
    role: "principal",
    permissions: ["school_management", "policy_decisions", "all_reports"],
    isActive: true,
    createdAt: new Date("2024-01-01"),
  },
  {
    id: "9",
    email: "viceprincipal@lernovate.com",
    password: "vice123",
    name: "Lisa Anderson",
    role: "vice_principal",
    permissions: ["academic_oversight", "discipline", "teacher_evaluation"],
    isActive: true,
    createdAt: new Date("2024-01-01"),
  },
  {
    id: "10",
    email: "depthead@lernovate.com",
    password: "dept123",
    name: "David Miller",
    role: "department_head",
    department: "Science",
    permissions: ["department_management", "curriculum_planning", "teacher_coordination"],
    isActive: true,
    createdAt: new Date("2024-01-01"),
  },
  {
    id: "11",
    email: "counselor@lernovate.com",
    password: "counsel123",
    name: "Emily Taylor",
    role: "counselor",
    department: "Student Services",
    permissions: ["student_counseling", "career_guidance", "behavioral_reports"],
    isActive: true,
    createdAt: new Date("2024-01-01"),
  },
  {
    id: "12",
    email: "itsupport@lernovate.com",
    password: "tech123",
    name: "Alex Thompson",
    role: "it_support",
    department: "IT",
    permissions: ["system_maintenance", "user_support", "backup_management"],
    isActive: true,
    createdAt: new Date("2024-01-01"),
  },
  {
    id: "13",
    email: "guest@lernovate.com",
    password: "guest123",
    name: "Guest User",
    role: "guest",
    permissions: ["limited_access"],
    isActive: true,
    createdAt: new Date("2024-01-01"),
  },
]

export class MockDatabase {
  static async findUserByEmail(email: string): Promise<User | null> {
    const user = mockUsers.find((u) => u.email === email && u.isActive)
    return user || null
  }

  static async validateCredentials(email: string, password: string): Promise<User | null> {
    const user = await this.findUserByEmail(email)
    if (user && user.password === password) {
      // Update last login
      user.lastLogin = new Date()
      return user
    }
    return null
  }

  static async findUserById(id: string): Promise<User | null> {
    const user = mockUsers.find((u) => u.id === id && u.isActive)
    return user || null
  }

  static getUsersByRole(role: UserRole): User[] {
    return mockUsers.filter((u) => u.role === role && u.isActive)
  }

  static getAllRoles(): UserRole[] {
    return [
      "super_admin",
      "admin",
      "teacher",
      "student",
      "librarian",
      "accountant",
      "hr_manager",
      "principal",
      "vice_principal",
      "department_head",
      "counselor",
      "it_support",
      "guest",
    ]
  }
}

export const roleHierarchy: Record<UserRole, number> = {
  super_admin: 100,
  principal: 90,
  vice_principal: 80,
  admin: 70,
  hr_manager: 60,
  department_head: 50,
  teacher: 40,
  accountant: 35,
  librarian: 30,
  counselor: 25,
  it_support: 20,
  student: 10,
  guest: 0,
}

export const roleDashboardRoutes: Record<UserRole, string> = {
  super_admin: "/dashboard/super-admin",
  admin: "/dashboard/admin",
  teacher: "/dashboard/teacher",
  student: "/dashboard/student",
  librarian: "/dashboard/librarian",
  accountant: "/dashboard/accountant",
  hr_manager: "/dashboard/hr",
  principal: "/dashboard/principal",
  vice_principal: "/dashboard/vice-principal",
  department_head: "/dashboard/department-head",
  counselor: "/dashboard/counselor",
  it_support: "/dashboard/it-support",
  guest: "/dashboard/guest",
}
