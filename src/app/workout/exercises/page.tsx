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
  const [primaryMuscle, setPrimaryMuscle] = useState<string>("");
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
    // Get selected muscles and primary muscle from URL parameters
    const musclesParam = searchParams.get('muscles');
    const primaryParam = searchParams.get('primary');
    
    if (musclesParam) {
      const muscles = musclesParam.split(',').filter(Boolean);
      setSelectedMuscles(muscles);
      
      if (primaryParam) {
        setPrimaryMuscle(primaryParam);
      }
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
        
        if (primaryMuscle) {
          const sortedExercises = exercises.sort((a: Exercise, b: Exercise) => {
            const aPrimary = a.muscleGroups.includes(primaryMuscle);
            const bPrimary = b.muscleGroups.includes(primaryMuscle);
            
            // Primary muscle exercises first
            if (aPrimary && !bPrimary) return -1;
            if (!aPrimary && bPrimary) return 1;
            
            // Within same priority, sort by name
            return a.name.localeCompare(b.name);
          });
          setAvailableExercises(sortedExercises);
        } else {
          setAvailableExercises(exercises);
        }
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
      
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header - Mobile Optimized */}
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <button
            onClick={() => {
              if (selectedMuscles.length > 1) {
                const muscleParams = selectedMuscles.join(',');
                router.push(`/workout/primary?muscles=${encodeURIComponent(muscleParams)}`);
              } else {
                router.push('/workout/muscles');
              }
            }}
            className="flex items-center gap-2 px-3 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white/70 hover:text-white hover:bg-white/15 transition-all duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Back</span>
          </button>
          
          <div className="text-center">
            <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Select Exercises
            </h1>
            {primaryMuscle && (
              <p className="text-sm text-white/60 mt-1">
                <span className="text-cyan-400 font-semibold">{primaryMuscle}</span> focused
              </p>
            )}
          </div>

          <div className="w-16"></div> {/* Spacer for center alignment */}
        </div>

        {/* Progress Steps */}
        <div className="px-4 py-4">
          <ProgressSteps currentStep={3} />
        </div>

        {/* Main Content */}
        <div className="flex-1 px-4 pb-4">
          {primaryMuscle && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 p-4 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 backdrop-blur-sm border border-cyan-400/20 rounded-2xl"
            >
              <p className="text-white/80 text-sm text-center">
                💪 <span className="font-semibold text-cyan-400">{primaryMuscle}</span> exercises are shown first
              </p>
            </motion.div>
          )}
          
          <ExerciseSelection
            selectedMuscles={selectedMuscles}
            primaryMuscle={primaryMuscle}
            availableExercises={availableExercises}
            workoutExercises={workoutExercises}
            onAddExercise={handleAddExercise}
            onRemoveExercise={handleRemoveExercise}
            onContinue={handleContinue}
            onAddMuscle={() => setShowAddMuscleModal(true)}
            showAddMuscleModal={showAddMuscleModal}
            onCloseAddMuscleModal={() => setShowAddMuscleModal(false)}
            onAddMuscleConfirm={handleAddMuscle}
          />
        </div>
      </div>
    </div>
  );
}
