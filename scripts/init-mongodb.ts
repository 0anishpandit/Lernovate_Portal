// MongoDB initialization script for setting up default users
import { UserService } from "../lib/user-service"
import { connectToDatabase } from "../lib/mongodb"

async function initializeMongoDB() {
  try {
    console.log("🚀 Initializing MongoDB for Lernovate...")

    // Test connection
    await connectToDatabase()
    console.log("✅ MongoDB connection established")

    // Initialize default users
    await UserService.initialize()
    console.log("✅ Default users initialized")

    console.log("🎉 MongoDB initialization completed successfully!")
    console.log("\nDefault user accounts created:")
    console.log("- superadmin@lernovate.com (password: admin123)")
    console.log("- admin@lernovate.com (password: admin123)")
    console.log("- teacher@lernovate.com (password: teacher123)")
    console.log("- student@lernovate.com (password: student123)")
    console.log("- principal@lernovate.com (password: principal123)")

    process.exit(0)
  } catch (error) {
    console.error("❌ MongoDB initialization failed:", error)
    process.exit(1)
  }
}

// Run initialization if this script is executed directly
if (require.main === module) {
  initializeMongoDB()
}

export { initializeMongoDB }
