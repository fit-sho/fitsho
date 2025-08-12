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
      className="max-w-4xl mx-auto"
    >
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">Select Target Muscle Groups</h2>
        <p className="text-gray-400">Choose the muscles you want to work today</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        {muscleGroups.map((muscle: MuscleGroupOption) => (
          <motion.div
            key={muscle.name}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onMuscleToggle(muscle.name)}
            className={`p-6 rounded-xl cursor-pointer transition-all duration-300 ${
              selectedMuscles.includes(muscle.name)
                ? `bg-gradient-to-r ${muscle.color} shadow-lg shadow-cyan-500/25`
                : "bg-slate-800/50 border border-slate-700 hover:border-slate-600"
            }`}
          >
            <div className="text-center">
              <div className="text-3xl mb-2">{muscle.emoji}</div>
              <h3 className="font-semibold mb-1">{muscle.name}</h3>
              <p className="text-sm text-gray-400">{muscle.description}</p>
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
            className="bg-gradient-to-r from-cyan-500 to-purple-500 px-8 py-3 rounded-lg font-semibold flex items-center gap-2 mx-auto"
          >
            Continue to Exercises <ArrowRight className="w-4 h-4" />
          </motion.button>
        </div>
      )}
    </motion.div>
  );
};
