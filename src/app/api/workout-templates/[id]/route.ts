import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getCurrentUser } from '@/lib/auth';

const prisma = new PrismaClient();

// PUT /api/workout-templates/[id] - Update workout template (Admin only)
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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
    const { id } = params;

    if (!templateData.name || !templateData.exercises || !Array.isArray(templateData.exercises)) {
      return NextResponse.json(
        { error: 'Name and exercises array are required' },
        { status: 400 }
      );
    }

    const template = await prisma.$transaction(async (tx) => {
      const updatedTemplate = await tx.workoutTemplate.update({
        where: { id },
        data: {
          name: templateData.name,
          description: templateData.description || null,
        }
      });

      await tx.templateExercise.deleteMany({
        where: { templateId: id }
      });
      if (templateData.exercises.length > 0) {
        await tx.templateExercise.createMany({
          data: templateData.exercises.map((exercise: any) => ({
            templateId: id,
            exerciseId: exercise.exerciseId,
            sets: exercise.sets,
            reps: exercise.reps,
            orderIndex: exercise.orderIndex,
          }))
        });
      }

      return await tx.workoutTemplate.findUnique({
        where: { id },
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

    return NextResponse.json(template);
  } catch (error) {
    console.error('Error updating workout template:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE /api/workout-templates/[id] - Delete workout template (Admin only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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

    const { id } = params;

    await prisma.workoutTemplate.delete({
      where: { id }
    });

    return NextResponse.json({ message: 'Workout template deleted successfully' });
  } catch (error) {
    console.error('Error deleting workout template:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
