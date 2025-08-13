"use client";

import { motion } from "framer-motion";
import { Check, Save, Trash2, Edit3, Target, Zap } from "lucide-react";
import { WorkoutExercise, WorkoutSet } from "./types";

interface WorkoutTrackingProps {
  workoutExercises: WorkoutExercise[];
  workoutNotes: string;
  onUpdateExercise: (updatedExercise: WorkoutExercise) => void;
  onUpdateNotes: (notes: string) => void;
  onFinishWorkout: () => void;
}

export const WorkoutTracking = ({
  workoutExercises,
  workoutNotes,
  onUpdateExercise,
  onUpdateNotes,
  onFinishWorkout,
}: WorkoutTrackingProps) => {
  const updateSet = (exerciseId: string, setIndex: number, updates: Partial<WorkoutSet>) => {
    const exercise = workoutExercises.find(we => we.exerciseId === exerciseId);
    if (!exercise) return;

    const updatedSets = exercise.sets.map((set, index) =>
      index === setIndex ? { ...set, ...updates } : set
    );

    onUpdateExercise({ ...exercise, sets: updatedSets });
  };

  const addSet = (exerciseId: string) => {
    const exercise = workoutExercises.find(we => we.exerciseId === exerciseId);
    if (!exercise) return;

    const newSet: WorkoutSet = { reps: 0, weight: 0, completed: false };
    onUpdateExercise({ ...exercise, sets: [...exercise.sets, newSet] });
  };

  const removeSet = (exerciseId: string, setIndex: number) => {
    const exercise = workoutExercises.find(we => we.exerciseId === exerciseId);
    if (!exercise || exercise.sets.length <= 1) return;

    const updatedSets = exercise.sets.filter((_, index) => index !== setIndex);
    onUpdateExercise({ ...exercise, sets: updatedSets });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="max-w-4xl mx-auto"
    >
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2 text-gray-200">Track Your Workout</h2>
        <p className="text-gray-400">Log your sets, reps, and weights</p>
      </div>

      <div className="space-y-6">
        {workoutExercises.map((workoutExercise) => (
          <motion.div
            key={workoutExercise.exerciseId}
            className="bg-slate-800/50 border border-slate-700 rounded-xl p-6"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-2 text-gray-200">{workoutExercise.exercise.name}</h3>
                <div className="flex items-center gap-4 text-sm text-gray-400">
                  <div className="flex items-center gap-1">
                    <Target className="w-4 h-4 text-cyan-400" />
                    <span className="text-gray-200">Target: {workoutExercise.targetSets} × {workoutExercise.targetReps}</span>
                  </div>
                  {workoutExercise.exercise.equipment && (
                    <div className="flex items-center gap-1">
                      <Zap className="w-4 h-4 text-purple-400" />
                      <span className="text-gray-200">{workoutExercise.exercise.equipment}</span>
                    </div>
                  )}
                </div>
              </div>
              {/* Remove exercise button - functionality can be added later if needed */}
            </div>

            <div className="space-y-3">
              {workoutExercise.sets.map((set, setIndex) => (
                <div key={setIndex} className="flex items-center gap-3 bg-slate-700/30 p-3 rounded-lg">
                  <span className="text-sm font-medium w-12 text-gray-200">Set {setIndex + 1}</span>
                  
                  <div className="flex items-center gap-2">
                    <label className="text-sm text-gray-200">Reps:</label>
                    <input
                      type="number"
                      value={set.reps || ""}
                      onChange={(e) => updateSet(workoutExercise.exerciseId, setIndex, { reps: parseInt(e.target.value) || 0 })}
                      className="w-16 px-2 py-1 bg-slate-600 rounded text-center text-gray-200"
                      min="0"
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <label className="text-sm text-gray-400">Weight:</label>
                    <input
                      type="number"
                      value={set.weight || ""}
                      onChange={(e) => updateSet(workoutExercise.exerciseId, setIndex, { weight: parseFloat(e.target.value) || 0 })}
                      className="w-20 px-2 py-1 bg-slate-600 rounded text-center text-gray-200"
                      min="0"
                      step="0.5"
                    />
                    <span className="text-sm text-gray-400">lbs</span>
                  </div>

                  <button
                    onClick={() => updateSet(workoutExercise.exerciseId, setIndex, { completed: !set.completed })}
                    className={`p-2 rounded-lg transition-colors ${
                      set.completed ? "bg-green-600 text-white" : "bg-slate-600 hover:bg-slate-500"
                    }`}
                  >
                    <Check className="w-4 h-4 text-gray-200" />
                  </button>

                  {workoutExercise.sets.length > 1 && (
                    <button
                      onClick={() => removeSet(workoutExercise.exerciseId, setIndex)}
                      className="text-red-400 hover:text-red-300 p-1"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  )}
                </div>
              ))}

              <button
                onClick={() => addSet(workoutExercise.exerciseId)}
                className="w-full py-2 border-2 border-dashed border-slate-600 rounded-lg text-slate-400 hover:border-slate-500 hover:text-slate-300 transition-colors"
              >
                + Add Set
              </button>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium mb-2 text-gray-200">Exercise Notes:</label>
              <textarea
                value={workoutExercise.notes}
                onChange={(e) => onUpdateExercise({ ...workoutExercise, notes: e.target.value })}
                placeholder="Form cues, observations, etc..."
                className="w-full px-3 py-2 bg-slate-700 rounded-lg resize-none text-gray-200"
                rows={2}
              />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-8">
        <label className="block text-sm font-medium mb-2 text-gray-200">Workout Notes:</label>
        <textarea
          value={workoutNotes}
          onChange={(e) => onUpdateNotes(e.target.value)}
          placeholder="Overall workout reflection, how you felt, etc..."
          className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg resize-none text-gray-200"
          rows={3}
        />
      </div>

      <div className="text-center mt-8">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onFinishWorkout}
          className="bg-gradient-to-r from-green-500 to-emerald-500 px-8 py-3 rounded-lg font-semibold flex items-center gap-2 mx-auto"
        >
          <Save className="w-4 h-4" /> Save Workout
        </motion.button>
      </div>
    </motion.div>
  );
};
