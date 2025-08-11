"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { authClient, User } from "@/lib/client-auth";
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
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <div className="text-center">
            <div className="mb-6">
              <div className="mb-4 inline-flex h-20 w-20 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                <span className="text-3xl font-bold text-white">
                  {user.firstName.charAt(0)}
                  {user.lastName.charAt(0)}
                </span>
              </div>
            </div>
            <h1 className="mb-4 text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
              Welcome back,{" "}
              <span className="text-yellow-300">{user.firstName}</span>!
            </h1>
            <p className="mb-8 text-xl capitalize text-white/90">
              {user.role.toLowerCase()} Dashboard • Ready to crush your goals?
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <button className="inline-flex transform items-center rounded-xl bg-white px-6 py-3 font-semibold text-indigo-600 shadow-lg transition-all duration-200 hover:scale-105 hover:bg-gray-50">
                <Plus className="mr-2 h-5 w-5" />
                Start Workout
              </button>
              <button className="inline-flex items-center rounded-xl border border-white/30 bg-white/20 px-6 py-3 font-semibold text-white backdrop-blur-sm transition-all duration-200 hover:bg-white/30">
                <BarChart3 className="mr-2 h-5 w-5" />
                View Progress
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="relative z-10 mx-auto -mt-8 max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Stats Cards */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
          <div className="transform rounded-2xl border border-white/50 bg-white/80 p-6 shadow-xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Workouts</p>
                <p className="text-3xl font-bold text-gray-900">0</p>
                <p className="mt-1 flex items-center text-sm text-gray-500">
                  <TrendingUp className="mr-1 h-4 w-4" />
                  Start your journey
                </p>
              </div>
              <div className="rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 p-3">
                <Dumbbell className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>

          <div className="transform rounded-2xl border border-white/50 bg-white/80 p-6 shadow-xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Streak</p>
                <p className="text-3xl font-bold text-gray-900">0</p>
                <p className="mt-1 flex items-center text-sm text-gray-500">
                  <Zap className="mr-1 h-4 w-4" />
                  days active
                </p>
              </div>
              <div className="rounded-xl bg-gradient-to-r from-orange-500 to-red-500 p-3">
                <Award className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>

          <div className="transform rounded-2xl border border-white/50 bg-white/80 p-6 shadow-xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Calories</p>
                <p className="text-3xl font-bold text-gray-900">0</p>
                <p className="mt-1 flex items-center text-sm text-gray-500">
                  <Heart className="mr-1 h-4 w-4" />
                  burned today
                </p>
              </div>
              <div className="rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 p-3">
                <Activity className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>

          <div className="transform rounded-2xl border border-white/50 bg-white/80 p-6 shadow-xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Time</p>
                <p className="text-3xl font-bold text-gray-900">0m</p>
                <p className="mt-1 flex items-center text-sm text-gray-500">
                  <Timer className="mr-1 h-4 w-4" />
                  avg session
                </p>
              </div>
              <div className="rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 p-3">
                <Clock className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-3">
          {/* Left Column */}
          <div className="space-y-6 sm:space-y-8 lg:col-span-2">
            {/* Quick Actions */}
            <div className="rounded-2xl border border-white/50 bg-white/80 p-6 shadow-xl backdrop-blur-sm sm:p-8">
              <h2 className="mb-6 flex items-center text-2xl font-bold text-gray-900">
                <Target className="mr-3 h-6 w-6 text-indigo-600" />
                Quick Actions
              </h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <button className="group transform rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 p-6 text-white transition-all duration-300 hover:scale-105 hover:shadow-lg">
                  <div className="mb-3 flex items-center justify-between">
                    <Dumbbell className="h-8 w-8" />
                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </div>
                  <h3 className="text-lg font-semibold">Start Workout</h3>
                  <p className="text-sm text-white/80">
                    Begin your training session
                  </p>
                </button>

                <button className="group transform rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 p-6 text-white transition-all duration-300 hover:scale-105 hover:shadow-lg">
                  <div className="mb-3 flex items-center justify-between">
                    <BarChart3 className="h-8 w-8" />
                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </div>
                  <h3 className="text-lg font-semibold">Track Progress</h3>
                  <p className="text-sm text-white/80">
                    View your achievements
                  </p>
                </button>

                <button className="group transform rounded-xl bg-gradient-to-r from-orange-500 to-red-500 p-6 text-white transition-all duration-300 hover:scale-105 hover:shadow-lg">
                  <div className="mb-3 flex items-center justify-between">
                    <Calendar className="h-8 w-8" />
                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </div>
                  <h3 className="text-lg font-semibold">Schedule</h3>
                  <p className="text-sm text-white/80">Plan your workouts</p>
                </button>

                {user.role === "TRAINER" && (
                  <button className="group transform rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 p-6 text-white transition-all duration-300 hover:scale-105 hover:shadow-lg">
                    <div className="mb-3 flex items-center justify-between">
                      <Users className="h-8 w-8" />
                      <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </div>
                    <h3 className="text-lg font-semibold">Manage Clients</h3>
                    <p className="text-sm text-white/80">
                      View client progress
                    </p>
                  </button>
                )}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="rounded-2xl border border-white/50 bg-white/80 p-6 shadow-xl backdrop-blur-sm sm:p-8">
              <h2 className="mb-6 flex items-center text-2xl font-bold text-gray-900">
                <Activity className="mr-3 h-6 w-6 text-indigo-600" />
                Recent Activity
              </h2>
              <div className="py-12 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                  <Activity className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-gray-900">
                  No activity yet
                </h3>
                <p className="mb-6 text-gray-600">
                  Start your fitness journey by completing your first workout!
                </p>
                <button className="inline-flex transform items-center rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-3 font-semibold text-white transition-all duration-200 hover:scale-105 hover:shadow-lg">
                  <Plus className="mr-2 h-5 w-5" />
                  Start Your First Workout
                </button>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6 sm:space-y-8">
            {/* Profile Card */}
            <div className="rounded-2xl border border-white/50 bg-white/80 p-6 shadow-xl backdrop-blur-sm">
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 to-purple-600">
                  <span className="text-2xl font-bold text-white">
                    {user.firstName.charAt(0)}
                    {user.lastName.charAt(0)}
                  </span>
                </div>
                <h3 className="mb-1 text-xl font-bold text-gray-900">
                  {user.firstName} {user.lastName}
                </h3>
                <p className="mb-3 text-gray-600">{user.email}</p>
                <span className="inline-flex items-center rounded-full bg-gradient-to-r from-indigo-100 to-purple-100 px-3 py-1 text-sm font-medium capitalize text-indigo-800">
                  {user.role.toLowerCase()}
                </span>
              </div>
            </div>

            {/* This Week */}
            <div className="rounded-2xl border border-white/50 bg-white/80 p-6 shadow-xl backdrop-blur-sm">
              <h3 className="mb-4 flex items-center text-lg font-bold text-gray-900">
                <Calendar className="mr-2 h-5 w-5 text-indigo-600" />
                This Week
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Workouts</span>
                  <div className="flex items-center">
                    <div className="mr-2 h-2 w-16 rounded-full bg-gray-200">
                      <div
                        className="h-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600"
                        style={{ width: "0%" }}
                      ></div>
                    </div>
                    <span className="text-sm font-semibold">0/5</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Calories</span>
                  <div className="flex items-center">
                    <div className="mr-2 h-2 w-16 rounded-full bg-gray-200">
                      <div
                        className="h-2 rounded-full bg-gradient-to-r from-orange-500 to-red-500"
                        style={{ width: "0%" }}
                      ></div>
                    </div>
                    <span className="text-sm font-semibold">0/2k</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Active Time</span>
                  <div className="flex items-center">
                    <div className="mr-2 h-2 w-16 rounded-full bg-gray-200">
                      <div
                        className="h-2 rounded-full bg-gradient-to-r from-green-500 to-teal-500"
                        style={{ width: "0%" }}
                      ></div>
                    </div>
                    <span className="text-sm font-semibold">0h/5h</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Achievements */}
            <div className="rounded-2xl border border-white/50 bg-white/80 p-6 shadow-xl backdrop-blur-sm">
              <h3 className="mb-4 flex items-center text-lg font-bold text-gray-900">
                <Award className="mr-2 h-5 w-5 text-indigo-600" />
                Achievements
              </h3>
              <div className="py-8 text-center">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                  <Award className="h-6 w-6 text-gray-400" />
                </div>
                <p className="text-sm text-gray-600">
                  Complete workouts to unlock achievements!
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Bottom Spacing */}
      <div className="h-8"></div>
    </div>
  );
}
