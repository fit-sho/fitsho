"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Save, X, Plus, Trash2, Search, GripVertical } from "lucide-react";
import {
  WorkoutTemplate,
  Exercise,
  CreateTemplateData,
  MUSCLE_GROUP_LABELS,
} from "./types";

interface WorkoutTemplateFormProps {
  template?: WorkoutTemplate;
  exercises: Exercise[];
  onSave: (data: CreateTemplateData) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

interface TemplateExercise {
  exerciseId: string;
  exercise: Exercise;
  sets: number;
  reps: number;
  orderIndex: number;
}

export const WorkoutTemplateForm = ({
  template,
  exercises,
  onSave,
  onCancel,
  isLoading = false,
}: WorkoutTemplateFormProps) => {
  const [formData, setFormData] = useState({
    name: template?.name || "",
    description: template?.description || "",
  });

  const [templateExercises, setTemplateExercises] = useState<
    TemplateExercise[]
  >([]);
  const [showExerciseModal, setShowExerciseModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (template?.templateExercises) {
      const mappedExercises = template.templateExercises.map((te) => ({
        exerciseId: te.exerciseId,
        exercise: te.exercise,
        sets: te.sets,
        reps: te.reps,
        orderIndex: te.orderIndex,
      }));
      setTemplateExercises(
        mappedExercises.sort((a, b) => a.orderIndex - b.orderIndex)
      );
    }
  }, [template]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Template name is required";
    }

    if (templateExercises.length === 0) {
      newErrors.exercises = "At least one exercise is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    const templateData: CreateTemplateData = {
      name: formData.name,
      description: formData.description,
      exercises: templateExercises.map((te, index) => ({
        exerciseId: te.exerciseId,
        sets: te.sets,
        reps: te.reps,
        orderIndex: index,
      })),
    };

