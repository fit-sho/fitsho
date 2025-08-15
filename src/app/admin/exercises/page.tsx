"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Plus, ArrowLeft } from "lucide-react";
import { Exercise } from "@/components/admin/types";
import { ExerciseList } from "@/components/admin/ExerciseList";
import { AnimatedBackground } from "@/components/workout/AnimatedBackground";

export default function AdminExercisesPage() {
  const router = useRouter();
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadExercises();
  }, []);

  const loadExercises = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/exercises");
      if (response.ok) {
        const data = await response.json();
        setExercises(data);
      }
    } catch (error) {
      console.error("Error loading exercises:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditExercise = (exercise: Exercise) => {
    router.push(`/admin/exercises/edit/${exercise.id}`);
  };

  const handleDeleteExercise = async (exerciseId: string) => {
    try {
      const response = await fetch(`/api/exercises/${exerciseId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setExercises(exercises.filter((ex) => ex.id !== exerciseId));
      }
    } catch (error) {
      console.error("Error deleting exercise:", error);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <AnimatedBackground />

      <div className="container relative z-10 mx-auto px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push("/admin")}
              className="flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-800/50 px-4 py-2 text-gray-300 backdrop-blur-sm transition-all duration-200 hover:bg-slate-700/50 hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </button>
            <div>
              <h1 className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-3xl font-bold text-transparent">
                Exercise Management
              </h1>
              <p className="mt-1 text-gray-400">
                Manage all exercises in your fitness library
              </p>
            </div>
          </div>

          <motion.button
            onClick={() => router.push("/admin/exercises/create")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-500 px-6 py-3 font-medium text-white shadow-lg transition-all duration-200 hover:from-cyan-600 hover:to-purple-600"
          >
            <Plus className="h-5 w-5" />
            Create Exercise
          </motion.button>
        </div>

        <ExerciseList
          exercises={exercises}
          onEdit={handleEditExercise}
          onDelete={handleDeleteExercise}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
