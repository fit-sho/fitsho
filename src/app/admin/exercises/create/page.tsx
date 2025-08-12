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
        router.push('/admin/exercises');
      } else {
        console.error("Failed to create exercise");
      }
    } catch (error) {
      console.error("Error creating exercise:", error);
    }
  };

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
              Create New Exercise
            </h1>
            <p className="text-gray-400 mt-1">
              Add a new exercise to your fitness library
            </p>
          </div>
        </div>

        <ExerciseForm
          onSave={handleCreateExercise}
          onCancel={() => router.push('/admin/exercises')}
          isLoading={false}
        />
      </div>
    </div>
  );
}
