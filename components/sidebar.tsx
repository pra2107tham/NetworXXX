"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useClerk } from "@clerk/nextjs"
import { 
  LayoutDashboard, 
  BarChart2, 
  MessageSquare, 
  Settings, 
  User, 
  FileText,
  LogOut,
  ChevronRight,
  ChevronDown,
  UserRound,
  SquareUserRoundIcon,
} from "lucide-react"
import { toast } from "sonner"

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname()
  const { signOut } = useClerk()
  const router = useRouter()

  const handleSignOut = async () => {
    try {
      await signOut()
      toast.success("You have been logged out successfully")
      router.push("/")
    } catch (error) {
      toast.error("Failed to log out. Please try again.")
      console.error("Error signing out:", error)
    }
  }

  const navItems = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Analytics",
      href: "/analytics",
      icon: BarChart2,
    },
    {
      title: "Posts",
      href: "/posts",
      icon: FileText,
    },
    {
      title: "Comments",
      href: "/comments",
      icon: MessageSquare,
    },
    {
      title: "Settings",
      href: "/settings",
      icon: Settings,
      subItems: [
        {
          title: "Profile",
          href: "/settings/profile",
          icon: UserRound,
        },
        {
          title: "Account",
          href: "/settings/account",
          icon: SquareUserRoundIcon,
        },
      ],
    },
  ]

  return (
    <div className={cn("fixed left-0 top-0 h-screen w-64 bg-[#001A1D]/90 backdrop-blur-sm border-r border-[#E0FF4F]/5 pb-12 overflow-y-auto hidden md:block", className)}>
      <div className="space-y-1 py-6">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
          const isExpanded = item.subItems && pathname.startsWith(item.href)
          
          return (
            <div key={item.href} className="px-3">
              <Link
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-4 py-3 text-base font-medium transition-all duration-300",
                  isActive
                    ? "bg-gradient-to-r from-[#E0FF4F]/20 to-[#E0FF4F]/10 text-[#E0FF4F] shadow-[0_0_15px_rgba(224,255,79,0.1)]"
                    : "text-gray-400 hover:bg-[#002428]/50 hover:text-gray-300"
                )}
              >
                <item.icon className="h-5 w-5" />
                {item.title}
                {item.subItems && (
                  <ChevronDown 
                    className={cn(
                      "ml-auto h-4 w-4 transition-transform duration-200",
                      isExpanded ? "rotate-180 text-[#E0FF4F]/60" : "text-gray-500"
                    )} 
                  />
                )}
              </Link>
              
              {item.subItems && isExpanded && (
                <div className="mt-1 ml-4 space-y-1">
                  {item.subItems.map((subItem) => (
                    <Link
                      key={subItem.href}
                      href={subItem.href}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-4 py-2 text-sm font-medium transition-all duration-300",
                        pathname === subItem.href
                          ? "bg-gradient-to-r from-[#E0FF4F]/15 to-[#E0FF4F]/5 text-[#E0FF4F]"
                          : "text-gray-400 hover:bg-[#002428]/50 hover:text-gray-300"
                      )}
                    >
                      {subItem.icon && <subItem.icon className="h-4 w-4" />}
                      {subItem.title}
                      {pathname === subItem.href && (
                        <ChevronRight className="ml-auto h-3 w-3 text-[#E0FF4F]/60" />
                      )}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-[#E0FF4F]/5">
        <Button
          variant="ghost"
          onClick={handleSignOut}
          className="w-full justify-start gap-3 rounded-lg px-4 py-3 text-base font-medium text-gray-400 hover:bg-[#002428]/50 hover:text-gray-300"
        >
          <LogOut className="h-5 w-5" />
          Logout
        </Button>
      </div>
    </div>
  )
} 