"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Plus, ArrowLeft } from "lucide-react";
import { Exercise } from "../../../components/admin/types";
import { ExerciseList } from "../../../components/admin/ExerciseList";
import { AnimatedBackground } from "../../../components/workout/AnimatedBackground";

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
        setExercises(exercises.filter(ex => ex.id !== exerciseId));
      }
    } catch (error) {
      console.error("Error deleting exercise:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      <AnimatedBackground />
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push('/admin')}
              className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg text-gray-300 hover:text-white hover:bg-slate-700/50 transition-all duration-200"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </button>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Exercise Management
              </h1>
              <p className="text-gray-400 mt-1">
                Manage all exercises in your fitness library
              </p>
            </div>
          </div>

          <motion.button
            onClick={() => router.push('/admin/exercises/create')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg text-white font-medium hover:from-cyan-600 hover:to-purple-600 transition-all duration-200 shadow-lg"
          >
            <Plus className="w-5 h-5" />
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
