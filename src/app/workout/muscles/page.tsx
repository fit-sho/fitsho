"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { authClient, User } from "@/lib/client-auth";
import { AnimatedBackground } from "@/components/workout/AnimatedBackground";
import { ProgressSteps } from "@/components/workout/ProgressSteps";
import { MuscleGroupSelection } from "@/components/workout/MuscleGroupSelection";

export default function WorkoutMusclesPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedMuscles, setSelectedMuscles] = useState<string[]>([]);
  const [showAddMuscleModal, setShowAddMuscleModal] = useState(false);
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

  const handleContinue = () => {
    if (selectedMuscles.length > 0) {
      // If only one muscle selected, skip primary selection and go straight to exercises
      if (selectedMuscles.length === 1) {
        const muscleParams = selectedMuscles.join(',');
        router.push(`/workout/exercises?muscles=${encodeURIComponent(muscleParams)}&primary=${encodeURIComponent(selectedMuscles[0])}`);
      } else {
        // Multiple muscles selected, go to primary selection
        const muscleParams = selectedMuscles.join(',');
        router.push(`/workout/primary?muscles=${encodeURIComponent(muscleParams)}`);
      }
    }
  };

  const handleAddMuscle = (muscle: string) => {
    if (!selectedMuscles.includes(muscle)) {
      setSelectedMuscles([...selectedMuscles, muscle]);
    }
    setShowAddMuscleModal(false);
  };

  const handleRemoveMuscle = (muscle: string) => {
    setSelectedMuscles(selectedMuscles.filter(m => m !== muscle));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden flex items-center justify-center">
        <AnimatedBackground />
        <div className="relative z-10 text-white">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      <AnimatedBackground />
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => router.push('/workout')}
            className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg text-gray-300 hover:text-white hover:bg-slate-700/50 transition-all duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Workout
          </button>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Select Muscle Groups
            </h1>
            <p className="text-gray-400 mt-1">
              Choose the muscle groups you want to target in this workout
            </p>
          </div>
        </div>

        <ProgressSteps currentStep={1} />

        <MuscleGroupSelection
          selectedMuscles={selectedMuscles}
          onMuscleToggle={(muscle) => {
            if (selectedMuscles.includes(muscle)) {
              handleRemoveMuscle(muscle);
            } else {
              setSelectedMuscles([...selectedMuscles, muscle]);
            }
          }}
          onContinue={handleContinue}
          onAddMuscle={() => setShowAddMuscleModal(true)}
          showAddMuscleModal={showAddMuscleModal}
          onCloseAddMuscleModal={() => setShowAddMuscleModal(false)}
          onAddMuscleConfirm={handleAddMuscle}
        />
      </div>
    </div>
  );
}
