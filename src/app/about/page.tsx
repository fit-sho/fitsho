"use client";
import { motion } from "framer-motion";
import { Target, Users, Zap, Heart, Award, Rocket } from "lucide-react";

export default function AboutPage() {
  const values = [
    {
      icon: <Target className="h-6 w-6" />,
      title: "Mission-Driven",
      description:
        "We're dedicated to making fitness accessible and effective for everyone, from beginners to professional athletes.",
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Community First",
      description:
        "Building strong connections between trainers and clients through technology that enhances human relationships.",
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Innovation",
      description:
        "Constantly evolving our platform with cutting-edge features and user-centered design principles.",
    },
    {
      icon: <Heart className="h-6 w-6" />,
      title: "Wellness Focus",
      description:
        "Promoting holistic health and sustainable fitness practices that improve quality of life.",
    },
  ];

  const stats = [
    { number: "0", label: "Active Users" },
    { number: "0", label: "Certified Trainers" },
    { number: "0", label: "Workouts Completed" },
    { number: "0", label: "Countries Served" },
  ];

  const team = [
    {
      name: "Arash Shalchian",
      role: "CEO & Co-Founder",
      bio: "I haven't thought of a bio yet",
    },
  ];

  return (
    <div className="animated-bg">
      {/* Animated Background */}
      <div className="animated-bg-overlay"></div>

      {/* Floating Particles */}
      <div className="floating-particles">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              x: [-10, 10, -10],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="animated-bg-content mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <div className="mb-6 flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-purple-500 text-white shadow-lg">
              <Rocket className="h-8 w-8" />
            </div>
          </div>
          <h1 className="mb-6 bg-gradient-to-r from-white via-cyan-200 to-purple-200 bg-clip-text text-4xl font-bold text-transparent md:text-5xl">
            About FitSho
          </h1>
          <p className="mx-auto max-w-4xl text-xl leading-relaxed text-slate-300">
            We're revolutionizing the fitness industry by connecting trainers
            and clients through intelligent technology, making professional
            fitness guidance accessible to everyone, everywhere.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-20 grid grid-cols-2 gap-8 md:grid-cols-4"
        >
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="mb-2 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-3xl font-bold text-transparent md:text-4xl">
                {stat.number}
              </div>
              <div className="text-sm text-slate-300 md:text-base">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Our Story */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-20"
        >
          <div className="rounded-xl border border-slate-700/50 bg-slate-800/50 p-8 backdrop-blur-sm md:p-12">
            <h2 className="mb-6 text-center text-3xl font-bold text-white">
              Our Story
            </h2>
            <div className="prose prose-lg max-w-none">
              <p className="mb-6 leading-relaxed text-slate-300">
                FitSho was born from a simple observation: the fitness industry
                was stuck in the past. While technology had transformed every
                other aspect of our lives, fitness training remained fragmented,
                expensive, and inaccessible to many.
              </p>
              <p className="mb-6 leading-relaxed text-slate-300">
                Founded in 2025 by a team of fitness professionals and
                technologists, we set out to bridge this gap. Our platform
                combines the expertise of certified trainers with the power of
                modern technology, creating personalized fitness experiences
                that adapt to each user's goals, preferences, and progress.
              </p>
              <p className="leading-relaxed text-slate-300">
                Today, we're proud to serve thousands of users worldwide, from
                fitness enthusiasts taking their first steps to professional
                athletes pushing their limits. Our mission remains the same: to
                make quality fitness guidance accessible, affordable, and
                effective for everyone.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Values */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-20"
        >
          <h2 className="mb-12 text-center text-3xl font-bold text-white">
            Our Values
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                className="rounded-xl border border-slate-700/50 bg-slate-800/50 p-6 backdrop-blur-sm"
              >
                <div className="mb-4 flex items-center">
                  <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500 to-purple-500 text-white">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white">
                    {value.title}
                  </h3>
                </div>
                <p className="leading-relaxed text-slate-300">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Team */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="mb-20"
        >
          <h2 className="mb-12 text-center text-3xl font-bold text-white">
            Meet Our Team
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
                className="rounded-xl border border-slate-700/50 bg-slate-800/50 p-6 backdrop-blur-sm"
              >
                <div className="mb-4 flex items-center">
                  <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-purple-500 font-bold text-white">
                    {member.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">
                      {member.name}
                    </h3>
                    <p className="text-sm text-cyan-400">{member.role}</p>
                  </div>
                </div>
                <p className="leading-relaxed text-slate-300">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.4 }}
          className="text-center"
        >
          <div className="rounded-xl border border-slate-600/50 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 p-8 backdrop-blur-sm">
            <div className="mb-6 flex justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-purple-500 text-white shadow-lg">
                <Award className="h-8 w-8" />
              </div>
            </div>
            <h3 className="mb-4 text-2xl font-bold text-white">
              Ready to Transform Your Fitness Journey?
            </h3>
            <p className="mx-auto mb-6 max-w-2xl text-slate-300">
              Join thousands of users who have already discovered the power of
              personalized fitness training. Start your journey today and
              experience the difference.
            </p>
            <a
              href="/signup"
              className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-cyan-500 to-purple-500 px-8 py-4 text-base font-medium text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-cyan-500/25"
            >
              <Rocket className="mr-2 h-5 w-5" />
              Get Started Today
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
