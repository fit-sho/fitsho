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
    
    const workoutHistory = await prisma.userWorkouts.findMany({
      where: {
        userId: decoded.userId
      },
      include: {
        template: {
          include: {
            templateExercises: {
              include: {
                exercise: true
              },
              orderBy: {
                orderIndex: 'asc'
              }
            }
          }
        },
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

    return NextResponse.json(workoutHistory);
  } catch (error) {
    console.error('Error getting workout history:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
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
    
    const workoutData = await request.json();

    if (!workoutData.exercises || !Array.isArray(workoutData.exercises)) {
      return NextResponse.json(
        { error: 'Exercises array is required' },
        { status: 400 }
      );
    }

    const workout = await prisma.$transaction(async (tx) => {
      const newWorkout = await tx.userWorkouts.create({
        data: {
          userId: decoded.userId,
          templateId: workoutData.templateId || undefined,
          notes: workoutData.notes || null,
          date: workoutData.date ? new Date(workoutData.date) : new Date(),
        },
      });

      if (workoutData.exercises.length > 0) {
        await tx.workoutExercises.createMany({
          data: workoutData.exercises.map((exercise: any, index: number) => ({
            workoutId: newWorkout.id,
            exerciseId: exercise.exerciseId,
            sets: exercise.sets,
            reps: exercise.reps,
            weight: exercise.weight || null,
            orderIndex: exercise.orderIndex || index,
          })),
        });
      }

      return await tx.userWorkouts.findUnique({
        where: { id: newWorkout.id },
        include: {
          template: {
            include: {
              templateExercises: {
                include: {
                  exercise: true
                },
                orderBy: {
                  orderIndex: 'asc'
                }
              }
            }
          },
          workoutExercises: {
            include: {
              exercise: true
            },
            orderBy: {
              orderIndex: 'asc'
            }
          }
        },
      });
    });

    return NextResponse.json(workout, { status: 201 });
  } catch (error) {
    console.error('Error creating workout:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
