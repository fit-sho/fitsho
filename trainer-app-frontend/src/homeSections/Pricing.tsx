"use client";
import { motion } from "framer-motion";
import CheckIcon from "@/assets/icons/check.svg";
import { twMerge } from "tailwind-merge";
import Link from "next/link";
import { SectionTitle } from "@/components/SectionTitle";
import { SectionDesc } from "@/components/SectionDesc";

const pricingTiers = [
  {
    title: "Free",
    monthlyPrice: 0,
    buttonText: "Get started for free",
    popular: false,
    inverse: false,
    href: "#",
    features: [
      "Up to 5 project members",
      "Unlimited tasks and projects",
      "2GB storage",
      "Integrations",
      "Basic support",
    ],
  },
  {
    title: "Pro",
    monthlyPrice: 9,
    buttonText: "Sign up now",
    popular: true,
    href: "#",
    inverse: true,
    features: [
      "Up to 50 project members",
      "Unlimited tasks and projects",
      "50GB storage",
      "Integrations",
      "Priority support",
      "Advanced support",
      "Export support",
    ],
  },
  {
    title: "Business",
    monthlyPrice: 19,
    buttonText: "Sign up now",
    popular: false,
    href: "#",
    inverse: false,
    features: [
      "Up to 500 project members",
      "Unlimited tasks and projects",
      "200GB storage",
      "Integrations",
      "Dedicated account manager",
      "Custom fields",
      "Advanced analytics",
      "Export capabilities",
      "API access",
      "Advanced security features",
    ],
  },
];

export const Pricing = () => {
  return (
    <section className="py-24">
      <div className="container">
        <div className="section-heading">
          <SectionTitle title="Pricing" className="text-center mt-5" />
          <SectionDesc
            description="Free forever. Upgrade for unlimited plans, better secuirty and
            exclusive features."
            className="text-center mt-3"
          />
        </div>
        <div className="flex flex-col gap-6 items-center mt-10 lg:flex-row lg:items-end lg:justify-center">
          {pricingTiers.map(
            (
              {
                title,
                monthlyPrice,
                buttonText,
                popular,
                inverse,
                features,
                href,
              },
              index
            ) => (
              <div
                key={index}
                className={twMerge(
                  "p-10 border border-[#F1F1F1] bg-gray-50 rounded-3xl shadow-[0_7px_14px_#EAEAEA] max-w-xs w-full",
                  inverse === true && "border-black bg-black text-white "
                )}
              >
                <div className="flex justify-between">
                  <h3
                    className={twMerge(
                      "text-lg font-bold text-black/50",
                      inverse === true && "text-white/60"
                    )}
                  >
                    {title}
                  </h3>
                  {popular === true && (
                    <div className="inline-flex text-sm px-4 py-1.5 rounded-xl border border-white/20">
                      <motion.span
                        animate={{
                          backgroundPositionX: "-100%",
                        }}
                        transition={{
                          repeat: Infinity,
                          duration: 2,
                          repeatType: "loop",
                          ease: "linear",
                        }}
                        className="bg-[linear-gradient(to_right,#DD7DDF,#E1CD86,#BBCB92,#71C2EF,#3BFFFF,#DD7DDF,#E1CD86,#BBCB92,#71C2EF,#3BFFFF)] [background-size:200%] text-transparent bg-clip-text font-medium"
                      >
                        Popular
                      </motion.span>
                    </div>
                  )}
                </div>
                <div className="flex items-baseline gap-1 mt-[30px]">
                  <span className="text-4xl font-bold tracking-tighter leading-none">
                    ${monthlyPrice}
                  </span>
                  <span className="tracking-tight font-bold text-black/50">
                    /month
                  </span>
                </div>
                <Link
                  href={href}
                  className={twMerge(
                    "btn btn-primary w-full mt-[30px] flex justify-center items-center",
                    inverse === true && "bg-white text-black"
                  )}
                >
                  {buttonText}
                </Link>
                <ul className="flex flex-col gap-5 mt-8">
                  {features.map((feature, featureIndex) => (
                    <li
                      key={featureIndex}
                      className="text-sm flex items-center gap-4"
                    >
                      <CheckIcon className="h-6 w-6" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
};
