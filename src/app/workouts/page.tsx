"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { 
  Calendar, 
  Clock, 
  Dumbbell, 
  Target, 
  TrendingUp, 
  Filter,
  Search,
  Eye,
  Play,
  User as UserIcon,
  Star
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
  trainer?: {
    id: string;
    firstName: string;
    lastName: string;
  };
  createdBy?: {
    id: string;
    firstName: string;
    lastName: string;
  };
  templateExercises: {
    exercise: Exercise;
    sets: number;
    reps: number;
    orderIndex: number;
  }[];
}

interface UserWorkout {
  id: string;
  date: string;
  notes?: string;
  template?: WorkoutTemplate;
  workoutExercises: {
    exercise: Exercise;
    sets: number;
    reps: number;
    weight?: number;
    notes?: string;
  }[];
}

export default function WorkoutsPage() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [workoutTemplates, setWorkoutTemplates] = useState<WorkoutTemplate[]>([]);
  const [userWorkouts, setUserWorkouts] = useState<UserWorkout[]>([]);
  const [workoutHistory, setWorkoutHistory] = useState<any[]>([]);
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [selectedExercises, setSelectedExercises] = useState<Set<string>>(new Set());
  const [activeTab, setActiveTab] = useState<'templates' | 'completed' | 'exercises'>('templates');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDifficulty, setFilterDifficulty] = useState<string>('all');
  const [filterMuscleGroup, setFilterMuscleGroup] = useState<string>('all');
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
        await Promise.all([
          fetchWorkoutTemplates(),
          fetchUserWorkouts(),
          fetchExercises(),
          fetchWorkoutHistory()
        ]);
      } catch (error) {
        console.error("Auth error:", error);
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  const fetchWorkoutTemplates = async () => {
    try {
      const response = await fetch('/api/workout-templates');
      if (response.ok) {
        const templates = await response.json();
        setWorkoutTemplates(templates);
      }
    } catch (error) {
      console.error('Error fetching workout templates:', error);
    }
  };

  const fetchUserWorkouts = async () => {
    try {
      const response = await fetch('/api/user-workouts');
      if (response.ok) {
        const workouts = await response.json();
        setUserWorkouts(workouts);
      }
    } catch (error) {
      console.error('Error fetching user workouts:', error);
    }
  };

  const fetchExercises = async () => {
    try {
      const response = await fetch('/api/exercises');
      if (response.ok) {
        const data = await response.json();
        setExercises(data);
      }
    } catch (error) {
      console.error('Error fetching exercises:', error);
    }
  };

  const fetchWorkoutHistory = async () => {
    try {
      const response = await fetch('/api/workout-history');
      if (response.ok) {
        const data = await response.json();
        setWorkoutHistory(data);
      }
    } catch (error) {
      console.error('Error fetching workout history:', error);
    }
  };

  const filteredTemplates = workoutTemplates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description?.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filterDifficulty === 'all') return matchesSearch;
    
    const hasMatchingDifficulty = template.templateExercises.some(te => 
      te.exercise.difficulty?.toLowerCase() === filterDifficulty.toLowerCase()
    );
    
    return matchesSearch && hasMatchingDifficulty;
  });

  const filteredWorkouts = userWorkouts.filter(workout => {
    return workout.template?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
           workout.notes?.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const filteredExercises = exercises.filter(exercise => {
    const matchesSearch = exercise.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         exercise.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDifficulty = filterDifficulty === 'all' || 
                             exercise.difficulty?.toLowerCase() === filterDifficulty.toLowerCase();
    
    const matchesMuscleGroup = filterMuscleGroup === 'all' ||
                              exercise.muscleGroups.some(mg => mg.toLowerCase() === filterMuscleGroup.toLowerCase());
    
    return matchesSearch && matchesDifficulty && matchesMuscleGroup;
  });

  const toggleExerciseSelection = (exerciseId: string) => {
    setSelectedExercises(prev => {
      const newSet = new Set(prev);
      if (newSet.has(exerciseId)) {
        newSet.delete(exerciseId);
      } else {
        newSet.add(exerciseId);
      }
      return newSet;
    });
  };

  const handleCreateTemplate = () => {
    if (selectedExercises.size === 0) {
      alert('Please select at least one exercise');
      return;
    }
    // Navigate to template creation page with selected exercises
    const exerciseIds = Array.from(selectedExercises).join(',');
    router.push(`/workout/create-template?exercises=${exerciseIds}`);
  };

  const getDifficultyColor = (difficulty?: string) => {
    switch (difficulty?.toLowerCase()) {
      case 'beginner':
        return 'text-green-400 bg-green-400/20';
      case 'intermediate':
        return 'text-yellow-400 bg-yellow-400/20';
      case 'advanced':
        return 'text-red-400 bg-red-400/20';
      default:
        return 'text-slate-400 bg-slate-400/20';
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

  if (!user) {
    return null;
  }

  return (
    <div className="animated-bg">
      <div className="animated-bg-overlay"></div>
      <AnimatedBackground />
      
      <div className="animated-bg-content container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-white mb-4">
            Your Workouts
          </h1>
          <p className="text-slate-300 text-lg">
            Explore workout templates and track your progress
          </p>
        </motion.div>

        {/* Search and Filter Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8 flex flex-col md:flex-row gap-4 items-center justify-between"
        >
          <div className="flex gap-4 items-center">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search workouts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>
            
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <select
                value={filterDifficulty}
                onChange={(e) => setFilterDifficulty(e.target.value)}
                className="pl-10 pr-8 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 appearance-none"
              >
                <option value="all">All Difficulties</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>

            {activeTab === 'exercises' && (
              <div className="relative">
                <Target className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <select
                  value={filterMuscleGroup}
                  onChange={(e) => setFilterMuscleGroup(e.target.value)}
                  className="pl-10 pr-8 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 appearance-none"
                >
                  <option value="all">All Muscle Groups</option>
                  <option value="chest">Chest</option>
                  <option value="back">Back</option>
                  <option value="shoulders">Shoulders</option>
                  <option value="biceps">Biceps</option>
                  <option value="triceps">Triceps</option>
                  <option value="legs">Legs</option>
                  <option value="glutes">Glutes</option>
                  <option value="core">Core</option>
                  <option value="cardio">Cardio</option>
                </select>
              </div>
            )}
          </div>

          {/* Tab Navigation */}
          <div className="flex bg-slate-800/50 rounded-lg p-1">
            <button
              onClick={() => setActiveTab('templates')}
              className={`px-4 py-2 rounded-md transition-all ${
                activeTab === 'templates'
                  ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Templates
            </button>
            <button
              onClick={() => setActiveTab('completed')}
              className={`px-4 py-2 rounded-md transition-all ${
                activeTab === 'completed'
                  ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Completed
            </button>
            <button
              onClick={() => setActiveTab('exercises')}
              className={`px-4 py-2 rounded-md transition-all ${
                activeTab === 'exercises'
                  ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Exercises
            </button>
          </div>
        </motion.div>

        {/* Workout Templates Tab */}
        {activeTab === 'templates' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredTemplates.map((template, index) => (
              <motion.div
                key={template.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:border-cyan-500/50 transition-all group"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold text-white group-hover:text-cyan-300 transition-colors">
                    {template.name}
                  </h3>
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-yellow-400" />
                    <span className="text-sm text-slate-400">Template</span>
                  </div>
                </div>

                <p className="text-slate-300 text-sm mb-4 line-clamp-2">
                  {template.description || "No description available"}
                </p>

                <div className="flex items-center gap-4 mb-4 text-sm text-slate-400">
                  <div className="flex items-center gap-1">
                    <Dumbbell className="w-4 h-4" />
                    <span>{template.templateExercises.length} exercises</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <UserIcon className="w-4 h-4" />
                    <span>
                      {template.trainer 
                        ? `${template.trainer.firstName} ${template.trainer.lastName}` 
                        : template.createdBy 
                          ? `${template.createdBy.firstName} ${template.createdBy.lastName}` 
                          : 'Unknown Creator'
                      }
                    </span>
                  </div>
                </div>

                {/* Exercise Preview */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-1 mb-2">
                    {Array.from(new Set(
                      template.templateExercises.flatMap(te => te.exercise.muscleGroups)
                    )).slice(0, 3).map((muscle) => (
                      <span
                        key={muscle}
                        className="px-2 py-1 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-300 text-xs rounded-full"
                      >
                        {muscle}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => router.push(`/workout?template=${template.id}`)}
                    className="flex-1 bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-4 py-2 rounded-lg hover:from-cyan-600 hover:to-purple-600 transition-all flex items-center justify-center gap-2"
                  >
                    <Play className="w-4 h-4" />
                    Start Workout
                  </button>
                  <button
                    onClick={() => router.push(`/workouts/template/${template.id}`)}
                    className="px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-all"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Exercises Tab */}
        {activeTab === 'exercises' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {/* Selected Exercises Counter and Create Button */}
            {selectedExercises.size > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 rounded-xl p-4 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {selectedExercises.size}
                  </div>
                  <span className="text-white font-medium">
                    {selectedExercises.size} exercise{selectedExercises.size !== 1 ? 's' : ''} selected
                  </span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setSelectedExercises(new Set())}
                    className="px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-all"
                  >
                    Clear All
                  </button>
                  <button
                    onClick={handleCreateTemplate}
                    className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-lg hover:from-cyan-600 hover:to-purple-600 transition-all font-medium"
                  >
                    Create Template
                  </button>
                </div>
              </motion.div>
            )}

            {/* Exercise Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredExercises.map((exercise, index) => (
                <motion.div
                  key={exercise.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`bg-slate-800/50 backdrop-blur-sm border rounded-xl p-6 transition-all cursor-pointer ${
                    selectedExercises.has(exercise.id)
                      ? 'border-cyan-500 bg-cyan-500/10'
                      : 'border-slate-700 hover:border-slate-600'
                  }`}
                  onClick={() => toggleExerciseSelection(exercise.id)}
                >
                  {/* Selection Indicator */}
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-white mb-2">
                        {exercise.name}
                      </h3>
                      <p className="text-slate-300 text-sm mb-3 line-clamp-2">
                        {exercise.description}
                      </p>
                    </div>
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                      selectedExercises.has(exercise.id)
                        ? 'border-cyan-500 bg-cyan-500'
                        : 'border-slate-500'
                    }`}>
                      {selectedExercises.has(exercise.id) && (
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                  </div>

                  {/* Exercise Image */}
                  {exercise.imageUrl && (
                    <div className="aspect-video rounded-lg overflow-hidden mb-4">
                      <img
                        src={exercise.imageUrl}
                        alt={exercise.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  {/* Exercise Details */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-4 text-sm text-slate-400">
                      {exercise.recommendedSets && exercise.recommendedReps && (
                        <div className="flex items-center gap-1">
                          <Target className="w-4 h-4" />
                          <span>{exercise.recommendedSets} × {exercise.recommendedReps}</span>
                        </div>
                      )}
                      {exercise.equipment && (
                        <div className="flex items-center gap-1">
                          <Dumbbell className="w-4 h-4" />
                          <span>{exercise.equipment}</span>
                        </div>
                      )}
                    </div>

                    {/* Difficulty Badge */}
                    {exercise.difficulty && (
                      <div className="flex justify-start">
                        <span className={`px-2 py-1 rounded-full text-xs ${getDifficultyColor(exercise.difficulty)}`}>
                          {exercise.difficulty}
                        </span>
                      </div>
                    )}

                    {/* Muscle Groups */}
                    <div className="flex flex-wrap gap-1">
                      {exercise.muscleGroups.slice(0, 3).map((muscle) => (
                        <span
                          key={muscle}
                          className="px-2 py-1 bg-slate-700/50 text-slate-300 text-xs rounded-full"
                        >
                          {muscle}
                        </span>
                      ))}
                      {exercise.muscleGroups.length > 3 && (
                        <span className="px-2 py-1 bg-slate-700/50 text-slate-400 text-xs rounded-full">
                          +{exercise.muscleGroups.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Completed Workouts Tab */}
        {activeTab === 'completed' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredWorkouts.map((workout, index) => (
              <motion.div
                key={workout.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:border-green-500/50 transition-all group"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold text-white group-hover:text-green-300 transition-colors">
                    {workout.template?.name || "Custom Workout"}
                  </h3>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-green-400" />
                    <span className="text-sm text-slate-400">Completed</span>
                  </div>
                </div>

                <div className="flex items-center gap-4 mb-4 text-sm text-slate-400">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(workout.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Dumbbell className="w-4 h-4" />
                    <span>{workout.workoutExercises.length} exercises</span>
                  </div>
                </div>

                {workout.notes && (
                  <p className="text-slate-300 text-sm mb-4 line-clamp-2">
                    {workout.notes}
                  </p>
                )}

                {/* Exercise Summary */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-1">
                    {Array.from(new Set(
                      workout.workoutExercises.flatMap(we => we.exercise.muscleGroups)
                    )).slice(0, 3).map((muscle) => (
                      <span
                        key={muscle}
                        className="px-2 py-1 bg-gradient-to-r from-green-500/20 to-blue-500/20 text-green-300 text-xs rounded-full"
                      >
                        {muscle}
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => router.push(`/workouts/completed/${workout.id}`)}
                  className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white px-4 py-2 rounded-lg hover:from-green-600 hover:to-blue-600 transition-all flex items-center justify-center gap-2"
                >
                  <Eye className="w-4 h-4" />
                  View Details
                </button>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Empty States */}
        {activeTab === 'templates' && filteredTemplates.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Dumbbell className="w-16 h-16 text-slate-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No workout templates found</h3>
            <p className="text-slate-400 mb-6">
              {searchTerm || filterDifficulty !== 'all' 
                ? "Try adjusting your search or filter criteria" 
                : "Create your first workout template to get started"}
            </p>
            <button
              onClick={() => router.push('/workout')}
              className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-6 py-3 rounded-lg hover:from-cyan-600 hover:to-purple-600 transition-all"
            >
              Create Workout
            </button>
          </motion.div>
        )}

        {activeTab === 'completed' && filteredWorkouts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <TrendingUp className="w-16 h-16 text-slate-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No completed workouts found</h3>
            <p className="text-slate-400 mb-6">
              {searchTerm 
                ? "Try adjusting your search criteria" 
                : "Complete your first workout to see it here"}
            </p>
            <button
              onClick={() => router.push('/workout')}
              className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-6 py-3 rounded-lg hover:from-green-600 hover:to-blue-600 transition-all"
            >
              Start Workout
            </button>
          </motion.div>
        )}

        {activeTab === 'exercises' && filteredExercises.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Dumbbell className="w-16 h-16 text-slate-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No exercises found</h3>
            <p className="text-slate-400 mb-6">
              {searchTerm || filterDifficulty !== 'all' || filterMuscleGroup !== 'all'
                ? "Try adjusting your search or filter criteria" 
                : "No exercises available at the moment"}
            </p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => {
                  setSearchTerm('');
                  setFilterDifficulty('all');
                  setFilterMuscleGroup('all');
                }}
                className="bg-slate-700 text-white px-6 py-3 rounded-lg hover:bg-slate-600 transition-all"
              >
                Clear Filters
              </button>
              <button
                onClick={() => setActiveTab('templates')}
                className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-6 py-3 rounded-lg hover:from-cyan-600 hover:to-purple-600 transition-all"
              >
                Browse Templates
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
