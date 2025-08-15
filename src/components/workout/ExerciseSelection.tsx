"use client";

import { motion } from "framer-motion";
import { Plus, ArrowLeft } from "lucide-react";
import { Exercise, WorkoutExercise } from "./types";
import { ExerciseCard } from "./ExerciseCard";

interface ExerciseSelectionProps {
  selectedMuscles: string[];
  primaryMuscle?: string;
  availableExercises: Exercise[];
  workoutExercises: WorkoutExercise[];
  onAddExercise: (exercise: Exercise) => void;
  onRemoveExercise?: (exerciseId: string) => void;
  onContinue: () => void;
  onAddMuscle?: () => void;
  showAddMuscleModal?: boolean;
  onCloseAddMuscleModal?: () => void;
  onAddMuscleConfirm?: (muscle: string) => void;
}

export const ExerciseSelection = ({
  selectedMuscles,
  primaryMuscle,
  availableExercises,
  workoutExercises,
  onAddExercise,
  onRemoveExercise,
  onContinue,
  onAddMuscle,
  showAddMuscleModal,
  onCloseAddMuscleModal,
  onAddMuscleConfirm,
}: ExerciseSelectionProps) => {
  const isExerciseInWorkout = (exerciseId: string) => {
    return workoutExercises.some((we) => we.exerciseId === exerciseId);
  };

  return (
    <div className="flex flex-1 flex-col">
      {/* Exercise Grid */}
      <div className="flex-1 overflow-y-auto pb-4">
        <div className="grid grid-cols-1 gap-3">
          {availableExercises.map((exercise, index) => {
            const isPrimaryMuscle =
              primaryMuscle && exercise.muscleGroups.includes(primaryMuscle);

            return (
              <motion.div
                key={exercise.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`rounded-2xl border p-4 transition-all duration-200 ${
                  isExerciseInWorkout(exercise.id)
                    ? "border-cyan-400/50 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 shadow-lg shadow-cyan-500/10"
                    : isPrimaryMuscle
                      ? "border-cyan-400/30 bg-white/10 hover:bg-white/15"
                      : "border-white/10 bg-white/5 hover:bg-white/10"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="mb-2 flex items-center gap-3">
                      {exercise.imageUrl && (
                        <img
                          src={exercise.imageUrl}
                          alt={exercise.name}
                          className="h-12 w-12 rounded-xl object-cover"
                        />
                      )}
                      <div>
                        <h3 className="text-lg font-semibold text-white">
                          {exercise.name}
                        </h3>
                        {isPrimaryMuscle && (
                          <span className="rounded-full bg-cyan-400/20 px-2 py-1 text-xs text-cyan-400">
                            Primary Focus
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="mb-2 flex flex-wrap gap-1">
                      {exercise.muscleGroups.map((muscle) => (
                        <span
                          key={muscle}
                          className={`rounded-full px-2 py-1 text-xs ${
                            muscle === primaryMuscle
                              ? "bg-cyan-400/20 text-cyan-400"
                              : "bg-white/10 text-white/60"
                          }`}
                        >
                          {muscle}
                        </span>
                      ))}
                    </div>

                    {exercise.recommendedSets && (
                      <p className="text-sm text-white/60">
                        Target: {exercise.recommendedSets}
                      </p>
                    )}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      if (isExerciseInWorkout(exercise.id)) {
                        onRemoveExercise?.(exercise.id);
                      } else {
                        onAddExercise(exercise);
                      }
                    }}
                    className={`flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-200 ${
                      isExerciseInWorkout(exercise.id)
                        ? "border border-red-400/30 bg-red-500/20 text-red-400"
                        : "bg-gradient-to-r from-cyan-500 to-purple-500 text-white shadow-lg"
                    }`}
                  >
                    {isExerciseInWorkout(exercise.id) ? "−" : "+"}
                  </motion.button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {availableExercises.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-white/60">
              No exercises found for selected muscles
            </p>
          </div>
        )}
      </div>

      {/* Continue Button - Fixed at Bottom */}
      {workoutExercises.length > 0 && (
        <div className="border-t border-white/10 bg-slate-900/80 p-4 backdrop-blur-sm">
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={onContinue}
            className="flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-500 py-4 text-lg font-semibold text-white shadow-lg shadow-cyan-500/25 transition-all duration-200 hover:scale-[1.02] hover:shadow-cyan-500/40 active:scale-[0.98]"
          >
            <span>Start Workout</span>
            <span className="rounded-full bg-white/20 px-2 py-1 text-sm">
              {workoutExercises.length}
            </span>
          </motion.button>
        </div>
      )}
    </div>
  );
};
