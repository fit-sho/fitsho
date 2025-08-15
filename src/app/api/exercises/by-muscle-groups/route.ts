import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const { muscleGroups } = await request.json();

    if (!muscleGroups || !Array.isArray(muscleGroups)) {
      return NextResponse.json(
        { error: "Muscle groups array is required" },
        { status: 400 }
      );
    }

    const exercises = await prisma.exercise.findMany({
      where: {
        muscleGroups: {
          hasSome: muscleGroups,
        },
      },
      orderBy: {
        name: "asc",
      },
    });

    return NextResponse.json(exercises);
  } catch (error) {
    console.error("Error fetching exercises by muscle groups:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
