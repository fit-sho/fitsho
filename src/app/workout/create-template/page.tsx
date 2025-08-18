"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { 
  ArrowLeft,
  Save,
  Plus,
  Minus,
  Target,
  Dumbbell,
  AlertCircle,
  X,
  GripVertical
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

interface TemplateExercise {
  exerciseId: string;
  exercise: Exercise;
  sets: number;
  reps: number;
  orderIndex: number;
}

export default function CreateTemplatePage() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [templateExercises, setTemplateExercises] = useState<TemplateExercise[]>([]);
  const [templateName, setTemplateName] = useState('');
  const [templateDescription, setTemplateDescription] = useState('');
  const [userTemplateCount, setUserTemplateCount] = useState(0);
  const [error, setError] = useState<string | null>(null);
  
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
        await Promise.all([
          loadSelectedExercises(),
          checkUserTemplateCount(currentUser.id)
        ]);
      } catch (error) {
        console.error("Auth error:", error);
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router, searchParams]);

  const loadSelectedExercises = async () => {
    const exerciseIds = searchParams.get('exercises');
    if (!exerciseIds) {
      router.push('/workouts');
      return;
    }

    try {
      const response = await fetch('/api/exercises');
      if (response.ok) {
        const allExercises = await response.json();
        const selectedIds = exerciseIds.split(',');
        const selectedExercises = allExercises.filter((ex: Exercise) => 
          selectedIds.includes(ex.id)
        );
        
        setExercises(selectedExercises);
        setTemplateExercises(
          selectedExercises.map((exercise: Exercise, index: number) => ({
            exerciseId: exercise.id,
            exercise,
            sets: exercise.recommendedSets || 3,
            reps: parseInt(exercise.recommendedReps?.split('-')[0] || '10'),
            orderIndex: index
          }))
        );
      }
    } catch (error) {
      console.error('Error loading exercises:', error);
      setError('Failed to load exercises');
    }
  };

  const checkUserTemplateCount = async (userId: string) => {
    try {
      const response = await fetch('/api/workout-templates/user-count');
      if (response.ok) {
        const { count } = await response.json();
        setUserTemplateCount(count);
      }
    } catch (error) {
      console.error('Error checking template count:', error);
    }
  };

  const updateExercise = (exerciseId: string, field: 'sets' | 'reps', value: number) => {
    setTemplateExercises(prev => 
      prev.map(te => 
        te.exerciseId === exerciseId 
          ? { ...te, [field]: Math.max(1, value) }
          : te
      )
    );
  };

  const removeExercise = (exerciseId: string) => {
    setTemplateExercises(prev => 
      prev.filter(te => te.exerciseId !== exerciseId)
        .map((te, index) => ({ ...te, orderIndex: index }))
    );
  };

  const moveExercise = (exerciseId: string, direction: 'up' | 'down') => {
    setTemplateExercises(prev => {
      const currentIndex = prev.findIndex(te => te.exerciseId === exerciseId);
      if (currentIndex === -1) return prev;
      
      const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
      if (newIndex < 0 || newIndex >= prev.length) return prev;
      
      const newArray = [...prev];
      [newArray[currentIndex], newArray[newIndex]] = [newArray[newIndex], newArray[currentIndex]];
      
      return newArray.map((te, index) => ({ ...te, orderIndex: index }));
    });
  };

  const canCreateTemplate = () => {
    if (!user) return false;
    if (user.role === 'ADMIN' || user.role === 'TRAINER') return true;
    return userTemplateCount < 2;
  };

  const saveTemplate = async () => {
    if (!templateName.trim()) {
      setError('Template name is required');
      return;
    }

    if (templateExercises.length === 0) {
      setError('At least one exercise is required');
      return;
    }

    if (!canCreateTemplate()) {
      setError('You can only create 2 templates. Delete an existing template to create a new one.');
      return;
    }

    setSaving(true);
    setError(null);

    try {
      const response = await fetch('/api/workout-templates', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: templateName.trim(),
          description: templateDescription.trim() || null,
          exercises: templateExercises.map(te => ({
            exerciseId: te.exerciseId,
            sets: te.sets,
            reps: te.reps,
            orderIndex: te.orderIndex
          }))
        }),
      });

      if (response.ok) {
        const template = await response.json();
        router.push(`/workouts/template/${template.id}`);
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to create template');
      }
    } catch (error) {
      console.error('Error creating template:', error);
      setError('Failed to create template');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="animated-bg">
        <div className="animated-bg-overlay"></div>
        <div className="animated-bg-content flex min-h-screen items-center justify-center">
          <div className="text-white">Loading...</div>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const muscleGroups = Array.from(new Set(
    templateExercises.flatMap(te => te.exercise.muscleGroups)
  ));

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
            className="flex items-center gap-2 text-slate-300 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Workouts
          </button>

          <h1 className="text-4xl font-bold text-white mb-4">
            Create Workout Template
          </h1>
          <p className="text-slate-300 text-lg">
            Customize your selected exercises and create a reusable workout template
          </p>
        </motion.div>

        {/* Template Limit Warning */}
        {user.role === 'CLIENT' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className={`mb-6 p-4 rounded-xl border ${
              canCreateTemplate() 
                ? 'bg-blue-500/10 border-blue-500/30 text-blue-300'
                : 'bg-red-500/10 border-red-500/30 text-red-300'
            }`}
          >
            <div className="flex items-center gap-3">
              <AlertCircle className="w-5 h-5" />
              <span>
                {canCreateTemplate() 
                  ? `You have created ${userTemplateCount}/2 templates`
                  : `Template limit reached (${userTemplateCount}/2). Delete a template to create a new one.`
                }
              </span>
            </div>
          </motion.div>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Template Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 sticky top-8">
              <h2 className="text-xl font-semibold text-white mb-4">Template Details</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Template Name *
                  </label>
                  <input
                    type="text"
                    value={templateName}
                    onChange={(e) => setTemplateName(e.target.value)}
                    placeholder="e.g., Push Day, Chest & Triceps"
                    className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    maxLength={50}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Description
                  </label>
                  <textarea
                    value={templateDescription}
                    onChange={(e) => setTemplateDescription(e.target.value)}
                    placeholder="Optional description of your workout..."
                    rows={3}
                    className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 resize-none"
                    maxLength={200}
                  />
                </div>

                {/* Template Stats */}
                <div className="pt-4 border-t border-slate-600">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-cyan-400">
                        {templateExercises.length}
                      </div>
                      <div className="text-sm text-slate-400">Exercises</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-purple-400">
                        {muscleGroups.length}
                      </div>
                      <div className="text-sm text-slate-400">Muscle Groups</div>
                    </div>
                  </div>
                </div>

                {/* Muscle Groups */}
                {muscleGroups.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium text-slate-300 mb-2">Target Muscles</h3>
                    <div className="flex flex-wrap gap-1">
                      {muscleGroups.map((muscle) => (
                        <span
                          key={muscle}
                          className="px-2 py-1 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-300 text-xs rounded-full"
                        >
                          {muscle}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Error Display */}
                {error && (
                  <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-300 text-sm">
                    {error}
                  </div>
                )}

                {/* Save Button */}
                <button
                  onClick={saveTemplate}
                  disabled={saving || !canCreateTemplate()}
                  className={`w-full py-3 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${
                    saving || !canCreateTemplate()
                      ? 'bg-slate-600 text-slate-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white hover:from-cyan-600 hover:to-purple-600'
                  }`}
                >
                  <Save className="w-5 h-5" />
                  {saving ? 'Creating...' : 'Create Template'}
                </button>
              </div>
            </div>
          </motion.div>

          {/* Exercises List */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2"
          >
            <h2 className="text-xl font-semibold text-white mb-6">
              Exercises ({templateExercises.length})
            </h2>

            <div className="space-y-4">
              {templateExercises.map((templateExercise, index) => (
                <motion.div
                  key={templateExercise.exerciseId}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6"
                >
                  <div className="flex items-start gap-4">
                    {/* Exercise Image */}
                    {templateExercise.exercise.imageUrl && (
                      <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={templateExercise.exercise.imageUrl}
                          alt={templateExercise.exercise.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}

                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-lg font-semibold text-white mb-1">
                            {templateExercise.exercise.name}
                          </h3>
                          <p className="text-slate-300 text-sm">
                            {templateExercise.exercise.description}
                          </p>
                        </div>

                        <div className="flex items-center gap-2">
                          {/* Move buttons */}
                          <div className="flex flex-col">
                            <button
                              onClick={() => moveExercise(templateExercise.exerciseId, 'up')}
                              disabled={index === 0}
                              className="p-1 text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
                            >
                              <GripVertical className="w-4 h-4" />
                            </button>
                          </div>

                          {/* Remove button */}
                          <button
                            onClick={() => removeExercise(templateExercise.exerciseId)}
                            className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Sets and Reps Controls */}
                      <div className="flex items-center gap-6">
                        <div className="flex items-center gap-3">
                          <label className="text-sm font-medium text-slate-300">Sets:</label>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateExercise(templateExercise.exerciseId, 'sets', templateExercise.sets - 1)}
                              className="w-8 h-8 bg-slate-700 hover:bg-slate-600 rounded-lg flex items-center justify-center text-white transition-colors"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="w-12 text-center text-white font-medium">
                              {templateExercise.sets}
                            </span>
                            <button
                              onClick={() => updateExercise(templateExercise.exerciseId, 'sets', templateExercise.sets + 1)}
                              className="w-8 h-8 bg-slate-700 hover:bg-slate-600 rounded-lg flex items-center justify-center text-white transition-colors"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <label className="text-sm font-medium text-slate-300">Reps:</label>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateExercise(templateExercise.exerciseId, 'reps', templateExercise.reps - 1)}
                              className="w-8 h-8 bg-slate-700 hover:bg-slate-600 rounded-lg flex items-center justify-center text-white transition-colors"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="w-12 text-center text-white font-medium">
                              {templateExercise.reps}
                            </span>
                            <button
                              onClick={() => updateExercise(templateExercise.exerciseId, 'reps', templateExercise.reps + 1)}
                              className="w-8 h-8 bg-slate-700 hover:bg-slate-600 rounded-lg flex items-center justify-center text-white transition-colors"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        {/* Recommended indicator */}
                        {templateExercise.exercise.recommendedSets && templateExercise.exercise.recommendedReps && (
                          <div className="text-sm text-slate-400">
                            <Target className="w-4 h-4 inline mr-1" />
                            Recommended: {templateExercise.exercise.recommendedSets} × {templateExercise.exercise.recommendedReps}
                          </div>
                        )}
                      </div>

                      {/* Muscle Groups */}
                      <div className="flex flex-wrap gap-1 mt-3">
                        {templateExercise.exercise.muscleGroups.map((muscle) => (
                          <span
                            key={muscle}
                            className="px-2 py-1 bg-slate-700/50 text-slate-300 text-xs rounded-full"
                          >
                            {muscle}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}

              {templateExercises.length === 0 && (
                <div className="text-center py-12">
                  <Dumbbell className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">No exercises selected</h3>
                  <p className="text-slate-400 mb-6">
                    Go back to the workouts page to select exercises for your template
                  </p>
                  <button
                    onClick={() => router.push('/workouts')}
                    className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-6 py-3 rounded-lg hover:from-cyan-600 hover:to-purple-600 transition-all"
                  >
                    Select Exercises
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
