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

      <div className="container relative z-10 mx-auto px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push("/admin")}
              className="flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-800/50 px-4 py-2 text-gray-300 backdrop-blur-sm transition-all duration-200 hover:bg-slate-700/50 hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </button>
            <div>
              <h1 className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-3xl font-bold text-transparent">
                Template Management
              </h1>
              <p className="mt-1 text-gray-400">
                Manage workout templates for your users
              </p>
            </div>
          </div>

          <motion.button
            onClick={() => router.push("/admin/templates/create")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-500 px-6 py-3 font-medium text-white shadow-lg transition-all duration-200 hover:from-cyan-600 hover:to-purple-600"
          >
            <Plus className="h-5 w-5" />
            Create Template
          </motion.button>
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
