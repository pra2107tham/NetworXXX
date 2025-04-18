"use client"
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button"
import { UserNav } from "@/components/user-nav"
import { Linkedin } from "lucide-react"
import { useAppContext } from "@/context/app-context"

interface TopNavbarProps {
  title: string
}

export function TopNavbar({ title }: TopNavbarProps) {
  const router = useRouter();
  const { isLinkedInConnected, linkedinData } = useAppContext();

  const initiateAuth = async () => {
    const authUrl = new URL('https://www.linkedin.com/oauth/v2/authorization');
    authUrl.searchParams.append('response_type', 'code');
    authUrl.searchParams.append('client_id', process.env.NEXT_PUBLIC_LINKEDIN_CLIENT_ID!);
    authUrl.searchParams.append('redirect_uri', 
      (`${window.location.origin}/api/oauth/callback`));
    authUrl.searchParams.append('scope', 'openid profile email');
    authUrl.searchParams.append('state', crypto.randomUUID());
    
    router.push(authUrl.toString());
  };

  return (
    <div className="sticky top-0 z-50 w-full border-b border-[#E0FF4F]/5 bg-[#001A1D]/80 backdrop-blur-sm shadow-[0_4px_20px_rgba(0,39,43,0.3)]">
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-semibold tracking-tight text-gray-300">{title}</h1>
        </div>
        <div className="flex items-center gap-4">
          {isLinkedInConnected ? (
            <div className="flex items-center gap-2 text-sm text-[#E0FF4F]">
              <Linkedin className="h-4 w-4" />
              <span>LinkedIn Connected</span>
            </div>
          ) : (
            <Button
              variant="outline"
              className="border-[#E0FF4F]/20 text-[#E0FF4F] hover:text-[#E0FF4F] hover:bg-[#E0FF4F]/10 hover:border-[#E0FF4F]/30 transition-all duration-300"
              onClick={initiateAuth}
            >
              <Linkedin className="mr-2 h-4 w-4" />
              Connect LinkedIn
            </Button>
          )}
          <UserNav />
        </div>
      </div>
    </div>
  )
} 