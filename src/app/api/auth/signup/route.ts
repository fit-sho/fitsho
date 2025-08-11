import { NextRequest, NextResponse } from 'next/server'
import { signUp } from '@/lib/auth'
import { Role } from '@prisma/client'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password, firstName, lastName, role } = body

    if (!email || !password || !firstName || !lastName) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address' },
        { status: 400 }
      )
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters long' },
        { status: 400 }
      )
    }

    const validRole = role || 'CLIENT'
    if (!Object.values(Role).includes(validRole)) {
      return NextResponse.json(
        { error: 'Invalid role specified' },
        { status: 400 }
      )
    }

    const result = await signUp({
      email: email.toLowerCase().trim(),
      password,
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      role: validRole
    })

    // Set HTTP-only cookie with the token
    const response = NextResponse.json({
      user: result.user,
      message: 'Account created successfully! Welcome to FitSho!'
    })

    response.cookies.set('auth-token', result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/'
    })

    return response
  } catch (error: any) {
    console.error('Signup error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to create account. Please try again.' },
      { status: 400 }
    )
  }
}
