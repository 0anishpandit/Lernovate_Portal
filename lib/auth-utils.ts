import bcrypt from "bcryptjs"
import type { User } from "./mongodb"

export const ROLES = {
  SUPER_ADMIN: "super-admin",
  ADMIN: "admin",
  PRINCIPAL: "principal",
  VICE_PRINCIPAL: "vice-principal",
  TEACHER: "teacher",
  STUDENT: "student",
  PARENT: "parent",
  LIBRARIAN: "librarian",
  ACCOUNTANT: "accountant",
  RECEPTIONIST: "receptionist",
  DRIVER: "driver",
  GUARD: "guard",
  CLEANER: "cleaner",
} as const

export type UserRole = (typeof ROLES)[keyof typeof ROLES]

export const ROLE_PERMISSIONS = {
  [ROLES.SUPER_ADMIN]: ["all"],
  [ROLES.ADMIN]: ["user_management", "system_settings", "reports", "school_management", "financial_management"],
  [ROLES.PRINCIPAL]: [
    "school_management",
    "teacher_oversight",
    "student_management",
    "reports",
    "curriculum_oversight",
  ],
  [ROLES.VICE_PRINCIPAL]: ["teacher_oversight", "student_management", "reports", "curriculum_oversight"],
  [ROLES.TEACHER]: ["class_management", "student_grades", "curriculum", "attendance", "assignments"],
  [ROLES.STUDENT]: ["view_courses", "submit_assignments", "view_grades", "view_attendance", "library_access"],
  [ROLES.PARENT]: ["view_child_grades", "view_child_attendance", "communication", "fee_payment"],
  [ROLES.LIBRARIAN]: ["library_management", "book_inventory", "student_records"],
  [ROLES.ACCOUNTANT]: ["financial_management", "fee_collection", "expense_tracking", "reports"],
  [ROLES.RECEPTIONIST]: ["visitor_management", "communication", "basic_student_info"],
  [ROLES.DRIVER]: ["transport_management", "student_pickup_dropoff"],
  [ROLES.GUARD]: ["security_management", "visitor_logs"],
  [ROLES.CLEANER]: ["maintenance_logs", "facility_management"],
} as const

export const ROLE_DASHBOARD_ROUTES = {
  [ROLES.SUPER_ADMIN]: "/dashboard/super-admin",
  [ROLES.ADMIN]: "/dashboard/admin",
  [ROLES.PRINCIPAL]: "/dashboard/principal",
  [ROLES.VICE_PRINCIPAL]: "/dashboard/vice-principal",
  [ROLES.TEACHER]: "/dashboard/teacher",
  [ROLES.STUDENT]: "/dashboard/student",
  [ROLES.PARENT]: "/dashboard/parent",
  [ROLES.LIBRARIAN]: "/dashboard/librarian",
  [ROLES.ACCOUNTANT]: "/dashboard/accountant",
  [ROLES.RECEPTIONIST]: "/dashboard/receptionist",
  [ROLES.DRIVER]: "/dashboard/driver",
  [ROLES.GUARD]: "/dashboard/guard",
  [ROLES.CLEANER]: "/dashboard/cleaner",
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
