import bcrypt from "bcryptjs"
import type { User } from "./mongodb"

export const ROLES = {
  SUPER_ADMIN: "Super_Admin",
  INSTITUTIONAL_ADMIN: "Institutional_Admin",
  PRINCIPAL: "Principal",
  VICE_PRINCIPAL: "Vice-Principal",
  HOSTEL_WARDEN: "Hostel_Warden",
  HOSTEL_MATRON: "Hostel_Matron",
  LIBRARIAN: "Librarian",
  SCHOOL_COORDINATOR: "School_CoOrdinator",
  MENTOR: "Mentor",
  TEACHING_STAFF: "Teaching_Staff",
  NON_TEACHING_STAFF: "Non-Teaching_Staff",
  PARENTS_GUARDIAN: "Parents/Guardian",
  STUDENTS: "Students",
} as const

export type UserRole = (typeof ROLES)[keyof typeof ROLES]

export const ROLE_PERMISSIONS = {
  [ROLES.SUPER_ADMIN]: ["all"],
  [ROLES.INSTITUTIONAL_ADMIN]: [
    "user_management",
    "system_settings",
    "reports",
    "school_management",
    "financial_management",
  ],
  [ROLES.PRINCIPAL]: [
    "school_management",
    "teacher_oversight",
    "student_management",
    "reports",
    "curriculum_oversight",
  ],
  [ROLES.VICE_PRINCIPAL]: ["teacher_oversight", "student_management", "reports", "curriculum_oversight"],
  [ROLES.HOSTEL_WARDEN]: ["hostel_management", "student_accommodation", "discipline", "safety_oversight"],
  [ROLES.HOSTEL_MATRON]: ["hostel_care", "student_welfare", "health_monitoring", "daily_activities"],
  [ROLES.LIBRARIAN]: ["library_management", "book_inventory", "student_records", "resource_allocation"],
  [ROLES.SCHOOL_COORDINATOR]: ["event_coordination", "communication", "scheduling", "logistics"],
  [ROLES.MENTOR]: ["student_guidance", "counseling", "academic_support", "personal_development"],
  [ROLES.TEACHING_STAFF]: ["class_management", "student_grades", "curriculum", "attendance", "assignments"],
  [ROLES.NON_TEACHING_STAFF]: ["administrative_support", "facility_management", "basic_operations"],
  [ROLES.PARENTS_GUARDIAN]: ["view_child_grades", "view_child_attendance", "communication", "fee_payment"],
  [ROLES.STUDENTS]: ["view_courses", "submit_assignments", "view_grades", "view_attendance", "library_access"],
} as const

export const ROLE_DASHBOARD_ROUTES = {
  [ROLES.SUPER_ADMIN]: "/dashboard/superadmin",
  [ROLES.INSTITUTIONAL_ADMIN]: "/dashboard/institution",
  [ROLES.PRINCIPAL]: "/dashboard/principal",
  [ROLES.VICE_PRINCIPAL]: "/dashboard/viceprincipal",
  [ROLES.HOSTEL_WARDEN]: "/dashboard/hostelwarden",
  [ROLES.HOSTEL_MATRON]: "/dashboard/hostelmatron",
  [ROLES.LIBRARIAN]: "/dashboard/librarian",
  [ROLES.SCHOOL_COORDINATOR]: "/dashboard/schoolcoordinator",
  [ROLES.MENTOR]: "/dashboard/mentor",
  [ROLES.TEACHING_STAFF]: "/dashboard/teachingstaff",
  [ROLES.NON_TEACHING_STAFF]: "/dashboard/nonteachingstaff",
  [ROLES.PARENTS_GUARDIAN]: "/dashboard/parents",
  [ROLES.STUDENTS]: "/dashboard/student",
} as const

export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 12
  return await bcrypt.hash(password, saltRounds)
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return await bcrypt.compare(password, hashedPassword)
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function validatePassword(password: string): { isValid: boolean; errors: string[] } {
  const errors: string[] = []

  if (password.length < 6) {
    errors.push("Password must be at least 6 characters long")
  }

  if (!/[A-Za-z]/.test(password)) {
    errors.push("Password must contain at least one letter")
  }

  if (!/[0-9]/.test(password)) {
    errors.push("Password must contain at least one number")
  }

  return {
    isValid: errors.length === 0,
    errors,
  }
}

export function validateUserRole(role: string): boolean {
  return Object.values(ROLES).includes(role as UserRole)
}

export function getUserPermissions(role: UserRole): string[] {
  return ROLE_PERMISSIONS[role] || []
}

export function hasPermission(userPermissions: string[], requiredPermission: string): boolean {
  return userPermissions.includes("all") || userPermissions.includes(requiredPermission)
}

export function getDashboardRoute(role: UserRole): string {
  return ROLE_DASHBOARD_ROUTES[role] || "/dashboard"
}

export function sanitizeUser(user: User): Omit<User, "password"> {
  const { password, ...sanitizedUser } = user
  return sanitizedUser
}
