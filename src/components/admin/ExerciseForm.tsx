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
  MUSCLE_GROUP_LABELS,
} from "./types";

interface ExerciseFormProps {
  exercise?: Exercise;
  onSave: (data: CreateExerciseData) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

export const ExerciseForm = ({
  exercise,
  onSave,
  onCancel,
  isLoading = false,
}: ExerciseFormProps) => {
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
    setFormData((prev) => ({
      ...prev,
      muscleGroups: prev.muscleGroups.includes(muscleGroup)
        ? prev.muscleGroups.filter((mg) => mg !== muscleGroup)
        : [...prev.muscleGroups, muscleGroup],
    }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="rounded-xl border border-slate-700 bg-slate-800/50 p-6 backdrop-blur-sm"
    >
      <div className="mb-6 flex items-center justify-between">
        <h2 className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-2xl font-bold text-transparent">
          {exercise ? "Edit Exercise" : "Create New Exercise"}
        </h2>
        <button
          onClick={onCancel}
          className="text-gray-400 transition-colors hover:text-white"
        >
          <X className="h-6 w-6" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium">
              Exercise Name *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
              className={`w-full rounded-lg border bg-slate-700 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-cyan-500 ${
                errors.name ? "border-red-500" : "border-slate-600"
              }`}
              placeholder="e.g., Bench Press"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-400">{errors.name}</p>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Equipment</label>
            <select
              value={formData.equipment}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, equipment: e.target.value }))
              }
              className="w-full rounded-lg border border-slate-600 bg-slate-700 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-cyan-500"
            >
              <option value="">Select Equipment</option>
              {EQUIPMENT_OPTIONS.map((equipment) => (
                <option key={equipment} value={equipment}>
                  {equipment}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="mb-2 block text-sm font-medium">
            Description *
          </label>
          <textarea
            value={formData.description}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, description: e.target.value }))
            }
            rows={3}
            className={`w-full resize-none rounded-lg border bg-slate-700 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-cyan-500 ${
              errors.description ? "border-red-500" : "border-slate-600"
            }`}
            placeholder="Describe the exercise technique and form..."
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-400">{errors.description}</p>
          )}
        </div>

        {/* Muscle Groups */}
        <div>
          <label className="mb-3 block text-sm font-medium">
            Target Muscle Groups *
          </label>
          <div className="grid grid-cols-3 gap-2 md:grid-cols-5">
            {MUSCLE_GROUP_OPTIONS.map((muscleGroup) => (
              <button
                key={muscleGroup}
                type="button"
                onClick={() => toggleMuscleGroup(muscleGroup)}
                className={`rounded-lg px-3 py-2 text-sm font-medium transition-all ${
                  formData.muscleGroups.includes(muscleGroup)
                    ? "bg-gradient-to-r from-cyan-500 to-purple-500 text-white"
                    : "bg-slate-700 text-gray-300 hover:bg-slate-600"
                }`}
              >
                {MUSCLE_GROUP_LABELS[muscleGroup]}
              </button>
            ))}
          </div>
          {errors.muscleGroups && (
            <p className="mt-1 text-sm text-red-400">{errors.muscleGroups}</p>
          )}
        </div>

        {/* Recommendations & Difficulty */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div>
            <label className="mb-2 block text-sm font-medium">
              Recommended Sets
            </label>
            <input
              type="number"
              min="1"
              max="10"
              value={formData.recommendedSets || ""}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  recommendedSets: parseInt(e.target.value) || undefined,
                }))
              }
              className={`w-full rounded-lg border bg-slate-700 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-cyan-500 ${
                errors.recommendedSets ? "border-red-500" : "border-slate-600"
              }`}
              placeholder="4"
            />
            {errors.recommendedSets && (
              <p className="mt-1 text-sm text-red-400">
                {errors.recommendedSets}
              </p>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Recommended Reps
            </label>
            <input
              type="text"
              value={formData.recommendedReps || ""}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  recommendedReps: e.target.value,
                }))
              }
              className="w-full rounded-lg border border-slate-600 bg-slate-700 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-cyan-500"
              placeholder="8-12"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Difficulty</label>
            <select
              value={formData.difficulty}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, difficulty: e.target.value }))
              }
              className="w-full rounded-lg border border-slate-600 bg-slate-700 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-cyan-500"
            >
              {DIFFICULTY_OPTIONS.map((difficulty) => (
                <option key={difficulty} value={difficulty}>
                  {difficulty}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Media URLs */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium">Image URL</label>
            <input
              type="url"
              value={formData.imageUrl || ""}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, imageUrl: e.target.value }))
              }
              className="w-full rounded-lg border border-slate-600 bg-slate-700 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-cyan-500"
              placeholder="https://images.unsplash.com/..."
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Video URL</label>
            <input
              type="url"
              value={formData.videoUrl || ""}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, videoUrl: e.target.value }))
              }
              className="w-full rounded-lg border border-slate-600 bg-slate-700 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-cyan-500"
              placeholder="https://youtube.com/..."
            />
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex justify-end gap-3 border-t border-slate-700 pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg bg-slate-700 px-6 py-2 text-gray-300 transition-colors hover:bg-slate-600"
          >
            Cancel
          </button>
          <motion.button
            type="submit"
            disabled={isLoading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-500 px-6 py-2 font-medium text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isLoading ? (
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
            ) : (
              <Save className="h-4 w-4" />
            )}
            {exercise ? "Update Exercise" : "Create Exercise"}
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
};
