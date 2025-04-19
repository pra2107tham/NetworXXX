"use client"

import { createContext, useContext, useState, ReactNode, useEffect } from 'react'

interface LinkedInData {
  linkedin_access_token: string | null
}

interface AppContextType {
  isLinkedInConnected: boolean
  setIsLinkedInConnected: (value: boolean) => void
  user: {
    name: string | null
    email: string | null
  }
  setUser: (user: { name: string | null; email: string | null }) => void
  linkedinData: LinkedInData
  fetchLinkedInStatus: () => Promise<void>
  disconnectLinkedIn: () => Promise<void>
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: ReactNode }) {
  const [isLinkedInConnected, setIsLinkedInConnected] = useState(false)
  const [user, setUser] = useState<{ name: string | null; email: string | null }>({
    name: null,
    email: null,
  })
  const [linkedinData, setLinkedinData] = useState<LinkedInData>({
    linkedin_access_token: null,
  })

  const fetchLinkedInStatus = async () => {
    try {
      const response = await fetch('/api/check_linkedin_connection')
      if (response.ok) {
        const data = await response.json()
        setLinkedinData({
          linkedin_access_token: data.linkedin_access_token,
        })
        setIsLinkedInConnected(!!data.linkedin_access_token)
      } else {
        setIsLinkedInConnected(false)
        setLinkedinData({
          linkedin_access_token: null,
        })
      }
    } catch (error) {
      console.error('Error fetching LinkedIn status:', error)
      setIsLinkedInConnected(false)
      setLinkedinData({
        linkedin_access_token: null,
      })
    }
  }

  const disconnectLinkedIn = async () => {
    try {
      const response = await fetch('/api/disconnect_linkedin', {
        method: 'POST',
      })
      if (response.ok) {
        setIsLinkedInConnected(false)
        setLinkedinData({
          linkedin_access_token: null,
        })
      }
    } catch (error) {
      console.error('Error disconnecting LinkedIn:', error)
    }
  }

  useEffect(() => {
    fetchLinkedInStatus()
  }, [])

  return (
    <AppContext.Provider
      value={{
        isLinkedInConnected,
        setIsLinkedInConnected,
        user,
        setUser,
        linkedinData,
        fetchLinkedInStatus,
        disconnectLinkedIn,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useAppContext() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider')
  }
  return context
} 