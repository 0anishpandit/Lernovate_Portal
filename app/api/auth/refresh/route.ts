// JWT token refresh endpoint for extending authentication sessions
import { type NextRequest, NextResponse } from "next/server"
import { JWTAuth, cookieConfig } from "@/lib/jwt"
import { UserService } from "@/lib/user-service"

export async function POST(request: NextRequest) {
  try {
    const refreshToken = request.cookies.get("refresh-token")?.value

    if (!refreshToken) {
      return NextResponse.json({ error: "No refresh token found" }, { status: 401 })
    }

    // Verify refresh token
    const payload = await JWTAuth.verifyToken(refreshToken)

    if (!payload || payload.type !== "refresh") {
      return NextResponse.json({ error: "Invalid refresh token" }, { status: 401 })
    }

    const user = await UserService.getUserByEmail(payload.email)

    if (!user || !user.isActive) {
      return NextResponse.json({ error: "User not found or deactivated" }, { status: 401 })
    }

    // Create new access token
    const newAccessToken = await JWTAuth.createToken(user)

    const response = NextResponse.json({
      success: true,
      message: "Token refreshed successfully",
    })

    // Set new access token cookie
    response.cookies.set("auth-token", newAccessToken, cookieConfig)

    return response
  } catch (error) {
    console.error("[v0] Token refresh error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
