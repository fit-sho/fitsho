// Admin-specific types and interfaces
export interface Exercise {
  id: string;
  name: string;
  description: string;
  muscleGroups: MuscleGroup[];
  videoUrl?: string;
  imageUrl?: string;
  recommendedSets?: number;
  recommendedReps?: string;
  difficulty?: string;
  equipment?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface WorkoutTemplate {
  id: string;
  name: string;
  trainerId: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
  templateExercises: TemplateExercise[];
}

export interface TemplateExercise {
  id: string;
  templateId: string;
  exerciseId: string;
  sets: number;
  reps: number;
  orderIndex: number;
  exercise: Exercise;
}

export enum MuscleGroup {
  CHEST = "CHEST",
  BACK = "BACK",
  SHOULDERS = "SHOULDERS",
  BICEPS = "BICEPS",
  TRICEPS = "TRICEPS",
  LEGS = "LEGS",
  GLUTES = "GLUTES",
  CORE = "CORE",
  CARDIO = "CARDIO",
}

export interface CreateExerciseData {
  name: string;
  description: string;
  muscleGroups: MuscleGroup[];
  videoUrl?: string;
  imageUrl?: string;
  recommendedSets?: number;
  recommendedReps?: string;
  difficulty?: string;
  equipment?: string;
}

export interface CreateTemplateData {
  name: string;
  description?: string;
  exercises: {
    exerciseId: string;
    sets: number;
    reps: number;
    orderIndex: number;
  }[];
}

export const DIFFICULTY_OPTIONS = [
  "Beginner",
  "Intermediate",
  "Advanced",
] as const;

export const EQUIPMENT_OPTIONS = [
  "Barbell",
  "Dumbbell",
  "Bodyweight",
  "Machine",
  "Cable",
  "Kettlebell",
  "Resistance Band",
] as const;

export const MUSCLE_GROUP_OPTIONS = Object.values(MuscleGroup);

export const MUSCLE_GROUP_LABELS = {
  [MuscleGroup.CHEST]: "Chest",
  [MuscleGroup.BACK]: "Back",
  [MuscleGroup.SHOULDERS]: "Shoulders",
  [MuscleGroup.BICEPS]: "Biceps",
  [MuscleGroup.TRICEPS]: "Triceps",
  [MuscleGroup.LEGS]: "Legs",
  [MuscleGroup.GLUTES]: "Glutes",
  [MuscleGroup.CORE]: "Core",
  [MuscleGroup.CARDIO]: "Cardio",
};
