// middleware.ts
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

const protectedRoutes = createRouteMatcher([
  '/dashboard(.*)', // Protect all dashboard subroutes
  '/api(.*)'        // Protect all API routes
])

export default clerkMiddleware((auth, req) => {
  if (protectedRoutes(req)) {
    return auth().then(auth => {
      if (!auth.userId) {
        return NextResponse.redirect(new URL('/login', req.url))
      }
      return NextResponse.next()
    })
  }
  
  // Allow public routes through
  return NextResponse.next()
})

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
    '/',
    '/(api|trpc)(.*)'
  ]
}
