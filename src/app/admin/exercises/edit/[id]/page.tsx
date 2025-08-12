"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Exercise, CreateExerciseData } from "@/components/admin/types";
import { ExerciseForm } from "@/components/admin/ExerciseForm";
import { AnimatedBackground } from "@/components/workout/AnimatedBackground";

export default function EditExercisePage() {
  const router = useRouter();
  const params = useParams();
  const [exercise, setExercise] = useState<Exercise | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (params.id) {
      loadExercise(params.id as string);
    }
  }, [params.id]);

  const loadExercise = async (id: string) => {
    try {
      const response = await fetch("/api/exercises");
      if (response.ok) {
        const exercises = await response.json();
        const foundExercise = exercises.find((ex: Exercise) => ex.id === id);
        setExercise(foundExercise || null);
      }
    } catch (error) {
      console.error("Error loading exercise:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateExercise = async (exerciseData: CreateExerciseData) => {
    if (!exercise) return;

    try {
      const response = await fetch(`/api/exercises/${exercise.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(exerciseData),
      });

      if (response.ok) {
        router.push('/admin/exercises');
      } else {
        console.error("Failed to update exercise");
      }
    } catch (error) {
      console.error("Error updating exercise:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden flex items-center justify-center">
        <AnimatedBackground />
        <div className="relative z-10 text-white">Loading...</div>
      </div>
    );
  }

  if (!exercise) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden flex items-center justify-center">
        <AnimatedBackground />
        <div className="relative z-10 text-white">Exercise not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      <AnimatedBackground />
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => router.push('/admin/exercises')}
            className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg text-gray-300 hover:text-white hover:bg-slate-700/50 transition-all duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Exercises
          </button>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Edit Exercise
            </h1>
            <p className="text-gray-400 mt-1">
              Update exercise details and configuration
            </p>
          </div>
        </div>

        <ExerciseForm
          exercise={exercise}
          onSave={handleUpdateExercise}
          onCancel={() => router.push('/admin/exercises')}
          isLoading={false}
        />
      </div>
    </div>
  );
}
