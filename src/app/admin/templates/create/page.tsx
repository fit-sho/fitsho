"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Exercise, CreateTemplateData } from "../../../../components/admin/types";
import { WorkoutTemplateForm } from "../../../../components/admin/WorkoutTemplateForm";
import { AnimatedBackground } from "../../../../components/workout/AnimatedBackground";

export default function CreateTemplatePage() {
  const router = useRouter();
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadExercises();
  }, []);

  const loadExercises = async () => {
    try {
      const response = await fetch("/api/exercises");
      if (response.ok) {
        const data = await response.json();
        setExercises(data);
      }
    } catch (error) {
      console.error("Error loading exercises:", error);
    }
  };

  const handleCreateTemplate = async (templateData: CreateTemplateData) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/workout-templates", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(templateData),
      });

      if (response.ok) {
        router.push('/admin/templates');
      } else {
        console.error("Failed to create template");
      }
    } catch (error) {
      console.error("Error creating template:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      <AnimatedBackground />
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => router.push('/admin/templates')}
            className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg text-gray-300 hover:text-white hover:bg-slate-700/50 transition-all duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Templates
          </button>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Create New Template
            </h1>
            <p className="text-gray-400 mt-1">
              Build a new workout template for your users
            </p>
          </div>
        </div>

        <WorkoutTemplateForm
          exercises={exercises}
          onSubmit={handleCreateTemplate}
          onCancel={() => router.push('/admin/templates')}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
