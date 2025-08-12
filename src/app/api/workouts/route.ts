import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    // Verify authentication
    const token = request.cookies.get('auth-token')?.value;
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };
    const { userId, exercises, notes } = await request.json();

    // Verify the user is creating their own workout
    if (decoded.userId !== userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!exercises || !Array.isArray(exercises) || exercises.length === 0) {
      return NextResponse.json(
        { error: 'Exercises array is required and cannot be empty' },
        { status: 400 }
      );
    }

    // Create the workout
    const workout = await prisma.userWorkout.create({
      data: {
        userId,
        notes: notes || '',
        workoutExercises: {
          create: exercises.map((exercise: any, index: number) => ({
            exerciseId: exercise.exerciseId,
            sets: exercise.sets,
            reps: exercise.reps,
            weight: exercise.weight || null,
            notes: exercise.notes || '',
            orderIndex: index
          }))
        }
      },
      include: {
        workoutExercises: {
          include: {
            exercise: true
          }
        }
      }
    });

    return NextResponse.json(workout);
  } catch (error) {
    console.error('Error creating workout:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    // Verify authentication
    const token = request.cookies.get('auth-token')?.value;
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    // Verify the user is accessing their own workouts
    if (decoded.userId !== userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const workouts = await prisma.userWorkout.findMany({
      where: {
        userId: decoded.userId
      },
      include: {
        workoutExercises: {
          include: {
            exercise: true
          },
          orderBy: {
            orderIndex: 'asc'
          }
        }
      },
      orderBy: {
        date: 'desc'
      }
    });

    return NextResponse.json(workouts);
  } catch (error) {
    console.error('Error fetching workouts:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
