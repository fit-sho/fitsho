"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Edit3, Trash2, Search, Calendar, Target } from "lucide-react";
import { WorkoutTemplate, MUSCLE_GROUP_LABELS } from "./types";

interface TemplateListProps {
  templates: WorkoutTemplate[];
  onEdit: (template: WorkoutTemplate) => void;
  onDelete: (templateId: string) => void;
  isLoading?: boolean;
}

export const TemplateList = ({ templates, onEdit, onDelete, isLoading = false }: TemplateListProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTemplates = templates.filter(template =>
    template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (template.description && template.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (isLoading) {
    return (
      <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-8">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-400"></div>
          <span className="ml-3 text-gray-400">Loading templates...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
          Workout Templates ({templates.length})
        </h2>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search templates..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Template Grid */}
      {filteredTemplates.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-2">No templates found</div>
          <p className="text-sm text-gray-500">
            {searchTerm 
              ? "Try adjusting your search" 
              : "Create your first workout template to get started"}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map((template) => (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02 }}
              className="bg-slate-700/50 border border-slate-600 rounded-xl p-6"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-2">{template.name}</h3>
                  {template.description && (
                    <p className="text-sm text-gray-400 mb-3 line-clamp-2">{template.description}</p>
                  )}
                </div>
              </div>

              {/* Template Stats */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm">
                  <Target className="w-4 h-4 text-cyan-400" />
                  <span>{template.templateExercises?.length || 0} exercises</span>
                </div>
                
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="w-4 h-4 text-purple-400" />
                  <span>Created {new Date(template.createdAt).toLocaleDateString()}</span>
                </div>
              </div>

              {/* Exercise Preview */}
              {template.templateExercises && template.templateExercises.length > 0 && (
                <div className="mb-4">
                  <p className="text-xs text-gray-400 mb-2">Exercises:</p>
                  <div className="space-y-1">
                    {template.templateExercises.slice(0, 3).map((te) => (
                      <div key={te.id} className="flex justify-between items-center text-sm">
                        <span className="text-gray-300 truncate">{te.exercise.name}</span>
                        <span className="text-gray-400 text-xs ml-2">
                          {te.sets}×{te.reps}
                        </span>
                      </div>
                    ))}
                    {template.templateExercises.length > 3 && (
                      <div className="text-xs text-gray-500">
                        +{template.templateExercises.length - 3} more exercises
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Muscle Groups Preview */}
              {template.templateExercises && template.templateExercises.length > 0 && (
                <div className="mb-4">
                  <div className="flex flex-wrap gap-1">
                    {Array.from(new Set(
                      template.templateExercises.flatMap(te => te.exercise.muscleGroups)
                    )).slice(0, 4).map((muscle) => (
                      <span
                        key={muscle}
                        className="px-2 py-1 bg-slate-600 text-xs rounded-full"
                      >
                        {MUSCLE_GROUP_LABELS[muscle]}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-2">
                <button
                  onClick={() => onEdit(template)}
                  className="flex-1 bg-cyan-600 hover:bg-cyan-700 text-white py-2 px-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                >
                  <Edit3 className="w-4 h-4" />
                  Edit
                </button>
                <button
                  onClick={() => onDelete(template.id)}
                  className="bg-red-600 hover:bg-red-700 text-white py-2 px-3 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};
