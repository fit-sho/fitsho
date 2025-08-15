"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import {
  Exercise,
  WorkoutTemplate,
  CreateTemplateData,
} from "@/components/admin/types";
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
        fetch("/api/exercises"),
      ]);

      if (templatesResponse.ok && exercisesResponse.ok) {
        const [templates, exercises] = await Promise.all([
          templatesResponse.json(),
          exercisesResponse.json(),
        ]);

        const foundTemplate = templates.find(
          (t: WorkoutTemplate) => t.id === id
        );
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
        router.push("/admin/templates");
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
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <AnimatedBackground />
        <div className="relative z-10 text-white">Loading...</div>
      </div>
    );
  }

  if (!template) {
    return (
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <AnimatedBackground />
        <div className="relative z-10 text-white">Template not found</div>
      </div>
    );
  }

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
              Edit Template
            </h1>
            <p className="mt-1 text-gray-400">
              Update template details and exercises
            </p>
          </div>
        </div>

        <WorkoutTemplateForm
          template={template}
          exercises={exercises}
          onSave={handleUpdateTemplate}
          onCancel={() => router.push("/admin/templates")}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
