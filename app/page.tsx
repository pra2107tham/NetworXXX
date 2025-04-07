"use client"

import Link from "next/link"
import { ArrowRight, CheckCircle, LineChart, MessageSquare, TrendingUp } from "lucide-react"
import Image from "next/image"
import { useUser } from "@clerk/nextjs"
import { UserNav } from "@/components/user-nav"

import { Button } from "@/components/ui/button"

export default function HomePage() {
  const { isSignedIn, user } = useUser()
  // This function lets you switch between different pattern styles
  // You can choose which pattern style you prefer
  const patternStyle = "grid" // Options: "grid", "dots", "waves", "topo", "geometric"

  return (
    <div
      className={`min-h-screen bg-background text-foreground relative overflow-hidden ${
        patternStyle === "grid"
          ? "pattern-grid"
          : patternStyle === "dots"
            ? "pattern-dots"
            : patternStyle === "waves"
              ? "pattern-waves"
              : patternStyle === "topo"
                ? "pattern-topo"
                : "pattern-geometric"
      }`}
    >
      {/* Background Pattern Elements */}
      {patternStyle == "grid" && (
        <>
          <div className="absolute inset-0 bg-grid-white/[0.03] bg-[size:40px_40px] pointer-events-none" />
          <div className="absolute inset-0 bg-noise-pattern opacity-10 pointer-events-none mix-blend-soft-light"></div>
          <div className="absolute top-40 -left-32 w-96 h-96 rounded-full bg-primary/5 blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-primary/5 blur-3xl pointer-events-none"></div>
        </>
      )}

      {/* {patternStyle == "dots" && (
        <>
          <div className="absolute inset-0 bg-dots-pattern opacity-[0.07] pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background pointer-events-none" />
          <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-primary/10 to-transparent opacity-20 pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-full h-96 bg-gradient-to-t from-primary/10 to-transparent opacity-20 pointer-events-none" />
        </>
      )} */}

      {/* {patternStyle == "waves" && (
        <>
          <div className="absolute inset-0 bg-waves-pattern opacity-[0.07] pointer-events-none" />
          <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-background to-transparent pointer-events-none" />
          <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-background to-transparent pointer-events-none" />
          <div className="absolute top-1/4 left-0 w-full h-96 bg-primary/5 blur-[150px] pointer-events-none" />
        </>
      )} */}

      {/* {patternStyle === "topo" && (
        <>
          <div className="absolute inset-0 bg-topo-pattern opacity-[0.1] pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-br from-background via-transparent to-background pointer-events-none" />
          <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-primary/5 blur-[100px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-primary/5 blur-[100px] pointer-events-none" />
        </>
      )} */}

      {/* {patternStyle === "geometric" && (
        <>
          <div className="absolute inset-0 bg-geometric-pattern opacity-[0.06] pointer-events-none" />
          <div className="absolute inset-0 bg-noise-pattern opacity-5 pointer-events-none mix-blend-soft-light"></div>
          <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full border border-primary/10 pointer-events-none"></div>
          <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full border border-primary/10 pointer-events-none"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full border border-primary/10 pointer-events-none"></div>
          <div className="absolute -bottom-20 -left-20 w-96 h-96 rounded-full border border-primary/10 pointer-events-none"></div>
        </>
      )} */}

      {/* Navigation */}
      <header className="container mx-auto py-6 px-4 relative z-10">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 blur-sm rounded-full"></div>
              <TrendingUp className="h-6 w-6 text-primary relative z-10" />
            </div>
            <span className="text-xl font-bold tracking-tight">NetworX</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="#features" className="hover:text-primary transition-colors">
              Features
            </Link>
            <Link href="#pricing" className="hover:text-primary transition-colors">
              Pricing
            </Link>
            {isSignedIn ? (
              <>
                <Link href="/dashboard" className="hover:text-primary transition-colors">
                  Dashboard
                </Link>
                <UserNav />
              </>
            ) : (
              <>
                <Link href="/login" className="hover:text-primary transition-colors">
                  Login
                </Link>
                <Button
                  asChild
                  className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_15px_rgba(224,255,79,0.2)] hover:shadow-[0_0_20px_rgba(224,255,79,0.3)] transition-all duration-300"
                >
                  <Link href="/signup">Get Started</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto py-20 px-4 relative z-10">
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight tracking-tight">
            Supercharge Your LinkedIn Growth with <span className="text-primary">AI-Powered Insights</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Track impressions, engagement, and streaks in real time. Stay consistent. Grow faster.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-8 py-6 shadow-[0_0_20px_rgba(224,255,79,0.3)] hover:shadow-[0_0_30px_rgba(224,255,79,0.4)] transition-all duration-300"
          >
            <Link href="/dashboard">
              Get Started – It's Free <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <div className="mt-12 relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/30 to-primary/10 rounded-xl blur-sm"></div>
            <div className="relative bg-background/90 backdrop-blur-sm p-1 rounded-xl">
              <Image
                src="/dashboard-preview.png"
                alt="NetworX Dashboard Preview"
                width={1200}
                height={675}
                className="rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto py-20 px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">What NetworX Does?</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Powerful tools to track, analyze, and boost your LinkedIn presence
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Feature 1 */}
          <div className="bg-background/80 backdrop-blur-sm p-6 rounded-xl border border-primary/10 hover:border-primary/30 transition-all duration-300 hover:shadow-[0_4px_20px_rgba(0,39,43,0.5)] group">
            <div className="h-12 w-12 bg-gradient-to-br from-primary/20 to-primary/5 rounded-lg flex items-center justify-center mb-4 shadow-inner group-hover:shadow-[0_0_10px_rgba(224,255,79,0.15)] transition-all duration-300">
              <LineChart className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2 tracking-tight">Real-time Analytics</h3>
            <p className="text-gray-300">Track impressions, comments, and posts over time with detailed insights.</p>
          </div>

          {/* Feature 2 */}
          <div className="bg-background/80 backdrop-blur-sm p-6 rounded-xl border border-primary/10 hover:border-primary/30 transition-all duration-300 hover:shadow-[0_4px_20px_rgba(0,39,43,0.5)] group">
            <div className="h-12 w-12 bg-gradient-to-br from-primary/20 to-primary/5 rounded-lg flex items-center justify-center mb-4 shadow-inner group-hover:shadow-[0_0_10px_rgba(224,255,79,0.15)] transition-all duration-300">
              <TrendingUp className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2 tracking-tight">Engagement Streaks</h3>
            <p className="text-gray-300">Set and complete daily & weekly LinkedIn goals to maintain consistency.</p>
          </div>

          {/* Feature 3 */}
          <div className="bg-background/80 backdrop-blur-sm p-6 rounded-xl border border-primary/10 hover:border-primary/30 transition-all duration-300 hover:shadow-[0_4px_20px_rgba(0,39,43,0.5)] group">
            <div className="h-12 w-12 bg-gradient-to-br from-primary/20 to-primary/5 rounded-lg flex items-center justify-center mb-4 shadow-inner group-hover:shadow-[0_0_10px_rgba(224,255,79,0.15)] transition-all duration-300">
              <MessageSquare className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2 tracking-tight">AI Comment Generator</h3>
            <p className="text-gray-300">Generate thoughtful responses instantly with our AI-powered tool.</p>
          </div>

          {/* Feature 4 */}
          <div className="bg-background/80 backdrop-blur-sm p-6 rounded-xl border border-primary/10 hover:border-primary/30 transition-all duration-300 hover:shadow-[0_4px_20px_rgba(0,39,43,0.5)] group relative overflow-hidden">
            <div className="absolute top-2 right-2 bg-primary/20 text-primary text-xs px-2 py-1 rounded-full">
              Coming Soon
            </div>
            <div className="h-12 w-12 bg-gradient-to-br from-primary/20 to-primary/5 rounded-lg flex items-center justify-center mb-4 shadow-inner group-hover:shadow-[0_0_10px_rgba(224,255,79,0.15)] transition-all duration-300">
              <TrendingUp className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2 tracking-tight">Viral Trend Analysis</h3>
            <p className="text-gray-300">Automation & sentiment analysis to help you ride viral LinkedIn trends.</p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="container mx-auto py-20 px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Used by LinkedIn Influencers & Growth Hackers</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Join thousands of professionals who are elevating their LinkedIn presence
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {/* Testimonial 1 */}
          <div className="bg-background p-6 rounded-xl border border-primary/10">
            <div className="flex items-center mb-4">
              <div className="h-12 w-12 rounded-full bg-gray-700 mr-4"></div>
              <div>
                <h4 className="font-bold">Sarah Johnson</h4>
                <p className="text-sm text-gray-400">LinkedIn Growth Strategist</p>
              </div>
            </div>
            <p className="text-gray-300">
              "NetworX has transformed how I track my LinkedIn growth. The analytics are incredibly detailed and the
              AI comment generator saves me hours each week."
            </p>
          </div>

          {/* Testimonial 2 */}
          <div className="bg-background p-6 rounded-xl border border-primary/10">
            <div className="flex items-center mb-4">
              <div className="h-12 w-12 rounded-full bg-gray-700 mr-4"></div>
              <div>
                <h4 className="font-bold">Michael Chen</h4>
                <p className="text-sm text-gray-400">Tech Influencer</p>
              </div>
            </div>
            <p className="text-gray-300">
              "The engagement streak feature keeps me accountable and has helped me grow my following by 300% in just
              three months."
            </p>
          </div>

          {/* Testimonial 3 */}
          <div className="bg-background p-6 rounded-xl border border-primary/10">
            <div className="flex items-center mb-4">
              <div className="h-12 w-12 rounded-full bg-gray-700 mr-4"></div>
              <div>
                <h4 className="font-bold">Alex Rivera</h4>
                <p className="text-sm text-gray-400">Content Creator</p>
              </div>
            </div>
            <p className="text-gray-300">
              "I've tried many LinkedIn tools, but NetworX stands out with its intuitive interface and powerful
              analytics. It's become an essential part of my workflow."
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="container mx-auto py-20 px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">Start for free, upgrade when you need more features</p>
        </div>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Free Plan */}
          <div className="bg-background p-8 rounded-xl border border-primary/10">
            <h3 className="text-2xl font-bold mb-2">Free Plan</h3>
            <div className="text-4xl font-bold mb-6">
              $0<span className="text-lg text-gray-400">/month</span>
            </div>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center">
                <CheckCircle className="h-5 w-5 text-primary mr-2" />
                <span>Basic LinkedIn analytics</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-5 w-5 text-primary mr-2" />
                <span>Track up to 5 posts</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-5 w-5 text-primary mr-2" />
                <span>Daily engagement reminders</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-5 w-5 text-primary mr-2" />
                <span>Limited AI comment suggestions</span>
              </li>
            </ul>
            <Button
              asChild
              className="w-full bg-background border border-primary text-primary hover:bg-primary/10"
            >
              <Link href="/dashboard">Get Started</Link>
            </Button>
          </div>

          {/* Pro Plan */}
          <div className="bg-background p-8 rounded-xl border border-primary relative">
            <div className="absolute top-0 right-0 bg-primary text-background text-xs px-3 py-1 rounded-bl-lg rounded-tr-lg font-bold">
              POPULAR
            </div>
            <h3 className="text-2xl font-bold mb-2">Pro Plan</h3>
            <div className="text-4xl font-bold mb-6">
              $19<span className="text-lg text-gray-400">/month</span>
            </div>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center">
                <CheckCircle className="h-5 w-5 text-primary mr-2" />
                <span>Advanced LinkedIn analytics</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-5 w-5 text-primary mr-2" />
                <span>Unlimited post tracking</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-5 w-5 text-primary mr-2" />
                <span>Custom engagement goals</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-5 w-5 text-primary mr-2" />
                <span>Unlimited AI comment generation</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-5 w-5 text-primary mr-2" />
                <span>Priority access to new features</span>
              </li>
            </ul>
            <Button asChild className="w-full bg-primary text-background hover:bg-primary/90">
              <Link href="/dashboard">Upgrade to Pro</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto py-20 px-4 relative z-10">
        <div className="bg-background rounded-2xl p-12 text-center max-w-4xl mx-auto border border-primary/20">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Join the LinkedIn Growth Revolution</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Start tracking your LinkedIn growth today and see the difference data-driven insights can make.
          </p>
          <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-8 py-6">
            <Link href="/dashboard">
              Get Started – It's Free <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background/90 backdrop-blur-sm py-12 mt-20 relative z-10 border-t border-primary/10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 blur-sm rounded-full"></div>
                <TrendingUp className="h-6 w-6 text-primary relative z-10" />
              </div>
              <span className="text-xl font-bold tracking-tight">NetworX</span>
            </div>
            <div className="flex gap-6">
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors duration-300">
                About
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors duration-300">
                Privacy
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors duration-300">
                Terms
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors duration-300">
                Contact
              </Link>
            </div>
          </div>
          <div className="border-t border-border pt-8 text-center text-muted-foreground">
            <p>© {new Date().getFullYear()} NetworX. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

