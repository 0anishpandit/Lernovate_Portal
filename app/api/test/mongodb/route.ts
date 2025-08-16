import { NextResponse } from "next/server"
import { connectToDatabase, getUsersCollection } from "@/lib/mongodb"
import { UserService } from "@/lib/user-service"

export async function GET() {
  try {
    console.log("[v0] Testing MongoDB connection...")

    // Test database connection
    const { db } = await connectToDatabase()
    console.log("[v0] MongoDB connection successful")

    // Initialize default users
    await UserService.initialize()
    console.log("[v0] Default users initialized")

    // Get user count
    const users = await getUsersCollection()
    const userCount = await users.countDocuments()
    console.log(`[v0] Total users in database: ${userCount}`)

    // Get sample user data (excluding passwords)
    const sampleUsers = await users
      .find({}, { projection: { password: 0 } })
      .limit(5)
      .toArray()

    return NextResponse.json({
      success: true,
      message: "MongoDB connection test successful",
      data: {
        connected: true,
        userCount,
        sampleUsers: sampleUsers.map((user) => ({
          email: user.email,
          name: user.name,
          role: user.role,
          isActive: user.isActive,
        })),
      },
    })
  } catch (error) {
    console.error("[v0] MongoDB connection test failed:", error)
    return NextResponse.json(
      {
        success: false,
        error: "MongoDB connection failed",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
