"use client";

import { motion } from "framer-motion";
import { Target, Zap, Award } from "lucide-react";
import { Exercise } from "./types";

interface ExerciseCardProps {
  exercise: Exercise;
  onAddToWorkout: (exercise: Exercise) => void;
  isInWorkout?: boolean;
}

export const ExerciseCard = ({
  exercise,
  onAddToWorkout,
  isInWorkout = false,
}: ExerciseCardProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="overflow-hidden rounded-xl border border-slate-700 bg-slate-800/50"
    >
      {exercise.imageUrl && (
        <div className="relative h-48 bg-gray-700">
          <img
            src={exercise.imageUrl}
            alt={exercise.name}
            className="h-full w-full object-cover"
          />
          <div className="absolute right-2 top-2">
            <span
              className={`rounded px-2 py-1 text-xs ${
                exercise.difficulty === "Beginner"
                  ? "bg-green-500"
                  : exercise.difficulty === "Intermediate"
                    ? "bg-yellow-500"
                    : "bg-red-500"
              }`}
            >
              {exercise.difficulty}
            </span>
          </div>
        </div>
      )}

      <div className="p-4">
        <h3 className="mb-2 font-semibold text-gray-200">{exercise.name}</h3>
        <p className="mb-3 text-sm text-gray-400">{exercise.description}</p>

        <div className="mb-3 flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1">
            <Target className="h-4 w-4 text-cyan-400" />
            <span className="text-gray-200">
              {exercise.recommendedSets || 3} sets
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Zap className="h-4 w-4 text-purple-400" />
            <span className="text-gray-200">
              {exercise.recommendedReps || "8-12"} reps
            </span>
          </div>
        </div>

        {exercise.equipment && (
          <div className="mb-3 flex items-center gap-1 text-sm">
            <Award className="h-4 w-4 text-orange-400" />
            <span className="text-gray-200">{exercise.equipment}</span>
          </div>
        )}

        <button
          onClick={() => onAddToWorkout(exercise)}
          disabled={isInWorkout}
          className={`w-full rounded-lg px-4 py-2 font-medium transition-colors ${
            isInWorkout
              ? "cursor-not-allowed bg-green-600 text-white"
              : "bg-cyan-600 text-white hover:bg-cyan-700"
          }`}
        >
          {isInWorkout ? "Added to Workout" : "Add to Workout"}
        </button>
      </div>
    </motion.div>
  );
};
