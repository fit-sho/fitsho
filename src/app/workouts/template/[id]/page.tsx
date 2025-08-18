"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Play,
  Clock,
  Target,
  Dumbbell,
  User,
  Star,
  ChevronDown,
  ChevronUp,
  Info,
} from "lucide-react";
import { authClient, User as AuthUser } from "@/lib/client-auth";
import { AnimatedBackground } from "@/components/workout/AnimatedBackground";

interface Exercise {
  id: string;
  name: string;
  description: string;
  steps: string[];
  muscleGroups: string[];
  imageUrl?: string;
  recommendedSets?: number;
  recommendedReps?: string;
  difficulty?: string;
  equipment?: string;
}

interface WorkoutTemplate {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
  trainer: {
    firstName: string;
    lastName: string;
  };
  templateExercises: {
    id: string;
    exercise: Exercise;
    sets: number;
    reps: number;
    orderIndex: number;
  }[];
}

export default function TemplateDetailPage() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [template, setTemplate] = useState<WorkoutTemplate | null>(null);
  const [expandedExercises, setExpandedExercises] = useState<Set<string>>(
    new Set()
  );
  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const currentUser = await authClient.getCurrentUser();
        if (!currentUser) {
          router.push("/login");
          return;
        }
        setUser(currentUser);
        await fetchTemplate();
      } catch (error) {
        console.error("Auth error:", error);
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router, params.id]);

  const fetchTemplate = async () => {
    try {
      const response = await fetch(`/api/workout-templates/${params.id}`);
      if (response.ok) {
        const templateData = await response.json();
        setTemplate(templateData);
      } else {
        console.error("Template not found");
        router.push("/workouts");
      }
    } catch (error) {
      console.error("Error fetching template:", error);
      router.push("/workouts");
    }
  };

  const toggleExerciseExpansion = (exerciseId: string) => {
    setExpandedExercises((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(exerciseId)) {
        newSet.delete(exerciseId);
      } else {
        newSet.add(exerciseId);
      }
      return newSet;
    });
  };

  const getDifficultyColor = (difficulty?: string) => {
    switch (difficulty?.toLowerCase()) {
      case "beginner":
        return "text-green-400 bg-green-400/20";
      case "intermediate":
        return "text-yellow-400 bg-yellow-400/20";
      case "advanced":
        return "text-red-400 bg-red-400/20";
      default:
        return "text-slate-400 bg-slate-400/20";
    }
  };

  const getEquipmentIcon = (equipment?: string) => {
    return <Dumbbell className="h-4 w-4" />;
  };

  if (loading) {
    return (
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <AnimatedBackground />
        <div className="relative z-10 text-white">Loading...</div>
      </div>
    );
  }

  if (!user || !template) {
    return null;
  }

  const totalExercises = template.templateExercises.length;
  const estimatedTime = totalExercises * 3;
  const muscleGroups = Array.from(
    new Set(
      template.templateExercises.flatMap((te) => te.exercise.muscleGroups)
    )
  );

  return (
    <div className="animated-bg">
      <div className="animated-bg-overlay"></div>
      <AnimatedBackground />

      <div className="animated-bg-content container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <button
            onClick={() => router.back()}
            className="mb-6 flex items-center gap-2 text-slate-300 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-5 w-5" />
            Back to Workouts
          </button>

          <div className="rounded-xl border border-slate-700 bg-slate-800/50 p-8 backdrop-blur-sm">
            <div className="flex flex-col gap-6 lg:flex-row">
              <div className="flex-1">
                <div className="mb-4 flex items-center gap-3">
                  <h1 className="text-3xl font-bold text-white">
                    {template.name}
                  </h1>
                  <div className="flex items-center gap-2">
                    <Star className="h-5 w-5 text-yellow-400" />
                    <span className="text-sm text-slate-400">Template</span>
                  </div>
                </div>

                <p className="mb-6 text-lg text-slate-300">
                  {template.description || "No description available"}
                </p>

                <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4">
                  <div className="text-center">
                    <div className="mb-1 flex items-center justify-center gap-2 text-cyan-400">
                      <Dumbbell className="h-5 w-5" />
                    </div>
                    <div className="text-2xl font-bold text-white">
                      {totalExercises}
                    </div>
                    <div className="text-sm text-slate-400">Exercises</div>
                  </div>
                  <div className="text-center">
                    <div className="mb-1 flex items-center justify-center gap-2 text-purple-400">
                      <Clock className="h-5 w-5" />
                    </div>
                    <div className="text-2xl font-bold text-white">
                      ~{estimatedTime}m
                    </div>
                    <div className="text-sm text-slate-400">Duration</div>
                  </div>
                  <div className="text-center">
                    <div className="mb-1 flex items-center justify-center gap-2 text-green-400">
                      <Target className="h-5 w-5" />
                    </div>
                    <div className="text-2xl font-bold text-white">
                      {muscleGroups.length}
                    </div>
                    <div className="text-sm text-slate-400">Muscle Groups</div>
                  </div>
                  <div className="text-center">
                    <div className="mb-1 flex items-center justify-center gap-2 text-orange-400">
                      <User className="h-5 w-5" />
                    </div>
                    <div className="text-lg font-bold text-white">
                      {template.trainer.firstName} {template.trainer.lastName}
                    </div>
                    <div className="text-sm text-slate-400">Trainer</div>
                  </div>
                </div>

                {/* Muscle Groups */}
                <div className="mb-6">
                  <h3 className="mb-3 text-lg font-semibold text-white">
                    Target Muscle Groups
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {muscleGroups.map((muscle) => (
                      <span
                        key={muscle}
                        className="rounded-full border border-cyan-500/30 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 px-3 py-1 text-sm text-cyan-300"
                      >
                        {muscle}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="lg:w-64">
                <button
                  onClick={() =>
                    router.push(`/workout?template=${template.id}`)
                  }
                  className="flex w-full items-center justify-center gap-3 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-500 px-6 py-4 text-lg font-semibold text-white transition-all hover:from-cyan-600 hover:to-purple-600"
                >
                  <Play className="h-6 w-6" />
                  Start Workout
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Exercise List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="mb-6 text-2xl font-bold text-white">
            Exercises ({totalExercises})
          </h2>

          <div className="space-y-4">
            {template.templateExercises
              .sort((a, b) => a.orderIndex - b.orderIndex)
              .map((templateExercise, index) => {
                const isExpanded = expandedExercises.has(
                  templateExercise.exercise.id
                );

                return (
                  <motion.div
                    key={templateExercise.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="overflow-hidden rounded-xl border border-slate-700 bg-slate-800/50 backdrop-blur-sm"
                  >
                    <div
                      className="cursor-pointer p-6 transition-colors hover:bg-slate-700/30"
                      onClick={() =>
                        toggleExerciseExpansion(templateExercise.exercise.id)
                      }
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-r from-cyan-500 to-purple-500 font-bold text-white">
                            {index + 1}
                          </div>

                          <div>
                            <h3 className="mb-1 text-xl font-semibold text-white">
                              {templateExercise.exercise.name}
                            </h3>
                            <p className="mb-2 text-sm text-slate-300">
                              {templateExercise.exercise.description}
                            </p>

                            <div className="flex items-center gap-4 text-sm">
                              <div className="flex items-center gap-1 text-cyan-400">
                                <Target className="h-4 w-4" />
                                <span>
                                  {templateExercise.sets} ×{" "}
                                  {templateExercise.reps}
                                </span>
                              </div>

                              {templateExercise.exercise.difficulty && (
                                <span
                                  className={`rounded-full px-2 py-1 text-xs ${getDifficultyColor(templateExercise.exercise.difficulty)}`}
                                >
                                  {templateExercise.exercise.difficulty}
                                </span>
                              )}

                              {templateExercise.exercise.equipment && (
                                <div className="flex items-center gap-1 text-slate-400">
                                  {getEquipmentIcon(
                                    templateExercise.exercise.equipment
                                  )}
                                  <span>
                                    {templateExercise.exercise.equipment}
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-4">
                          <div className="flex flex-wrap gap-1">
                            {templateExercise.exercise.muscleGroups
                              .slice(0, 2)
                              .map((muscle) => (
                                <span
                                  key={muscle}
                                  className="rounded-full bg-slate-700 px-2 py-1 text-xs text-slate-300"
                                >
                                  {muscle}
                                </span>
                              ))}
                          </div>

                          {isExpanded ? (
                            <ChevronUp className="h-5 w-5 text-slate-400" />
                          ) : (
                            <ChevronDown className="h-5 w-5 text-slate-400" />
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Expanded Content */}
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="border-t border-slate-700"
                      >
                        <div className="bg-slate-900/30 p-6">
                          <div className="grid gap-6 md:grid-cols-2">
                            {/* Exercise Image */}
                            {templateExercise.exercise.imageUrl && (
                              <div className="aspect-video overflow-hidden rounded-lg">
                                <img
                                  src={templateExercise.exercise.imageUrl}
                                  alt={templateExercise.exercise.name}
                                  className="h-full w-full object-cover"
                                />
                              </div>
                            )}

                            {/* Exercise Steps */}
                            <div>
                              <h4 className="mb-3 flex items-center gap-2 text-lg font-semibold text-white">
                                <Info className="h-5 w-5 text-cyan-400" />
                                How to Perform
                              </h4>
                              <ol className="space-y-2">
                                {templateExercise.exercise.steps.map(
                                  (step, stepIndex) => (
                                    <li
                                      key={stepIndex}
                                      className="flex gap-3 text-slate-300"
                                    >
                                      <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-cyan-500/20 text-sm font-medium text-cyan-400">
                                        {stepIndex + 1}
                                      </span>
                                      <span className="text-sm">{step}</span>
                                    </li>
                                  )
                                )}
                              </ol>

                              {/* Recommended Sets/Reps */}
                              {templateExercise.exercise.recommendedSets &&
                                templateExercise.exercise.recommendedReps && (
                                  <div className="mt-4 rounded-lg bg-slate-800/50 p-3">
                                    <h5 className="mb-1 text-sm font-medium text-white">
                                      Recommended
                                    </h5>
                                    <p className="text-sm text-slate-300">
                                      {
                                        templateExercise.exercise
                                          .recommendedSets
                                      }{" "}
                                      sets ×{" "}
                                      {
                                        templateExercise.exercise
                                          .recommendedReps
                                      }{" "}
                                      reps
                                    </p>
                                  </div>
                                )}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                );
              })}
          </div>
        </motion.div>

        {/* Bottom Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-12 text-center"
        >
          <button
            onClick={() => router.push(`/workout?template=${template.id}`)}
            className="mx-auto flex items-center justify-center gap-3 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-500 px-8 py-4 text-lg font-semibold text-white transition-all hover:from-cyan-600 hover:to-purple-600"
          >
            <Play className="h-6 w-6" />
            Start This Workout
          </button>
        </motion.div>
      </div>
    </div>
  );
}
