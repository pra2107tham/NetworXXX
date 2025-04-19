import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp } from "lucide-react"

interface ComingSoonProps {
  title?: string;
  description?: string;
  backButtonText?: string;
  backButtonHref?: string;
}

export function ComingSoon({
  title = "Coming Soon!",
  description = "We're working on something exciting. Stay tuned!",
  backButtonText = "Go back home",
  backButtonHref = "/dashboard"
}: ComingSoonProps) {
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
            <CardTitle className="text-2xl">{title}</CardTitle>
            <CardDescription className="text-base">
              {description}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href={backButtonHref} className="w-full">
              <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                {backButtonText}
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 