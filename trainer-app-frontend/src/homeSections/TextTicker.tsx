"use client";

import { motion } from "framer-motion";

export const TextTicker = () => {
  return (
    <div className="py-8 md:py-12 bg-white">
      <div className="container">
        <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black,transparent)]">
          <motion.div
            className="flex gap-14 flex-none pr-14"
            animate={{
              translateX: "-50%",
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
              repeatType: "loop",
            }}
          >
            <p className="textTicker-words">Responsive</p>
            <p className="textTicker-words">Interactive</p>
            <p className="textTicker-words">Performant</p>
            <p className="textTicker-words">Accessible</p>
            <p className="textTicker-words">Secure</p>
            <p className="textTicker-words">User Friendly</p>
            <p className="textTicker-words">Practical</p>

            {/* Second set of words for animation */}
            <p className="textTicker-words">Responsive</p>
            <p className="textTicker-words">Interactive</p>
            <p className="textTicker-words">Performant</p>
            <p className="textTicker-words">Accessible</p>
            <p className="textTicker-words">Secure</p>
            <p className="textTicker-words">User Friendly</p>
            <p className="textTicker-words">Practical</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
