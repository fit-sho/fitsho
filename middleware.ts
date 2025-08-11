import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifyToken } from '@/lib/auth'

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  const publicPaths = ['/login', '/signup', '/forgot-password', '/reset-password', '/', '/api/auth']
  const isPublicPath = publicPaths.some(path => pathname.startsWith(path))
  
  if (isPublicPath) {
    return NextResponse.next()
  }

  const token = req.cookies.get('auth-token')?.value

  if (!token) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  try {
    verifyToken(token)
    return NextResponse.next()
  } catch (error) {
    const response = NextResponse.redirect(new URL('/login', req.url))
    response.cookies.delete('auth-token')
    return response
  }
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}
