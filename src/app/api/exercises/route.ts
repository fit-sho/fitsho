import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getCurrentUser } from '@/lib/auth';

const prisma = new PrismaClient();

// GET /api/exercises - Get all exercises
export async function GET(request: NextRequest) {
  try {
    const exercises = await prisma.exercise.findMany({
      orderBy: {
        name: 'asc'
      }
    });

    return NextResponse.json(exercises);
  } catch (error) {
    console.error('Error fetching exercises:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST /api/exercises - Create new exercise (Admin only)
export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get('auth-token')?.value;
    
    if (!token) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const user = await getCurrentUser(token);
    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Admin access required' },
        { status: 403 }
      );
    }

    const exerciseData = await request.json();

    if (!exerciseData.name || !exerciseData.description || !exerciseData.muscleGroups) {
      return NextResponse.json(
        { error: 'Name, description, and muscle groups are required' },
        { status: 400 }
      );
    }

    const exercise = await prisma.exercise.create({
      data: {
        name: exerciseData.name,
        description: exerciseData.description,
        muscleGroups: exerciseData.muscleGroups,
        videoUrl: exerciseData.videoUrl || null,
        imageUrl: exerciseData.imageUrl || null,
        recommendedSets: exerciseData.recommendedSets || 4,
        recommendedReps: exerciseData.recommendedReps || "8-12",
        difficulty: exerciseData.difficulty || "Intermediate",
        equipment: exerciseData.equipment || null,
      }
    });

    return NextResponse.json(exercise, { status: 201 });
  } catch (error) {
    console.error('Error creating exercise:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
