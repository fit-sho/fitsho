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
        router.push("/admin/exercises");
      } else {
        console.error("Failed to update exercise");
      }
    } catch (error) {
      console.error("Error updating exercise:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <AnimatedBackground />
        <div className="relative z-10 text-white">Loading...</div>
      </div>
    );
  }

  if (!exercise) {
    return (
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <AnimatedBackground />
        <div className="relative z-10 text-white">Exercise not found</div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <AnimatedBackground />

      <div className="container relative z-10 mx-auto px-4 py-8">
        <div className="mb-8 flex items-center gap-4">
          <button
            onClick={() => router.push("/admin/exercises")}
            className="flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-800/50 px-4 py-2 text-gray-300 backdrop-blur-sm transition-all duration-200 hover:bg-slate-700/50 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Exercises
          </button>
          <div>
            <h1 className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-3xl font-bold text-transparent">
              Edit Exercise
            </h1>
            <p className="mt-1 text-gray-400">
              Update exercise details and configuration
            </p>
          </div>
        </div>

        <ExerciseForm
          exercise={exercise}
          onSave={handleUpdateExercise}
          onCancel={() => router.push("/admin/exercises")}
          isLoading={false}
        />
      </div>
    </div>
  );
}
