// Role-based authentication middleware for protecting dashboard routes
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { JWTAuth } from "./lib/jwt"
import { ROLE_DASHBOARD_ROUTES, type UserRole } from "./lib/auth-utils"

// Define protected routes and their required roles
const protectedRoutes: Record<string, UserRole[]> = {
  "/dashboard/super-admin": ["super-admin"],
  "/dashboard/admin": ["super-admin", "admin"],
  "/dashboard/principal": ["super-admin", "principal"],
  "/dashboard/vice-principal": ["super-admin", "principal", "vice-principal"],
  "/dashboard/teacher": ["super-admin", "admin", "principal", "vice-principal", "teacher"],
  "/dashboard/student": ["student"],
  "/dashboard/librarian": ["super-admin", "admin", "librarian"],
  "/dashboard/accountant": ["super-admin", "admin", "accountant"],
  "/dashboard/parent": ["parent"],
  "/dashboard/receptionist": ["super-admin", "admin", "receptionist"],
  "/dashboard/driver": ["super-admin", "admin", "driver"],
  "/dashboard/guard": ["super-admin", "admin", "guard"],
  "/dashboard/cleaner": ["super-admin", "admin", "cleaner"],
}

// Routes that require authentication but no specific role
const authRequiredRoutes = ["/dashboard"]

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Skip middleware for API routes, static files, and public routes
  if (
    pathname.startsWith("/api/") ||
    pathname.startsWith("/_next/") ||
    pathname.startsWith("/favicon.ico") ||
    pathname === "/" ||
    pathname === "/login" ||
    pathname === "/unauthorized"
  ) {
    return NextResponse.next()
  }

  // Check if route requires authentication
  const isProtectedRoute = Object.keys(protectedRoutes).some((route) => pathname.startsWith(route))
  const isAuthRequired = authRequiredRoutes.some((route) => pathname.startsWith(route))

  if (!isProtectedRoute && !isAuthRequired) {
    return NextResponse.next()
  }

  // Get authentication token
  const token = request.cookies.get("auth-token")?.value

  if (!token) {
    console.log("[v0] No auth token found, redirecting to login")
    return NextResponse.redirect(new URL("/", request.url))
  }

  try {
    // Verify JWT token
    const payload = await JWTAuth.verifyToken(token)

    if (!payload) {
      console.log("[v0] Invalid token, redirecting to login")
      const response = NextResponse.redirect(new URL("/", request.url))
      // Clear invalid token
      response.cookies.delete("auth-token")
      response.cookies.delete("refresh-token")
      return response
    }

    // For general dashboard access, redirect to user's specific dashboard
    if (pathname === "/dashboard") {
      const userDashboard = ROLE_DASHBOARD_ROUTES[payload.role as UserRole]
      if (userDashboard) {
        return NextResponse.redirect(new URL(userDashboard, request.url))
      }
    }

    // Check role-based access for specific dashboard routes
    if (isProtectedRoute) {
      const matchedRoute = Object.keys(protectedRoutes).find((route) => pathname.startsWith(route))

      if (matchedRoute) {
        const allowedRoles = protectedRoutes[matchedRoute]

        if (!allowedRoles.includes(payload.role)) {
          console.log(`[v0] Access denied: ${payload.role} not allowed for ${pathname}`)
          return NextResponse.redirect(new URL("/unauthorized", request.url))
        }
      }
    }

    // Add user info to request headers for use in components
    const requestHeaders = new Headers(request.headers)
    requestHeaders.set("x-user-id", payload.userId)
    requestHeaders.set("x-user-role", payload.role)
    requestHeaders.set("x-user-email", payload.email)
    requestHeaders.set("x-user-name", payload.name)

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    })
  } catch (error) {
    console.error("[v0] Middleware error:", error)
    const response = NextResponse.redirect(new URL("/", request.url))
    // Clear potentially corrupted tokens
    response.cookies.delete("auth-token")
    response.cookies.delete("refresh-token")
    return response
  }
}

// Configure which routes the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
}
