"use client";

import { motion } from "framer-motion";
import { Plus, ArrowLeft } from "lucide-react";
import { Exercise, WorkoutExercise } from "./types";
import { ExerciseCard } from "./ExerciseCard";

interface ExerciseSelectionProps {
  selectedMuscles: string[];
  availableExercises: Exercise[];
  workoutExercises: WorkoutExercise[];
  onAddExercise: (exercise: Exercise) => void;
  onRemoveExercise?: (exerciseId: string) => void;
  onContinue: () => void;
  onBack: () => void;
  onShowAddMuscleModal: () => void;
  onAddMuscle?: () => void;
  showAddMuscleModal?: boolean;
  onCloseAddMuscleModal?: () => void;
  onAddMuscleConfirm?: (muscle: string) => void;
}

export const ExerciseSelection = ({
  selectedMuscles,
  availableExercises,
  workoutExercises,
  onAddExercise,
  onRemoveExercise,
  onContinue,
  onBack,
  onShowAddMuscleModal,
  onAddMuscle,
  showAddMuscleModal,
  onCloseAddMuscleModal,
  onAddMuscleConfirm,
}: ExerciseSelectionProps) => {
  const isExerciseInWorkout = (exerciseId: string) => {
    return workoutExercises.some(we => we.exerciseId === exerciseId);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="max-w-6xl mx-auto"
    >
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold mb-2">Choose Your Exercises</h2>
          <p className="text-gray-400">
            Selected muscles: {selectedMuscles.join(", ")}
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={onShowAddMuscleModal}
            className="bg-slate-800 px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-slate-700"
          >
            <Plus className="w-4 h-4" /> Add Muscle
          </button>
          <button
            onClick={onBack}
            className="bg-slate-800 px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-slate-700"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {availableExercises.map((exercise) => (
          <ExerciseCard
            key={exercise.id}
            exercise={exercise}
            onAddToWorkout={onAddExercise}
            isInWorkout={isExerciseInWorkout(exercise.id)}
          />
        ))}
      </div>

      {workoutExercises.length > 0 && (
        <div className="text-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {/* Navigate to step 3 */}}
            className="bg-gradient-to-r from-cyan-500 to-purple-500 px-8 py-3 rounded-lg font-semibold"
          >
            Start Workout ({workoutExercises.length} exercises)
          </motion.button>
        </div>
      )}
    </motion.div>
  );
};
