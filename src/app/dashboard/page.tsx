"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { authClient, User } from "@/lib/client-auth";
import { motion } from "framer-motion";
import {
  Activity,
  Calendar,
  Target,
  TrendingUp,
  Users,
  Dumbbell,
  Clock,
  Award,
  BarChart3,
  Plus,
  ArrowRight,
  Zap,
  Heart,
  Timer,
} from "lucide-react";

export default function DashboardPage() {
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
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  if (loading) {
    return (
      <div className="animated-bg">
        <div className="animated-bg-overlay"></div>
        <div className="floating-particles">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="particle"
              style={{
                left: `${15 + i * 10}%`,
                top: `${20 + (i % 3) * 20}%`,
              }}
              animate={{
                y: [0, -100, 0],
                opacity: [0.1, 0.6, 0.1],
              }}
              transition={{
                duration: 3 + i * 0.3,
                repeat: Infinity,
                delay: i * 0.4,
              }}
            />
          ))}
        </div>
        <div className="animated-bg-content flex min-h-screen items-center justify-center">
          <motion.div
            className="flex flex-col items-center space-y-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-cyan-400"></div>
            <p className="text-lg text-white/80">Loading your dashboard...</p>
          </motion.div>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="animated-bg">
      <div className="animated-bg-overlay"></div>

      {/* Floating Particles */}
      <div className="floating-particles">
        {[
          { left: 15, top: 20 },
          { left: 85, top: 30 },
          { left: 25, top: 60 },
          { left: 70, top: 15 },
          { left: 45, top: 80 },
          { left: 90, top: 70 },
          { left: 10, top: 45 },
          { left: 60, top: 90 },
        ].map((position, i) => (
          <motion.div
            key={i}
            className="particle"
            style={{
              left: `${position.left}%`,
              top: `${position.top}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0.1, 0.6, 0.1],
            }}
            transition={{
              duration: 3 + i * 0.3,
              repeat: Infinity,
              delay: i * 0.4,
            }}
          />
        ))}
      </div>

      <div className="animated-bg-content">
        {/* Hero Section */}
        <motion.div
          className="relative overflow-hidden pb-12 pt-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <motion.div
                className="mb-6"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              >
                <div className="mb-4 inline-flex h-20 w-20 items-center justify-center rounded-full border border-white/20 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 backdrop-blur-lg">
                  <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-3xl font-bold text-transparent">
                    {user.firstName.charAt(0)}
                    {user.lastName.charAt(0)}
                  </span>
                </div>
              </motion.div>

              <motion.h1
                className="mb-4 text-4xl font-bold text-white sm:text-5xl lg:text-6xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                Welcome back,{" "}
                <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  {user.firstName}
                </span>
                !
              </motion.h1>

              <motion.p
                className="mb-8 text-xl capitalize text-white/80"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.8 }}
              >
                {user.role.toLowerCase()} Dashboard • Ready to crush your goals?
              </motion.p>

              <motion.div
                className="flex flex-col justify-center gap-4 sm:flex-row"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.8 }}
              >
                <motion.button
                  className="inline-flex items-center rounded-xl border border-white/20 bg-gradient-to-r from-cyan-500 to-purple-600 px-6 py-3 font-semibold text-white shadow-lg backdrop-blur-sm transition-all duration-200 hover:scale-105 hover:shadow-cyan-500/25"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => router.push("/workout")}
                >
                  <Plus className="mr-2 h-5 w-5" />
                  Start Workout
                </motion.button>
                <motion.button
                  className="inline-flex items-center rounded-xl border border-white/20 bg-white/10 px-6 py-3 font-semibold text-white backdrop-blur-sm transition-all duration-200 hover:bg-white/20"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <BarChart3 className="mr-2 h-5 w-5" />
                  View Progress
                </motion.button>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Main Content */}
        <motion.main
          className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.8 }}
        >
          {/* Stats Cards */}
          <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
            {[
              {
                title: "Workouts",
                value: "0",
                subtitle: "Start your journey",
                icon: Dumbbell,
                gradient: "from-cyan-500 to-blue-600",
                iconBg: "from-cyan-500/20 to-blue-500/20",
              },
              {
                title: "Streak",
                value: "0",
                subtitle: "days active",
                icon: Award,
                gradient: "from-orange-500 to-red-500",
                iconBg: "from-orange-500/20 to-red-500/20",
              },
              {
                title: "Calories",
                value: "0",
                subtitle: "burned today",
                icon: Activity,
                gradient: "from-purple-500 to-pink-500",
                iconBg: "from-purple-500/20 to-pink-500/20",
              },
              {
                title: "Time",
                value: "0",
                subtitle: "minutes active",
                icon: Timer,
                gradient: "from-emerald-500 to-teal-500",
                iconBg: "from-emerald-500/20 to-teal-500/20",
              },
            ].map((stat, index) => (
              <motion.div
                key={stat.title}
                className="group rounded-2xl border border-white/20 bg-white/10 p-6 shadow-xl backdrop-blur-lg transition-all duration-300 hover:scale-105 hover:bg-white/15"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.3 + index * 0.1, duration: 0.6 }}
                whileHover={{ y: -5 }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-white/70">
                      {stat.title}
                    </p>
                    <p className="text-3xl font-bold text-white">
                      {stat.value}
                    </p>
                    <p className="mt-1 flex items-center text-sm text-white/60">
                      <TrendingUp className="mr-1 h-4 w-4" />
                      {stat.subtitle}
                    </p>
                  </div>
                  <div
                    className={`rounded-xl bg-gradient-to-r ${stat.iconBg} border border-white/10 p-3 backdrop-blur-sm transition-transform duration-300 group-hover:scale-110`}
                  >
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Action Cards */}
          <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Quick Actions */}
            <motion.div
              className="rounded-2xl border border-white/20 bg-white/10 p-6 shadow-xl backdrop-blur-lg"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.7, duration: 0.6 }}
            >
              <h3 className="mb-4 flex items-center text-lg font-bold text-white">
                <Zap className="mr-2 h-5 w-5 text-cyan-400" />
                Quick Actions
              </h3>
              <div className="space-y-3">
                <motion.button
                  className="flex w-full items-center rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 p-4 text-white transition-all duration-200 hover:shadow-lg hover:shadow-cyan-500/25"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => router.push("/workout")}
                >
                  <Plus className="mr-3 h-5 w-5" />
                  <div className="text-left">
                    <p className="font-semibold">Start New Workout</p>
                    <p className="text-sm text-white/80">
                      Begin your fitness journey
                    </p>
                  </div>
                  <ArrowRight className="ml-auto h-5 w-5" />
                </motion.button>
                <motion.button
                  className="flex w-full items-center rounded-xl border border-white/20 bg-white/10 p-4 text-white transition-all duration-200 hover:bg-white/15"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Calendar className="mr-3 h-5 w-5 text-white/70" />
                  <div className="text-left">
                    <p className="font-semibold">Schedule Workout</p>
                    <p className="text-sm text-white/70">
                      Plan your next session
                    </p>
                  </div>
                  <ArrowRight className="ml-auto h-5 w-5" />
                </motion.button>
                <motion.button
                  className="flex w-full items-center rounded-xl border border-white/20 bg-white/10 p-4 text-white transition-all duration-200 hover:bg-white/15"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Target className="mr-3 h-5 w-5 text-white/70" />
                  <div className="text-left">
                    <p className="font-semibold">Set Goals</p>
                    <p className="text-sm text-white/70">
                      Define your fitness targets
                    </p>
                  </div>
                  <ArrowRight className="ml-auto h-5 w-5" />
                </motion.button>
              </div>
            </motion.div>

            {/* Progress Overview */}
            <motion.div
              className="rounded-2xl border border-white/20 bg-white/10 p-6 shadow-xl backdrop-blur-lg"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.9, duration: 0.6 }}
            >
              <h3 className="mb-4 flex items-center text-lg font-bold text-white">
                <BarChart3 className="mr-2 h-5 w-5 text-cyan-400" />
                Today's Progress
              </h3>
              <div className="space-y-4">
                {[
                  {
                    label: "Workouts",
                    progress: 0,
                    max: 1,
                    color: "from-cyan-500 to-purple-600",
                  },
                  {
                    label: "Steps",
                    progress: 0,
                    max: "10k",
                    color: "from-blue-500 to-cyan-500",
                  },
                  {
                    label: "Sets",
                    progress: 0,
                    max: 5,
                    color: "from-purple-500 to-pink-500",
                  },
                  {
                    label: "Calories",
                    progress: 0,
                    max: "2k",
                    color: "from-orange-500 to-red-500",
                  },
                  {
                    label: "Active Time",
                    progress: 0,
                    max: "5h",
                    color: "from-emerald-500 to-teal-500",
                  },
                ].map((item, index) => (
                  <div
                    key={item.label}
                    className="flex items-center justify-between"
                  >
                    <span className="text-sm text-white/70">{item.label}</span>
                    <div className="flex items-center">
                      <div className="mr-2 h-2 w-16 rounded-full bg-white/20">
                        <motion.div
                          className={`h-2 rounded-full bg-gradient-to-r ${item.color}`}
                          initial={{ width: "0%" }}
                          animate={{ width: "0%" }}
                          transition={{
                            delay: 2.1 + index * 0.1,
                            duration: 0.8,
                          }}
                        />
                      </div>
                      <span className="text-sm font-semibold text-white">
                        {item.progress}/{item.max}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Achievements */}
          <motion.div
            className="mb-8 rounded-2xl border border-white/20 bg-white/10 p-6 shadow-xl backdrop-blur-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.7, duration: 0.6 }}
          >
            <h3 className="mb-4 flex items-center text-lg font-bold text-white">
              <Award className="mr-2 h-5 w-5 text-cyan-400" />
              Achievements
            </h3>
            <div className="py-8 text-center">
              <motion.div
                className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10"
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 3,
                }}
              >
                <Award className="h-6 w-6 text-white/60" />
              </motion.div>
              <p className="text-sm text-white/70">
                Complete workouts to unlock achievements!
              </p>
            </div>
          </motion.div>
        </motion.main>

        {/* Bottom Spacing */}
        <div className="h-8"></div>
      </div>
    </div>
  );
}
