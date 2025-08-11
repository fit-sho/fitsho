import { NextRequest, NextResponse } from 'next/server'
import { verifyAuth } from '@/lib/auth'
import { prisma } from '@/lib/db'

export async function PUT(request: NextRequest) {
  try {
    const authResult = await verifyAuth(request)
    if (!authResult.success || !authResult.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const userId = authResult.user.id
    const body = await request.json()

    const { firstName, lastName, age, height, weight, sex } = body

    if (!firstName || !lastName) {
      return NextResponse.json(
        { error: 'First name and last name are required' },
        { status: 400 }
      )
    }

    if (age && (age < 13 || age > 120)) {
      return NextResponse.json(
        { error: 'Age must be between 13 and 120' },
        { status: 400 }
      )
    }

    if (height && (height < 100 || height > 250)) {
      return NextResponse.json(
        { error: 'Height must be between 100 and 250 cm' },
        { status: 400 }
      )
    }

    if (weight && (weight < 30 || weight > 300)) {
      return NextResponse.json(
        { error: 'Weight must be between 30 and 300 kg' },
        { status: 400 }
      )
    }

    if (sex && !['male', 'female', 'other'].includes(sex.toLowerCase())) {
      return NextResponse.json(
        { error: 'Invalid sex value' },
        { status: 400 }
      )
    }

    const updatedProfile = await prisma.profile.update({
      where: { id: userId },
      data: {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        age: age ? parseInt(age) : null,
        height: height ? parseInt(height) : null,
        weight: weight ? parseInt(weight) : null,
        sex: sex ? sex.toLowerCase() : null,
        updatedAt: new Date()
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        age: true,
        height: true,
        weight: true,
        sex: true,
        role: true,
        createdAt: true,
        updatedAt: true
      }
    })

    return NextResponse.json({
      success: true,
      user: updatedProfile
    })

  } catch (error) {
    console.error('Profile update error:', error)
    
    if (error instanceof Error) {
      if (error.message.includes('Record to update not found')) {
        return NextResponse.json(
          { error: 'User profile not found' },
          { status: 404 }
        )
      }
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
