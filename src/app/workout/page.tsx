"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Play, Dumbbell, Target, Clock } from "lucide-react";
import { authClient, User } from "@/lib/client-auth";
import { AnimatedBackground } from "@/components/workout/AnimatedBackground";

export default function WorkoutPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
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

  if (loading) {
    return (
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <AnimatedBackground />
        <div className="relative z-10 text-white">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <AnimatedBackground />

      <div className="container relative z-10 mx-auto px-4 py-8">
        <div className="mb-12 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-5xl font-bold text-transparent"
          >
            Ready to Train?
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8 text-xl text-gray-400"
          >
            Welcome back, {user.firstName}! Let's build your perfect workout.
          </motion.p>
        </div>

        {/* Workout Flow Steps Preview */}
        <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-xl border border-slate-700 bg-slate-800/50 p-6 text-center backdrop-blur-sm"
          >
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-cyan-600">
              <Target className="h-8 w-8 text-white" />
            </div>
            <h3 className="mb-2 text-xl font-bold text-white">
              1. Select Muscles
            </h3>
            <p className="text-gray-400">
              Choose the muscle groups you want to target
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="rounded-xl border border-slate-700 bg-slate-800/50 p-6 text-center backdrop-blur-sm"
          >
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-purple-600">
              <Dumbbell className="h-8 w-8 text-white" />
            </div>
            <h3 className="mb-2 text-xl font-bold text-white">
              2. Pick Exercises
            </h3>
            <p className="text-gray-400">
              Browse and select exercises for your workout
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="rounded-xl border border-slate-700 bg-slate-800/50 p-6 text-center backdrop-blur-sm"
          >
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-green-500 to-green-600">
              <Clock className="h-8 w-8 text-white" />
            </div>
            <h3 className="mb-2 text-xl font-bold text-white">
              3. Track Progress
            </h3>
            <p className="text-gray-400">Log your sets, reps, and weights</p>
          </motion.div>
        </div>

        {/* Start Workout Button */}
        <div className="text-center">
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push("/workout/muscles")}
            className="inline-flex items-center gap-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-500 px-8 py-4 text-lg font-bold text-white shadow-lg shadow-cyan-500/25 transition-all duration-200 hover:from-cyan-600 hover:to-purple-600"
          >
            <Play className="h-6 w-6" />
            Start New Workout
          </motion.button>
        </div>

        {/* Quick Stats or Recent Workouts could go here */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-12 rounded-xl border border-slate-700 bg-slate-800/30 p-6 backdrop-blur-sm"
        >
          <h3 className="mb-4 text-xl font-bold text-white">Workout Tips</h3>
          <div className="grid grid-cols-1 gap-4 text-gray-400 md:grid-cols-2">
            <div>
              <p className="mb-2">
                • <span className="text-cyan-400">Progressive Overload:</span>{" "}
                Gradually increase weight or reps
              </p>
              <p className="mb-2">
                • <span className="text-purple-400">Form First:</span> Quality
                over quantity always
              </p>
            </div>
            <div>
              <p className="mb-2">
                • <span className="text-green-400">Rest Periods:</span> 2-3
                minutes between sets
              </p>
              <p className="mb-2">
                • <span className="text-yellow-400">Track Everything:</span> Log
                weights and reps consistently
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
