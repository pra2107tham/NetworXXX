import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp } from "lucide-react"

export default function NotFound() {
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
            <CardTitle className="text-2xl">Page Not Found</CardTitle>
            <CardDescription className="text-base">
              The page you're looking for doesn't exist or has been moved.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/dashboard" className="w-full">
              <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                Go back home
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 