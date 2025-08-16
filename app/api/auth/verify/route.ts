// JWT token verification endpoint for client-side authentication checks
import { type NextRequest, NextResponse } from "next/server"
import { JWTAuth } from "@/lib/jwt"
import { UserService } from "@/lib/user-service"

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("auth-token")?.value

    if (!token) {
      return NextResponse.json({ error: "No authentication token found" }, { status: 401 })
    }

    // Verify JWT token
    const payload = await JWTAuth.verifyToken(token)

    if (!payload) {
      return NextResponse.json({ error: "Invalid or expired token" }, { status: 401 })
    }

    const user = await UserService.getUserByEmail(payload.email)

    if (!user || !user.isActive) {
      return NextResponse.json({ error: "User not found or deactivated" }, { status: 401 })
    }

    // Return user info (excluding password)
    const userResponse = {
      id: user._id,
      email: user.email,
      name: user.name,
      role: user.role,
      permissions: user.permissions,
      updatedAt: user.updatedAt,
    }

    return NextResponse.json({
      success: true,
      user: userResponse,
      tokenPayload: payload,
    })
  } catch (error) {
    console.error("[v0] Token verification error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
