"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { authClient, User } from "@/lib/client-auth";
import { AnimatedBackground } from "@/components/workout/AnimatedBackground";
import { ProgressSteps } from "@/components/workout/ProgressSteps";
import { ExerciseSelection } from "@/components/workout/ExerciseSelection";
import { Exercise, WorkoutExercise } from "@/components/workout/types";

export default function WorkoutExercisesPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedMuscles, setSelectedMuscles] = useState<string[]>([]);
  const [availableExercises, setAvailableExercises] = useState<Exercise[]>([]);
  const [workoutExercises, setWorkoutExercises] = useState<WorkoutExercise[]>([]);
  const [showAddMuscleModal, setShowAddMuscleModal] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const currentUser = await authClient.getCurrentUser();
        if (!currentUser) {
          router.push("/login");
          return;
        }
        setUser(currentUser);
      } catch (error) {
        console.error("Auth error:", error);
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  useEffect(() => {
    // Get selected muscles from URL parameters
    const musclesParam = searchParams.get('muscles');
    if (musclesParam) {
      const muscles = musclesParam.split(',').filter(Boolean);
      setSelectedMuscles(muscles);
    } else {
      // If no muscles selected, redirect to muscle selection
      router.push('/workout/muscles');
    }
  }, [searchParams, router]);

  useEffect(() => {
    if (selectedMuscles.length > 0) {
      fetchExercises();
    }
  }, [selectedMuscles]);

  const fetchExercises = async () => {
    try {
      const response = await fetch("/api/exercises/by-muscle-groups", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ muscleGroups: selectedMuscles }),
      });

      if (response.ok) {
        const exercises = await response.json();
        setAvailableExercises(exercises);
      }
    } catch (error) {
      console.error("Error fetching exercises:", error);
    }
  };

  const handleAddExercise = (exercise: Exercise) => {
    const newWorkoutExercise: WorkoutExercise = {
      id: Date.now().toString(),
      exerciseId: exercise.id,
      exercise: exercise,
      sets: [],
      notes: "",
      completed: false,
    };
    setWorkoutExercises([...workoutExercises, newWorkoutExercise]);
  };

  const handleRemoveExercise = (exerciseId: string) => {
    setWorkoutExercises(workoutExercises.filter(we => we.exerciseId !== exerciseId));
  };

  const handleContinue = () => {
    if (workoutExercises.length > 0) {
      // Pass selected exercises as URL parameters
      const exerciseIds = workoutExercises.map(we => we.exerciseId).join(',');
      const muscleParams = selectedMuscles.join(',');
      router.push(`/workout/tracking?exercises=${encodeURIComponent(exerciseIds)}&muscles=${encodeURIComponent(muscleParams)}`);
    }
  };

  const handleAddMuscle = (muscle: string) => {
    if (!selectedMuscles.includes(muscle)) {
      const newMuscles = [...selectedMuscles, muscle];
      setSelectedMuscles(newMuscles);
      // Update URL with new muscles
      const muscleParams = newMuscles.join(',');
      router.replace(`/workout/exercises?muscles=${encodeURIComponent(muscleParams)}`);
    }
    setShowAddMuscleModal(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden flex items-center justify-center">
        <AnimatedBackground />
        <div className="relative z-10 text-white">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      <AnimatedBackground />
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => router.push('/workout/muscles')}
            className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg text-gray-300 hover:text-white hover:bg-slate-700/50 transition-all duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Muscles
          </button>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Select Exercises
            </h1>
            <p className="text-gray-400 mt-1">
              Choose exercises for your {selectedMuscles.join(', ')} workout
            </p>
          </div>
        </div>

        <ProgressSteps currentStep={2} />

        <ExerciseSelection
          selectedMuscles={selectedMuscles}
          availableExercises={availableExercises}
          workoutExercises={workoutExercises}
          onAddExercise={handleAddExercise}
          onRemoveExercise={handleRemoveExercise}
          onContinue={handleContinue}
          onBack={() => router.push('/workout/muscles')}
          onShowAddMuscleModal={() => setShowAddMuscleModal(true)}
          onAddMuscle={() => setShowAddMuscleModal(true)}
          showAddMuscleModal={showAddMuscleModal}
          onCloseAddMuscleModal={() => setShowAddMuscleModal(false)}
          onAddMuscleConfirm={handleAddMuscle}
        />
      </div>
    </div>
  );
}
