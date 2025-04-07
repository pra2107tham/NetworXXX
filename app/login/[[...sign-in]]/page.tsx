import Link from "next/link"
import { SignIn } from "@clerk/nextjs"
import { TrendingUp } from "lucide-react"

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#00272B] flex flex-col">
      <header className="container mx-auto py-6 px-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex items-center gap-2 mb-8">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 blur-sm rounded-full"></div>
                <TrendingUp className="h-6 w-6 text-primary relative z-10" />
              </div>
              <span className="text-xl font-bold text-white">NetworX</span>
            </div>
          </Link>
        </div>
      </header>

      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <SignIn 
            appearance={{
              elements: {
                rootBox: "mx-auto",
                card: "bg-[#001A1D] border-[#E0FF4F]/20 text-white",
                headerTitle: "text-2xl text-white",
                headerSubtitle: "text-gray-400",
                socialButtonsBlockButton: "bg-[#002428] border-[#E0FF4F]/10 hover:bg-[#002428]/80 text-white",
                socialButtonsBlockButtonText: "text-white",
                formButtonPrimary: "bg-[#E0FF4F] text-[#00272B] hover:bg-[#E0FF4F]/90",
                footerActionLink: "text-[#001A1D] hover:text-underline",
                formFieldInput: "bg-white border-white text-white focus:ring-white",
                formFieldLabel: "text-white",
                otpCodeFieldInputs: "gap-2",
                otpCodeFieldInput: "border-white text-white bg-transparent focus:ring-white",
                formFieldInputShowPasswordIcon: "text-white",
                otpCodeFieldSeparator: "text-white",
                formFieldAction: "text-white",
              }
            }}
            routing="path"
            path="/login"
          />
        </div>
      </div>
    </div>
  )
}
