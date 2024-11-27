"use client";
import dumbell from "@/assets/images/homeImages/dumbbell_no_background.png";
import ArrowRight from "@/assets/icons/ArrowRight.svg";
import { motion } from "framer-motion";
import { SectionTitle } from "@/components/SectionTitle";
import { SectionDesc } from "@/components/SectionDesc";

export const Hero = () => {
  return (
    <section className="pt-8 pb-20 bg-[radial-gradient(ellipse_200%_100%_at_bottom_left,#183EC2,#EAEEFE_80%)] overflow-x-clip">
      <div className="container">
        <div className="md:flex items-center">
          <div className="md:w-[478px]">
            <div className="tag">
              <a href="#" className="hover:text-gray-600">
                Test the Beta version now!
              </a>
            </div>
            <SectionTitle title="Fitsho Fitness App" className="mt-6" />
            <SectionDesc
              description="Discover personalized workouts, nutrition tips, and daily
              motivation to reach your fitness goals. Fitsho is your companion
              in achieving a healthier, stronger, and more confident version of
              yourself."
              className="mt-6"
            />
            <div className="flex gap-4 items-center mt-[30px]">
              <a href="/#">
                <button className="btn btn-primary ">Get Started</button>
              </a>
              <a href="/about">
                <button className="btn btn-text gap-1 border border-[#222]/10">
                  <span>Learn More</span>
                  <ArrowRight className="h-5 w-5 fill-black" />
                </button>
              </a>
            </div>
          </div>
          <div className="mt-20 md:mt-0 md:h-[300px] lg:h-[478px] md:flex-1 relative">
            <motion.img
              src={dumbell.src}
              alt="Dumbell"
              className="md:absolute md:h-full md:w-auto md:max-w-none md:-left-1 lg:left-36 rotate-[-5deg] "
              animate={{
                translateY: [-30, 30],
                rotate: 0,
              }}
              whileHover={{
                rotate: 20,
              }}
              transition={{
                repeat: Infinity,
                duration: 3,
                repeatType: "mirror",
                ease: "easeInOut",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
