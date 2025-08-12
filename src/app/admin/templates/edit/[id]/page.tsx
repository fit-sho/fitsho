"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Exercise, WorkoutTemplate, CreateTemplateData } from "@/components/admin/types";
import { WorkoutTemplateForm } from "@/components/admin/WorkoutTemplateForm";
import { AnimatedBackground } from "@/components/workout/AnimatedBackground";

export default function EditTemplatePage() {
  const router = useRouter();
  const params = useParams();
  const [template, setTemplate] = useState<WorkoutTemplate | null>(null);
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (params.id) {
      loadData(params.id as string);
    }
  }, [params.id]);

  const loadData = async (id: string) => {
    try {
      const [templatesResponse, exercisesResponse] = await Promise.all([
        fetch("/api/workout-templates"),
        fetch("/api/exercises")
      ]);

      if (templatesResponse.ok && exercisesResponse.ok) {
        const [templates, exercises] = await Promise.all([
          templatesResponse.json(),
          exercisesResponse.json()
        ]);
        
        const foundTemplate = templates.find((t: WorkoutTemplate) => t.id === id);
        setTemplate(foundTemplate || null);
        setExercises(exercises);
      }
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateTemplate = async (templateData: CreateTemplateData) => {
    if (!template) return;

    setIsLoading(true);
    try {
      const response = await fetch(`/api/workout-templates/${template.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(templateData),
      });

      if (response.ok) {
        router.push('/admin/templates');
      } else {
        console.error("Failed to update template");
      }
    } catch (error) {
      console.error("Error updating template:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden flex items-center justify-center">
        <AnimatedBackground />
        <div className="relative z-10 text-white">Loading...</div>
      </div>
    );
  }

  if (!template) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden flex items-center justify-center">
        <AnimatedBackground />
        <div className="relative z-10 text-white">Template not found</div>
      </div>
    );
  }

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
              Edit Template
            </h1>
            <p className="text-gray-400 mt-1">
              Update template details and exercises
            </p>
          </div>
        </div>

        <WorkoutTemplateForm
          template={template}
          exercises={exercises}
          onSave={handleUpdateTemplate}
          onCancel={() => router.push('/admin/templates')}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
