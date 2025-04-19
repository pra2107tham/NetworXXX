"use client"

import { useState } from "react"
import { useUser } from "@clerk/nextjs"
import { TopNavbar } from "@/components/top-navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bell, Mail, Lock, Globe, Shield, Trash2 } from "lucide-react"

export default function AccountSettingsPage() {
  const { user, isLoaded } = useUser()
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [pushNotifications, setPushNotifications] = useState(true)

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#E0FF4F]"></div>
      </div>
    )
  }

  return (
    <>
      <TopNavbar title="Account Settings" />
      <main className="flex-1 p-6">
        <div className="grid gap-6">
          <Card className="bg-[#001A1D]/80 backdrop-blur-sm border-[#E0FF4F]/10">
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
              <CardDescription>Manage your account details and preferences</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="flex items-center gap-2">
                    <Input id="email" value={user?.primaryEmailAddress?.emailAddress} readOnly />
                    <Button variant="outline" size="sm" className="border-[#E0FF4F]/20 text-[#E0FF4F] hover:bg-[#E0FF4F]/10 hover:border-[#E0FF4F]/30 transition-all duration-300">
                      Change
                    </Button>
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="flex items-center gap-2">
                    <Input id="password" type="password" value="********" readOnly />
                    <Button variant="outline" size="sm" className="border-[#E0FF4F]/20 text-[#E0FF4F] hover:bg-[#E0FF4F]/10 hover:border-[#E0FF4F]/30 transition-all duration-300">
                      Change
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#001A1D]/80 backdrop-blur-sm border-[#E0FF4F]/10">
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Control how you receive notifications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Mail className="h-5 w-5 text-[#E0FF4F]" />
                    <div>
                      <Label>Email Notifications</Label>
                      <p className="text-sm text-gray-400">Receive updates via email</p>
                    </div>
                  </div>
                  <Switch
                    checked={emailNotifications}
                    onCheckedChange={setEmailNotifications}
                    className="data-[state=checked]:bg-[#E0FF4F]"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Bell className="h-5 w-5 text-[#E0FF4F]" />
                    <div>
                      <Label>Push Notifications</Label>
                      <p className="text-sm text-gray-400">Receive push notifications</p>
                    </div>
                  </div>
                  <Switch
                    checked={pushNotifications}
                    onCheckedChange={setPushNotifications}
                    className="data-[state=checked]:bg-[#E0FF4F]"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#001A1D]/80 backdrop-blur-sm border-[#E0FF4F]/10">
            <CardHeader>
              <CardTitle>Privacy & Security</CardTitle>
              <CardDescription>Manage your privacy and security settings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Globe className="h-5 w-5 text-[#E0FF4F]" />
                    <div>
                      <Label>Public Profile</Label>
                      <p className="text-sm text-gray-400">Make your profile visible to others</p>
                    </div>
                  </div>
                  <Switch className="data-[state=checked]:bg-[#E0FF4F]" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-[#E0FF4F]" />
                    <div>
                      <Label>Two-Factor Authentication</Label>
                      <p className="text-sm text-gray-400">Add an extra layer of security</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="border-[#E0FF4F]/20 text-[#E0FF4F] hover:bg-[#E0FF4F]/10 hover:border-[#E0FF4F]/30 transition-all duration-300">
                    Enable
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#001A1D]/80 backdrop-blur-sm border-[#E0FF4F]/10">
            <CardHeader>
              <CardTitle>Danger Zone</CardTitle>
              <CardDescription>Irreversible and destructive actions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Trash2 className="h-5 w-5 text-red-500" />
                  <div>
                    <Label className="text-red-500">Delete Account</Label>
                    <p className="text-sm text-gray-400">Permanently delete your account and all data</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="border-red-500/20 text-red-500 hover:bg-red-500/10 hover:border-red-500/30 transition-all duration-300">
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  )
} 