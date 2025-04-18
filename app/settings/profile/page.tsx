"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useUser } from "@clerk/nextjs"
import { TopNavbar } from "@/components/top-navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User, Briefcase, MapPin, Link as LinkIcon, Camera } from "lucide-react"
import { useAppContext } from "@/context/app-context"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"

export default function ProfileSettingsPage() {
  const { user, isLoaded } = useUser()
  const { isLinkedInConnected, disconnectLinkedIn } = useAppContext()
  const [bio, setBio] = useState("LinkedIn growth strategist helping professionals build their personal brand.")
  const [jobTitle, setJobTitle] = useState("LinkedIn Growth Strategist")
  const [location, setLocation] = useState("San Francisco, CA")
  const [website, setWebsite] = useState("https://example.com")
  const [isDisconnecting, setIsDisconnecting] = useState(false)

  const router = useRouter()
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
  const handleDisconnect = async () => {
    setIsDisconnecting(true)
    try {
      await disconnectLinkedIn()
    } catch (error) {
      console.error('Error disconnecting LinkedIn:', error)
      // You might want to show an error message to the user here
    } finally {
      setIsDisconnecting(false)
    }
  }

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#E0FF4F]"></div>
      </div>
    )
  }

  return (
    <>
      <TopNavbar title="Profile Settings" />
      <main className="flex-1 p-6">
        <div className="grid gap-6">
          <Card className="bg-[#001A1D]/80 backdrop-blur-sm border-[#E0FF4F]/10">
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Manage your public profile information</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                <div className="flex items-center gap-6">
                  <Avatar className="h-24 w-24 border-2 border-[#E0FF4F]/20">
                    <AvatarImage src={user?.imageUrl} alt={user?.fullName || "User"} />
                    <AvatarFallback className="bg-[#002428] text-[#E0FF4F] text-lg">
                      {user?.firstName?.[0]}{user?.lastName?.[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col gap-2">
                    <Button variant="outline" size="sm" className="w-fit border-[#E0FF4F]/20 text-[#E0FF4F] hover:bg-[#E0FF4F]/10 hover:border-[#E0FF4F]/30 transition-all duration-300">
                      <Camera className="mr-2 h-4 w-4" />
                      Change Photo
                    </Button>
                    <p className="text-sm text-gray-400">JPG, GIF or PNG. Max size of 2MB.</p>
                  </div>
                </div>

                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Full Name</Label>
                    <div className="flex items-center gap-2">
                      <Input id="name" value={user?.fullName || ""} readOnly />
                      <Button variant="outline" size="sm" className="border-[#E0FF4F]/20 text-[#E0FF4F] hover:bg-[#E0FF4F]/10 hover:border-[#E0FF4F]/30 transition-all duration-300">
                        Change
                      </Button>
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      className="min-h-[100px] bg-[#002428] border-[#E0FF4F]/10 focus:border-[#E0FF4F]/30 focus:ring-[#E0FF4F]/10"
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="jobTitle">Job Title</Label>
                    <div className="flex items-center gap-2">
                      <div className="relative flex-1">
                        <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          id="jobTitle"
                          value={jobTitle}
                          onChange={(e) => setJobTitle(e.target.value)}
                          className="pl-10 bg-[#002428] border-[#E0FF4F]/10 focus:border-[#E0FF4F]/30 focus:ring-[#E0FF4F]/10"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="location">Location</Label>
                    <div className="flex items-center gap-2">
                      <div className="relative flex-1">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          id="location"
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                          className="pl-10 bg-[#002428] border-[#E0FF4F]/10 focus:border-[#E0FF4F]/30 focus:ring-[#E0FF4F]/10"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="website">Website</Label>
                    <div className="flex items-center gap-2">
                      <div className="relative flex-1">
                        <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          id="website"
                          value={website}
                          onChange={(e) => setWebsite(e.target.value)}
                          className="pl-10 bg-[#002428] border-[#E0FF4F]/10 focus:border-[#E0FF4F]/30 focus:ring-[#E0FF4F]/10"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button className="bg-[#E0FF4F] text-[#001A1D] hover:bg-[#E0FF4F]/90 transition-all duration-300">
                    Save Changes
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#001A1D]/80 backdrop-blur-sm border-[#E0FF4F]/10">
            <CardHeader>
              <CardTitle>LinkedIn Profile</CardTitle>
              <CardDescription>Connect your LinkedIn profile to sync data</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <User className="h-5 w-5 text-[#E0FF4F]" />
                  <div>
                    <Label>LinkedIn Connection</Label>
                    <p className="text-sm text-gray-400">
                      {isLinkedInConnected ? "Your LinkedIn profile is connected" : "Connect your LinkedIn profile to sync data"}
                    </p>
                  </div>
                </div>
                {isLinkedInConnected ? (
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive" className="bg-red-500/20 text-red-400 hover:bg-red-500/30 border-red-500/20">
                        Disconnect LinkedIn
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Disconnect LinkedIn?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This will remove your LinkedIn connection and stop syncing data. You can reconnect anytime.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel disabled={isDisconnecting}>Cancel</AlertDialogCancel>
                        <AlertDialogAction 
                          onClick={handleDisconnect} 
                          className="bg-red-500 hover:bg-red-600"
                          disabled={isDisconnecting}
                        >
                          {isDisconnecting ? (
                            <div className="flex items-center gap-2">
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                              Disconnecting...
                            </div>
                          ) : (
                            "Disconnect"
                          )}
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                ) : (
                  <Button 
                    variant="outline" 
                    className="border-[#E0FF4F]/20 text-[#E0FF4F] hover:bg-[#E0FF4F]/10 hover:border-[#E0FF4F]/30 transition-all duration-300"
                    onClick={initiateAuth}
                  >
                    Connect LinkedIn
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  )
} 