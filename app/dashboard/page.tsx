import { redirect } from "next/navigation"
import { cookies } from "next/headers"
import { Dashboard } from "@/components/dashboard"

async function getUser() {
  const cookieStore = await cookies()
  const sessionCookie = cookieStore.get("session")

  if (!sessionCookie) {
    return null
  }

  try {
    // Decode session token
    const sessionData = JSON.parse(atob(sessionCookie.value))

    // Check if session is expired
    if (Date.now() > sessionData.exp) {
      return null
    }

    return {
      id: sessionData.userId,
      email: sessionData.email,
      name: sessionData.name,
      role: sessionData.role,
    }
  } catch (error) {
    return null
  }
}

export default async function DashboardPage() {
  const user = await getUser()

  if (!user) {
    redirect("/")
  }

  return <Dashboard user={user} />
}