    try {
      await onSave(templateData);
    } catch (error) {
      console.error("Error saving template:", error);
    }
  };

  const addExercise = (exercise: Exercise) => {
    const newTemplateExercise: TemplateExercise = {
      exerciseId: exercise.id,
      exercise,
      sets: exercise.recommendedSets || 4,
      reps: parseInt(exercise.recommendedReps?.split("-")[0] || "8"),
      orderIndex: templateExercises.length,
    };

    setTemplateExercises((prev) => [...prev, newTemplateExercise]);
    setShowExerciseModal(false);
  };

  const removeExercise = (exerciseId: string) => {
    setTemplateExercises((prev) =>
      prev
        .filter((te) => te.exerciseId !== exerciseId)
        .map((te, index) => ({ ...te, orderIndex: index }))
    );
  };

  const updateExercise = (
    exerciseId: string,
    updates: Partial<TemplateExercise>
  ) => {
    setTemplateExercises((prev) =>
      prev.map((te) =>
        te.exerciseId === exerciseId ? { ...te, ...updates } : te
      )
    );
  };

  const moveExercise = (fromIndex: number, toIndex: number) => {
    const newExercises = [...templateExercises];
    const [movedExercise] = newExercises.splice(fromIndex, 1);
    newExercises.splice(toIndex, 0, movedExercise);

    // Update order indices
    const reorderedExercises = newExercises.map((te, index) => ({
      ...te,
      orderIndex: index,
    }));

    setTemplateExercises(reorderedExercises);
  };

  const filteredExercises = exercises.filter(
    (exercise) =>
      exercise.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !templateExercises.some((te) => te.exerciseId === exercise.id)
  );

  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="rounded-xl border border-slate-700 bg-slate-800/50 p-6 backdrop-blur-sm"
      >
        <div className="mb-6 flex items-center justify-between">
          <h2 className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-2xl font-bold text-transparent">
            {template ? "Edit Workout Template" : "Create New Template"}
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
                Template Name *
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
                placeholder="e.g., Upper Body Strength"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-400">{errors.name}</p>
              )}
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Description
              </label>
              <input
                type="text"
                value={formData.description}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                className="w-full rounded-lg border border-slate-600 bg-slate-700 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-cyan-500"
                placeholder="Brief description of the workout"
              />
            </div>
          </div>

          {/* Exercises Section */}
          <div>
            <div className="mb-4 flex items-center justify-between">
              <label className="block text-sm font-medium">Exercises *</label>
              <button
                type="button"
                onClick={() => setShowExerciseModal(true)}
                className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-500 px-4 py-2 font-medium text-white transition-opacity hover:opacity-90"
              >
                <Plus className="h-4 w-4" />
                Add Exercise
              </button>
            </div>

            {errors.exercises && (
              <p className="mb-3 text-sm text-red-400">{errors.exercises}</p>
            )}

            {templateExercises.length === 0 ? (
              <div className="rounded-lg border-2 border-dashed border-slate-600 p-8 text-center">
                <p className="mb-2 text-gray-400">No exercises added yet</p>
                <p className="text-sm text-gray-500">
                  Click "Add Exercise" to get started
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {templateExercises.map((templateExercise, index) => (
                  <motion.div
                    key={templateExercise.exerciseId}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-lg border border-slate-600 bg-slate-700/50 p-4"
                  >
                    <div className="flex items-center gap-4">
                      <div className="cursor-move text-gray-400">
                        <GripVertical className="h-5 w-5" />
                      </div>

                      <div className="flex-1">
                        <h4 className="mb-1 font-medium">
                          {templateExercise.exercise.name}
                        </h4>
                        <div className="flex flex-wrap gap-1">
                          {templateExercise.exercise.muscleGroups
                            .slice(0, 3)
                            .map((muscle) => (
                              <span
                                key={muscle}
                                className="rounded-full bg-slate-600 px-2 py-1 text-xs"
                              >
                                {MUSCLE_GROUP_LABELS[muscle]}
                              </span>
                            ))}
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div>
                          <label className="mb-1 block text-xs text-gray-400">
                            Sets
                          </label>
                          <input
                            type="number"
                            min="1"
                            max="10"
                            value={templateExercise.sets}
                            onChange={(e) =>
                              updateExercise(templateExercise.exerciseId, {
                                sets: parseInt(e.target.value) || 1,
                              })
                            }
                            className="w-16 rounded border border-slate-500 bg-slate-600 px-2 py-1 text-center text-sm"
                          />
                        </div>

                        <div>
                          <label className="mb-1 block text-xs text-gray-400">
                            Reps
                          </label>
                          <input
                            type="number"
                            min="1"
                            max="50"
                            value={templateExercise.reps}
                            onChange={(e) =>
                              updateExercise(templateExercise.exerciseId, {
                                reps: parseInt(e.target.value) || 1,
                              })
                            }
                            className="w-16 rounded border border-slate-500 bg-slate-600 px-2 py-1 text-center text-sm"
                          />
                        </div>

                        <button
                          type="button"
                          onClick={() =>
                            removeExercise(templateExercise.exerciseId)
                          }
                          className="p-1 text-red-400 hover:text-red-300"
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
              {template ? "Update Template" : "Create Template"}
            </motion.button>
          </div>
        </form>
      </motion.div>

      {/* Exercise Selection Modal */}
      <AnimatePresence>
        {showExerciseModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
            onClick={() => setShowExerciseModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="max-h-[80vh] w-full max-w-4xl overflow-y-auto rounded-xl bg-slate-800 p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-6 flex items-center justify-between">
                <h3 className="text-xl font-bold">Add Exercise to Template</h3>
                <button
                  onClick={() => setShowExerciseModal(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="mb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search exercises..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full rounded-lg border border-slate-600 bg-slate-700 py-2 pl-10 pr-4 focus:border-transparent focus:ring-2 focus:ring-cyan-500"
                  />
                </div>
              </div>

              <div className="grid max-h-96 grid-cols-1 gap-4 overflow-y-auto md:grid-cols-2 lg:grid-cols-3">
                {filteredExercises.map((exercise) => (
                  <motion.div
                    key={exercise.id}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => addExercise(exercise)}
                    className="cursor-pointer rounded-lg border border-slate-600 bg-slate-700/50 p-4 transition-colors hover:border-slate-500"
                  >
                    <h4 className="mb-2 font-medium">{exercise.name}</h4>
                    <p className="mb-2 line-clamp-2 text-sm text-gray-400">
                      {exercise.description}
                    </p>
                    <div className="flex flex-wrap gap-1">
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
                  </motion.div>
                ))}
              </div>

              {filteredExercises.length === 0 && (
                <div className="py-8 text-center">
                  <p className="text-gray-400">No exercises found</p>
                  <p className="mt-1 text-sm text-gray-500">
                    {searchTerm
                      ? "Try a different search term"
                      : "All exercises are already added"}
                  </p>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
