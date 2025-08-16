import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const sessionCookie = request.cookies.get("session")

    if (!sessionCookie) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    try {
      // Decode session token
      const sessionData = JSON.parse(atob(sessionCookie.value))

      // Check if session is expired
      if (Date.now() > sessionData.exp) {
        return NextResponse.json({ error: "Session expired" }, { status: 401 })
      }

      // Return user data
      return NextResponse.json({
        user: {
          id: sessionData.userId,
          email: sessionData.email,
          name: sessionData.name,
          role: sessionData.role,
        },
      })
    } catch (decodeError) {
      return NextResponse.json({ error: "Invalid session" }, { status: 401 })
    }
  } catch (error) {
    console.error("Auth check error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
