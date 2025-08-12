"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { authClient, User } from "@/lib/client-auth";
import { useRouter } from "next/navigation";
import { AnimatedBackground } from "./AnimatedBackground";
import { ProgressSteps } from "./ProgressSteps";
import { MuscleGroupSelection } from "./MuscleGroupSelection";
import { ExerciseSelection } from "./ExerciseSelection";
import { WorkoutTracking } from "./WorkoutTracking";
import { Exercise, WorkoutExercise } from "./types";

export default function WorkoutPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedMuscles, setSelectedMuscles] = useState<string[]>([]);
  const [availableExercises, setAvailableExercises] = useState<Exercise[]>([]);
  const [workoutExercises, setWorkoutExercises] = useState<WorkoutExercise[]>([]);
  const [workoutNotes, setWorkoutNotes] = useState("");
  const [showAddMuscleModal, setShowAddMuscleModal] = useState(false);
  const router = useRouter();

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

  const fetchExercises = async () => {
    if (selectedMuscles.length === 0) return;

    try {
      const response = await fetch("/api/exercises/by-muscle-groups", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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

  useEffect(() => {
    if (selectedMuscles.length > 0) {
      fetchExercises();
    }
  }, [selectedMuscles]);

  const handleMuscleToggle = (muscle: string) => {
    setSelectedMuscles(prev => 
      prev.includes(muscle) 
        ? prev.filter(m => m !== muscle)
        : [...prev, muscle]
    );
  };

  const addExerciseToWorkout = (exercise: Exercise) => {
    const newWorkoutExercise: WorkoutExercise = {
      exerciseId: exercise.id,
      exercise,
      sets: Array.from({ length: exercise.recommendedSets || 3 }, () => ({
        reps: 0,
        weight: 0,
        completed: false,
      })),
      notes: "",
      targetSets: exercise.recommendedSets || 3,
      targetReps: exercise.recommendedReps || "8-12",
    };

    setWorkoutExercises(prev => [...prev, newWorkoutExercise]);
  };

  const updateWorkoutExercise = (exerciseId: string, updates: Partial<WorkoutExercise>) => {
    setWorkoutExercises(prev =>
      prev.map(we => we.exerciseId === exerciseId ? { ...we, ...updates } : we)
    );
  };

  const removeExerciseFromWorkout = (exerciseId: string) => {
    setWorkoutExercises(prev => prev.filter(we => we.exerciseId !== exerciseId));
  };

  const saveWorkout = async () => {
    if (!user || workoutExercises.length === 0) return;

    try {
      const workoutData = {
        exercises: workoutExercises.map(we => ({
          exerciseId: we.exerciseId,
          sets: we.sets.filter(set => set.completed).length,
          reps: we.sets.filter(set => set.completed).map(set => set.reps).join(","),
          weight: we.sets.filter(set => set.completed).map(set => set.weight).join(","),
          notes: we.notes,
          order: workoutExercises.indexOf(we),
        })),
        notes: workoutNotes,
      };

      const response = await fetch("/api/workouts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(workoutData),
      });

      if (response.ok) {
        alert("Workout saved successfully!");
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("Error saving workout:", error);
      alert("Failed to save workout");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-cyan-400"></div>
      </div>
    );
  }

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
            Workout Tracker
          </h1>
          <p className="text-gray-400">Build your perfect workout session</p>
        </motion.div>

        <ProgressSteps currentStep={currentStep} />

        {/* Step 1: Muscle Group Selection */}
        {currentStep === 1 && (
          <MuscleGroupSelection
            selectedMuscles={selectedMuscles}
            onMuscleToggle={handleMuscleToggle}
            onContinue={() => setCurrentStep(2)}
          />
        )}

        {/* Step 2: Exercise Selection */}
        {currentStep === 2 && (
          <ExerciseSelection
            selectedMuscles={selectedMuscles}
            availableExercises={availableExercises}
            workoutExercises={workoutExercises}
            onAddExercise={addExerciseToWorkout}
            onBack={() => setCurrentStep(1)}
            onShowAddMuscleModal={() => setShowAddMuscleModal(true)}
          />
        )}

        {/* Step 3: Workout Tracking */}
        {currentStep === 3 && (
          <WorkoutTracking
            workoutExercises={workoutExercises}
            workoutNotes={workoutNotes}
            onUpdateExercise={updateWorkoutExercise}
            onRemoveExercise={removeExerciseFromWorkout}
            onUpdateNotes={setWorkoutNotes}
            onSaveWorkout={saveWorkout}
          />
        )}
      </div>
    </div>
  );
}
