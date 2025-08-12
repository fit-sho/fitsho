"use client";
import { ArrowRight } from "lucide-react";
import StarImage from "@/assets/images/homeImages/star.png";
import SpringImage from "@/assets/images/homeImages/spring.png";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export const CallToAction = () => {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const translateY = useTransform(scrollYProgress, [0, 1], [150, -150]);

  return (
    <section
      ref={sectionRef}
      className="overflow-x-clip bg-gradient-to-b from-white to-[#D2DCFF] py-24"
    >
      <div className="container">
        <div className="section-heading relative">
          <h2 className="mt-5 text-center text-3xl font-bold tracking-tighter text-black md:text-5xl">
            Sign up for free today
          </h2>
          <p className="mt-5 text-center text-lg text-[#010D3E] md:text-xl">
            Celebrate the joy of accomplishment with an app designed to track
            your fitness progress and motivate your efforts.
          </p>
          <motion.img
            src={StarImage.src}
            alt="Star Image"
            width={360}
            className="absolute -left-[350px] -top-[137px]"
            style={{ translateY }}
          />
          <motion.img
            src={SpringImage.src}
            alt="Spring Image"
            width={360}
            className="absolute -right-[331px] -top-[19px]"
            style={{ translateY }}
          />
        </div>
        <div className="mt-10 flex justify-center gap-2">
          <a href="#">
            <button className="btn btn-primary">Get for free</button>
          </a>
          <a href="#">
            <button className="btn btn-text gap-1 border border-[#222]/10">
              <span>Learn more</span>
              <ArrowRight className="h-5 w-5 text-black" aria-hidden="true" />
            </button>
          </a>
        </div>
      </div>
    </section>
  );
};
