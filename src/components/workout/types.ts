// Shared types for workout components
export interface Exercise {
  id: string;
  name: string;
  description: string;
  muscleGroups: string[];
  imageUrl?: string;
  recommendedSets?: number;
  recommendedReps?: string;
  difficulty?: string;
  equipment?: string;
}

export interface WorkoutSet {
  reps: number;
  weight: number;
  completed: boolean;
}

export interface WorkoutExercise {
  id: string;
  exerciseId: string;
  exercise: Exercise;
  sets: WorkoutSet[];
  notes: string;
  targetSets?: number;
  targetReps?: string;
  completed?: boolean;
}

export interface MuscleGroupOption {
  name: string;
  emoji: string;
  color: string;
  description: string;
}

export const muscleGroups: MuscleGroupOption[] = [
  { name: "CHEST", emoji: "💪", color: "from-red-500 to-pink-500", description: "Pectorals" },
  { name: "BACK", emoji: "🏋️", color: "from-blue-500 to-cyan-500", description: "Lats & Rhomboids" },
  { name: "SHOULDERS", emoji: "🔥", color: "from-orange-500 to-yellow-500", description: "Deltoids" },
  { name: "BICEPS", emoji: "💪", color: "from-green-500 to-emerald-500", description: "Bicep Muscles" },
  { name: "TRICEPS", emoji: "⚡", color: "from-purple-500 to-violet-500", description: "Tricep Muscles" },
  { name: "LEGS", emoji: "🦵", color: "from-indigo-500 to-blue-500", description: "Quads & Hamstrings" },
  { name: "GLUTES", emoji: "🍑", color: "from-pink-500 to-rose-500", description: "Glute Muscles" },
  { name: "CORE", emoji: "🎯", color: "from-yellow-500 to-orange-500", description: "Abs & Core" },
  { name: "CARDIO", emoji: "❤️", color: "from-red-500 to-orange-500", description: "Cardiovascular" },
];
