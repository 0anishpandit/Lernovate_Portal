import { LoginForm } from "@/components/login-form"

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-xl">
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary mb-2">Lernovate</h1>
          <p className="text-muted-foreground text-sm sm:text-base lg:text-lg">Welcome back to your learning journey</p>
        </div>
        <LoginForm />
      </div>
    </div>
  )
}
