"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { authClient, User } from "@/lib/client-auth";
import { useRouter } from "next/navigation";
import {
  Dumbbell,
  Plus,
  Check,
  ArrowLeft,
  ArrowRight,
  Save,
  Target,
  Activity,
  Calendar,
  Clock,
  User as UserIcon,
  X,
  Image as ImageIcon,
  Zap,
  Award,
  Settings,
  Trash2,
  Edit3,
} from "lucide-react";

// Enhanced interfaces
interface Exercise {
  id: string;
  name: string;
  description: string;
  muscleGroups: string[];
  imageUrl?: string;
  recommendedSets?: number;
  recommendedReps?: string;
  difficulty?: string;
  equipment?: string;
}

interface WorkoutSet {
  reps: number;
  weight: number;
  completed: boolean;
}

interface WorkoutExercise {
  exerciseId: string;
  exercise: Exercise;
  sets: WorkoutSet[];
  notes: string;
  targetSets: number;
  targetReps: string;
}

interface MuscleGroupOption {
  name: string;
  emoji: string;
  color: string;
  description: string;
}

const muscleGroups: MuscleGroupOption[] = [
  { name: "CHEST", emoji: "💪", color: "from-red-500 to-pink-500", description: "Pectorals" },
  { name: "BACK", emoji: "🏋️", color: "from-blue-500 to-cyan-500", description: "Lats & Rhomboids" },
  { name: "SHOULDERS", emoji: "🔥", color: "from-orange-500 to-yellow-500", description: "Deltoids" },
  { name: "BICEPS", emoji: "💪", color: "from-green-500 to-emerald-500", description: "Bicep Muscles" },
  { name: "TRICEPS", emoji: "⚡", color: "from-purple-500 to-violet-500", description: "Tricep Muscles" },
  { name: "LEGS", emoji: "🦵", color: "from-indigo-500 to-blue-500", description: "Quads & Hamstrings" },
  { name: "GLUTES", emoji: "🍑", color: "from-pink-500 to-rose-500", description: "Glute Muscles" },
  { name: "CORE", emoji: "🎯", color: "from-yellow-500 to-orange-500", description: "Abs & Core" },
  { name: "CARDIO", emoji: "❤️", color: "from-red-500 to-orange-500", description: "Cardiovascular" },
];

