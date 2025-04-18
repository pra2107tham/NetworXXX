"use client"

import { usePathname } from "next/navigation"
import { Sidebar } from "@/components/sidebar"
import { cn } from "@/lib/utils"
import { AppProvider } from "@/context/app-context"

interface LayoutWrapperProps {
  children: React.ReactNode
}

export function LayoutWrapper({ children }: LayoutWrapperProps) {
  const pathname = usePathname()

  // Hide sidebar and adjust layout on these routes
  const hiddenRoutes = ['/', '/login', '/signup', '/not-found', '/error', '/loading']
  const shouldShowSidebar = !hiddenRoutes.includes(pathname)

  return (
    <AppProvider>
      <div className="flex min-h-screen bg-background text-foreground relative overflow-hidden font-sans">
        {/* Background Patterns
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] pointer-events-none"></div>
        <div className="absolute inset-0 bg-noise-pattern opacity-10 pointer-events-none mix-blend-soft-light"></div>

        {/* Decorative Elements */}
        {/* <div className="absolute top-40 -left-32 w-64 h-64 rounded-full bg-primary/10 blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-primary/5 blur-3xl pointer-events-none"></div> */} 

        {shouldShowSidebar && <Sidebar />}
        <div className={cn("flex-1 w-full", shouldShowSidebar && "md:pl-64")}>
          <main className="flex-1">
            {children}
          </main>
        </div>
      </div>
    </AppProvider>
  )
} 