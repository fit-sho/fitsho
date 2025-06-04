// middleware.ts
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  
  // Create a Supabase client configured to use cookies
  const supabase = createMiddlewareClient({ req, res })
  
  // Refresh session if expired - required for Server Components
  await supabase.auth.getSession()
  
  return res
}

// Add paths that should be protected by authentication
export const config = {
  matcher: [
    // Skip authentication for auth-related paths
    '/((?!api|_next/static|_next/image|favicon.ico|auth/callback).*)',
  ],
}
