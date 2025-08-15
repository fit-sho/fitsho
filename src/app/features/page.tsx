"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Dumbbell,
  FileText,
  TrendingUp,
  Users,
  ArrowRight,
} from "lucide-react";

// Feature card component
const FeatureCard = ({
  title,
  description,
  icon,
  index,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className="group relative overflow-hidden rounded-xl border border-slate-700/50 bg-slate-800/50 backdrop-blur-sm transition-all duration-300 hover:border-cyan-500/50"
  >
    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    <div className="relative p-6">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500 to-purple-500 text-white">
          {icon}
        </div>
        <div className="opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <ArrowRight className="h-5 w-5 text-cyan-400" />
        </div>
      </div>
      <h3 className="mb-2 text-xl font-bold text-white">{title}</h3>
      <p className="leading-relaxed text-slate-300">{description}</p>
    </div>
  </motion.div>
);

// Testimonial component
const Testimonial = ({
  quote,
  author,
  role,
}: {
  quote: string;
  author: string;
  role: string;
}) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5 }}
    className="rounded-xl border border-slate-700/50 bg-slate-800/50 p-6 backdrop-blur-sm"
  >
    <svg
      className="mb-4 h-8 w-8 text-cyan-400"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
    </svg>
    <p className="mb-4 italic text-slate-300">{quote}</p>
    <div>
      <p className="font-bold text-white">{author}</p>
      <p className="text-sm text-slate-400">{role}</p>
    </div>
  </motion.div>
);

export default function FeaturesPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Animated Background */}
      <div className="absolute inset-0 animate-pulse bg-[radial-gradient(ellipse_at_center,rgba(120,119,198,0.3),transparent_50%)]"></div>

      {/* Floating Particles */}
      <div className="absolute inset-0">
        {[
          { left: 15, top: 20 },
          { left: 85, top: 30 },
          { left: 25, top: 60 },
          { left: 70, top: 15 },
          { left: 45, top: 80 },
          { left: 90, top: 70 },
          { left: 10, top: 45 },
          { left: 60, top: 90 },
        ].map((position, i) => (
          <motion.div
            key={i}
            className="absolute h-2 w-2 rounded-full bg-cyan-400 opacity-15"
            style={{
              left: `${position.left}%`,
              top: `${position.top}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0.1, 0.6, 0.1],
            }}
            transition={{
              duration: 3 + i * 0.3,
              repeat: Infinity,
              delay: i * 0.4,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Hero section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="py-16 text-center md:py-24"
        >
          <h1 className="mb-6 bg-gradient-to-r from-white via-cyan-200 to-purple-200 bg-clip-text text-4xl font-bold text-transparent md:text-5xl">
            Powerful Features for Fitness Professionals and Enthusiasts
          </h1>
          <p className="mx-auto max-w-3xl text-xl leading-relaxed text-slate-300">
            Our comprehensive fitness platform helps trainers manage clients and
            workout plans while enabling fitness enthusiasts to track their
            progress effectively.
          </p>
          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/signup"
              className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-cyan-500 to-purple-500 px-8 py-4 text-base font-medium text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-cyan-500/25"
            >
              Get Started Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              href="/workout"
              className="inline-flex items-center justify-center rounded-xl border border-slate-600 bg-slate-800/50 px-8 py-4 text-base font-medium text-white backdrop-blur-sm transition-all duration-300 hover:bg-slate-700/50"
            >
              Try Demo
            </Link>
          </div>
        </motion.div>

        {/* Features grid */}
        <div className="py-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-center text-3xl font-bold text-transparent"
          >
            Everything You Need to Succeed
          </motion.h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <FeatureCard
              title="Exercise Library"
              description="Access a comprehensive database of exercises with descriptions and video demonstrations to build effective workout routines."
              icon={<Dumbbell className="h-6 w-6" />}
              index={0}
            />

            <FeatureCard
              title="Workout Templates"
              description="Create and save customized workout templates with specific exercises, sets, and reps for quick assignment to clients."
              icon={<FileText className="h-6 w-6" />}
              index={1}
            />

            <FeatureCard
              title="Progress Tracking"
              description="Monitor workout completion, track performance metrics, and visualize improvements over time with detailed analytics."
              icon={<TrendingUp className="h-6 w-6" />}
              index={2}
            />

            <FeatureCard
              title="Client Management"
              description="Efficiently manage client relationships, assign personalized workouts, and provide feedback on their performance."
              icon={<Users className="h-6 w-6" />}
              index={3}
            />
          </div>
        </div>

        {/* How it works section */}
        <div className="border-t border-slate-700/50 py-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-12 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-center text-3xl font-bold text-transparent"
          >
            How It Works
          </motion.h2>

          <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              {
                step: "1",
                title: "Create Workouts",
                description:
                  "Build custom workout templates with exercises, sets, and reps tailored to specific goals.",
              },
              {
                step: "2",
                title: "Assign to Clients",
                description:
                  "Quickly assign workout plans to clients or schedule them for yourself.",
              },
              {
                step: "3",
                title: "Track Progress",
                description:
                  "Monitor completion, track performance metrics, and visualize improvements over time.",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                className="text-center"
              >
                <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-purple-500 text-white shadow-lg">
                  <span className="text-2xl font-bold">{item.step}</span>
                </div>
                <h3 className="mb-2 text-xl font-bold text-white">
                  {item.title}
                </h3>
                <p className="leading-relaxed text-slate-300">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA section */}
        <div className="border-t border-slate-700/50 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="overflow-hidden rounded-xl border border-slate-600/50 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 shadow-xl backdrop-blur-sm"
          >
            <div className="px-6 py-12 text-center md:flex md:items-center md:justify-between md:p-12 md:text-left">
              <div>
                <h2 className="bg-gradient-to-r from-white to-slate-200 bg-clip-text text-2xl font-bold text-transparent md:text-3xl">
                  Ready to elevate your fitness journey?
                </h2>
                <p className="mt-2 text-lg text-slate-300 md:mt-4">
                  Join thousands of trainers and fitness enthusiasts today.
                </p>
              </div>
              <div className="mt-6 md:mt-0">
                <Link
                  href="/signup"
                  className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-cyan-500 to-purple-500 px-8 py-4 text-base font-medium text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-cyan-500/25"
                >
                  Get Started Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
