import { MongoClient, type Db, type Collection } from "mongodb"

let client: MongoClient
let db: Db

export interface User {
  _id?: string
  email: string
  password: string
  name: string
  role: string
  permissions: string[]
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

export async function connectToDatabase(): Promise<{ db: Db; client: MongoClient }> {
  if (client && db) {
    return { db, client }
  }

  try {
    const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/lernovate"
    client = new MongoClient(uri)
    await client.connect()
    db = client.db("lernovate")

    console.log("[v0] Connected to MongoDB successfully")
    return { db, client }
  } catch (error) {
    console.error("[v0] MongoDB connection error:", error)
    throw new Error("Failed to connect to MongoDB")
  }
}

export async function getUsersCollection(): Promise<Collection<User>> {
  const { db } = await connectToDatabase()
  return db.collection<User>("users")
}

export async function findUserByEmail(email: string): Promise<User | null> {
  try {
    const users = await getUsersCollection()
    const user = await users.findOne({ email: email.toLowerCase() })
    return user
  } catch (error) {
    console.error("[v0] Error finding user by email:", error)
    return null
  }
}

export async function createUser(userData: Omit<User, "_id" | "createdAt" | "updatedAt">): Promise<User | null> {
  try {
    const users = await getUsersCollection()
    const newUser: Omit<User, "_id"> = {
      ...userData,
      email: userData.email.toLowerCase(),
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const result = await users.insertOne(newUser as User)
    if (result.insertedId) {
      return await users.findOne({ _id: result.insertedId })
    }
    return null
  } catch (error) {
    console.error("[v0] Error creating user:", error)
    return null
  }
}

export async function updateUser(email: string, updateData: Partial<User>): Promise<User | null> {
  try {
    const users = await getUsersCollection()
    const result = await users.findOneAndUpdate(
      { email: email.toLowerCase() },
      {
        $set: {
          ...updateData,
          updatedAt: new Date(),
        },
      },
      { returnDocument: "after" },
    )
    return result.value
  } catch (error) {
    console.error("[v0] Error updating user:", error)
    return null
  }
}

// Initialize default users
export async function initializeDefaultUsers() {
  try {
    const users = await getUsersCollection()
    const existingUsers = await users.countDocuments()

    if (existingUsers === 0) {
      console.log("[v0] Initializing default users...")

      const defaultUsers: Omit<User, "_id" | "createdAt" | "updatedAt">[] = [
        {
          email: "superadmin@lernovate.com",
          password: "admin123",
          name: "Super Administrator",
          role: "super-admin",
          permissions: ["all"],
          isActive: true,
        },
        {
          email: "admin@lernovate.com",
          password: "admin123",
          name: "System Administrator",
          role: "admin",
          permissions: ["user_management", "system_settings", "reports"],
          isActive: true,
        },
        {
          email: "teacher@lernovate.com",
          password: "teacher123",
          name: "John Teacher",
          role: "teacher",
          permissions: ["class_management", "student_grades", "curriculum"],
          isActive: true,
        },
        {
          email: "student@lernovate.com",
          password: "student123",
          name: "Jane Student",
          role: "student",
          permissions: ["view_courses", "submit_assignments", "view_grades"],
          isActive: true,
        },
        {
          email: "principal@lernovate.com",
          password: "principal123",
          name: "Dr. Principal",
          role: "principal",
          permissions: ["school_management", "teacher_oversight", "reports"],
          isActive: true,
        },
      ]

      for (const userData of defaultUsers) {
        await createUser(userData)
      }

      console.log("[v0] Default users created successfully")
    }
  } catch (error) {
    console.error("[v0] Error initializing default users:", error)
  }
}
