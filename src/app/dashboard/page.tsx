'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { authClient, User } from '@/lib/client-auth'
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
  Timer
} from 'lucide-react'

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const currentUser = await authClient.getCurrentUser()
        if (!currentUser) {
          router.push('/login')
          return
        }
        setUser(currentUser)
      } catch (error) {
        router.push('/login')
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [router])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="text-center">
            <div className="mb-6">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full mb-4">
                <span className="text-3xl font-bold text-white">
                  {user.firstName.charAt(0)}{user.lastName.charAt(0)}
                </span>
              </div>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
              Welcome back, <span className="text-yellow-300">{user.firstName}</span>!
            </h1>
            <p className="text-xl text-white/90 mb-8 capitalize">
              {user.role.toLowerCase()} Dashboard • Ready to crush your goals?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="inline-flex items-center px-6 py-3 bg-white text-indigo-600 font-semibold rounded-xl hover:bg-gray-50 transition-all duration-200 transform hover:scale-105 shadow-lg">
                <Plus className="w-5 h-5 mr-2" />
                Start Workout
              </button>
              <button className="inline-flex items-center px-6 py-3 bg-white/20 backdrop-blur-sm text-white font-semibold rounded-xl hover:bg-white/30 transition-all duration-200 border border-white/30">
                <BarChart3 className="w-5 h-5 mr-2" />
                View Progress
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Workouts</p>
                <p className="text-3xl font-bold text-gray-900">0</p>
                <p className="text-sm text-gray-500 flex items-center mt-1">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  Start your journey
                </p>
              </div>
              <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-3 rounded-xl">
                <Dumbbell className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Streak</p>
                <p className="text-3xl font-bold text-gray-900">0</p>
                <p className="text-sm text-gray-500 flex items-center mt-1">
                  <Zap className="w-4 h-4 mr-1" />
                  days active
                </p>
              </div>
              <div className="bg-gradient-to-r from-orange-500 to-red-500 p-3 rounded-xl">
                <Award className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Calories</p>
                <p className="text-3xl font-bold text-gray-900">0</p>
                <p className="text-sm text-gray-500 flex items-center mt-1">
                  <Heart className="w-4 h-4 mr-1" />
                  burned today
                </p>
              </div>
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-xl">
                <Activity className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Time</p>
                <p className="text-3xl font-bold text-gray-900">0m</p>
                <p className="text-sm text-gray-500 flex items-center mt-1">
                  <Timer className="w-4 h-4 mr-1" />
                  avg session
                </p>
              </div>
              <div className="bg-gradient-to-r from-teal-500 to-cyan-500 p-3 rounded-xl">
                <Clock className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6 sm:space-y-8">
            {/* Quick Actions */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-xl border border-white/50">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Target className="w-6 h-6 mr-3 text-indigo-600" />
                Quick Actions
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button className="group bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-6 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                  <div className="flex items-center justify-between mb-3">
                    <Dumbbell className="w-8 h-8" />
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </div>
                  <h3 className="font-semibold text-lg">Start Workout</h3>
                  <p className="text-white/80 text-sm">Begin your training session</p>
                </button>

                <button className="group bg-gradient-to-r from-emerald-500 to-teal-600 text-white p-6 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                  <div className="flex items-center justify-between mb-3">
                    <BarChart3 className="w-8 h-8" />
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </div>
                  <h3 className="font-semibold text-lg">Track Progress</h3>
                  <p className="text-white/80 text-sm">View your achievements</p>
                </button>

                <button className="group bg-gradient-to-r from-orange-500 to-red-500 text-white p-6 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                  <div className="flex items-center justify-between mb-3">
                    <Calendar className="w-8 h-8" />
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </div>
                  <h3 className="font-semibold text-lg">Schedule</h3>
                  <p className="text-white/80 text-sm">Plan your workouts</p>
                </button>

                {user.role === 'TRAINER' && (
                  <button className="group bg-gradient-to-r from-purple-500 to-pink-500 text-white p-6 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                    <div className="flex items-center justify-between mb-3">
                      <Users className="w-8 h-8" />
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </div>
                    <h3 className="font-semibold text-lg">Manage Clients</h3>
                    <p className="text-white/80 text-sm">View client progress</p>
                  </button>
                )}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-xl border border-white/50">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Activity className="w-6 h-6 mr-3 text-indigo-600" />
                Recent Activity
              </h2>
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Activity className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No activity yet</h3>
                <p className="text-gray-600 mb-6">
                  Start your fitness journey by completing your first workout!
                </p>
                <button className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-200 transform hover:scale-105">
                  <Plus className="w-5 h-5 mr-2" />
                  Start Your First Workout
                </button>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6 sm:space-y-8">
            {/* Profile Card */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/50">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">
                    {user.firstName.charAt(0)}{user.lastName.charAt(0)}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">
                  {user.firstName} {user.lastName}
                </h3>
                <p className="text-gray-600 mb-3">{user.email}</p>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-800 capitalize">
                  {user.role.toLowerCase()}
                </span>
              </div>
            </div>

            {/* This Week */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/50">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-indigo-600" />
                This Week
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Workouts</span>
                  <div className="flex items-center">
                    <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 h-2 rounded-full" style={{width: '0%'}}></div>
                    </div>
                    <span className="text-sm font-semibold">0/5</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Calories</span>
                  <div className="flex items-center">
                    <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                      <div className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full" style={{width: '0%'}}></div>
                    </div>
                    <span className="text-sm font-semibold">0/2k</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Active Time</span>
                  <div className="flex items-center">
                    <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                      <div className="bg-gradient-to-r from-green-500 to-teal-500 h-2 rounded-full" style={{width: '0%'}}></div>
                    </div>
                    <span className="text-sm font-semibold">0h/5h</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/50">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <Award className="w-5 h-5 mr-2 text-indigo-600" />
                Achievements
              </h3>
              <div className="text-center py-8">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Award className="w-6 h-6 text-gray-400" />
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
  )
}
