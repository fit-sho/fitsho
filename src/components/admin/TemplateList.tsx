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

export const TemplateList = ({
  templates,
  onEdit,
  onDelete,
  isLoading = false,
}: TemplateListProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTemplates = templates.filter(
    (template) =>
      template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (template.description &&
        template.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (isLoading) {
    return (
      <div className="rounded-xl border border-slate-700 bg-slate-800/50 p-8 backdrop-blur-sm">
        <div className="flex items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-cyan-400"></div>
          <span className="ml-3 text-gray-400">Loading templates...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-slate-700 bg-slate-800/50 p-6 backdrop-blur-sm">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-2xl font-bold text-transparent">
          Workout Templates ({templates.length})
        </h2>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
          <input
            type="text"
            placeholder="Search templates..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-lg border border-slate-600 bg-slate-700 py-2 pl-10 pr-4 focus:border-transparent focus:ring-2 focus:ring-cyan-500"
          />
        </div>
      </div>

      {/* Template Grid */}
      {filteredTemplates.length === 0 ? (
        <div className="py-12 text-center">
          <div className="mb-2 text-gray-400">No templates found</div>
          <p className="text-sm text-gray-500">
            {searchTerm
              ? "Try adjusting your search"
              : "Create your first workout template to get started"}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredTemplates.map((template) => (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02 }}
              className="rounded-xl border border-slate-600 bg-slate-700/50 p-6"
            >
              <div className="mb-4 flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="mb-2 text-lg font-semibold">
                    {template.name}
                  </h3>
                  {template.description && (
                    <p className="mb-3 line-clamp-2 text-sm text-gray-400">
                      {template.description}
                    </p>
                  )}
                </div>
              </div>

              {/* Template Stats */}
              <div className="mb-4 space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Target className="h-4 w-4 text-cyan-400" />
                  <span>
                    {template.templateExercises?.length || 0} exercises
                  </span>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-purple-400" />
                  <span>
                    Created {new Date(template.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>

              {/* Exercise Preview */}
              {template.templateExercises &&
                template.templateExercises.length > 0 && (
                  <div className="mb-4">
                    <p className="mb-2 text-xs text-gray-400">Exercises:</p>
                    <div className="space-y-1">
                      {template.templateExercises.slice(0, 3).map((te) => (
                        <div
                          key={te.id}
                          className="flex items-center justify-between text-sm"
                        >
                          <span className="truncate text-gray-300">
                            {te.exercise.name}
                          </span>
                          <span className="ml-2 text-xs text-gray-400">
                            {te.sets}×{te.reps}
                          </span>
                        </div>
                      ))}
                      {template.templateExercises.length > 3 && (
                        <div className="text-xs text-gray-500">
                          +{template.templateExercises.length - 3} more
                          exercises
                        </div>
                      )}
                    </div>
                  </div>
                )}

              {/* Muscle Groups Preview */}
              {template.templateExercises &&
                template.templateExercises.length > 0 && (
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1">
                      {Array.from(
                        new Set(
                          template.templateExercises.flatMap(
                            (te) => te.exercise.muscleGroups
                          )
                        )
                      )
                        .slice(0, 4)
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
                )}

              {/* Actions */}
              <div className="flex gap-2">
                <button
                  onClick={() => onEdit(template)}
                  className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-cyan-600 px-3 py-2 font-medium text-white transition-colors hover:bg-cyan-700"
                >
                  <Edit3 className="h-4 w-4" />
                  Edit
                </button>
                <button
                  onClick={() => onDelete(template.id)}
                  className="rounded-lg bg-red-600 px-3 py-2 text-white transition-colors hover:bg-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};
