"use client";

import { motion } from "framer-motion";
import { Check, Save, Trash2, Edit3, Target, Zap, Scale } from "lucide-react";
import { WorkoutExercise, WorkoutSet } from "./types";

interface WorkoutTrackingProps {
  workoutExercises: WorkoutExercise[];
  workoutNotes: string;
  weightUnit: 'kg' | 'lbs';
  onUpdateExercise: (updatedExercise: WorkoutExercise) => void;
  onUpdateNotes: (notes: string) => void;
  onUpdateWeightUnit: (unit: 'kg' | 'lbs') => void;
  onFinishWorkout: () => void;
}

export const WorkoutTracking = ({
  workoutExercises,
  workoutNotes,
  weightUnit,
  onUpdateExercise,
  onUpdateNotes,
  onUpdateWeightUnit,
  onFinishWorkout,
}: WorkoutTrackingProps) => {
  const updateSet = (
    exerciseId: string,
    setIndex: number,
    updates: Partial<WorkoutSet>
  ) => {
    const exercise = workoutExercises.find(
      (we) => we.exerciseId === exerciseId
    );
    if (!exercise) return;

    const updatedSets = exercise.sets.map((set, index) =>
      index === setIndex ? { ...set, ...updates } : set
    );

    onUpdateExercise({ ...exercise, sets: updatedSets });
  };

  const addSet = (exerciseId: string) => {
    const exercise = workoutExercises.find(
      (we) => we.exerciseId === exerciseId
    );
    if (!exercise) return;

    const newSet: WorkoutSet = { reps: 0, weight: 0, completed: false };
    onUpdateExercise({ ...exercise, sets: [...exercise.sets, newSet] });
  };

  const removeSet = (exerciseId: string, setIndex: number) => {
    const exercise = workoutExercises.find(
      (we) => we.exerciseId === exerciseId
    );
    if (!exercise || exercise.sets.length <= 1) return;

    const updatedSets = exercise.sets.filter((_, index) => index !== setIndex);
    onUpdateExercise({ ...exercise, sets: updatedSets });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full"
    >
      {/* Weight Unit Selector */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Scale className="h-5 w-5 text-cyan-400" />
            <h3 className="text-lg font-semibold text-white">Weight Unit</h3>
          </div>
          <div className="flex rounded-lg border border-white/20 bg-white/10 p-1">
            <button
              onClick={() => onUpdateWeightUnit('lbs')}
              className={`rounded-md px-3 py-1 text-sm font-medium transition-all duration-200 ${
                weightUnit === 'lbs'
                  ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white shadow-lg'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              lbs
            </button>
            <button
              onClick={() => onUpdateWeightUnit('kg')}
              className={`rounded-md px-3 py-1 text-sm font-medium transition-all duration-200 ${
                weightUnit === 'kg'
                  ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white shadow-lg'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              kg
            </button>
          </div>
        </div>
      </motion.div>

      <div className="space-y-4 sm:space-y-6">
        {workoutExercises.map((workoutExercise, exerciseIndex) => (
          <motion.div
            key={workoutExercise.exerciseId}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: exerciseIndex * 0.1 }}
            className="rounded-2xl border border-white/10 bg-white/5 p-3 sm:p-6 backdrop-blur-sm"
          >
            <div className="mb-4">
              <h3 className="mb-2 text-lg sm:text-xl font-semibold text-white">
                {workoutExercise.exercise.name}
              </h3>
              <div className="flex flex-col gap-2 text-sm text-white/70 sm:flex-row sm:items-center sm:gap-4">
                <div className="flex items-center gap-1">
                  <Target className="h-4 w-4 text-cyan-400" />
                  <span className="text-white/80">
                    Target: {workoutExercise.targetSets || 3} ×{" "}
                    {workoutExercise.targetReps || 12}
                  </span>
                </div>
                {workoutExercise.exercise.equipment && (
                  <div className="flex items-center gap-1">
                    <Zap className="h-4 w-4 text-purple-400" />
                    <span className="text-white/80">
                      {workoutExercise.exercise.equipment}
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-3">
              {workoutExercise.sets.map((set, setIndex) => (
                <div
                  key={setIndex}
                  className="rounded-xl border border-white/10 bg-white/5 p-2 sm:p-3 backdrop-blur-sm"
                >
                  {/* Mobile Layout */}
                  <div className="flex flex-col gap-3 sm:hidden">
                    <div className="grid grid-cols-3 gap-2 items-end">
                      <div>
                        <label className="mb-1 block text-xs font-medium text-white/70">
                          Set {setIndex + 1}
                        </label>
                        <div className="rounded-lg border border-white/20 bg-white/10 px-2 py-2 text-center text-white/50 text-sm">
                          #{setIndex + 1}
                        </div>
                      </div>
                      <div>
                        <label className="mb-1 block text-xs font-medium text-white/70">
                          Reps
                        </label>
                        <input
                          type="number"
                          value={set.reps || ""}
                          onChange={(e) =>
                            updateSet(workoutExercise.exerciseId, setIndex, {
                              reps: parseInt(e.target.value) || 0,
                            })
                          }
                          className="w-full rounded-lg border border-white/20 bg-white/10 px-2 py-2 text-center text-white backdrop-blur-sm focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                          min="0"
                          placeholder="0"
                        />
                      </div>
                      <div>
                        <label className="mb-1 block text-xs font-medium text-white/70">
                          Weight ({weightUnit})
                        </label>
                        <input
                          type="number"
                          value={set.weight || ""}
                          onChange={(e) =>
                            updateSet(workoutExercise.exerciseId, setIndex, {
                              weight: parseFloat(e.target.value) || 0,
                            })
                          }
                          className="w-full rounded-lg border border-white/20 bg-white/10 px-2 py-2 text-center text-white backdrop-blur-sm focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                          min="0"
                          step={weightUnit === 'kg' ? '0.25' : '0.5'}
                          placeholder="0"
                        />
                      </div>
                    </div>
                    <div className="flex items-center justify-center gap-3">
                      <button
                        onClick={() =>
                          updateSet(workoutExercise.exerciseId, setIndex, {
                            completed: !set.completed,
                          })
                        }
                        className={`rounded-lg p-2 transition-all duration-200 ${
                          set.completed
                            ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg"
                            : "bg-white/10 text-white/70 hover:bg-white/15"
                        }`}
                      >
                        <Check className="h-4 w-4" />
                      </button>
                      {workoutExercise.sets.length > 1 && (
                        <button
                          onClick={() =>
                            removeSet(workoutExercise.exerciseId, setIndex)
                          }
                          className="p-2 text-red-400 hover:text-red-300 transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Desktop Layout */}
                  <div className="hidden items-center gap-4 sm:flex">
                    <span className="w-16 text-sm font-medium text-white">
                      Set {setIndex + 1}
                    </span>

                    <div className="flex items-center gap-2">
                      <label className="text-sm text-white/70">Reps:</label>
                      <input
                        type="number"
                        value={set.reps || ""}
                        onChange={(e) =>
                          updateSet(workoutExercise.exerciseId, setIndex, {
                            reps: parseInt(e.target.value) || 0,
                          })
                        }
                        className="w-20 rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-center text-white backdrop-blur-sm focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                        min="0"
                        placeholder="0"
                      />
                    </div>

                    <div className="flex items-center gap-2">
                      <label className="text-sm text-white/70">Weight:</label>
                      <input
                        type="number"
                        value={set.weight || ""}
                        onChange={(e) =>
                          updateSet(workoutExercise.exerciseId, setIndex, {
                            weight: parseFloat(e.target.value) || 0,
                          })
                        }
                        className="w-24 rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-center text-white backdrop-blur-sm focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                        min="0"
                        step={weightUnit === 'kg' ? '0.25' : '0.5'}
                        placeholder="0"
                      />
                      <span className="text-sm text-white/70">{weightUnit}</span>
                    </div>

                    <button
                      onClick={() =>
                        updateSet(workoutExercise.exerciseId, setIndex, {
                          completed: !set.completed,
                        })
                      }
                      className={`rounded-lg p-2 transition-all duration-200 ${
                        set.completed
                          ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg"
                          : "bg-white/10 text-white/70 hover:bg-white/15"
                      }`}
                    >
                      <Check className="h-4 w-4" />
                    </button>

                    {workoutExercise.sets.length > 1 && (
                      <button
                        onClick={() =>
                          removeSet(workoutExercise.exerciseId, setIndex)
                        }
                        className="p-2 text-red-400 hover:text-red-300 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </div>
              ))}

              <button
                onClick={() => addSet(workoutExercise.exerciseId)}
                className="w-full rounded-xl border-2 border-dashed border-white/20 py-3 text-white/60 transition-all duration-200 hover:border-white/30 hover:text-white/80 hover:bg-white/5"
              >
                + Add Set
              </button>
            </div>

            <div className="mt-4">
              <label className="mb-2 block text-sm font-medium text-white">
                Exercise Notes:
              </label>
              <textarea
                value={workoutExercise.notes}
                onChange={(e) =>
                  onUpdateExercise({
                    ...workoutExercise,
                    notes: e.target.value,
                  })
                }
                placeholder="Form cues, observations, etc..."
                className="w-full resize-none rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-white backdrop-blur-sm placeholder:text-white/50 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                rows={2}
              />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 sm:mt-8">
        <label className="mb-2 block text-sm font-medium text-white">
          Workout Notes:
        </label>
        <textarea
          value={workoutNotes}
          onChange={(e) => onUpdateNotes(e.target.value)}
          placeholder="Overall workout reflection, how you felt, etc..."
          className="w-full resize-none rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white backdrop-blur-sm placeholder:text-white/50 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
          rows={3}
        />
      </div>

      <div className="mt-6 sm:mt-8">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onFinishWorkout}
          className="w-full rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-200 hover:shadow-green-500/25 sm:mx-auto sm:max-w-md"
        >
          <div className="flex items-center justify-center gap-2">
            <Save className="h-5 w-5" /> 
            Save Workout
          </div>
        </motion.button>
      </div>
    </motion.div>
  );
};
