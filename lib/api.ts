// API utility functions for communicating with Express backend
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"

interface ApiResponse<T = any> {
  success: boolean
  message: string
  data?: T
  user?: any
  dashboardUrl?: string
  errors?: Array<{ field: string; message: string }>
}

class ApiClient {
  private baseUrl: string

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`

    const config: RequestInit = {
      credentials: "include", // Important for HttpOnly cookies
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    }

    try {
      const response = await fetch(url, config)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || `HTTP error! status: ${response.status}`)
      }

      return data
    } catch (error) {
      console.error("API request failed:", error)
      throw error
    }
  }

  // Authentication methods
  async login(email: string, password: string, rememberMe = false) {
    return this.request("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password, rememberMe }),
    })
  }

  async logout() {
    return this.request("/auth/logout", {
      method: "POST",
    })
  }

  async verifyToken() {
    return this.request("/auth/verify")
  }

  async refreshToken() {
    return this.request("/auth/refresh", {
      method: "POST",
    })
  }

  async getCurrentUser() {
    return this.request("/auth/me")
  }

  // User methods
  async getUsers() {
    return this.request("/users")
  }

  async getRoles() {
    return this.request("/users/roles")
  }
}

export const apiClient = new ApiClient()
export type { ApiResponse }
