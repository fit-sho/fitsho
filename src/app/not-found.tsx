"use client";
import { motion } from "framer-motion";
import { AlertTriangle, Home, ArrowLeft, Search } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="animated-bg">
      {/* Animated Background */}
      <div className="animated-bg-overlay"></div>

      {/* Floating Particles */}
      <div className="floating-particles">
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

      <div className="animated-bg-content z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        {/* 404 Icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-8 flex justify-center"
        >
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-purple-500 text-white shadow-lg">
            <AlertTriangle className="h-12 w-12" />
          </div>
        </motion.div>

        {/* 404 Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8"
        >
          <h1 className="mb-4 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-8xl font-bold text-transparent md:text-9xl">
            404
          </h1>
          <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
            Page Not Found
          </h2>
          <p className="mx-auto max-w-2xl text-xl leading-relaxed text-slate-300">
            Oops! It looks like you've wandered off the beaten path. The page
            you're looking for doesn't exist or has been moved.
          </p>
        </motion.div>

        {/* Error Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-12"
        >
          <div className="mx-auto max-w-2xl rounded-xl border border-slate-700/50 bg-slate-800/50 p-6 backdrop-blur-sm">
            <h3 className="mb-4 text-lg font-bold text-white">
              What happened?
            </h3>
            <ul className="space-y-2 text-left text-slate-300">
              <li className="flex items-start">
                <div className="mr-3 mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-cyan-400"></div>
                The page URL might be typed incorrectly
              </li>
              <li className="flex items-start">
                <div className="mr-3 mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-cyan-400"></div>
                The page might have been moved or deleted
              </li>
              <li className="flex items-start">
                <div className="mr-3 mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-cyan-400"></div>
                You might not have permission to access this page
              </li>
              <li className="flex items-start">
                <div className="mr-3 mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-cyan-400"></div>
                The link you followed might be broken
              </li>
            </ul>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-12 flex flex-col justify-center gap-4 sm:flex-row"
        >
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-cyan-500 to-purple-500 px-8 py-4 text-base font-medium text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-cyan-500/25"
          >
            <Home className="mr-2 h-5 w-5" />
            Back to Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center rounded-xl border border-slate-600 bg-slate-800/50 px-8 py-4 text-base font-medium text-white backdrop-blur-sm transition-all duration-300 hover:bg-slate-700/50"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Go Back
          </button>
          <Link
            href="/help"
            className="inline-flex items-center justify-center rounded-xl border border-slate-600 bg-slate-800/50 px-8 py-4 text-base font-medium text-white backdrop-blur-sm transition-all duration-300 hover:bg-slate-700/50"
          >
            <Search className="mr-2 h-5 w-5" />
            Get Help
          </Link>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center"
        >
          <h3 className="mb-6 text-lg font-bold text-white">
            Or try these popular pages:
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { name: "Features", href: "/features" },
              { name: "Pricing", href: "/pricing" },
              { name: "About", href: "/about" },
              { name: "Workout", href: "/workout" },
              { name: "Help", href: "/help" },
            ].map((link, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 1.0 + index * 0.1 }}
              >
                <Link
                  href={link.href}
                  className="inline-block rounded-lg border border-cyan-500/30 px-4 py-2 text-cyan-400 transition-colors duration-300 hover:border-cyan-400/50 hover:text-cyan-300"
                >
                  {link.name}
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Footer Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="mt-16"
        >
          <p className="text-sm text-slate-400">
            Still having trouble? Contact our support team at{" "}
            <a
              href="mailto:support@fitSho.com"
              className="text-cyan-400 transition-colors duration-300 hover:text-cyan-300"
            >
              support@fitSho.com
            </a>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
