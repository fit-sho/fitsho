"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { authClient, User } from "@/lib/client-auth";
import { AnimatedBackground } from "@/components/workout/AnimatedBackground";
import { ProgressSteps } from "@/components/workout/ProgressSteps";
import { WorkoutTracking } from "@/components/workout/WorkoutTracking";
import { Exercise, WorkoutExercise } from "@/components/workout/types";

export default function WorkoutTrackingPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedMuscles, setSelectedMuscles] = useState<string[]>([]);
  const [workoutExercises, setWorkoutExercises] = useState<WorkoutExercise[]>([]);
  const [workoutNotes, setWorkoutNotes] = useState("");
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
    // Get selected exercises and muscles from URL parameters
    const exercisesParam = searchParams.get('exercises');
    const musclesParam = searchParams.get('muscles');
    
    if (!exercisesParam || !musclesParam) {
      // If missing parameters, redirect to muscle selection
      router.push('/workout/muscles');
      return;
    }

    const exerciseIds = exercisesParam.split(',').filter(Boolean);
    const muscles = musclesParam.split(',').filter(Boolean);
    
    setSelectedMuscles(muscles);
    
    // Fetch exercise details and create workout exercises
    if (exerciseIds.length > 0) {
      fetchExerciseDetails(exerciseIds);
    }
  }, [searchParams, router]);

  const fetchExerciseDetails = async (exerciseIds: string[]) => {
    try {
      const response = await fetch("/api/exercises");
      if (response.ok) {
        const allExercises: Exercise[] = await response.json();
        
        // Create workout exercises from selected exercise IDs
        const selectedExercises = allExercises.filter(ex => exerciseIds.includes(ex.id));
        const workoutExs: WorkoutExercise[] = selectedExercises.map(exercise => ({
          id: Date.now().toString() + Math.random(),
          exerciseId: exercise.id,
          exercise: exercise,
          sets: [],
          notes: "",
          completed: false,
        }));
        
        setWorkoutExercises(workoutExs);
      }
    } catch (error) {
      console.error("Error fetching exercise details:", error);
    }
  };

  const handleUpdateWorkoutExercise = (updatedExercise: WorkoutExercise) => {
    setWorkoutExercises(workoutExercises.map(we => 
      we.id === updatedExercise.id ? updatedExercise : we
    ));
  };

  const handleFinishWorkout = async () => {
    try {
      // Here you would typically save the workout to the database
      const workoutData = {
        userId: user?.id,
        exercises: workoutExercises,
        notes: workoutNotes,
        muscleGroups: selectedMuscles,
        completedAt: new Date().toISOString(),
      };

      // For now, just log the workout data
      console.log("Workout completed:", workoutData);
      
      // Redirect to a success page or dashboard
      router.push('/dashboard?workout=completed');
    } catch (error) {
      console.error("Error saving workout:", error);
    }
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
            onClick={() => {
              const exerciseIds = workoutExercises.map(we => we.exerciseId).join(',');
              const muscleParams = selectedMuscles.join(',');
              router.push(`/workout/exercises?exercises=${encodeURIComponent(exerciseIds)}&muscles=${encodeURIComponent(muscleParams)}`);
            }}
            className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg text-gray-300 hover:text-white hover:bg-slate-700/50 transition-all duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Exercises
          </button>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Track Your Workout
            </h1>
            <p className="text-gray-400 mt-1">
              Log your sets, reps, and weights for each exercise
            </p>
          </div>
        </div>

        <ProgressSteps currentStep={3} />

        <WorkoutTracking
          workoutExercises={workoutExercises}
          workoutNotes={workoutNotes}
          onUpdateExercise={handleUpdateWorkoutExercise}
          onUpdateNotes={setWorkoutNotes}
          onFinishWorkout={handleFinishWorkout}
        />
      </div>
    </div>
  );
}
