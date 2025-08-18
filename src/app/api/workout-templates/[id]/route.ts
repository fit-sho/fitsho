import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getCurrentUser, verifyToken } from "@/lib/auth";

const prisma = new PrismaClient();

// GET /api/workout-templates/[id] - Get single workout template
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const token = request.cookies.get("auth-token")?.value;
    
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    const template = await prisma.workoutTemplates.findUnique({
      where: {
        id: params.id,
      },
      include: {
        trainer: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
        createdBy: {
          select: {
            id: true,
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
    });

    if (!template) {
      return NextResponse.json(
        { error: 'Template not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(template);
  } catch (error) {
    console.error('Error fetching workout template:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PUT /api/workout-templates/[id] - Update workout template (Admin only)
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const token = request.cookies.get("auth-token")?.value;

    if (!token) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const user = await getCurrentUser(token);
    if (!user || user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Admin access required" },
        { status: 403 }
      );
    }

    const templateData = await request.json();
    const { id } = params;

    if (
      !templateData.name ||
      !templateData.exercises ||
      !Array.isArray(templateData.exercises)
    ) {
      return NextResponse.json(
        { error: "Name and exercises array are required" },
        { status: 400 }
      );
    }

    const template = await prisma.$transaction(async (tx) => {
      const updatedTemplate = await tx.workoutTemplates.update({
        where: { id },
        data: {
          name: templateData.name,
          description: templateData.description || null,
        },
      });

      await tx.templateExercises.deleteMany({
        where: { templateId: id },
      });
      if (templateData.exercises.length > 0) {
        await tx.templateExercises.createMany({
          data: templateData.exercises.map((exercise: any) => ({
            templateId: id,
            exerciseId: exercise.exerciseId,
            sets: exercise.sets,
            reps: exercise.reps,
            orderIndex: exercise.orderIndex,
          })),
        });
      }

      return await tx.workoutTemplates.findUnique({
        where: { id },
        include: {
          templateExercises: {
            include: {
              exercise: true,
            },
            orderBy: {
              orderIndex: "asc",
            },
          },
        },
      });
    });

    return NextResponse.json(template);
  } catch (error) {
    console.error("Error updating workout template:", error);
    return NextResponse.json(
      { error: "Internal server error" },
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
    const token = request.cookies.get("auth-token")?.value;

    if (!token) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const user = await getCurrentUser(token);
    if (!user || user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Admin access required" },
        { status: 403 }
      );
    }

    const { id } = params;

    await prisma.workoutTemplates.delete({
      where: { id },
    });

    return NextResponse.json({
      message: "Workout template deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting workout template:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
