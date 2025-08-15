"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Plus,
  Dumbbell,
  FileText,
  BarChart3,
  Users,
  ArrowRight,
} from "lucide-react";
import { Exercise, WorkoutTemplate } from "./types";
import { AnimatedBackground } from "../workout/AnimatedBackground";

export const AdminDashboard = () => {
  const router = useRouter();
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [templates, setTemplates] = useState<WorkoutTemplate[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    try {
      await Promise.all([loadExercises(), loadTemplates()]);
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

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <AnimatedBackground />

      <div className="container relative z-10 mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="mb-2 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-4xl font-bold text-transparent">
            Admin Dashboard
          </h1>
          <p className="text-gray-400">
            Manage exercises, workout templates, and system content
          </p>
        </div>

        {/* Stats Cards */}
        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-xl border border-slate-700 bg-slate-800/50 p-6 backdrop-blur-sm"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Total Exercises</p>
                <p className="text-2xl font-bold text-cyan-400">
                  {exercises.length}
                </p>
              </div>
              <Dumbbell className="h-8 w-8 text-cyan-400" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-xl border border-slate-700 bg-slate-800/50 p-6 backdrop-blur-sm"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Workout Templates</p>
                <p className="text-2xl font-bold text-purple-400">
                  {templates.length}
                </p>
              </div>
              <FileText className="h-8 w-8 text-purple-400" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-xl border border-slate-700 bg-slate-800/50 p-6 backdrop-blur-sm"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Total Users</p>
                <p className="text-2xl font-bold text-green-400">0</p>
              </div>
              <Users className="h-8 w-8 text-green-400" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="rounded-xl border border-slate-700 bg-slate-800/50 p-6 backdrop-blur-sm"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Recent Activity</p>
                <p className="text-2xl font-bold text-yellow-400">0</p>
              </div>
              <BarChart3 className="h-8 w-8 text-yellow-400" />
            </div>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="rounded-xl border border-slate-700 bg-slate-800/50 p-6 backdrop-blur-sm"
          >
            <h3 className="mb-4 text-xl font-bold text-white">
              Exercise Management
            </h3>
            <p className="mb-6 text-gray-400">
              Create, edit, and manage exercises in your fitness library.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => router.push("/admin/exercises/create")}
                className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-cyan-500 to-cyan-600 px-4 py-2 font-medium text-white transition-all duration-200 hover:from-cyan-600 hover:to-cyan-700"
              >
                <Plus className="h-4 w-4" />
                Create Exercise
              </button>
              <button
                onClick={() => router.push("/admin/exercises")}
                className="flex items-center gap-2 rounded-lg bg-slate-700 px-4 py-2 text-gray-300 transition-all duration-200 hover:bg-slate-600 hover:text-white"
              >
                <Dumbbell className="h-4 w-4" />
                <ArrowRight className="h-4 w-4" />
                View All
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="rounded-xl border border-slate-700 bg-slate-800/50 p-6 backdrop-blur-sm"
          >
            <h3 className="mb-4 text-xl font-bold text-white">
              Template Management
            </h3>
            <p className="mb-6 text-gray-400">
              Build and manage workout templates for your users.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => router.push("/admin/templates/create")}
                className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-purple-500 to-purple-600 px-4 py-2 font-medium text-white transition-all duration-200 hover:from-purple-600 hover:to-purple-700"
              >
                <Plus className="h-4 w-4" />
                Create Template
              </button>
              <button
                onClick={() => router.push("/admin/templates")}
                className="flex items-center gap-2 rounded-lg bg-slate-700 px-4 py-2 text-gray-300 transition-all duration-200 hover:bg-slate-600 hover:text-white"
              >
                <FileText className="h-4 w-4" />
                <ArrowRight className="h-4 w-4" />
                View All
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
