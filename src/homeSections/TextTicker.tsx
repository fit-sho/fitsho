"use client";
import { motion } from "framer-motion";
import {
  Code,
  Handshake,
  TrendingUp,
  Lock,
  UserCheck,
  ThumbsUp,
  Cloud,
} from "lucide-react";

export const TextTicker = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-gray-900 to-slate-900 py-16 md:py-20">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 animate-pulse bg-[linear-gradient(rgba(6,182,212,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.1)_1px,transparent_1px)] bg-[size:50px_50px]"></div>

      {/* Glowing Orbs */}
      <div className="absolute left-1/4 top-1/4 h-32 w-32 animate-pulse rounded-full bg-cyan-500/20 blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 h-40 w-40 animate-pulse rounded-full bg-purple-500/20 blur-3xl delay-1000"></div>

      <div className="container relative z-10">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <h2 className="mb-4 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-3xl font-bold text-transparent md:text-4xl">
            Powered by Advanced Technology
          </h2>
          <p className="text-lg text-gray-400">
            Experience the cutting-edge features that set us apart
          </p>
        </div>

        <div className="relative flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]">
          {/* Glowing Border Effect */}
          <div className="absolute inset-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent"></div>
          <div className="absolute inset-0 bottom-0 h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent"></div>

          <motion.div
            className="flex flex-none gap-8 py-8 pr-16"
            animate={{
              translateX: "-50%",
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear",
              repeatType: "loop",
            }}
          >
            {/* First Set */}
            <div className="flex items-center gap-4 rounded-full border border-cyan-500/20 bg-gradient-to-r from-cyan-500/10 to-transparent px-6 py-3 backdrop-blur-sm">
              <Code className="size-6 text-cyan-400" />
              <span className="whitespace-nowrap text-lg font-semibold text-white">
                AI-Powered
              </span>
            </div>

            <div className="flex items-center gap-4 rounded-full border border-purple-500/20 bg-gradient-to-r from-purple-500/10 to-transparent px-6 py-3 backdrop-blur-sm">
              <Handshake className="size-6 text-purple-400" />
              <span className="whitespace-nowrap text-lg font-semibold text-white">
                Interactive
              </span>
            </div>

            <div className="flex items-center gap-4 rounded-full border border-green-500/20 bg-gradient-to-r from-green-500/10 to-transparent px-6 py-3 backdrop-blur-sm">
              <TrendingUp className="size-6 text-green-400" />
              <span className="whitespace-nowrap text-lg font-semibold text-white">
                Smart Analytics
              </span>
            </div>

            <div className="flex items-center gap-4 rounded-full border border-blue-500/20 bg-gradient-to-r from-blue-500/10 to-transparent px-6 py-3 backdrop-blur-sm">
              <Lock className="size-6 text-blue-400" />
              <span className="whitespace-nowrap text-lg font-semibold text-white">
                Secure
              </span>
            </div>

            <div className="flex items-center gap-4 rounded-full border border-yellow-500/20 bg-gradient-to-r from-yellow-500/10 to-transparent px-6 py-3 backdrop-blur-sm">
              <UserCheck className="size-6 text-yellow-400" />
              <span className="whitespace-nowrap text-lg font-semibold text-white">
                Personalized
              </span>
            </div>

            <div className="flex items-center gap-4 rounded-full border border-pink-500/20 bg-gradient-to-r from-pink-500/10 to-transparent px-6 py-3 backdrop-blur-sm">
              <ThumbsUp className="size-6 text-pink-400" />
              <span className="whitespace-nowrap text-lg font-semibold text-white">
                Intuitive
              </span>
            </div>

            <div className="flex items-center gap-4 rounded-full border border-indigo-500/20 bg-gradient-to-r from-indigo-500/10 to-transparent px-6 py-3 backdrop-blur-sm">
              <Cloud className="size-6 text-indigo-400" />
              <span className="whitespace-nowrap text-lg font-semibold text-white">
                Cloud-Synced
              </span>
            </div>

            {/* Second Set for Seamless Loop */}
            <div className="flex items-center gap-4 rounded-full border border-cyan-500/20 bg-gradient-to-r from-cyan-500/10 to-transparent px-6 py-3 backdrop-blur-sm">
              <Code className="size-6 text-cyan-400" />
              <span className="whitespace-nowrap text-lg font-semibold text-white">
                AI-Powered
              </span>
            </div>

            <div className="flex items-center gap-4 rounded-full border border-purple-500/20 bg-gradient-to-r from-purple-500/10 to-transparent px-6 py-3 backdrop-blur-sm">
              <Handshake className="size-6 text-purple-400" />
              <span className="whitespace-nowrap text-lg font-semibold text-white">
                Interactive
              </span>
            </div>

            <div className="flex items-center gap-4 rounded-full border border-green-500/20 bg-gradient-to-r from-green-500/10 to-transparent px-6 py-3 backdrop-blur-sm">
              <TrendingUp className="size-6 text-green-400" />
              <span className="whitespace-nowrap text-lg font-semibold text-white">
                Smart Analytics
              </span>
            </div>

            <div className="flex items-center gap-4 rounded-full border border-blue-500/20 bg-gradient-to-r from-blue-500/10 to-transparent px-6 py-3 backdrop-blur-sm">
              <Lock className="size-6 text-blue-400" />
              <span className="whitespace-nowrap text-lg font-semibold text-white">
                Secure
              </span>
            </div>

            <div className="flex items-center gap-4 rounded-full border border-yellow-500/20 bg-gradient-to-r from-yellow-500/10 to-transparent px-6 py-3 backdrop-blur-sm">
              <UserCheck className="size-6 text-yellow-400" />
              <span className="whitespace-nowrap text-lg font-semibold text-white">
                Personalized
              </span>
            </div>

            <div className="flex items-center gap-4 rounded-full border border-pink-500/20 bg-gradient-to-r from-pink-500/10 to-transparent px-6 py-3 backdrop-blur-sm">
              <ThumbsUp className="size-6 text-pink-400" />
              <span className="whitespace-nowrap text-lg font-semibold text-white">
                Intuitive
              </span>
            </div>

            <div className="flex items-center gap-4 rounded-full border border-indigo-500/20 bg-gradient-to-r from-indigo-500/10 to-transparent px-6 py-3 backdrop-blur-sm">
              <Cloud className="size-6 text-indigo-400" />
              <span className="whitespace-nowrap text-lg font-semibold text-white">
                Cloud-Synced
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
