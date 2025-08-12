"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus, Dumbbell, FileText, BarChart3, Users } from "lucide-react";
import { Exercise, WorkoutTemplate, CreateExerciseData, CreateTemplateData } from "./types";
import { ExerciseForm } from "./ExerciseForm";
import { ExerciseList } from "./ExerciseList";
import { WorkoutTemplateForm } from "./WorkoutTemplateForm";
import { TemplateList } from "./TemplateList";
import { AnimatedBackground } from "../workout/AnimatedBackground";

type ViewMode = "overview" | "exercises" | "templates" | "create-exercise" | "edit-exercise" | "create-template" | "edit-template";

export const AdminDashboard = () => {
  const [currentView, setCurrentView] = useState<ViewMode>("overview");
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [templates, setTemplates] = useState<WorkoutTemplate[]>([]);
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<WorkoutTemplate | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [stats, setStats] = useState({
    totalExercises: 0,
    totalTemplates: 0,
    totalUsers: 0,
    recentActivity: 0,
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    try {
      await Promise.all([
        loadExercises(),
        loadTemplates(),
        loadStats(),
      ]);
    } catch (error) {
      console.error("Error loading admin data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadExercises = async () => {
    try {
      const response = await fetch("/api/exercises");
      if (response.ok) {
        const data = await response.json();
        setExercises(data);
      }
    } catch (error) {
      console.error("Error loading exercises:", error);
    }
  };

  const loadTemplates = async () => {
    try {
      const response = await fetch("/api/workout-templates");
      if (response.ok) {
        const data = await response.json();
        setTemplates(data);
      }
    } catch (error) {
      console.error("Error loading templates:", error);
    }
  };

  const loadStats = async () => {
    // Update stats based on loaded data
    setStats({
      totalExercises: exercises.length,
      totalTemplates: templates.length,
      totalUsers: 0, // Would need separate API call
      recentActivity: 0, // Would need separate API call
    });
  };

  const handleCreateExercise = async (data: CreateExerciseData) => {
    try {
      const response = await fetch("/api/exercises", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        await loadExercises();
        setCurrentView("exercises");
      } else {
        throw new Error("Failed to create exercise");
      }
    } catch (error) {
      console.error("Error creating exercise:", error);
      throw error;
    }
  };

  const handleUpdateExercise = async (data: CreateExerciseData) => {
    if (!selectedExercise) return;

    try {
      const response = await fetch(`/api/exercises/${selectedExercise.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        await loadExercises();
        setCurrentView("exercises");
        setSelectedExercise(null);
      } else {
        throw new Error("Failed to update exercise");
      }
    } catch (error) {
      console.error("Error updating exercise:", error);
      throw error;
    }
  };

  const handleDeleteExercise = async (exerciseId: string) => {
    if (!confirm("Are you sure you want to delete this exercise?")) return;

    try {
      const response = await fetch(`/api/exercises/${exerciseId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        await loadExercises();
      } else {
        throw new Error("Failed to delete exercise");
      }
    } catch (error) {
      console.error("Error deleting exercise:", error);
    }
  };

  const handleCreateTemplate = async (data: CreateTemplateData) => {
    try {
      const response = await fetch("/api/workout-templates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        await loadTemplates();
        setCurrentView("templates");
      } else {
        throw new Error("Failed to create template");
      }
    } catch (error) {
      console.error("Error creating template:", error);
      throw error;
    }
  };

  const handleUpdateTemplate = async (data: CreateTemplateData) => {
    if (!selectedTemplate) return;

    try {
      const response = await fetch(`/api/workout-templates/${selectedTemplate.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        await loadTemplates();
        setCurrentView("templates");
        setSelectedTemplate(null);
      } else {
        throw new Error("Failed to update template");
      }
    } catch (error) {
      console.error("Error updating template:", error);
      throw error;
    }
  };

  const handleDeleteTemplate = async (templateId: string) => {
    if (!confirm("Are you sure you want to delete this template?")) return;

    try {
      const response = await fetch(`/api/workout-templates/${templateId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        await loadTemplates();
      } else {
        throw new Error("Failed to delete template");
      }
    } catch (error) {
      console.error("Error deleting template:", error);
    }
  };

  const renderContent = () => {
    switch (currentView) {
      case "exercises":
        return (
          <ExerciseList
            exercises={exercises}
            onEdit={(exercise) => {
              setSelectedExercise(exercise);
              setCurrentView("edit-exercise");
            }}
            onDelete={handleDeleteExercise}
            isLoading={isLoading}
          />
        );

      case "templates":
        return (
          <TemplateList
            templates={templates}
            onEdit={(template) => {
              setSelectedTemplate(template);
              setCurrentView("edit-template");
            }}
            onDelete={handleDeleteTemplate}
            isLoading={isLoading}
          />
        );

      case "create-exercise":
        return (
          <ExerciseForm
            onSave={handleCreateExercise}
            onCancel={() => setCurrentView("exercises")}
            isLoading={isLoading}
          />
        );

      case "edit-exercise":
        return (
          <ExerciseForm
            exercise={selectedExercise || undefined}
            onSave={handleUpdateExercise}
            onCancel={() => {
              setSelectedExercise(null);
              setCurrentView("exercises");
            }}
            isLoading={isLoading}
          />
        );

      case "create-template":
        return (
          <WorkoutTemplateForm
            exercises={exercises}
            onSave={handleCreateTemplate}
            onCancel={() => setCurrentView("templates")}
            isLoading={isLoading}
          />
        );

      case "edit-template":
        return (
          <WorkoutTemplateForm
            template={selectedTemplate || undefined}
            exercises={exercises}
            onSave={handleUpdateTemplate}
            onCancel={() => {
              setSelectedTemplate(null);
              setCurrentView("templates");
            }}
            isLoading={isLoading}
          />
        );

      default:
        return (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Total Exercises</p>
                    <p className="text-2xl font-bold text-cyan-400">{exercises.length}</p>
                  </div>
                  <Dumbbell className="w-8 h-8 text-cyan-400" />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Workout Templates</p>
                    <p className="text-2xl font-bold text-purple-400">{templates.length}</p>
                  </div>
                  <FileText className="w-8 h-8 text-purple-400" />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Active Users</p>
                    <p className="text-2xl font-bold text-green-400">{stats.totalUsers}</p>
                  </div>
                  <Users className="w-8 h-8 text-green-400" />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Recent Activity</p>
                    <p className="text-2xl font-bold text-orange-400">{stats.recentActivity}</p>
                  </div>
                  <BarChart3 className="w-8 h-8 text-orange-400" />
                </div>
              </motion.div>
            </div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6"
            >
              <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <button
                  onClick={() => setCurrentView("create-exercise")}
                  className="bg-gradient-to-r from-cyan-500 to-cyan-600 text-white p-4 rounded-lg font-medium flex items-center gap-3 hover:opacity-90 transition-opacity"
                >
                  <Plus className="w-5 h-5" />
                  New Exercise
                </button>

                <button
                  onClick={() => setCurrentView("create-template")}
                  className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-4 rounded-lg font-medium flex items-center gap-3 hover:opacity-90 transition-opacity"
                >
                  <Plus className="w-5 h-5" />
                  New Template
                </button>

                <button
                  onClick={() => setCurrentView("exercises")}
                  className="bg-slate-700 text-gray-300 p-4 rounded-lg font-medium flex items-center gap-3 hover:bg-slate-600 transition-colors"
                >
                  <Dumbbell className="w-5 h-5" />
                  Manage Exercises
                </button>

                <button
                  onClick={() => setCurrentView("templates")}
                  className="bg-slate-700 text-gray-300 p-4 rounded-lg font-medium flex items-center gap-3 hover:bg-slate-600 transition-colors"
                >
                  <FileText className="w-5 h-5" />
                  Manage Templates
                </button>
              </div>
            </motion.div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <AnimatedBackground />

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-2">
            Admin Dashboard
          </h1>
          <p className="text-gray-400">Manage exercises, templates, and users</p>
        </motion.div>

        {/* Navigation */}
        {currentView !== "overview" && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <nav className="flex items-center gap-2 text-sm">
              <button
                onClick={() => setCurrentView("overview")}
                className="text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                Dashboard
              </button>
              <span className="text-gray-500">/</span>
              <span className="text-gray-400 capitalize">
                {currentView.replace("-", " ")}
              </span>
            </nav>
          </motion.div>
        )}

        {/* Main Content */}
        <motion.div
          key={currentView}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {renderContent()}
        </motion.div>
      </div>
    </div>
  );
};
