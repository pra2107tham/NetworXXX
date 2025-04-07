"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp } from "lucide-react"
import Link from "next/link"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="bg-background/80 backdrop-blur-sm border-primary/10">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 blur-sm rounded-full"></div>
                <TrendingUp className="h-8 w-8 text-primary relative z-10" />
              </div>
            </div>
            <CardTitle className="text-2xl">Something went wrong!</CardTitle>
            <CardDescription className="text-base">
              {error.message || "An unexpected error occurred"}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <Button
              onClick={reset}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Try again
            </Button>
            <Link href="/" className="w-full">
              <Button variant="outline" className="w-full border-primary/20">
                Go back home
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 