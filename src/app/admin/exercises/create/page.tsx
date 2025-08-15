"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { CreateExerciseData } from "@/components/admin/types";
import { ExerciseForm } from "@/components/admin/ExerciseForm";
import { AnimatedBackground } from "@/components/workout/AnimatedBackground";

export default function CreateExercisePage() {
  const router = useRouter();

  const handleCreateExercise = async (exerciseData: CreateExerciseData) => {
    try {
      const response = await fetch("/api/exercises", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(exerciseData),
      });

      if (response.ok) {
        router.push("/admin/exercises");
      } else {
        console.error("Failed to create exercise");
      }
    } catch (error) {
      console.error("Error creating exercise:", error);
    }
  };

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
              Create New Exercise
            </h1>
            <p className="mt-1 text-gray-400">
              Add a new exercise to your fitness library
            </p>
          </div>
        </div>

        <ExerciseForm
          onSave={handleCreateExercise}
          onCancel={() => router.push("/admin/exercises")}
          isLoading={false}
        />
      </div>
    </div>
  );
}
