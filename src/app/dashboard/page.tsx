"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/utils/supabase";
import Link from "next/link";

// Card component for dashboard sections
const DashboardCard = ({ 
  title, 
  count, 
  icon, 
  href, 
  bgColor = "bg-indigo-500" 
}: { 
  title: string; 
  count: number; 
  icon: React.ReactNode; 
  href: string; 
  bgColor?: string;
}) => (
  <Link href={href} className="block">
    <div className="rounded-lg shadow overflow-hidden">
      <div className={`p-5 ${bgColor} text-white`}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium">Total {title}</p>
            <p className="text-3xl font-bold">{count}</p>
          </div>
          <div className="text-white">{icon}</div>
        </div>
      </div>
      <div className="bg-white p-4">
        <p className="text-sm text-gray-600">View all {title.toLowerCase()}</p>
      </div>
    </div>
  </Link>
);

export default function DashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [stats, setStats] = useState({
    workouts: 0,
    completedWorkouts: 0,
    exercises: 0,
    progress: 0,
  });
  const [recentWorkouts, setRecentWorkouts] = useState<any[]>([]);
  
  useEffect(() => {
    async function loadDashboardData() {
      setLoading(true);
      try {
        // Get current user
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
          router.replace('/login');
          return;
        }
        
        setUser(session.user);
        
        // Fetch user profile from users table
        const { data: profile, error } = await supabase
          .from('users')
          .select('*')
          .eq('id', session.user.id)
          .single();
          
        if (error) {
          throw error;
        }
        
        setUserProfile(profile);
        
        // For now, set some dummy data
        // In a real app, this would come from database queries
        setStats({
          workouts: 12,
          completedWorkouts: 8,
          exercises: 45,
          progress: 75,
        });
        
        setRecentWorkouts([
          { 
            id: 1, 
            name: 'Upper Body Strength', 
            date: new Date().toLocaleDateString(), 
            duration: '45 min',
            completed: true
          },
          { 
            id: 2, 
            name: 'Lower Body Focus', 
            date: new Date(Date.now() - 86400000).toLocaleDateString(), 
            duration: '60 min',
            completed: true
          },
          { 
            id: 3, 
            name: 'Core Workout', 
            date: new Date(Date.now() - 172800000).toLocaleDateString(), 
            duration: '30 min',
            completed: false
          },
        ]);
      } catch (error: any) {
        console.error("Error loading dashboard:", error.message);
      } finally {
        setLoading(false);
      }
    }
    
    loadDashboardData();
  }, [router]);

  // Icons for dashboard cards
  const WorkoutIcon = () => (
    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
    </svg>
  );
  
  const ExerciseIcon = () => (
    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path>
    </svg>
  );
  
  const ProgressIcon = () => (
    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M3 3a1 1 0 000 2h10a1 1 0 100-2H3zm0 4a1 1 0 000 2h10a1 1 0 100-2H3zm0 4a1 1 0 100 2h10a1 1 0 100-2H3z" clipRule="evenodd"></path>
    </svg>
  );

  if (loading && !userProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Welcome section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome, {userProfile?.first_name || 'Fitness Enthusiast'}!
          </h1>
          <p className="mt-2 text-gray-600">
            {userProfile?.role === 'client' ? 
              'Track your workouts and monitor your progress' : 
              'Manage your clients and their workout plans'}
          </p>
        </div>
        
        {/* Stats cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <DashboardCard 
            title="Workouts" 
            count={stats.workouts} 
            icon={<WorkoutIcon />} 
            href="/workouts" 
            bgColor="bg-indigo-500"
          />
          
          <DashboardCard 
            title="Exercises" 
            count={stats.exercises} 
            icon={<ExerciseIcon />} 
            href="/exercises" 
            bgColor="bg-blue-500"
          />
          
          <DashboardCard 
            title="Progress Metrics" 
            count={stats.progress}
            icon={<ProgressIcon />} 
            href="/progress"
            bgColor="bg-purple-500" 
          />
        </div>
        
        {/* Recent Workouts */}
        <div className="bg-white rounded-lg shadow overflow-hidden mb-8">
          <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900">Recent Workouts</h3>
          </div>
          <div className="bg-white divide-y divide-gray-200">
            {recentWorkouts.length > 0 ? (
              <ul className="divide-y divide-gray-200">
                {recentWorkouts.map((workout) => (
                  <li key={workout.id} className="px-4 py-4 sm:px-6 hover:bg-gray-50">
                    <Link href={`/workouts/${workout.id}`} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className={`flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center ${workout.completed ? 'bg-green-100' : 'bg-yellow-100'}`}>
                          {workout.completed ? (
                            <svg className="h-6 w-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                            </svg>
                          ) : (
                            <svg className="h-6 w-6 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"></path>
                            </svg>
                          )}
                        </div>
                        <div className="ml-4">
                          <p className="text-sm font-medium text-gray-900">{workout.name}</p>
                          <p className="text-sm text-gray-500">{workout.date}</p>
                        </div>
                      </div>
                      <div className="ml-2 flex-shrink-0 flex">
                        <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-indigo-100 text-indigo-800">
                          {workout.duration}
                        </p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="px-4 py-6 sm:px-6 text-center">
                <p className="text-gray-500">No recent workouts found</p>
                <Link href="/workouts/new" className="mt-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  Start a New Workout
                </Link>
              </div>
            )}
            <div className="bg-gray-50 px-4 py-4 sm:px-6">
              <Link href="/workouts" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                View all workouts <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Progress chart placeholder */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900">Your Progress</h3>
          </div>
          <div className="p-6">
            <div className="bg-gray-100 rounded-lg p-8 flex items-center justify-center">
              <div className="text-center">
                <p className="text-gray-500">Progress chart will be displayed here</p>
                <p className="text-sm text-gray-400 mt-2">Coming soon</p>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Workout Frequency</dt>
                    <dd className="mt-1 text-3xl font-semibold text-gray-900">3/week</dd>
                  </dl>
                </div>
              </div>
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Completion Rate</dt>
                    <dd className="mt-1 text-3xl font-semibold text-gray-900">{(stats.completedWorkouts / stats.workouts * 100).toFixed(0)}%</dd>
                  </dl>
                </div>
              </div>
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Total Time</dt>
                    <dd className="mt-1 text-3xl font-semibold text-gray-900">6h 30m</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
