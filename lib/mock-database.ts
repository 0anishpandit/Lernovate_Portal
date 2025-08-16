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
  | "Super_Admin"
  | "Institutional_Admin"
  | "Principal"
  | "Vice-Principal"
  | "Hostel_Warden"
  | "Hostel_Matron"
  | "Librarian"
  | "School_CoOrdinator"
  | "Mentor"
  | "Teaching_Staff"
  | "Non-Teaching_Staff"
  | "Parents/Guardian"
  | "Students"

export const mockUsers: User[] = [
  {
    id: "1",
    email: "superadmin@lernovate.com",
    password: "admin123",
    name: "Super Administrator",
    role: "Super_Admin",
    permissions: ["*"], // All permissions
    isActive: true,
    createdAt: new Date("2024-01-01"),
    lastLogin: new Date(),
  },
  {
    id: "2",
    email: "institution@lernovate.com",
    password: "admin123",
    name: "Institutional Admin",
    role: "Institutional_Admin",
    permissions: ["user_management", "system_settings", "reports"],
    isActive: true,
    createdAt: new Date("2024-01-01"),
  },
  {
    id: "3",
    email: "principal@lernovate.com",
    password: "principal123",
    name: "Dr. Michael Brown",
    role: "Principal",
    permissions: ["school_management", "policy_decisions", "all_reports"],
    isActive: true,
    createdAt: new Date("2024-01-01"),
  },
  {
    id: "4",
    email: "viceprincipal@lernovate.com",
    password: "vice123",
    name: "Lisa Anderson",
    role: "Vice-Principal",
    permissions: ["academic_oversight", "discipline", "teacher_evaluation"],
    isActive: true,
    createdAt: new Date("2024-01-01"),
  },
  {
    id: "5",
    email: "hostelwarden@lernovate.com",
    password: "warden123",
    name: "James Wilson",
    role: "Hostel_Warden",
    department: "Hostel Management",
    permissions: ["hostel_management", "student_accommodation", "discipline"],
    isActive: true,
    createdAt: new Date("2024-01-01"),
  },
  {
    id: "6",
    email: "hostelmatron@lernovate.com",
    password: "matron123",
    name: "Sarah Davis",
    role: "Hostel_Matron",
    department: "Hostel Care",
    permissions: ["hostel_care", "student_welfare", "health_monitoring"],
    isActive: true,
    createdAt: new Date("2024-01-01"),
  },
  {
    id: "7",
    email: "librarian@lernovate.com",
    password: "library123",
    name: "Mary Johnson",
    role: "Librarian",
    department: "Library",
    permissions: ["library_management", "book_inventory", "student_records"],
    isActive: true,
    createdAt: new Date("2024-01-01"),
  },
  {
    id: "8",
    email: "coordinator@lernovate.com",
    password: "coord123",
    name: "David Miller",
    role: "School_CoOrdinator",
    department: "Administration",
    permissions: ["event_coordination", "communication", "scheduling"],
    isActive: true,
    createdAt: new Date("2024-01-01"),
  },
  {
    id: "9",
    email: "mentor@lernovate.com",
    password: "mentor123",
    name: "Emily Taylor",
    role: "Mentor",
    department: "Student Services",
    permissions: ["student_guidance", "counseling", "academic_support"],
    isActive: true,
    createdAt: new Date("2024-01-01"),
  },
  {
    id: "10",
    email: "teacher@lernovate.com",
    password: "teacher123",
    name: "John Smith",
    role: "Teaching_Staff",
    department: "Mathematics",
    permissions: ["class_management", "grade_entry", "attendance"],
    isActive: true,
    createdAt: new Date("2024-01-01"),
  },
  {
    id: "11",
    email: "nonteaching@lernovate.com",
    password: "staff123",
    name: "Robert Wilson",
    role: "Non-Teaching_Staff",
    department: "Administration",
    permissions: ["administrative_support", "facility_management"],
    isActive: true,
    createdAt: new Date("2024-01-01"),
  },
  {
    id: "12",
    email: "parent@lernovate.com",
    password: "parent123",
    name: "Jennifer Brown",
    role: "Parents/Guardian",
    permissions: ["view_child_grades", "view_child_attendance", "communication"],
    isActive: true,
    createdAt: new Date("2024-01-01"),
  },
  {
    id: "13",
    email: "student@lernovate.com",
    password: "student123",
    name: "Jane Doe",
    role: "Students",
    department: "Grade 10",
    permissions: ["view_grades", "submit_assignments"],
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
      "Super_Admin",
      "Institutional_Admin",
      "Principal",
      "Vice-Principal",
      "Hostel_Warden",
      "Hostel_Matron",
      "Librarian",
      "School_CoOrdinator",
      "Mentor",
      "Teaching_Staff",
      "Non-Teaching_Staff",
      "Parents/Guardian",
      "Students",
    ]
  }
}

export const roleHierarchy: Record<UserRole, number> = {
  Super_Admin: 100,
  Principal: 90,
  "Vice-Principal": 80,
  Institutional_Admin: 70,
  Hostel_Warden: 60,
  Hostel_Matron: 55,
  School_CoOrdinator: 50,
  Teaching_Staff: 40,
  Mentor: 35,
  Librarian: 30,
  "Non-Teaching_Staff": 20,
  "Parents/Guardian": 15,
  Students: 10,
}

export const roleDashboardRoutes: Record<UserRole, string> = {
  Super_Admin: "/dashboard/superadmin",
  Institutional_Admin: "/dashboard/institution",
  Principal: "/dashboard/principal",
  "Vice-Principal": "/dashboard/viceprincipal",
  Hostel_Warden: "/dashboard/hostelwarden",
  Hostel_Matron: "/dashboard/hostelmatron",
  Librarian: "/dashboard/librarian",
  School_CoOrdinator: "/dashboard/schoolcoordinator",
  Mentor: "/dashboard/mentor",
  Teaching_Staff: "/dashboard/teachingstaff",
  "Non-Teaching_Staff": "/dashboard/nonteachingstaff",
  "Parents/Guardian": "/dashboard/parents",
  Students: "/dashboard/student",
}
