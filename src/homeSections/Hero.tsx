"use client";
import dumbell from "@/assets/images/homeImages/dumbbell_no_background.png";
import ArrowRight from "@/assets/icons/ArrowRight.svg";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";

export const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 pb-20 pt-8">
      {/* Animated Background */}
      <div className="absolute inset-0 animate-pulse bg-[radial-gradient(ellipse_at_center,rgba(120,119,198,0.3),transparent_50%)]"></div>

      {/* Floating Particles */}
      <div className="absolute inset-0">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-2 w-2 rounded-full bg-cyan-400 opacity-15"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0.1, 0.6, 0.1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Interactive Cursor Glow */}
      <motion.div
        className="pointer-events-none absolute h-96 w-96 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 blur-3xl"
        style={{
          left: mousePosition.x - 192,
          top: mousePosition.y - 192,
        }}
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
      />
      <div className="container relative z-10">
        <div className="min-h-screen items-center md:flex">
          <div className="md:w-[478px]">
            {/* Futuristic Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <a
                className="group inline-flex items-center rounded-full border border-cyan-500/20 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 px-6 py-3 text-cyan-300 backdrop-blur-sm transition-all duration-300 hover:border-cyan-400/40"
                href="/login"
              >
                <span className="relative">
                  🚀 Experience the Future of Fitness
                  <span className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-400 opacity-0 blur-sm transition-opacity duration-300 group-hover:opacity-20"></span>
                </span>
              </a>
            </motion.div>

            {/* Futuristic Title */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-8"
            >
              <h1 className="bg-gradient-to-r from-white via-cyan-200 to-purple-200 bg-clip-text text-5xl font-bold leading-tight text-transparent md:text-7xl">
                Fitsho
                <span className="block bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-4xl text-transparent md:text-6xl">
                  Fitness AI
                </span>
              </h1>
            </motion.div>

            {/* Modern Description */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-6"
            >
              <p className="text-lg leading-relaxed text-gray-300">
                Revolutionize your fitness journey with AI-powered workouts,
                <span className="font-semibold text-cyan-300">
                  {" "}
                  smart nutrition tracking
                </span>
                , and
                <span className="font-semibold text-purple-300">
                  {" "}
                  real-time progress analytics
                </span>
                . The future of fitness is here.
              </p>
            </motion.div>
            {/* Futuristic Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-10 flex flex-col items-start gap-6 sm:flex-row"
            >
              <motion.a
                href="/signup"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative"
              >
                <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-500 opacity-60 blur transition duration-300 group-hover:opacity-100"></div>
                <button className="relative flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-500 px-8 py-4 font-bold text-white transition-all duration-300 hover:from-cyan-400 hover:to-purple-400">
                  <span>Launch Experience</span>
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    🚀
                  </motion.div>
                </button>
              </motion.a>

              <motion.a
                href="/about"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group"
              >
                <button className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-8 py-4 font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-white/30 hover:bg-white/10">
                  <span>Explore Features</span>
                  <ArrowRight className="h-5 w-5 fill-white transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </motion.a>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="mt-12 flex gap-8"
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-cyan-400">10K+</div>
                <div className="text-sm text-gray-400">Active Users</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">50M+</div>
                <div className="text-sm text-gray-400">Workouts Completed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">4.9★</div>
                <div className="text-sm text-gray-400">User Rating</div>
              </div>
            </motion.div>
          </div>
          {/* Futuristic Dumbbell with Holographic Effect */}
          <div className="relative mt-20 flex items-center justify-center md:mt-0 md:flex-1">
            {/* Holographic Rings */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <div className="h-96 w-96 rounded-full border border-cyan-500/30"></div>
            </motion.div>
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            >
              <div className="h-80 w-80 rounded-full border border-purple-500/20"></div>
            </motion.div>

            {/* Enhanced Dumbbell */}
            <motion.div
              className="relative z-10"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <motion.div
                animate={{
                  translateY: [-20, 20],
                  rotate: [-2, 2],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 4,
                  repeatType: "mirror",
                  ease: "easeInOut",
                }}
                className="relative mx-auto flex h-[300px] w-[300px] items-center justify-center md:h-[400px] md:w-[400px] lg:h-[500px] lg:w-[500px]"
                style={{
                  filter:
                    "drop-shadow(0 0 20px rgba(6, 182, 212, 0.5)) drop-shadow(0 0 40px rgba(147, 51, 234, 0.3))",
                }}
              >
                <Image
                  src={dumbell}
                  alt="Futuristic Dumbbell"
                  className="h-full w-full object-contain"
                  priority
                  width={500}
                  height={500}
                />
              </motion.div>
            </motion.div>

            {/* Energy Particles around Dumbbell */}
            <div className="absolute inset-0">
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute h-1 w-1 rounded-full bg-cyan-400"
                  style={{
                    left: "50%",
                    top: "50%",
                  }}
                  animate={{
                    x: [0, Math.cos((i * 45 * Math.PI) / 180) * 100],
                    y: [0, Math.sin((i * 45 * Math.PI) / 180) * 100],
                    opacity: [1, 0],
                    scale: [0, 1, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"></div>
    </section>
  );
};
