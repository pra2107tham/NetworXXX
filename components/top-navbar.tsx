"use client"

import { Button } from "@/components/ui/button"
import { UserNav } from "@/components/user-nav"
import { Linkedin } from "lucide-react"

interface TopNavbarProps {
  title: string
  isLinkedInConnected: boolean
}

export function TopNavbar({ title, isLinkedInConnected }: TopNavbarProps) {
  return (
    <div className="sticky top-0 z-50 w-full border-b border-[#E0FF4F]/5 bg-[#001A1D]/80 backdrop-blur-sm shadow-[0_4px_20px_rgba(0,39,43,0.3)]">
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-semibold tracking-tight text-gray-300">{title}</h1>
        </div>
        <div className="flex items-center gap-4">
          {!isLinkedInConnected ? (
            <Button
              variant="outline"
                className="border-[#E0FF4F]/20 text-[#E0FF4F] hover:text-[#E0FF4F] hover:bg-[#E0FF4F]/10 hover:border-[#E0FF4F]/30 transition-all duration-300"
            >
              <Linkedin className="mr-2 h-4 w-4" />
              Connect LinkedIn
            </Button>
          ) : (
            <div className="flex items-center gap-2 text-sm text-[#E0FF4F]">
              <Linkedin className="h-4 w-4" />
              <span>LinkedIn Connected</span>
            </div>
          )}
          <UserNav />
        </div>
      </div>
    </div>
  )
} 