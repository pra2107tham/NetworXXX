"use client"

import { useState } from "react"
import { useUser } from "@clerk/nextjs"
import { TrendingUp, MessageSquare, Sparkles, LineChart, Calendar } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardChart } from "@/components/dashboard-chart"
import { CommentGenerator } from "@/components/comment-generator"
import { TopNavbar } from "@/components/top-navbar"

export default function DashboardPage() {
  const [isCommentGeneratorOpen, setIsCommentGeneratorOpen] = useState(false)
  const { user, isLoaded } = useUser()

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <>
      <TopNavbar title="Dashboard" />
      <main className="flex-1 p-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="bg-[#001A1D]/80 backdrop-blur-sm border-[#E0FF4F]/10 hover:border-[#E0FF4F]/20 transition-all duration-300 hover:shadow-[0_4px_20px_rgba(0,39,43,0.5)] group">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-400 group-hover:text-gray-300 transition-colors">
                Total Posts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold tracking-tight">24</div>
              <p className="text-xs text-[#E0FF4F] mt-1 flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                +12% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="bg-[#001A1D]/80 backdrop-blur-sm border-[#E0FF4F]/10 hover:border-[#E0FF4F]/20 transition-all duration-300 hover:shadow-[0_4px_20px_rgba(0,39,43,0.5)] group">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-400 group-hover:text-gray-300 transition-colors">
                Total Comments
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold tracking-tight">142</div>
              <p className="text-xs text-[#E0FF4F] mt-1 flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                +18% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="bg-[#001A1D]/80 backdrop-blur-sm border-[#E0FF4F]/10 hover:border-[#E0FF4F]/20 transition-all duration-300 hover:shadow-[0_4px_20px_rgba(0,39,43,0.5)] group">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-400 group-hover:text-gray-300 transition-colors">
                Total Impressions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold tracking-tight">8,294</div>
              <p className="text-xs text-[#E0FF4F] mt-1 flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                +32% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="bg-[#001A1D]/80 backdrop-blur-sm border-[#E0FF4F]/10 hover:border-[#E0FF4F]/20 transition-all duration-300 hover:shadow-[0_4px_20px_rgba(0,39,43,0.5)] group">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-400 group-hover:text-gray-300 transition-colors">
                Current Streak
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold tracking-tight">7 days</div>
              <div className="mt-2">
                <div className="flex justify-between text-xs mb-1">
                  <span>Weekly Goal</span>
                  <span>5/7 days</span>
                </div>
                <Progress value={71} className="h-2 bg-[#002428]">
                  <div className="h-full bg-gradient-to-r from-[#E0FF4F]/80 to-[#E0FF4F] rounded-full" />
                </Progress>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8">
          <Tabs defaultValue="impressions">
            <div className="flex justify-between items-center mb-4">
              <TabsList className="bg-[#001A1D]/80 backdrop-blur-sm p-1 border border-[#E0FF4F]/10">
                <TabsTrigger
                  value="impressions"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#E0FF4F]/20 data-[state=active]:to-[#E0FF4F]/10 data-[state=active]:text-[#E0FF4F] data-[state=active]:font-medium transition-all duration-300"
                >
                  Impressions
                </TabsTrigger>
                <TabsTrigger
                  value="engagement"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#E0FF4F]/20 data-[state=active]:to-[#E0FF4F]/10 data-[state=active]:text-[#E0FF4F] data-[state=active]:font-medium transition-all duration-300"
                >
                  Engagement
                </TabsTrigger>
                <TabsTrigger
                  value="followers"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#E0FF4F]/20 data-[state=active]:to-[#E0FF4F]/10 data-[state=active]:text-[#E0FF4F] data-[state=active]:font-medium transition-all duration-300"
                >
                  Followers
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="impressions" className="mt-4">
              <Card className="bg-[#001A1D]/80 backdrop-blur-sm border-[#E0FF4F]/10">
                <CardHeader>
                  <CardTitle>Impressions Over Time</CardTitle>
                </CardHeader>
                <CardContent>
                  <DashboardChart />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="engagement" className="mt-4">
              <Card className="bg-[#001A1D]/80 backdrop-blur-sm border-[#E0FF4F]/10">
                <CardHeader>
                  <CardTitle>Engagement Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <DashboardChart />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="followers" className="mt-4">
              <Card className="bg-[#001A1D]/80 backdrop-blur-sm border-[#E0FF4F]/10">
                <CardHeader>
                  <CardTitle>Follower Growth</CardTitle>
                </CardHeader>
                <CardContent>
                  <DashboardChart />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <Card className="bg-[#001A1D]/80 backdrop-blur-sm border-[#E0FF4F]/10 overflow-hidden">
            <CardHeader>
              <CardTitle className="tracking-tight">Recent Posts</CardTitle>
              <CardDescription className="text-gray-400">Your most recent LinkedIn content</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3].map((post) => (
                  <div
                    key={post}
                    className="flex items-start gap-4 p-3 rounded-lg hover:bg-[#002428]/70 transition-all duration-300 group/post"
                  >
                    <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-[#E0FF4F]/20 to-[#E0FF4F]/5 flex items-center justify-center shadow-inner group-hover/post:shadow-[0_0_10px_rgba(224,255,79,0.15)] transition-all duration-300">
                      <LineChart className="h-5 w-5 text-[#E0FF4F]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium tracking-tight group-hover/post:text-[#E0FF4F]/90 transition-colors duration-300">
                        How to increase your LinkedIn engagement by 200%...
                      </p>
                      <div className="flex items-center gap-4 mt-1 text-sm text-gray-400">
                        <span className="flex items-center gap-1">
                          <TrendingUp className="h-3 w-3" /> 1.2k views
                        </span>
                        <span className="flex items-center gap-1">
                          <MessageSquare className="h-3 w-3" /> 24 comments
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <Button
                variant="outline"
                className="w-full mt-4 border-[#E0FF4F]/20 text-[#E0FF4F] hover:bg-[#E0FF4F]/10 hover:border-[#E0FF4F]/30 transition-all duration-300"
              >
                View All Posts
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-[#001A1D]/80 backdrop-blur-sm border-[#E0FF4F]/10 overflow-hidden">
            <CardHeader>
              <CardTitle className="tracking-tight">Coming Soon</CardTitle>
              <CardDescription className="text-gray-400">New features in development</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-[#002428]/70 hover:bg-[#002428]/90 transition-all duration-300 opacity-70 hover:opacity-90 hover:shadow-[0_4px_20px_rgba(0,39,43,0.5)] group/feature">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-[#E0FF4F]/20 to-[#E0FF4F]/5 flex items-center justify-center shadow-inner">
                      <MessageSquare className="h-4 w-4 text-[#E0FF4F]" />
                    </div>
                    <h3 className="font-medium tracking-tight group-hover/feature:text-[#E0FF4F]/90 transition-colors duration-300">
                      Sentiment Analysis
                    </h3>
                    <span className="ml-auto text-xs bg-[#E0FF4F]/20 text-[#E0FF4F] px-2 py-0.5 rounded-full">
                      Coming Soon
                    </span>
                  </div>
                  <p className="text-sm text-gray-400 pl-12">
                    Analyze the sentiment of comments on your posts to understand audience reactions.
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-[#002428]/70 hover:bg-[#002428]/90 transition-all duration-300 opacity-70 hover:opacity-90 hover:shadow-[0_4px_20px_rgba(0,39,43,0.5)] group/feature">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-[#E0FF4F]/20 to-[#E0FF4F]/5 flex items-center justify-center shadow-inner">
                      <TrendingUp className="h-4 w-4 text-[#E0FF4F]" />
                    </div>
                    <h3 className="font-medium tracking-tight group-hover/feature:text-[#E0FF4F]/90 transition-colors duration-300">
                      AI-Powered Analytics
                    </h3>
                    <span className="ml-auto text-xs bg-[#E0FF4F]/20 text-[#E0FF4F] px-2 py-0.5 rounded-full">
                      Coming Soon
                    </span>
                  </div>
                  <p className="text-sm text-gray-400 pl-12">
                    Get personalized recommendations to improve your LinkedIn performance.
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-[#002428]/70 hover:bg-[#002428]/90 transition-all duration-300 opacity-70 hover:opacity-90 hover:shadow-[0_4px_20px_rgba(0,39,43,0.5)] group/feature">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-[#E0FF4F]/20 to-[#E0FF4F]/5 flex items-center justify-center shadow-inner">
                      <Calendar className="h-4 w-4 text-[#E0FF4F]" />
                    </div>
                    <h3 className="font-medium tracking-tight group-hover/feature:text-[#E0FF4F]/90 transition-colors duration-300">
                      Content Calendar
                    </h3>
                    <span className="ml-auto text-xs bg-[#E0FF4F]/20 text-[#E0FF4F] px-2 py-0.5 rounded-full">
                      Coming Soon
                    </span>
                  </div>
                  <p className="text-sm text-gray-400 pl-12">
                    Plan and schedule your LinkedIn content for maximum engagement.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* AI Comment Generator Floating Button */}
        <div className="fixed bottom-6 right-6 z-50">
          <Button
            onClick={() => setIsCommentGeneratorOpen(true)}
            className="h-14 w-14 rounded-full bg-[#001A1D] border border-[#E0FF4F] shadow-lg shadow-[#E0FF4F]/20 hover:shadow-[0_0_25px_rgba(224,255,79,0.3)] hover:border-[#E0FF4F]/80 transition-all duration-300 group"
          >
            <div className="absolute inset-0 bg-[#E0FF4F]/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <MessageSquare className="h-6 w-6 text-[#E0FF4F] relative z-10" />
          </Button>
        </div>

        {/* AI Comment Generator Modal */}
        {isCommentGeneratorOpen && <CommentGenerator onClose={() => setIsCommentGeneratorOpen(false)} />}
      </main>
    </>
  )
}

