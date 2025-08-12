"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Save, X, Plus, Trash2 } from "lucide-react";
import { 
  Exercise, 
  CreateExerciseData, 
  MuscleGroup, 
  DIFFICULTY_OPTIONS, 
  EQUIPMENT_OPTIONS,
  MUSCLE_GROUP_OPTIONS,
  MUSCLE_GROUP_LABELS 
} from "./types";

interface ExerciseFormProps {
  exercise?: Exercise;
  onSave: (data: CreateExerciseData) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

export const ExerciseForm = ({ exercise, onSave, onCancel, isLoading = false }: ExerciseFormProps) => {
  const [formData, setFormData] = useState<CreateExerciseData>({
    name: exercise?.name || "",
    description: exercise?.description || "",
    muscleGroups: exercise?.muscleGroups || [],
    videoUrl: exercise?.videoUrl || "",
    imageUrl: exercise?.imageUrl || "",
    recommendedSets: exercise?.recommendedSets || 4,
    recommendedReps: exercise?.recommendedReps || "8-12",
    difficulty: exercise?.difficulty || "Intermediate",
    equipment: exercise?.equipment || "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Exercise name is required";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }

    if (formData.muscleGroups.length === 0) {
      newErrors.muscleGroups = "At least one muscle group is required";
    }

    if (formData.recommendedSets && formData.recommendedSets < 1) {
      newErrors.recommendedSets = "Sets must be at least 1";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      await onSave(formData);
    } catch (error) {
      console.error("Error saving exercise:", error);
    }
  };

  const toggleMuscleGroup = (muscleGroup: MuscleGroup) => {
    setFormData(prev => ({
      ...prev,
      muscleGroups: prev.muscleGroups.includes(muscleGroup)
        ? prev.muscleGroups.filter(mg => mg !== muscleGroup)
        : [...prev.muscleGroups, muscleGroup]
    }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6"
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
          {exercise ? "Edit Exercise" : "Create New Exercise"}
        </h2>
        <button
          onClick={onCancel}
          className="text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">Exercise Name *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className={`w-full px-3 py-2 bg-slate-700 border rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent ${
                errors.name ? "border-red-500" : "border-slate-600"
              }`}
              placeholder="e.g., Bench Press"
            />
            {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Equipment</label>
            <select
              value={formData.equipment}
              onChange={(e) => setFormData(prev => ({ ...prev, equipment: e.target.value }))}
              className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            >
              <option value="">Select Equipment</option>
              {EQUIPMENT_OPTIONS.map(equipment => (
                <option key={equipment} value={equipment}>{equipment}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium mb-2">Description *</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            rows={3}
            className={`w-full px-3 py-2 bg-slate-700 border rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent resize-none ${
              errors.description ? "border-red-500" : "border-slate-600"
            }`}
            placeholder="Describe the exercise technique and form..."
          />
          {errors.description && <p className="text-red-400 text-sm mt-1">{errors.description}</p>}
        </div>

        {/* Muscle Groups */}
        <div>
          <label className="block text-sm font-medium mb-3">Target Muscle Groups *</label>
          <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
            {MUSCLE_GROUP_OPTIONS.map(muscleGroup => (
              <button
                key={muscleGroup}
                type="button"
                onClick={() => toggleMuscleGroup(muscleGroup)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  formData.muscleGroups.includes(muscleGroup)
                    ? "bg-gradient-to-r from-cyan-500 to-purple-500 text-white"
                    : "bg-slate-700 text-gray-300 hover:bg-slate-600"
                }`}
              >
                {MUSCLE_GROUP_LABELS[muscleGroup]}
              </button>
            ))}
          </div>
          {errors.muscleGroups && <p className="text-red-400 text-sm mt-1">{errors.muscleGroups}</p>}
        </div>

        {/* Recommendations & Difficulty */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">Recommended Sets</label>
            <input
              type="number"
              min="1"
              max="10"
              value={formData.recommendedSets || ""}
              onChange={(e) => setFormData(prev => ({ ...prev, recommendedSets: parseInt(e.target.value) || undefined }))}
              className={`w-full px-3 py-2 bg-slate-700 border rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent ${
                errors.recommendedSets ? "border-red-500" : "border-slate-600"
              }`}
              placeholder="4"
            />
            {errors.recommendedSets && <p className="text-red-400 text-sm mt-1">{errors.recommendedSets}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Recommended Reps</label>
            <input
              type="text"
              value={formData.recommendedReps || ""}
              onChange={(e) => setFormData(prev => ({ ...prev, recommendedReps: e.target.value }))}
              className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              placeholder="8-12"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Difficulty</label>
            <select
              value={formData.difficulty}
              onChange={(e) => setFormData(prev => ({ ...prev, difficulty: e.target.value }))}
              className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            >
              {DIFFICULTY_OPTIONS.map(difficulty => (
                <option key={difficulty} value={difficulty}>{difficulty}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Media URLs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">Image URL</label>
            <input
              type="url"
              value={formData.imageUrl || ""}
              onChange={(e) => setFormData(prev => ({ ...prev, imageUrl: e.target.value }))}
              className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              placeholder="https://images.unsplash.com/..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Video URL</label>
            <input
              type="url"
              value={formData.videoUrl || ""}
              onChange={(e) => setFormData(prev => ({ ...prev, videoUrl: e.target.value }))}
              className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              placeholder="https://youtube.com/..."
            />
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex justify-end gap-3 pt-4 border-t border-slate-700">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 bg-slate-700 text-gray-300 rounded-lg hover:bg-slate-600 transition-colors"
          >
            Cancel
          </button>
          <motion.button
            type="submit"
            disabled={isLoading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-lg font-medium flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            {exercise ? "Update Exercise" : "Create Exercise"}
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
};
