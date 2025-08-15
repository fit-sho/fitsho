const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const exercises = [
  // Chest exercises
  {
    name: "Bench Press",
    description: "Classic chest exercise using a barbell on a bench",
    muscleGroups: ["CHEST", "TRICEPS"],
    videoUrl: null,
    imageUrl:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
    recommendedSets: 4,
    recommendedReps: "8-12",
    difficulty: "Intermediate",
    equipment: "Barbell",
  },
  {
    name: "Push-ups",
    description: "Bodyweight exercise targeting chest, shoulders, and triceps",
    muscleGroups: ["CHEST", "SHOULDERS", "TRICEPS"],
    videoUrl: null,
    imageUrl:
      "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=300&fit=crop",
    recommendedSets: 3,
    recommendedReps: "To failure",
    difficulty: "Beginner",
    equipment: "Bodyweight",
  },
  {
    name: "Dumbbell Flyes",
    description: "Isolation exercise for chest using dumbbells",
    muscleGroups: ["CHEST"],
    videoUrl: null,
    imageUrl:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
    recommendedSets: 3,
    recommendedReps: "12-15",
    difficulty: "Intermediate",
    equipment: "Dumbbell",
  },
  {
    name: "Incline Bench Press",
    description: "Upper chest focused bench press variation",
    muscleGroups: ["CHEST", "SHOULDERS", "TRICEPS"],
    videoUrl: null,
    imageUrl:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
    recommendedSets: 4,
    recommendedReps: "8-10",
    difficulty: "Intermediate",
    equipment: "Barbell",
  },
  {
    name: "Chest Dips",
    description: "Bodyweight exercise targeting lower chest",
    muscleGroups: ["CHEST", "TRICEPS"],
    videoUrl: null,
    imageUrl:
      "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=300&fit=crop",
    recommendedSets: 3,
    recommendedReps: "To failure",
    difficulty: "Intermediate",
    equipment: "Bodyweight",
  },

  // Back exercises
  {
    name: "Pull-ups",
    description: "Bodyweight exercise for back and biceps",
    muscleGroups: ["BACK", "BICEPS"],
    videoUrl: null,
    imageUrl:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
    recommendedSets: 4,
    recommendedReps: "To failure",
    difficulty: "Intermediate",
    equipment: "Bodyweight",
  },
  {
    name: "Deadlifts",
    description: "Compound exercise targeting back, glutes, and hamstrings",
    muscleGroups: ["BACK", "GLUTES", "LEGS"],
    videoUrl: null,
    imageUrl:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
    recommendedSets: 4,
    recommendedReps: "6-8",
    difficulty: "Advanced",
    equipment: "Barbell",
  },
  {
    name: "Bent-over Rows",
    description: "Rowing exercise for back muscles",
    muscleGroups: ["BACK", "BICEPS"],
    videoUrl: null,
  },
  {
    name: "Lat Pulldowns",
    description: "Cable exercise targeting latissimus dorsi",
    muscleGroups: ["BACK", "BICEPS"],
    videoUrl: null,
  },

  // Shoulder exercises
  {
    name: "Overhead Press",
    description: "Standing shoulder press with barbell or dumbbells",
    muscleGroups: ["SHOULDERS", "TRICEPS"],
    videoUrl: null,
  },
  {
    name: "Lateral Raises",
    description: "Isolation exercise for side deltoids",
    muscleGroups: ["SHOULDERS"],
    videoUrl: null,
  },
  {
    name: "Front Raises",
    description: "Isolation exercise for front deltoids",
    muscleGroups: ["SHOULDERS"],
    videoUrl: null,
  },

  // Biceps exercises
  {
    name: "Bicep Curls",
    description: "Classic bicep exercise with dumbbells or barbell",
    muscleGroups: ["BICEPS"],
    videoUrl: null,
    imageUrl:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
    recommendedSets: 3,
    recommendedReps: "12-15",
    difficulty: "Beginner",
    equipment: "Dumbbell",
  },
  {
    name: "Hammer Curls",
    description: "Bicep curl variation with neutral grip",
    muscleGroups: ["BICEPS"],
    videoUrl: null,
  },

  // Triceps exercises
  {
    name: "Tricep Dips",
    description: "Bodyweight exercise for triceps",
    muscleGroups: ["TRICEPS"],
    videoUrl: null,
  },
  {
    name: "Close-grip Bench Press",
    description: "Bench press variation targeting triceps",
    muscleGroups: ["TRICEPS", "CHEST"],
    videoUrl: null,
  },
  {
    name: "Tricep Pushdowns",
    description: "Cable exercise for triceps",
    muscleGroups: ["TRICEPS"],
    videoUrl: null,
  },

  // Leg exercises
  {
    name: "Squats",
    description: "Fundamental leg exercise targeting quads and glutes",
    muscleGroups: ["LEGS", "GLUTES"],
    videoUrl: null,
    imageUrl:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
    recommendedSets: 4,
    recommendedReps: "10-12",
    difficulty: "Beginner",
    equipment: "Bodyweight",
  },
  {
    name: "Lunges",
    description: "Single-leg exercise for quads and glutes",
    muscleGroups: ["LEGS", "GLUTES"],
    videoUrl: null,
  },
  {
    name: "Leg Press",
    description: "Machine exercise for legs",
    muscleGroups: ["LEGS", "GLUTES"],
    videoUrl: null,
  },
  {
    name: "Calf Raises",
    description: "Exercise targeting calf muscles",
    muscleGroups: ["LEGS"],
    videoUrl: null,
  },

  // Glute exercises
  {
    name: "Hip Thrusts",
    description: "Glute-focused exercise with barbell",
    muscleGroups: ["GLUTES"],
    videoUrl: null,
  },
  {
    name: "Glute Bridges",
    description: "Bodyweight glute exercise",
    muscleGroups: ["GLUTES"],
    videoUrl: null,
  },

  // Core exercises
  {
    name: "Planks",
    description: "Isometric core exercise",
    muscleGroups: ["CORE"],
    videoUrl: null,
  },
  {
    name: "Crunches",
    description: "Classic abdominal exercise",
    muscleGroups: ["CORE"],
    videoUrl: null,
  },
  {
    name: "Russian Twists",
    description: "Rotational core exercise",
    muscleGroups: ["CORE"],
    videoUrl: null,
  },

  // Cardio exercises
  {
    name: "Running",
    description: "Cardiovascular exercise",
    muscleGroups: ["CARDIO", "LEGS"],
    videoUrl: null,
  },
  {
    name: "Burpees",
    description: "Full-body cardio exercise",
    muscleGroups: ["CARDIO", "CHEST", "LEGS", "CORE"],
    videoUrl: null,
  },
  {
    name: "Jump Rope",
    description: "Cardio exercise with rope",
    muscleGroups: ["CARDIO", "LEGS"],
    videoUrl: null,
  },
];

async function seedExercises() {
  console.log("Starting to seed exercises...");

  try {
    // Clear existing exercises
    await prisma.exercise.deleteMany({});
    console.log("Cleared existing exercises");

    // Create new exercises
    for (const exercise of exercises) {
      await prisma.exercise.create({
        data: exercise,
      });
    }

    console.log(`Successfully seeded ${exercises.length} exercises`);
  } catch (error) {
    console.error("Error seeding exercises:", error);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the seed function
seedExercises();