export default function EnhancedWorkoutPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedMuscles, setSelectedMuscles] = useState<string[]>([]);
  const [availableExercises, setAvailableExercises] = useState<Exercise[]>([]);
  const [workoutExercises, setWorkoutExercises] = useState<WorkoutExercise[]>([]);
  const [workoutNotes, setWorkoutNotes] = useState("");
  const [showExerciseModal, setShowExerciseModal] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
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
    setShowExerciseModal(false);
  };

  const openExerciseTracker = (exercise: Exercise) => {
    setSelectedExercise(exercise);
    setShowExerciseModal(true);
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
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-cyan-400 rounded-full opacity-20"
            animate={{
              x: [0, 100, 0],
              y: [0, -100, 0],
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + i * 10}%`,
            }}
          />
        ))}
      </div>

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

        {/* Progress Steps */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-4">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                    currentStep >= step
                      ? "bg-cyan-500 border-cyan-500 text-white"
                      : "border-gray-600 text-gray-400"
                  }`}
                >
                  {step}
                </div>
                {step < 3 && (
                  <div
                    className={`w-16 h-1 mx-2 ${
                      currentStep > step ? "bg-cyan-500" : "bg-gray-600"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step 1: Muscle Group Selection */}
        {currentStep === 1 && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="max-w-4xl mx-auto"
          >
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">Select Target Muscle Groups</h2>
              <p className="text-gray-400">Choose the muscles you want to work today</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
              {muscleGroups.map((muscle) => (
                <motion.div
                  key={muscle.name}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleMuscleToggle(muscle.name)}
                  className={`p-6 rounded-xl cursor-pointer transition-all duration-300 ${
                    selectedMuscles.includes(muscle.name)
                      ? `bg-gradient-to-r ${muscle.color} shadow-lg shadow-cyan-500/25`
                      : "bg-slate-800/50 border border-slate-700 hover:border-slate-600"
                  }`}
                >
                  <div className="text-center">
                    <div className="text-3xl mb-2">{muscle.emoji}</div>
                    <h3 className="font-semibold mb-1">{muscle.name}</h3>
                    <p className="text-sm text-gray-400">{muscle.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {selectedMuscles.length > 0 && (
              <div className="text-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentStep(2)}
                  className="bg-gradient-to-r from-cyan-500 to-purple-500 px-8 py-3 rounded-lg font-semibold flex items-center gap-2 mx-auto"
                >
                  Continue to Exercises <ArrowRight className="w-4 h-4" />
                </motion.button>
              </div>
            )}
          </motion.div>
        )}

        {/* Step 2: Exercise Selection */}
        {currentStep === 2 && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="max-w-6xl mx-auto"
          >
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-2xl font-bold mb-2">Choose Your Exercises</h2>
                <p className="text-gray-400">
                  Selected muscles: {selectedMuscles.join(", ")}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowAddMuscleModal(true)}
                  className="bg-slate-800 px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-slate-700"
                >
                  <Plus className="w-4 h-4" /> Add Muscle
                </button>
                <button
                  onClick={() => setCurrentStep(1)}
                  className="bg-slate-800 px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-slate-700"
                >
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {availableExercises.map((exercise) => (
                <motion.div
                  key={exercise.id}
                  whileHover={{ scale: 1.02 }}
                  className="bg-slate-800/50 border border-slate-700 rounded-xl overflow-hidden"
                >
                  {exercise.imageUrl && (
                    <div className="h-48 bg-gray-700 relative">
                      <img
                        src={exercise.imageUrl}
                        alt={exercise.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 right-2">
                        <span className={`px-2 py-1 rounded text-xs ${
                          exercise.difficulty === "Beginner" ? "bg-green-500" :
                          exercise.difficulty === "Intermediate" ? "bg-yellow-500" :
                          "bg-red-500"
                        }`}>
                          {exercise.difficulty}
                        </span>
                      </div>
                    </div>
                  )}
                  
                  <div className="p-4">
                    <h3 className="font-semibold mb-2">{exercise.name}</h3>
                    <p className="text-sm text-gray-400 mb-3">{exercise.description}</p>
                    
                    <div className="flex items-center gap-4 mb-3 text-sm">
                      <div className="flex items-center gap-1">
                        <Target className="w-4 h-4 text-cyan-400" />
                        <span>{exercise.recommendedSets || 3} sets</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Zap className="w-4 h-4 text-purple-400" />
                        <span>{exercise.recommendedReps || "8-12"} reps</span>
                      </div>
                    </div>

                    {exercise.equipment && (
                      <div className="flex items-center gap-1 mb-3 text-sm text-gray-400">
                        <Settings className="w-4 h-4" />
                        <span>{exercise.equipment}</span>
                      </div>
                    )}

                    <button
                      onClick={() => addExerciseToWorkout(exercise)}
                      className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 py-2 rounded-lg font-semibold flex items-center justify-center gap-2"
                    >
                      <Plus className="w-4 h-4" /> Add to Workout
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            {workoutExercises.length > 0 && (
              <div className="text-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentStep(3)}
                  className="bg-gradient-to-r from-cyan-500 to-purple-500 px-8 py-3 rounded-lg font-semibold flex items-center gap-2 mx-auto"
                >
                  Start Workout ({workoutExercises.length} exercises) <ArrowRight className="w-4 h-4" />
                </motion.button>
              </div>
            )}
          </motion.div>
        )}

        {/* Step 3: Workout Tracking */}
        {currentStep === 3 && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="max-w-4xl mx-auto"
          >
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-2xl font-bold mb-2">Track Your Workout</h2>
                <p className="text-gray-400">Log your sets, reps, and weights</p>
              </div>
              <button
                onClick={() => setCurrentStep(2)}
                className="bg-slate-800 px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-slate-700"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
            </div>

            <div className="space-y-6 mb-8">
              {workoutExercises.map((workoutExercise, index) => (
                <div key={workoutExercise.exerciseId} className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-semibold mb-1">{workoutExercise.exercise.name}</h3>
                      <p className="text-gray-400 text-sm mb-2">{workoutExercise.exercise.description}</p>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="text-cyan-400">Target: {workoutExercise.targetSets} × {workoutExercise.targetReps}</span>
                        <span className="text-purple-400">{workoutExercise.exercise.equipment}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => removeExerciseFromWorkout(workoutExercise.exerciseId)}
                      className="text-red-400 hover:text-red-300"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-4">
                    {workoutExercise.sets.map((set, setIndex) => (
                      <div key={setIndex} className="bg-slate-700/50 p-3 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium">Set {setIndex + 1}</span>
                          <button
                            onClick={() => {
                              const newSets = [...workoutExercise.sets];
                              newSets[setIndex].completed = !newSets[setIndex].completed;
                              updateWorkoutExercise(workoutExercise.exerciseId, { sets: newSets });
                            }}
                            className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                              set.completed ? "bg-green-500 border-green-500" : "border-gray-400"
                            }`}
                          >
                            {set.completed && <Check className="w-3 h-3 text-white" />}
                          </button>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <input
                            type="number"
                            placeholder="Reps"
                            value={set.reps || ""}
                            onChange={(e) => {
                              const newSets = [...workoutExercise.sets];
                              newSets[setIndex].reps = parseInt(e.target.value) || 0;
                              updateWorkoutExercise(workoutExercise.exerciseId, { sets: newSets });
                            }}
                            className="bg-slate-600 px-2 py-1 rounded text-sm"
                          />
                          <input
                            type="number"
                            placeholder="Weight"
                            value={set.weight || ""}
                            onChange={(e) => {
                              const newSets = [...workoutExercise.sets];
                              newSets[setIndex].weight = parseFloat(e.target.value) || 0;
                              updateWorkoutExercise(workoutExercise.exerciseId, { sets: newSets });
                            }}
                            className="bg-slate-600 px-2 py-1 rounded text-sm"
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <textarea
                    placeholder="Exercise notes..."
                    value={workoutExercise.notes}
                    onChange={(e) => updateWorkoutExercise(workoutExercise.exerciseId, { notes: e.target.value })}
                    className="w-full bg-slate-700/50 p-3 rounded-lg text-sm resize-none"
                    rows={2}
                  />
                </div>
              ))}
            </div>

            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 mb-8">
              <h3 className="text-lg font-semibold mb-3">Workout Notes</h3>
              <textarea
                placeholder="How did the workout feel? Any observations..."
                value={workoutNotes}
                onChange={(e) => setWorkoutNotes(e.target.value)}
                className="w-full bg-slate-700/50 p-3 rounded-lg resize-none"
                rows={3}
              />
            </div>

            <div className="text-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={saveWorkout}
                className="bg-gradient-to-r from-green-500 to-emerald-500 px-8 py-3 rounded-lg font-semibold flex items-center gap-2 mx-auto"
              >
                <Save className="w-4 h-4" /> Save Workout
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* Add Muscle Modal */}
        <AnimatePresence>
          {showAddMuscleModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
              onClick={() => setShowAddMuscleModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-slate-800 rounded-xl p-6 max-w-md w-full"
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">Add More Muscle Groups</h3>
                  <button
                    onClick={() => setShowAddMuscleModal(false)}
                    className="text-gray-400 hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {muscleGroups
                    .filter(muscle => !selectedMuscles.includes(muscle.name))
                    .map((muscle) => (
                      <button
                        key={muscle.name}
                        onClick={() => {
                          handleMuscleToggle(muscle.name);
                          setShowAddMuscleModal(false);
                        }}
                        className="p-3 bg-slate-700 rounded-lg hover:bg-slate-600 text-center"
                      >
                        <div className="text-xl mb-1">{muscle.emoji}</div>
                        <div className="text-sm font-medium">{muscle.name}</div>
                      </button>
                    ))}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
