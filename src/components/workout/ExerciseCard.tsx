"use client";

import { motion } from "framer-motion";
import { Target, Zap, Award } from "lucide-react";
import { Exercise } from "./types";

interface ExerciseCardProps {
  exercise: Exercise;
  onAddToWorkout: (exercise: Exercise) => void;
  isInWorkout?: boolean;
}

export const ExerciseCard = ({ exercise, onAddToWorkout, isInWorkout = false }: ExerciseCardProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-slate-800/50 border border-slate-700 rounded-xl overflow-hidden"
    >
      {exercise.imageUrl && (
        <div className="h-48 bg-gray-700 relative">
          <img
            src={exercise.imageUrl}
            alt={exercise.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-2 right-2">
            <span className={`px-2 py-1 rounded text-xs ${
              exercise.difficulty === "Beginner" ? "bg-green-500" :
              exercise.difficulty === "Intermediate" ? "bg-yellow-500" :
              "bg-red-500"
            }`}>
              {exercise.difficulty}
            </span>
          </div>
        </div>
      )}
      
      <div className="p-4">
        <h3 className="font-semibold mb-2 text-gray-200">{exercise.name}</h3>
        <p className="text-sm text-gray-400 mb-3">{exercise.description}</p>
        
        <div className="flex items-center gap-4 mb-3 text-sm">
          <div className="flex items-center gap-1">
            <Target className="w-4 h-4 text-cyan-400" />
            <span className="text-gray-200">{exercise.recommendedSets || 3} sets</span>
          </div>
          <div className="flex items-center gap-1">
            <Zap className="w-4 h-4 text-purple-400" />
            <span className="text-gray-200">{exercise.recommendedReps || "8-12"} reps</span>
          </div>
        </div>

        {exercise.equipment && (
          <div className="flex items-center gap-1 mb-3 text-sm">
            <Award className="w-4 h-4 text-orange-400" />
            <span className="text-gray-200">{exercise.equipment}</span>
          </div>
        )}

        <button
          onClick={() => onAddToWorkout(exercise)}
          disabled={isInWorkout}
          className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
            isInWorkout
              ? "bg-green-600 text-white cursor-not-allowed"
              : "bg-cyan-600 hover:bg-cyan-700 text-white"
          }`}
        >
          {isInWorkout ? "Added to Workout" : "Add to Workout"}
        </button>
      </div>
    </motion.div>
  );
};
