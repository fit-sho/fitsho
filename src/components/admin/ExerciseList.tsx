"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Edit3, Trash2, Search, Target, Zap, Award } from "lucide-react";
import { Exercise, MUSCLE_GROUP_LABELS } from "./types";

interface ExerciseListProps {
  exercises: Exercise[];
  onEdit: (exercise: Exercise) => void;
  onDelete: (exerciseId: string) => void;
  isLoading?: boolean;
}

export const ExerciseList = ({
  exercises,
  onEdit,
  onDelete,
  isLoading = false,
}: ExerciseListProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterMuscle, setFilterMuscle] = useState("");
  const [filterDifficulty, setFilterDifficulty] = useState("");

  const filteredExercises = exercises.filter((exercise) => {
    const matchesSearch =
      exercise.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exercise.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesMuscle =
      !filterMuscle || exercise.muscleGroups.includes(filterMuscle as any);

    const matchesDifficulty =
      !filterDifficulty || exercise.difficulty === filterDifficulty;

    return matchesSearch && matchesMuscle && matchesDifficulty;
  });

  const getDifficultyColor = (difficulty?: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-500";
      case "Intermediate":
        return "bg-yellow-500";
      case "Advanced":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  if (isLoading) {
    return (
      <div className="rounded-xl border border-slate-700 bg-slate-800/50 p-8 backdrop-blur-sm">
        <div className="flex items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-cyan-400"></div>
          <span className="ml-3 text-gray-400">Loading exercises...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-slate-700 bg-slate-800/50 p-4 backdrop-blur-sm sm:p-6">
      <div className="mb-4 flex items-center justify-between sm:mb-6">
        <h2 className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-xl font-bold text-transparent sm:text-2xl">
          Exercise Library ({exercises.length})
        </h2>
      </div>

      {/* Filters */}
      <div className="mb-6 space-y-4 sm:grid sm:grid-cols-1 sm:gap-4 md:grid-cols-3 sm:space-y-0">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
          <input
            type="text"
            placeholder="Search exercises..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-lg border border-slate-600 bg-slate-700 py-3 pl-10 pr-4 text-base focus:border-transparent focus:ring-2 focus:ring-cyan-500 sm:py-2 sm:text-sm"
          />
        </div>

        <select
          value={filterMuscle}
          onChange={(e) => setFilterMuscle(e.target.value)}
          className="w-full rounded-lg border border-slate-600 bg-slate-700 px-3 py-3 text-base focus:border-transparent focus:ring-2 focus:ring-cyan-500 sm:py-2 sm:text-sm text-white"
        >
          <option value="">All Muscle Groups</option>
          {Object.entries(MUSCLE_GROUP_LABELS).map(([key, label]) => (
            <option key={key} value={key}>
              {label}
            </option>
          ))}
        </select>

        <select
          value={filterDifficulty}
          onChange={(e) => setFilterDifficulty(e.target.value)}
          className="w-full rounded-lg border border-slate-600 bg-slate-700 px-3 py-3 text-base focus:border-transparent focus:ring-2 focus:ring-cyan-500 sm:py-2 sm:text-sm text-white"
        >
          <option value="">All Difficulties</option>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>
      </div>

      {/* Exercise Grid */}
      {filteredExercises.length === 0 ? (
        <div className="py-12 text-center">
          <div className="mb-2 text-white">No exercises found</div>
          <p className="text-sm text-white">
            {searchTerm || filterMuscle || filterDifficulty
              ? "Try adjusting your filters"
              : "Create your first exercise to get started"}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredExercises.map((exercise) => (
            <motion.div
              key={exercise.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02 }}
              className="overflow-hidden rounded-xl border border-slate-600 bg-slate-700/50"
            >
              {exercise.imageUrl && (
                <div className="relative h-40 bg-gray-700 sm:h-48">
                  <img
                    src={exercise.imageUrl}
                    alt={exercise.name}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute right-2 top-2">
                    <span
                      className={`rounded px-2 py-1 text-xs text-white ${getDifficultyColor(exercise.difficulty)}`}
                    >
                      {exercise.difficulty}
                    </span>
                  </div>
                </div>
              )}

              <div className="p-3 sm:p-4">
                <h3 className="mb-2 text-base font-semibold sm:text-lg text-white">{exercise.name}</h3>
                <p className="mb-3 line-clamp-2 text-xs text-white sm:text-sm">
                  {exercise.description}
                </p>

                {/* Exercise Stats */}
                <div className="mb-3 flex flex-wrap items-center gap-3 text-xs sm:gap-4 sm:text-sm text-white">
                  <div className="flex items-center gap-1">
                    <Target className="h-3 w-3 text-cyan-400 sm:h-4 sm:w-4" />
                    <span>{exercise.recommendedSets || 4} sets</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Zap className="h-3 w-3 text-purple-400 sm:h-4 sm:w-4" />
                    <span>{exercise.recommendedReps || "8-12"} reps</span>
                  </div>
                  {exercise.equipment && (
                    <div className="flex items-center gap-1">
                      <Award className="h-3 w-3 text-orange-400 sm:h-4 sm:w-4" />
                      <span className="truncate">{exercise.equipment}</span>
                    </div>
                  )}
                </div>

                {/* Muscle Groups */}
                <div className="mb-4 flex flex-wrap gap-1 text-white">
                  {exercise.muscleGroups.slice(0, 2).map((muscle) => (
                    <span
                      key={muscle}
                      className="rounded-full bg-slate-600 px-2 py-1 text-xs"
                    >
                      {MUSCLE_GROUP_LABELS[muscle]}
                    </span>
                  ))}
                  {exercise.muscleGroups.length > 2 && (
                    <span className="rounded-full bg-slate-600 px-2 py-1 text-xs">
                      +{exercise.muscleGroups.length - 2}
                    </span>
                  )}
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <button
                    onClick={() => onEdit(exercise)}
                    className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-cyan-600 px-3 py-2.5 text-sm font-medium text-white transition-colors hover:bg-cyan-700 sm:py-2"
                  >
                    <Edit3 className="h-4 w-4" />
                    <span className="hidden sm:inline">Edit</span>
                  </button>
                  <button
                    onClick={() => onDelete(exercise.id)}
                    className="flex items-center justify-center rounded-lg bg-red-600 px-3 py-2.5 text-white transition-colors hover:bg-red-700 sm:py-2"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};
