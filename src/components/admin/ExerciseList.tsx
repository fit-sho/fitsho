"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Edit3, Trash2, Search,Target, Zap, Award } from "lucide-react";
import { Exercise, MUSCLE_GROUP_LABELS } from "./types";

interface ExerciseListProps {
  exercises: Exercise[];
  onEdit: (exercise: Exercise) => void;
  onDelete: (exerciseId: string) => void;
  isLoading?: boolean;
}

export const ExerciseList = ({ exercises, onEdit, onDelete, isLoading = false }: ExerciseListProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterMuscle, setFilterMuscle] = useState("");
  const [filterDifficulty, setFilterDifficulty] = useState("");

  const filteredExercises = exercises.filter(exercise => {
    const matchesSearch = exercise.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         exercise.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesMuscle = !filterMuscle || exercise.muscleGroups.includes(filterMuscle as any);
    
    const matchesDifficulty = !filterDifficulty || exercise.difficulty === filterDifficulty;

    return matchesSearch && matchesMuscle && matchesDifficulty;
  });

  const getDifficultyColor = (difficulty?: string) => {
    switch (difficulty) {
      case "Beginner": return "bg-green-500";
      case "Intermediate": return "bg-yellow-500";
      case "Advanced": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  if (isLoading) {
    return (
      <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-8">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-400"></div>
          <span className="ml-3 text-gray-400">Loading exercises...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
          Exercise Library ({exercises.length})
        </h2>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search exercises..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
          />
        </div>

        <select
          value={filterMuscle}
          onChange={(e) => setFilterMuscle(e.target.value)}
          className="px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
        >
          <option value="">All Muscle Groups</option>
          {Object.entries(MUSCLE_GROUP_LABELS).map(([key, label]) => (
            <option key={key} value={key}>{label}</option>
          ))}
        </select>

        <select
          value={filterDifficulty}
          onChange={(e) => setFilterDifficulty(e.target.value)}
          className="px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
        >
          <option value="">All Difficulties</option>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>
      </div>

      {/* Exercise Grid */}
      {filteredExercises.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-2">No exercises found</div>
          <p className="text-sm text-gray-500">
            {searchTerm || filterMuscle || filterDifficulty 
              ? "Try adjusting your filters" 
              : "Create your first exercise to get started"}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredExercises.map((exercise) => (
            <motion.div
              key={exercise.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02 }}
              className="bg-slate-700/50 border border-slate-600 rounded-xl overflow-hidden"
            >
              {exercise.imageUrl && (
                <div className="h-48 bg-gray-700 relative">
                  <img
                    src={exercise.imageUrl}
                    alt={exercise.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2">
                    <span className={`px-2 py-1 rounded text-xs text-white ${getDifficultyColor(exercise.difficulty)}`}>
                      {exercise.difficulty}
                    </span>
                  </div>
                </div>
              )}
              
              <div className="p-4">
                <h3 className="font-semibold mb-2 text-lg">{exercise.name}</h3>
                <p className="text-sm text-gray-400 mb-3 line-clamp-2">{exercise.description}</p>
                
                {/* Exercise Stats */}
                <div className="flex items-center gap-4 mb-3 text-sm">
                  <div className="flex items-center gap-1">
                    <Target className="w-4 h-4 text-cyan-400" />
                    <span>{exercise.recommendedSets || 4} sets</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Zap className="w-4 h-4 text-purple-400" />
                    <span>{exercise.recommendedReps || "8-12"} reps</span>
                  </div>
                </div>

                {exercise.equipment && (
                  <div className="flex items-center gap-1 mb-3 text-sm">
                    <Award className="w-4 h-4 text-orange-400" />
                    <span>{exercise.equipment}</span>
                  </div>
                )}

                {/* Muscle Groups */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {exercise.muscleGroups.slice(0, 3).map((muscle) => (
                    <span
                      key={muscle}
                      className="px-2 py-1 bg-slate-600 text-xs rounded-full"
                    >
                      {MUSCLE_GROUP_LABELS[muscle]}
                    </span>
                  ))}
                  {exercise.muscleGroups.length > 3 && (
                    <span className="px-2 py-1 bg-slate-600 text-xs rounded-full">
                      +{exercise.muscleGroups.length - 3}
                    </span>
                  )}
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <button
                    onClick={() => onEdit(exercise)}
                    className="flex-1 bg-cyan-600 hover:bg-cyan-700 text-white py-2 px-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                  >
                    <Edit3 className="w-4 h-4" />
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(exercise.id)}
                    className="bg-red-600 hover:bg-red-700 text-white py-2 px-3 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
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
