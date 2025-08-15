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
    return workoutExercises.some(we => we.exerciseId === exerciseId);
  };

  return (
    <div className="flex-1 flex flex-col">
      {/* Exercise Grid */}
      <div className="flex-1 overflow-y-auto pb-4">
        <div className="grid grid-cols-1 gap-3">
          {availableExercises.map((exercise, index) => {
            const isPrimaryMuscle = primaryMuscle && exercise.muscleGroups.includes(primaryMuscle);
            
            return (
              <motion.div
                key={exercise.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`p-4 rounded-2xl border transition-all duration-200 ${
                  isExerciseInWorkout(exercise.id)
                    ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border-cyan-400/50 shadow-lg shadow-cyan-500/10'
                    : isPrimaryMuscle
                    ? 'bg-white/10 border-cyan-400/30 hover:bg-white/15'
                    : 'bg-white/5 border-white/10 hover:bg-white/10'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      {exercise.imageUrl && (
                        <img 
                          src={exercise.imageUrl} 
                          alt={exercise.name}
                          className="w-12 h-12 rounded-xl object-cover"
                        />
                      )}
                      <div>
                        <h3 className="font-semibold text-white text-lg">{exercise.name}</h3>
                        {isPrimaryMuscle && (
                          <span className="text-xs bg-cyan-400/20 text-cyan-400 px-2 py-1 rounded-full">
                            Primary Focus
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-1 mb-2">
                      {exercise.muscleGroups.map((muscle) => (
                        <span 
                          key={muscle}
                          className={`text-xs px-2 py-1 rounded-full ${
                            muscle === primaryMuscle 
                              ? 'bg-cyan-400/20 text-cyan-400' 
                              : 'bg-white/10 text-white/60'
                          }`}
                        >
                          {muscle}
                        </span>
                      ))}
                    </div>
                    
                    {exercise.recommendedSets && (
                      <p className="text-white/60 text-sm">
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
                    className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-200 ${
                      isExerciseInWorkout(exercise.id)
                        ? 'bg-red-500/20 text-red-400 border border-red-400/30'
                        : 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white shadow-lg'
                    }`}
                  >
                    {isExerciseInWorkout(exercise.id) ? '−' : '+'}
                  </motion.button>
                </div>
              </motion.div>
            );
          })}
        </div>
        
        {availableExercises.length === 0 && (
          <div className="text-center py-12">
            <p className="text-white/60">No exercises found for selected muscles</p>
          </div>
        )}
      </div>

      {/* Continue Button - Fixed at Bottom */}
      {workoutExercises.length > 0 && (
        <div className="p-4 border-t border-white/10 bg-slate-900/80 backdrop-blur-sm">
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={onContinue}
            className="w-full py-4 rounded-2xl font-semibold text-lg bg-gradient-to-r from-cyan-500 to-purple-500 text-white shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-3"
          >
            <span>Start Workout</span>
            <span className="bg-white/20 px-2 py-1 rounded-full text-sm">
              {workoutExercises.length}
            </span>
          </motion.button>
        </div>
      )}
    </div>
  );
};
