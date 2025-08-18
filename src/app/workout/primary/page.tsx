"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Target, ChevronRight } from "lucide-react";
import { authClient, User } from "@/lib/client-auth";
import { AnimatedBackground } from "@/components/workout/AnimatedBackground";
import { ProgressSteps } from "@/components/workout/ProgressSteps";

const muscleGroupEmojis: { [key: string]: string } = {
  Chest: "💪",
  Back: "🔥",
  Shoulders: "🏔️",
  Arms: "💥",
  Legs: "🦵",
  Core: "⚡",
  Glutes: "🍑",
  Biceps: "💪",
  Triceps: "🔥",
  Forearms: "✊",
  Calves: "🦵",
  Hamstrings: "🏃",
  Quadriceps: "🏋️",
  Lats: "🪶",
  Traps: "🏔️",
  Delts: "🌟",
};

export default function WorkoutPrimaryPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedMuscles, setSelectedMuscles] = useState<string[]>([]);
  const [primaryMuscle, setPrimaryMuscle] = useState<string>("");
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

    // Get selected muscles from URL params
    const muscles = searchParams.get("muscles");
    if (muscles) {
      setSelectedMuscles(decodeURIComponent(muscles).split(","));
    } else {
      // If no muscles selected, redirect back
      router.push("/workout/muscles");
    }
  }, [router, searchParams]);

  const handleContinue = () => {
    if (primaryMuscle && selectedMuscles.length > 0) {
      const muscleParams = selectedMuscles.join(",");
      router.push(
        `/workout/exercises?muscles=${encodeURIComponent(muscleParams)}&primary=${encodeURIComponent(primaryMuscle)}`
      );
    }
  };

  if (loading) {
    return (
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <AnimatedBackground />
        <div className="relative z-10 text-white">Loading...</div>
      </div>
    );
  }

  if (!user || selectedMuscles.length === 0) {
    return null;
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <AnimatedBackground />

      <div className="relative z-10 flex min-h-screen flex-col">
        {/* Header - Mobile Optimized */}
        <div className="mx-auto w-full max-w-4xl">
          <div className="flex items-center justify-between border-b border-white/10 p-4 lg:px-8">
          <button
            onClick={() =>
              router.push(
                `/workout/muscles?muscles=${encodeURIComponent(selectedMuscles.join(","))}`
              )
            }
            className="flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-2 text-white/70 backdrop-blur-sm transition-all duration-200 hover:bg-white/15 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Back</span>
          </button>
          <div className="text-center">
            <h1 className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-xl font-bold text-transparent sm:text-2xl">
              Primary Focus
            </h1>
            <p className="mt-1 text-sm text-white/60">
              Which muscle hits first?
            </p>
          </div>
            <div className="w-16"></div> {/* Spacer for center alignment */}
          </div>
        </div>

        {/* Progress Steps */}
        <div className="mx-auto w-full max-w-4xl px-4 py-4 lg:px-8">
          <ProgressSteps currentStep={2} />
        </div>

        {/* Main Content */}
        <div className="mx-auto flex-1 w-full max-w-4xl px-4 pb-4 lg:px-8">
          {/* Instruction Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm"
          >
            <div className="mb-2 flex items-center gap-3">
              <Target className="h-5 w-5 text-cyan-400" />
              <h2 className="text-lg font-semibold text-white">
                Choose Your Primary Focus
              </h2>
            </div>
            <p className="text-sm leading-relaxed text-white/70">
              You selected multiple muscle groups. Which one do you want to
              prioritize? Your workout will be tailored around this primary
              muscle group.
            </p>
          </motion.div>

          {/* Selected Muscles Display */}
          <div className="mb-4">
            <p className="mb-3 text-sm text-white/60">Your selected muscles:</p>
            <div className="flex flex-wrap gap-2">
              {selectedMuscles.map((muscle, index) => (
                <motion.div
                  key={muscle}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-sm text-white/80"
                >
                  <span>{muscleGroupEmojis[muscle] || "💪"}</span>
                  <span>{muscle}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Primary Muscle Selection */}
          <div className="mb-8 space-y-3">
            {selectedMuscles.map((muscle, index) => (
              <motion.button
                key={muscle}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                onClick={() => setPrimaryMuscle(muscle)}
                className={`group flex w-full items-center justify-between rounded-2xl border p-4 transition-all duration-200 ${
                  primaryMuscle === muscle
                    ? "border-cyan-400/50 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 shadow-lg shadow-cyan-500/10"
                    : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-xl text-2xl transition-all duration-200 ${
                      primaryMuscle === muscle
                        ? "bg-gradient-to-r from-cyan-500 to-purple-500 shadow-lg"
                        : "bg-white/10 group-hover:bg-white/15"
                    }`}
                  >
                    {muscleGroupEmojis[muscle] || "💪"}
                  </div>
                  <div className="text-left">
                    <h3 className="text-lg font-semibold text-white">
                      {muscle}
                    </h3>
                    <p className="text-sm text-white/60">
                      Primary focus muscle
                    </p>
                  </div>
                </div>

                <div
                  className={`transition-all duration-200 ${
                    primaryMuscle === muscle
                      ? "text-cyan-400"
                      : "text-white/40 group-hover:text-white/60"
                  }`}
                >
                  <ChevronRight className="h-5 w-5" />
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Continue Button - Fixed at Bottom */}
        <div className="border-t border-white/10 bg-slate-900/80 backdrop-blur-sm">
          <div className="mx-auto w-full max-w-4xl p-4 lg:px-8">
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            onClick={handleContinue}
            disabled={!primaryMuscle}
            className={`flex w-full items-center justify-center gap-3 rounded-2xl py-4 text-lg font-semibold transition-all duration-200 ${
              primaryMuscle
                ? "bg-gradient-to-r from-cyan-500 to-purple-500 text-white shadow-lg shadow-cyan-500/25 hover:scale-[1.02] hover:shadow-cyan-500/40 active:scale-[0.98]"
                : "cursor-not-allowed bg-white/10 text-white/40"
            }`}
          >
            <span>Continue to Exercises</span>
            <ChevronRight className="h-5 w-5" />
          </motion.button>

          {primaryMuscle && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-3 text-center text-sm text-white/60"
            >
              Focusing on{" "}
              <span className="font-semibold text-cyan-400">
                {primaryMuscle}
              </span>{" "}
              first
            </motion.p>
          )}
          </div>
        </div>
      </div>
    </div>
  );
}
