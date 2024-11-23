"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import productImage from "@/assets/images/product-image.png";
import pyramidImage from "@/assets/images/pyramid.png";
import tubeImage from "@/assets/images/tube.png";
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
      className="bg-gradient-to-b from-[#FFFFFF] to-[#D2DCFF] py-24 overflow-x-clip"
    >
      <div className="container">
        <div className="section-heading">
          <div className="flex justify-center">
            <div className="tag">
              <a href="#" className="hover:text-gray-600">
                Boost your Productivty
              </a>
            </div>
          </div>
          <h2 className="section-title mt-5">
            A more effective way to track progress
          </h2>
          <p className="section-description mt-5">
            Effortlessly track your progress and stay motivated with our fully
            functional, responsive and user-friendly fitness app. Fitsho is your
            companion in achieving a healthier, stronger life.
          </p>
        </div>
        <div className="relative">
          <Image src={productImage} alt="Product Showcase" className="mt-10" />
          <motion.img
            src={pyramidImage.src}
            alt="Pyramid Image"
            className="hidden md:block absolute -right-36 -top-32 "
            height={262}
            width={262}
            style={{ translateY }}
          />
          <motion.img
            src={tubeImage.src}
            alt="Tube Image"
            className="hidden md:block absolute bottom-24 -left-36"
            height={248}
            width={248}
            style={{ translateY }}
          />
        </div>
      </div>
    </section>
  );
};
