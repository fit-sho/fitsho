"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import productImage from "@/assets/images/homeImages/product-image.png";
import pyramidImage from "@/assets/images/homeImages/pyramid.png";
import tubeImage from "@/assets/images/homeImages/tube.png";
import { useRef } from "react";
export const ProductShowcase = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const translateY = useTransform(scrollYProgress, [0, 1], [150, -150]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-x-clip bg-gradient-to-b from-white via-slate-50 to-slate-100 py-24"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 animate-pulse bg-[radial-gradient(ellipse_at_top,rgba(6,182,212,0.1),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_48%,rgba(147,51,234,0.05)_49%,rgba(147,51,234,0.05)_51%,transparent_52%)] bg-[length:20px_20px]"></div>
      <div className="container relative z-10">
        <div className="section-heading">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex justify-center"
          >
            <div className="border-gradient-to-r group inline-flex items-center rounded-full border border-cyan-500/20 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 px-8 py-4 backdrop-blur-sm transition-all duration-300 hover:border-cyan-400/40">
              <span className="bg-gradient-to-r from-cyan-600 to-purple-600 bg-clip-text font-semibold text-transparent">
                🚀 Next-Gen Fitness Tracking
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="mt-8 bg-gradient-to-r from-slate-900 via-purple-800 to-slate-900 bg-clip-text text-center text-4xl font-bold leading-tight text-transparent md:text-6xl">
              Revolutionary Progress
              <span className="block bg-gradient-to-r from-cyan-600 to-purple-600 bg-clip-text text-3xl text-transparent md:text-5xl">
                Tracking Experience
              </span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <p className="mx-auto mt-6 max-w-3xl text-center text-lg leading-relaxed text-gray-600">
              Experience the future of fitness with our
              <span className="font-semibold text-cyan-600">
                AI-powered analytics
              </span>
              ,
              <span className="font-semibold text-purple-600">
                real-time insights
              </span>
              , and
              <span className="font-semibold text-pink-600">
                personalized recommendations
              </span>
              that adapt to your unique fitness journey.
            </p>
          </motion.div>
        </div>
        <motion.div
          className="relative mt-16"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          {/* Glowing Frame */}
          <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 blur-xl"></div>

          {/* Main Product Image with Glass Effect */}
          <div className="relative rounded-2xl border border-white/20 bg-white/80 p-2 shadow-2xl backdrop-blur-sm">
            <Image
              src={productImage}
              alt="Futuristic Product Showcase"
              className="rounded-xl shadow-lg"
            />

            {/* Holographic Overlay */}
            <div className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-tr from-cyan-500/10 via-transparent to-purple-500/10"></div>
          </div>

          {/* Floating Elements */}
          <motion.img
            src={pyramidImage.src}
            alt="Floating Pyramid"
            className="absolute -right-36 -top-32 hidden opacity-60 md:block"
            height={262}
            width={262}
            style={{
              translateY,
              filter: "drop-shadow(0 10px 20px rgba(6, 182, 212, 0.3))",
            }}
          />
          <motion.img
            src={tubeImage.src}
            alt="Floating Tube"
            className="absolute -bottom-32 -left-36 hidden opacity-60 md:block"
            height={248}
            width={248}
            style={{
              translateY,
              filter: "drop-shadow(0 10px 20px rgba(147, 51, 234, 0.3))",
            }}
          />

          {/* Animated Particles */}
          <div className="pointer-events-none absolute inset-0">
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute h-2 w-2 rounded-full bg-gradient-to-r from-cyan-400 to-purple-400"
                style={{
                  left: `${20 + i * 7}%`,
                  top: `${10 + i * 5}%`,
                }}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0.3, 1, 0.3],
                  scale: [0.8, 1.2, 0.8],
                }}
                transition={{
                  duration: 3 + i * 0.2,
                  repeat: Infinity,
                  delay: i * 0.3,
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-100 to-transparent"></div>
    </section>
  );
};
