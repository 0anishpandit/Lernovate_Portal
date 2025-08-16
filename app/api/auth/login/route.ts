import { type NextRequest, NextResponse } from "next/server"
import { JWTAuth, cookieConfig, refreshCookieConfig } from "@/lib/jwt"
import { UserService } from "@/lib/user-service"
import { getDashboardRoute } from "@/lib/auth-utils"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password, rememberMe } = body

    // Validate input
    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    await UserService.initialize()
    const authResult = await UserService.authenticateUser({ email, password })

    if (!authResult.success || !authResult.user) {
      return NextResponse.json({ error: authResult.error || "Authentication failed" }, { status: 401 })
    }

    const user = authResult.user

    // Create JWT tokens
    const accessToken = await JWTAuth.createToken(user)
    const refreshToken = await JWTAuth.createRefreshToken(user)

    const redirectUrl = getDashboardRoute(user.role as any)

    // Create response with user data (excluding sensitive information)
    const response = NextResponse.json({
      success: true,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
        permissions: user.permissions,
      },
      redirectUrl,
    })

    // Set JWT cookies with appropriate expiration
    const accessCookieConfig = {
      ...cookieConfig,
      maxAge: rememberMe ? 7 * 24 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000, // 7 days or 1 day
    }

    const refreshCookieConfigAdjusted = {
      ...refreshCookieConfig,
      maxAge: rememberMe ? 30 * 24 * 60 * 60 * 1000 : 7 * 24 * 60 * 60 * 1000, // 30 days or 7 days
    }

    response.cookies.set("auth-token", accessToken, accessCookieConfig)
    response.cookies.set("refresh-token", refreshToken, refreshCookieConfigAdjusted)

    return response
  } catch (error) {
    console.error("[v0] Login error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
