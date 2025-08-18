import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getCurrentUser } from "@/lib/auth";

const prisma = new PrismaClient();

// PUT /api/exercises/[id] - Update exercise (Admin only)
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

    const exerciseData = await request.json();
    const { id } = params;

    if (
      !exerciseData.name ||
      !exerciseData.description ||
      !exerciseData.muscleGroups
    ) {
      return NextResponse.json(
        { error: "Name, description, and muscle groups are required" },
        { status: 400 }
      );
    }

    const exercise = await prisma.exercises.update({
      where: { id },
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
      },
    });

    return NextResponse.json(exercise);
  } catch (error) {
    console.error("Error updating exercise:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// DELETE /api/exercises/[id] - Delete exercise (Admin only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Get auth token from cookie
    const token = request.cookies.get("auth-token")?.value;

    if (!token) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    // Verify user is admin
    const user = await getCurrentUser(token);
    if (!user || user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Admin access required" },
        { status: 403 }
      );
    }

    const { id } = params;

    await prisma.exercises.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Exercise deleted successfully" });
  } catch (error) {
    console.error("Error deleting exercise:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
