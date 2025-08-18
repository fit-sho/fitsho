import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { verifyToken } from '@/lib/auth';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('auth-token')?.value;
    
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    const userWorkouts = await prisma.userWorkouts.findMany({
      where: {
        userId: decoded.userId,
      },
      include: {
        template: {
          include: {
            trainer: {
              select: {
                firstName: true,
                lastName: true,
              },
            },
            templateExercises: {
              include: {
                exercise: true,
              },
              orderBy: {
                orderIndex: 'asc',
              },
            },
          },
        },
        workoutExercises: {
          include: {
            exercise: true,
          },
          orderBy: {
            orderIndex: 'asc',
          },
        },
      },
      orderBy: {
        date: 'desc',
      },
    });

    return NextResponse.json(userWorkouts);
  } catch (error) {
    console.error('Error fetching user workouts:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get('auth-token')?.value;
    
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    const body = await request.json();
    const { templateId, notes, exercises } = body;

    // Create the user workout
    const userWorkout = await prisma.userWorkouts.create({
      data: {
        userId: decoded.userId,
        templateId: templateId || null,
        notes: notes || null,
        workoutExercises: {
          create: exercises.map((exercise: any, index: number) => ({
            exerciseId: exercise.exerciseId,
            sets: exercise.sets,
            reps: exercise.reps,
            weight: exercise.weight || null,
            notes: exercise.notes || null,
            orderIndex: index,
          })),
        },
      },
      include: {
        template: {
          include: {
            trainer: {
              select: {
                firstName: true,
                lastName: true,
              },
            },
          },
        },
        workoutExercises: {
          include: {
            exercise: true,
          },
        },
      },
    });

    return NextResponse.json(userWorkout, { status: 201 });
  } catch (error) {
    console.error('Error creating user workout:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
