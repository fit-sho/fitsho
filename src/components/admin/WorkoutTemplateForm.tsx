"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Save, X, Plus, Trash2, Search, GripVertical } from "lucide-react";
import { 
  WorkoutTemplate, 
  Exercise, 
  CreateTemplateData,
  MUSCLE_GROUP_LABELS 
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
  isLoading = false 
}: WorkoutTemplateFormProps) => {
  const [formData, setFormData] = useState({
    name: template?.name || "",
    description: template?.description || "",
  });

  const [templateExercises, setTemplateExercises] = useState<TemplateExercise[]>([]);
  const [showExerciseModal, setShowExerciseModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (template?.templateExercises) {
      const mappedExercises = template.templateExercises.map(te => ({
        exerciseId: te.exerciseId,
        exercise: te.exercise,
        sets: te.sets,
        reps: te.reps,
        orderIndex: te.orderIndex,
      }));
      setTemplateExercises(mappedExercises.sort((a, b) => a.orderIndex - b.orderIndex));
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
      reps: parseInt(exercise.recommendedReps?.split('-')[0] || "8"),
      orderIndex: templateExercises.length,
    };

    setTemplateExercises(prev => [...prev, newTemplateExercise]);
    setShowExerciseModal(false);
  };

  const removeExercise = (exerciseId: string) => {
    setTemplateExercises(prev => 
      prev.filter(te => te.exerciseId !== exerciseId)
        .map((te, index) => ({ ...te, orderIndex: index }))
    );
  };

  const updateExercise = (exerciseId: string, updates: Partial<TemplateExercise>) => {
    setTemplateExercises(prev =>
      prev.map(te => te.exerciseId === exerciseId ? { ...te, ...updates } : te)
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

  const filteredExercises = exercises.filter(exercise =>
    exercise.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    !templateExercises.some(te => te.exerciseId === exercise.id)
  );

  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            {template ? "Edit Workout Template" : "Create New Template"}
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
              <label className="block text-sm font-medium mb-2">Template Name *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className={`w-full px-3 py-2 bg-slate-700 border rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent ${
                  errors.name ? "border-red-500" : "border-slate-600"
                }`}
                placeholder="e.g., Upper Body Strength"
              />
              {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Description</label>
              <input
                type="text"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                placeholder="Brief description of the workout"
              />
            </div>
          </div>

          {/* Exercises Section */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <label className="block text-sm font-medium">Exercises *</label>
              <button
                type="button"
                onClick={() => setShowExerciseModal(true)}
                className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 hover:opacity-90 transition-opacity"
              >
                <Plus className="w-4 h-4" />
                Add Exercise
              </button>
            </div>

            {errors.exercises && <p className="text-red-400 text-sm mb-3">{errors.exercises}</p>}

            {templateExercises.length === 0 ? (
              <div className="border-2 border-dashed border-slate-600 rounded-lg p-8 text-center">
                <p className="text-gray-400 mb-2">No exercises added yet</p>
                <p className="text-sm text-gray-500">Click "Add Exercise" to get started</p>
              </div>
            ) : (
              <div className="space-y-3">
                {templateExercises.map((templateExercise, index) => (
                  <motion.div
                    key={templateExercise.exerciseId}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-slate-700/50 border border-slate-600 rounded-lg p-4"
                  >
                    <div className="flex items-center gap-4">
                      <div className="cursor-move text-gray-400">
                        <GripVertical className="w-5 h-5" />
                      </div>

                      <div className="flex-1">
                        <h4 className="font-medium mb-1">{templateExercise.exercise.name}</h4>
                        <div className="flex flex-wrap gap-1">
                          {templateExercise.exercise.muscleGroups.slice(0, 3).map((muscle) => (
                            <span
                              key={muscle}
                              className="px-2 py-1 bg-slate-600 text-xs rounded-full"
                            >
                              {MUSCLE_GROUP_LABELS[muscle]}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div>
                          <label className="block text-xs text-gray-400 mb-1">Sets</label>
                          <input
                            type="number"
                            min="1"
                            max="10"
                            value={templateExercise.sets}
                            onChange={(e) => updateExercise(templateExercise.exerciseId, { 
                              sets: parseInt(e.target.value) || 1 
                            })}
                            className="w-16 px-2 py-1 bg-slate-600 border border-slate-500 rounded text-center text-sm"
                          />
                        </div>

                        <div>
                          <label className="block text-xs text-gray-400 mb-1">Reps</label>
                          <input
                            type="number"
                            min="1"
                            max="50"
                            value={templateExercise.reps}
                            onChange={(e) => updateExercise(templateExercise.exerciseId, { 
                              reps: parseInt(e.target.value) || 1 
                            })}
                            className="w-16 px-2 py-1 bg-slate-600 border border-slate-500 rounded text-center text-sm"
                          />
                        </div>

                        <button
                          type="button"
                          onClick={() => removeExercise(templateExercise.exerciseId)}
                          className="text-red-400 hover:text-red-300 p-1"
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
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowExerciseModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-slate-800 rounded-xl p-6 max-w-4xl w-full max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold">Add Exercise to Template</h3>
                <button
                  onClick={() => setShowExerciseModal(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="mb-4">
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
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-96 overflow-y-auto">
                {filteredExercises.map((exercise) => (
                  <motion.div
                    key={exercise.id}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => addExercise(exercise)}
                    className="bg-slate-700/50 border border-slate-600 rounded-lg p-4 cursor-pointer hover:border-slate-500 transition-colors"
                  >
                    <h4 className="font-medium mb-2">{exercise.name}</h4>
                    <p className="text-sm text-gray-400 mb-2 line-clamp-2">{exercise.description}</p>
                    <div className="flex flex-wrap gap-1">
                      {exercise.muscleGroups.slice(0, 2).map((muscle) => (
                        <span
                          key={muscle}
                          className="px-2 py-1 bg-slate-600 text-xs rounded-full"
                        >
                          {MUSCLE_GROUP_LABELS[muscle]}
                        </span>
                      ))}
                      {exercise.muscleGroups.length > 2 && (
                        <span className="px-2 py-1 bg-slate-600 text-xs rounded-full">
                          +{exercise.muscleGroups.length - 2}
                        </span>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              {filteredExercises.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-gray-400">No exercises found</p>
                  <p className="text-sm text-gray-500 mt-1">
                    {searchTerm ? "Try a different search term" : "All exercises are already added"}
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
