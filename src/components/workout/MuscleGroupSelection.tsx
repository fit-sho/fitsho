"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { muscleGroups, MuscleGroupOption } from "./types";

interface MuscleGroupSelectionProps {
  selectedMuscles: string[];
  onMuscleToggle: (muscle: string) => void;
  onContinue: () => void;
  onAddMuscle?: () => void;
  showAddMuscleModal?: boolean;
  onCloseAddMuscleModal?: () => void;
  onAddMuscleConfirm?: (muscle: string) => void;
}

export const MuscleGroupSelection = ({
  selectedMuscles,
  onMuscleToggle,
  onContinue,
  onAddMuscle,
  showAddMuscleModal,
  onCloseAddMuscleModal,
  onAddMuscleConfirm,
}: MuscleGroupSelectionProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="mx-auto max-w-4xl"
    >
      <div className="mb-8 text-center">
        <h2 className="mb-2 text-2xl font-bold text-gray-200">
          Select Target Muscle Groups
        </h2>
        <p className="text-gray-400">
          Choose the muscles you want to work today
        </p>
      </div>

      <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-3">
        {muscleGroups.map((muscle: MuscleGroupOption) => (
          <motion.div
            key={muscle.name}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onMuscleToggle(muscle.name)}
            className={`cursor-pointer rounded-xl p-6 transition-all duration-300 ${
              selectedMuscles.includes(muscle.name)
                ? `bg-gradient-to-r ${muscle.color} shadow-lg shadow-cyan-500/25`
                : "border border-slate-700 bg-slate-800/50 hover:border-slate-600"
            }`}
          >
            <div className="text-center">
              <div className="mb-2 text-3xl">{muscle.emoji}</div>
              <h3
                className={`mb-1 font-semibold ${
                  selectedMuscles.includes(muscle.name)
                    ? "text-white"
                    : "text-gray-200"
                }`}
              >
                {muscle.name}
              </h3>
              <p
                className={`text-sm ${
                  selectedMuscles.includes(muscle.name)
                    ? "text-gray-100"
                    : "text-gray-400"
                }`}
              >
                {muscle.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {selectedMuscles.length > 0 && (
        <div className="text-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onContinue}
            className="mx-auto flex items-center gap-2 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-500 px-8 py-3 font-semibold text-white"
          >
            Continue to Exercises <ArrowRight className="h-4 w-4" />
          </motion.button>
        </div>
      )}
    </motion.div>
  );
};
