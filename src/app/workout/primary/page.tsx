"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Target, ChevronRight } from "lucide-react";
import { authClient, User } from "@/lib/client-auth";
import { AnimatedBackground } from "@/components/workout/AnimatedBackground";
import { ProgressSteps } from "@/components/workout/ProgressSteps";

const muscleGroupEmojis: { [key: string]: string } = {
  'Chest': '💪',
  'Back': '🔥',
  'Shoulders': '🏔️',
  'Arms': '💥',
  'Legs': '🦵',
  'Core': '⚡',
  'Glutes': '🍑',
  'Biceps': '💪',
  'Triceps': '🔥',
  'Forearms': '✊',
  'Calves': '🦵',
  'Hamstrings': '🏃',
  'Quadriceps': '🏋️',
  'Lats': '🪶',
  'Traps': '🏔️',
  'Delts': '🌟'
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
    const muscles = searchParams.get('muscles');
    if (muscles) {
      setSelectedMuscles(decodeURIComponent(muscles).split(','));
    } else {
      // If no muscles selected, redirect back
      router.push('/workout/muscles');
    }
  }, [router, searchParams]);

  const handleContinue = () => {
    if (primaryMuscle && selectedMuscles.length > 0) {
      const muscleParams = selectedMuscles.join(',');
      router.push(`/workout/exercises?muscles=${encodeURIComponent(muscleParams)}&primary=${encodeURIComponent(primaryMuscle)}`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden flex items-center justify-center">
        <AnimatedBackground />
        <div className="relative z-10 text-white">Loading...</div>
      </div>
    );
  }

  if (!user || selectedMuscles.length === 0) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      <AnimatedBackground />
      
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header - Mobile Optimized */}
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <button
            onClick={() => router.push(`/workout/muscles?muscles=${encodeURIComponent(selectedMuscles.join(','))}`)}
            className="flex items-center gap-2 px-3 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white/70 hover:text-white hover:bg-white/15 transition-all duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Back</span>
          </button>
          
          <div className="text-center">
            <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Primary Focus
            </h1>
            <p className="text-sm text-white/60 mt-1">
              Which muscle hits first?
            </p>
          </div>

          <div className="w-16"></div> {/* Spacer for center alignment */}
        </div>

        {/* Progress Steps */}
        <div className="px-4 py-4">
          <ProgressSteps currentStep={2} />
        </div>

        {/* Main Content */}
        <div className="flex-1 px-4 pb-4">
          {/* Instruction Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl"
          >
            <div className="flex items-center gap-3 mb-2">
              <Target className="w-5 h-5 text-cyan-400" />
              <h2 className="text-lg font-semibold text-white">Choose Your Primary Focus</h2>
            </div>
            <p className="text-white/70 text-sm leading-relaxed">
              You selected multiple muscle groups. Which one do you want to prioritize? 
              Your workout will be tailored around this primary muscle group.
            </p>
          </motion.div>

          {/* Selected Muscles Display */}
          <div className="mb-4">
            <p className="text-white/60 text-sm mb-3">Your selected muscles:</p>
            <div className="flex flex-wrap gap-2">
              {selectedMuscles.map((muscle, index) => (
                <motion.div
                  key={muscle}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="px-3 py-1.5 bg-white/10 border border-white/20 rounded-full text-white/80 text-sm flex items-center gap-2"
                >
                  <span>{muscleGroupEmojis[muscle] || '💪'}</span>
                  <span>{muscle}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Primary Muscle Selection */}
          <div className="space-y-3 mb-8">
            {selectedMuscles.map((muscle, index) => (
              <motion.button
                key={muscle}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + (index * 0.1) }}
                onClick={() => setPrimaryMuscle(muscle)}
                className={`w-full p-4 rounded-2xl border transition-all duration-200 flex items-center justify-between group ${
                  primaryMuscle === muscle
                    ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border-cyan-400/50 shadow-lg shadow-cyan-500/10'
                    : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl transition-all duration-200 ${
                    primaryMuscle === muscle
                      ? 'bg-gradient-to-r from-cyan-500 to-purple-500 shadow-lg'
                      : 'bg-white/10 group-hover:bg-white/15'
                  }`}>
                    {muscleGroupEmojis[muscle] || '💪'}
                  </div>
                  <div className="text-left">
                    <h3 className="text-lg font-semibold text-white">{muscle}</h3>
                    <p className="text-white/60 text-sm">Primary focus muscle</p>
                  </div>
                </div>
                
                <div className={`transition-all duration-200 ${
                  primaryMuscle === muscle ? 'text-cyan-400' : 'text-white/40 group-hover:text-white/60'
                }`}>
                  <ChevronRight className="w-5 h-5" />
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Continue Button - Fixed at Bottom */}
        <div className="p-4 border-t border-white/10 bg-slate-900/80 backdrop-blur-sm">
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            onClick={handleContinue}
            disabled={!primaryMuscle}
            className={`w-full py-4 rounded-2xl font-semibold text-lg transition-all duration-200 flex items-center justify-center gap-3 ${
              primaryMuscle
                ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-[1.02] active:scale-[0.98]'
                : 'bg-white/10 text-white/40 cursor-not-allowed'
            }`}
          >
            <span>Continue to Exercises</span>
            <ChevronRight className="w-5 h-5" />
          </motion.button>
          
          {primaryMuscle && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-white/60 text-sm mt-3"
            >
              Focusing on <span className="text-cyan-400 font-semibold">{primaryMuscle}</span> first
            </motion.p>
          )}
        </div>
      </div>
    </div>
  );
}
