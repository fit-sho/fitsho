"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Exercise, CreateTemplateData } from "@/components/admin/types";
import { WorkoutTemplateForm } from "@/components/admin/WorkoutTemplateForm";
import { AnimatedBackground } from "@/components/workout/AnimatedBackground";

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
        router.push("/admin/templates");
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
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <AnimatedBackground />

      <div className="container relative z-10 mx-auto px-4 py-8">
        <div className="mb-8 flex items-center gap-4">
          <button
            onClick={() => router.push("/admin/templates")}
            className="flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-800/50 px-4 py-2 text-gray-300 backdrop-blur-sm transition-all duration-200 hover:bg-slate-700/50 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Templates
          </button>
          <div>
            <h1 className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-3xl font-bold text-transparent">
              Create New Template
            </h1>
            <p className="mt-1 text-gray-400">
              Build a new workout template for your users
            </p>
          </div>
        </div>

        <WorkoutTemplateForm
          exercises={exercises}
          onSave={handleCreateTemplate}
          onCancel={() => router.push("/admin/templates")}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
