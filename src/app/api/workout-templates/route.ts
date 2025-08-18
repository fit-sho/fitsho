import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getCurrentUser, verifyToken } from "@/lib/auth";

const prisma = new PrismaClient();

// GET /api/workout-templates - Get all workout templates
export async function GET(request: NextRequest) {
  try {
    const templates = await prisma.workoutTemplates.findMany({
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
            orderIndex: "asc",
          },
        },
      },
      orderBy: {
        name: "asc",
      },
    });

    return NextResponse.json(templates);
  } catch (error) {
    console.error("Error fetching workout templates:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// POST /api/workout-templates - Create new workout template
export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get("auth-token")?.value;

    if (!token) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json(
        { error: "Invalid token" },
        { status: 401 }
      );
    }

    const user = await getCurrentUser(token);
    if (!user) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    // Check template limit for CLIENT users
    if (user.role === "CLIENT") {
      const existingTemplateCount = await prisma.workoutTemplates.count({
        where: {
          createdById: user.id
        }
      });

      if (existingTemplateCount >= 2) {
        return NextResponse.json(
          { error: "Template limit reached. You can only create 2 templates. Delete an existing template to create a new one." },
          { status: 403 }
        );
      }
    }

    const templateData = await request.json();

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
      const newTemplate = await tx.workoutTemplates.create({
        data: {
          name: templateData.name,
          description: templateData.description || null,
          createdById: user.id,
          // Set trainerId only for TRAINER/ADMIN roles
          trainerId: user.role === "TRAINER" || user.role === "ADMIN" ? user.id : undefined,
        },
      });

      if (templateData.exercises.length > 0) {
        await tx.templateExercises.createMany({
          data: templateData.exercises.map((exercise: any) => ({
            templateId: newTemplate.id,
            exerciseId: exercise.exerciseId,
            sets: exercise.sets,
            reps: exercise.reps,
            orderIndex: exercise.orderIndex,
          })),
        });
      }

      return await tx.workoutTemplates.findUnique({
        where: { id: newTemplate.id },
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

    return NextResponse.json(template, { status: 201 });
  } catch (error) {
    console.error("Error creating workout template:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
