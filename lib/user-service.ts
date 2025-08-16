import { type User, findUserByEmail, createUser, updateUser, initializeDefaultUsers } from "./mongodb"
import {
  hashPassword,
  verifyPassword,
  validateEmail,
  validatePassword,
  validateUserRole,
  getUserPermissions,
  sanitizeUser,
} from "./auth-utils"

export interface CreateUserData {
  email: string
  password: string
  name: string
  role: string
}

export interface AuthenticateUserData {
  email: string
  password: string
}

export class UserService {
  static async initialize() {
    await initializeDefaultUsers()
  }

  static async authenticateUser(
    credentials: AuthenticateUserData,
  ): Promise<{ success: boolean; user?: Omit<User, "password">; error?: string }> {
    try {
      const { email, password } = credentials

      if (!validateEmail(email)) {
        return { success: false, error: "Invalid email format" }
      }

      if (!password) {
        return { success: false, error: "Password is required" }
      }

      const user = await findUserByEmail(email)
      if (!user) {
        return { success: false, error: "Invalid email or password" }
      }

      if (!user.isActive) {
        return { success: false, error: "Account is deactivated" }
      }

      const isPasswordValid = await verifyPassword(password, user.password)
      if (!isPasswordValid) {
        return { success: false, error: "Invalid email or password" }
      }

      return {
        success: true,
        user: sanitizeUser(user),
      }
    } catch (error) {
      console.error("[v0] Authentication error:", error)
      return { success: false, error: "Authentication failed" }
    }
  }

  static async createNewUser(
    userData: CreateUserData,
  ): Promise<{ success: boolean; user?: Omit<User, "password">; error?: string }> {
    try {
      const { email, password, name, role } = userData

      if (!validateEmail(email)) {
        return { success: false, error: "Invalid email format" }
      }

      const passwordValidation = validatePassword(password)
      if (!passwordValidation.isValid) {
        return { success: false, error: passwordValidation.errors.join(", ") }
      }

      if (!validateUserRole(role)) {
        return { success: false, error: "Invalid user role" }
      }

      const existingUser = await findUserByEmail(email)
      if (existingUser) {
        return { success: false, error: "User with this email already exists" }
      }

      const hashedPassword = await hashPassword(password)
      const permissions = getUserPermissions(role as any)

      const newUser = await createUser({
        email,
        password: hashedPassword,
        name,
        role,
        permissions,
        isActive: true,
      })

      if (!newUser) {
        return { success: false, error: "Failed to create user" }
      }

      return {
        success: true,
        user: sanitizeUser(newUser),
      }
    } catch (error) {
      console.error("[v0] User creation error:", error)
      return { success: false, error: "Failed to create user" }
    }
  }

  static async getUserByEmail(email: string): Promise<Omit<User, "password"> | null> {
    try {
      const user = await findUserByEmail(email)
      return user ? sanitizeUser(user) : null
    } catch (error) {
      console.error("[v0] Get user error:", error)
      return null
    }
  }

  static async updateUserStatus(email: string, isActive: boolean): Promise<{ success: boolean; error?: string }> {
    try {
      const updatedUser = await updateUser(email, { isActive })
      if (!updatedUser) {
        return { success: false, error: "User not found" }
      }
      return { success: true }
    } catch (error) {
      console.error("[v0] Update user status error:", error)
      return { success: false, error: "Failed to update user status" }
    }
  }
}
