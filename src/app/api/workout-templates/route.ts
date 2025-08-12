import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getCurrentUser } from '@/lib/auth';

const prisma = new PrismaClient();

// GET /api/workout-templates - Get all workout templates
export async function GET(request: NextRequest) {
  try {
    const templates = await prisma.workoutTemplate.findMany({
      include: {
        templateExercises: {
          include: {
            exercise: true
          },
          orderBy: {
            orderIndex: 'asc'
          }
        }
      },
      orderBy: {
        name: 'asc'
      }
    });

    return NextResponse.json(templates);
  } catch (error) {
    console.error('Error fetching workout templates:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST /api/workout-templates - Create new workout template (Admin only)
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

    const templateData = await request.json();

    if (!templateData.name || !templateData.exercises || !Array.isArray(templateData.exercises)) {
      return NextResponse.json(
        { error: 'Name and exercises array are required' },
        { status: 400 }
      );
    }

    const template = await prisma.$transaction(async (tx) => {
      const newTemplate = await tx.workoutTemplate.create({
        data: {
          name: templateData.name,
          description: templateData.description || null,
          trainerId: user.id,
        }
      });

      if (templateData.exercises.length > 0) {
        await tx.templateExercise.createMany({
          data: templateData.exercises.map((exercise: any) => ({
            templateId: newTemplate.id,
            exerciseId: exercise.exerciseId,
            sets: exercise.sets,
            reps: exercise.reps,
            orderIndex: exercise.orderIndex,
          }))
        });
      }

      return await tx.workoutTemplate.findUnique({
        where: { id: newTemplate.id },
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
      });
    });

    return NextResponse.json(template, { status: 201 });
  } catch (error) {
    console.error('Error creating workout template:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
