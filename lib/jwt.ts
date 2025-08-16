// JWT authentication utilities for role-based access control
import { SignJWT, jwtVerify } from "jose"
import type { User } from "./mongodb"
import type { UserRole } from "./auth-utils"

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "lernovate-super-secret-key-change-in-production")

export interface JWTPayload {
  userId: string
  email: string
  name: string
  role: UserRole
  permissions: string[]
  department?: string
  iat: number
  exp: number
}

export class JWTAuth {
  // Create JWT token with user information
  static async createToken(user: User | Omit<User, "password">): Promise<string> {
    const payload: Omit<JWTPayload, "iat" | "exp"> = {
      userId: user._id || "",
      email: user.email,
      name: user.name,
      role: user.role as UserRole,
      permissions: user.permissions,
    }

    const token = await new SignJWT(payload)
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("24h") // Token expires in 24 hours
      .sign(JWT_SECRET)

    return token
  }

  // Verify and decode JWT token
  static async verifyToken(token: string): Promise<JWTPayload | null> {
    try {
      const { payload } = await jwtVerify(token, JWT_SECRET)
      return payload as JWTPayload
    } catch (error) {
      console.error("[v0] JWT verification failed:", error)
      return null
    }
  }

  // Create refresh token (longer expiration)
  static async createRefreshToken(user: User | Omit<User, "password">): Promise<string> {
    const payload = {
      userId: user._id || "",
      email: user.email,
      type: "refresh",
    }

    const token = await new SignJWT(payload)
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("7d") // Refresh token expires in 7 days
      .sign(JWT_SECRET)

    return token
  }

  // Check if user has required permission
  static hasPermission(userPayload: JWTPayload, requiredPermission: string): boolean {
    // Super admin has all permissions
    if (userPayload.permissions.includes("*")) {
      return true
    }

    return userPayload.permissions.includes(requiredPermission)
  }

  // Check if user has required role or higher
  static hasRoleOrHigher(userPayload: JWTPayload, requiredRole: UserRole): boolean {
    const roleHierarchy: Record<UserRole, number> = {
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

    const userLevel = roleHierarchy[userPayload.role] || 0
    const requiredLevel = roleHierarchy[requiredRole] || 0

    return userLevel >= requiredLevel
  }
}

// Cookie configuration for secure token storage
export const cookieConfig = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  maxAge: 24 * 60 * 60 * 1000, // 24 hours in milliseconds
  path: "/",
}

export const refreshCookieConfig = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
  path: "/",
}
