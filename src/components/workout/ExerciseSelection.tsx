"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Plus, ArrowLeft, ChevronDown, ChevronUp, Target, Clock, Dumbbell } from "lucide-react";
import { Exercise, WorkoutExercise } from "./types";
import { ExerciseCard } from "./ExerciseCard";
import { useState } from "react";

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
  const [expandedExercise, setExpandedExercise] = useState<string | null>(null);
  
  const isExerciseInWorkout = (exerciseId: string) => {
    return workoutExercises.some((we) => we.exerciseId === exerciseId);
  };

  const toggleExpanded = (exerciseId: string) => {
    setExpandedExercise(expandedExercise === exerciseId ? null : exerciseId);
  };

  return (
    <div className="flex flex-1 flex-col">
      {/* Exercise Grid */}
      <div className="flex-1 overflow-y-auto pb-4">
        {/* Desktop: 2-column grid, Mobile: single column */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {availableExercises.map((exercise, index) => {
            const isPrimaryMuscle =
              primaryMuscle && exercise.muscleGroups.includes(primaryMuscle);
            const isExpanded = expandedExercise === exercise.id;
            const isInWorkout = isExerciseInWorkout(exercise.id);

            return (
              <motion.div
                key={exercise.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`rounded-2xl border transition-all duration-200 ${
                  isInWorkout
                    ? "border-cyan-400/50 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 shadow-lg shadow-cyan-500/10"
                    : isPrimaryMuscle
                      ? "border-cyan-400/30 bg-white/10 hover:bg-white/15"
                      : "border-white/10 bg-white/5 hover:bg-white/10"
                }`}
              >
                {/* Main Card Content */}
                <div className="p-4">
                  <div className="flex items-start justify-between">
                    {/* Left side - Image and basic info */}
                    <div 
                      className="flex-1 cursor-pointer"
                      onClick={() => toggleExpanded(exercise.id)}
                    >
                      <div className="flex items-center gap-4">
                        {/* Exercise Image - Much larger on desktop */}
                        {exercise.imageUrl && (
                          <div className="relative">
                            <img
                              src={exercise.imageUrl}
                              alt={exercise.name}
                              className="h-16 w-16 rounded-xl object-cover lg:h-28 lg:w-28 xl:h-32 xl:w-32"
                            />
                            {isPrimaryMuscle && (
                              <div className="absolute -top-1 -right-1 rounded-full bg-cyan-400 p-1 lg:p-1.5">
                                <Target className="h-3 w-3 text-white lg:h-4 lg:w-4" />
                              </div>
                            )}
                          </div>
                        )}
                        
                        {/* Exercise Info */}
                        <div className="flex-1">
                          <div className="mb-2">
                            <h3 className="text-lg font-semibold text-white lg:text-xl">
                              {exercise.name}
                            </h3>
                            {isPrimaryMuscle && (
                              <span className="rounded-full bg-cyan-400/20 px-2 py-1 text-xs text-cyan-400">
                                Primary Focus
                              </span>
                            )}
                          </div>

                          {/* Desktop: Show more info inline */}
                          <div className="hidden lg:block">
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
                              <div className="flex items-center gap-2 text-sm text-white/60">
                                <Dumbbell className="h-4 w-4" />
                                <span>Target: {exercise.recommendedSets}</span>
                              </div>
                            )}
                            
                            {exercise.difficulty && (
                              <div className="mt-1 flex items-center gap-2 text-sm">
                                <span className={`rounded-full px-2 py-1 text-xs ${
                                  exercise.difficulty === 'Beginner' ? 'bg-green-500/20 text-green-400' :
                                  exercise.difficulty === 'Intermediate' ? 'bg-yellow-500/20 text-yellow-400' :
                                  'bg-red-500/20 text-red-400'
                                }`}>
                                  {exercise.difficulty}
                                </span>
                                {exercise.equipment && (
                                  <span className="rounded-full bg-white/10 px-2 py-1 text-xs text-white/60">
                                    {exercise.equipment}
                                  </span>
                                )}
                              </div>
                            )}
                          </div>

                          {/* Mobile: Show expand indicator */}
                          <div className="flex items-center justify-between lg:hidden">
                            <div className="flex flex-wrap gap-1">
                              {exercise.muscleGroups.slice(0, 2).map((muscle) => (
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
                              {exercise.muscleGroups.length > 2 && (
                                <span className="rounded-full bg-white/10 px-2 py-1 text-xs text-white/60">
                                  +{exercise.muscleGroups.length - 2}
                                </span>
                              )}
                            </div>
                            <motion.div
                              animate={{ rotate: isExpanded ? 180 : 0 }}
                              transition={{ duration: 0.2 }}
                            >
                              <ChevronDown className="h-5 w-5 text-white/60" />
                            </motion.div>
                          </div>

                          {/* Desktop: Show expand indicator and more details button */}
                          <div className="hidden lg:flex lg:items-center lg:justify-between lg:mt-3">
                            <div className="flex items-center gap-2 text-sm text-white/60">
                              <span>Click for more details</span>
                            </div>
                            <motion.div
                              animate={{ rotate: isExpanded ? 180 : 0 }}
                              transition={{ duration: 0.2 }}
                            >
                              <ChevronDown className="h-4 w-4 text-white/60" />
                            </motion.div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Add/Remove Button */}
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        if (isInWorkout) {
                          onRemoveExercise?.(exercise.id);
                        } else {
                          onAddExercise(exercise);
                        }
                      }}
                      className={`ml-4 flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-200 ${
                        isInWorkout
                          ? "border border-red-400/30 bg-red-500/20 text-red-400"
                          : "bg-gradient-to-r from-cyan-500 to-purple-500 text-white shadow-lg"
                      }`}
                    >
                      {isInWorkout ? "−" : "+"}
                    </motion.button>
                  </div>
                </div>

                {/* Expandable Details - Both Mobile and Desktop */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden border-t border-white/10"
                    >
                      <div className="p-4">
                        {/* Desktop and Mobile Layout */}
                        <div className="lg:flex lg:gap-6">
                          {/* Larger Image */}
                          {exercise.imageUrl && (
                            <div className="mb-4 lg:mb-0 lg:flex-shrink-0">
                              <img
                                src={exercise.imageUrl}
                                alt={exercise.name}
                                className="h-48 w-full rounded-xl object-cover lg:h-64 lg:w-80"
                              />
                            </div>
                          )}

                          {/* Details Section */}
                          <div className="lg:flex-1">
                            {/* All Muscle Groups */}
                            <div className="mb-3">
                              <h4 className="mb-2 text-sm font-semibold text-white/80 lg:text-base">Muscle Groups</h4>
                              <div className="flex flex-wrap gap-1">
                                {exercise.muscleGroups.map((muscle) => (
                                  <span
                                    key={muscle}
                                    className={`rounded-full px-2 py-1 text-xs lg:px-3 lg:py-1.5 lg:text-sm ${
                                      muscle === primaryMuscle
                                        ? "bg-cyan-400/20 text-cyan-400"
                                        : "bg-white/10 text-white/60"
                                    }`}
                                  >
                                    {muscle}
                                  </span>
                                ))}
                              </div>
                            </div>

                            {/* Exercise Details */}
                            <div className="space-y-3">
                              {exercise.recommendedSets && (
                                <div className="flex items-center gap-2">
                                  <Dumbbell className="h-4 w-4 text-cyan-400" />
                                  <span className="text-sm text-white/80 lg:text-base">
                                    Target: <span className="font-semibold text-white">{exercise.recommendedSets}</span>
                                  </span>
                                </div>
                              )}

                              <div className="flex items-center gap-4">
                                {exercise.difficulty && (
                                  <div className="flex items-center gap-2">
                                    <Target className="h-4 w-4 text-white/60" />
                                    <span className={`rounded-full px-2 py-1 text-xs font-medium lg:px-3 lg:py-1.5 lg:text-sm ${
                                      exercise.difficulty === 'Beginner' ? 'bg-green-500/20 text-green-400' :
                                      exercise.difficulty === 'Intermediate' ? 'bg-yellow-500/20 text-yellow-400' :
                                      'bg-red-500/20 text-red-400'
                                    }`}>
                                      {exercise.difficulty}
                                    </span>
                                  </div>
                                )}
                                
                                {exercise.equipment && (
                                  <div className="flex items-center gap-2">
                                    <Clock className="h-4 w-4 text-white/60" />
                                    <span className="rounded-full bg-white/10 px-2 py-1 text-xs text-white/60 lg:px-3 lg:py-1.5 lg:text-sm">
                                      {exercise.equipment}
                                    </span>
                                  </div>
                                )}
                              </div>

                              {exercise.description && (
                                <div>
                                  <h4 className="mb-1 text-sm font-semibold text-white/80 lg:text-base">Description</h4>
                                  <p className="text-sm text-white/60 leading-relaxed lg:text-base">
                                    {exercise.description}
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
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
