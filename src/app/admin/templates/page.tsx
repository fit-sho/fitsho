"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Plus, ArrowLeft } from "lucide-react";
import { WorkoutTemplate } from "@/components/admin/types";
import { TemplateList } from "@/components/admin/TemplateList";
import { AnimatedBackground } from "@/components/workout/AnimatedBackground";

export default function AdminTemplatesPage() {
  const router = useRouter();
  const [templates, setTemplates] = useState<WorkoutTemplate[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadTemplates();
  }, []);

  const loadTemplates = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/workout-templates");
      if (response.ok) {
        const data = await response.json();
        setTemplates(data);
      }
    } catch (error) {
      console.error("Error loading templates:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditTemplate = (template: WorkoutTemplate) => {
    router.push(`/admin/templates/edit/${template.id}`);
  };

  const handleDeleteTemplate = async (templateId: string) => {
    try {
      const response = await fetch(`/api/workout-templates/${templateId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setTemplates(templates.filter((t) => t.id !== templateId));
      }
    } catch (error) {
      console.error("Error deleting template:", error);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <AnimatedBackground />

      <div className="container relative z-10 mx-auto px-4 py-6 sm:py-8">
        <div className="mb-8 space-y-4">
          <div className="md:hidden">
            <h1 className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-2xl font-bold text-transparent sm:text-3xl">
              Template Management
            </h1>
            <p className="mt-1 text-sm text-gray-400 sm:text-base">
              Manage workout templates for your users
            </p>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <button
                onClick={() => router.push("/admin")}
                className="flex w-fit items-center gap-2 rounded-lg border border-slate-700 bg-slate-800/50 px-4 py-2 text-gray-300 backdrop-blur-sm transition-all duration-200 hover:bg-slate-700/50 hover:text-white"
              >
                <ArrowLeft className="h-6 w-6" />
                <span className="hidden sm:inline">Back to Dashboard</span>
                <span className="sm:hidden">Back</span>
              </button>
            </div>
            <div className="hidden md:block">
              <h1 className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-2xl font-bold text-transparent sm:text-3xl">
                Template Management
              </h1>
              <p className="mt-1 text-sm text-gray-400 sm:text-base">
                Manage workout templates for your users
              </p>
            </div>

            <motion.button
              onClick={() => router.push("/admin/templates/create")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-500 px-6 py-3 font-medium text-white shadow-lg transition-all duration-200 hover:from-cyan-600 hover:to-purple-600 sm:w-auto"
            >
              <Plus className="h-6 w-6" />
              <span className="sm:hidden">Create</span>
              <span className="hidden sm:inline">Create Template</span>
            </motion.button>
          </div>
        </div>

        <TemplateList
          templates={templates}
          onEdit={handleEditTemplate}
          onDelete={handleDeleteTemplate}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
