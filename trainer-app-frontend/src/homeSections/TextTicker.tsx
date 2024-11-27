"use client";
import { motion } from "framer-motion";
import CodeIcon from "@/assets/icons/tickerIcons/code_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg";
import HandShakeIcon from "@/assets/icons/tickerIcons/handshake_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg";
import RecommendIcon from "@/assets/icons/tickerIcons/recommend_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg";
import LockIcon from "@/assets/icons/tickerIcons/encrypted_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg";
import UserIcon from "@/assets/icons/tickerIcons/verified_user_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg";
import ThumbsUpIcon from "@/assets/icons/tickerIcons/thumb_up_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg";
import WorkSpaceIcon from "@/assets/icons/tickerIcons/workspace_premium_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg";

export const TextTicker = () => {
  return (
    <div className="py-8 md:py-12 bg-white">
      <div className="container">
        <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black,transparent)]">
          <motion.div
            className="flex gap-6 flex-none pr-14"
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
            <CodeIcon className="fill-gray-600  size-8" />
            <p className="textTicker-words">Interactive</p>
            <HandShakeIcon className="fill-gray-600  size-8" />
            <p className="textTicker-words">Performant</p>
            <RecommendIcon className="fill-gray-600  size-8" />
            <p className="textTicker-words">Accessible</p>
            <LockIcon className="fill-gray-600  size-8" />
            <p className="textTicker-words">Secure</p>
            <UserIcon className="fill-gray-600  size-8" />
            <p className="textTicker-words">User Friendly</p>
            <ThumbsUpIcon className="fill-gray-600  size-8" />
            <p className="textTicker-words">Practical</p>
            <WorkSpaceIcon className="fill-gray-600  size-8" />

            {/* Second set of words for animation */}
            <p className="textTicker-words">Responsive</p>
            <CodeIcon className="fill-gray-600  size-8" />
            <p className="textTicker-words">Interactive</p>
            <HandShakeIcon className="fill-gray-600  size-8" />
            <p className="textTicker-words">Performant</p>
            <RecommendIcon className="fill-gray-600  size-8" />
            <p className="textTicker-words">Accessible</p>
            <LockIcon className="fill-gray-600  size-8" />
            <p className="textTicker-words">Secure</p>
            <UserIcon className="fill-gray-600  size-8" />
            <p className="textTicker-words">User Friendly</p>
            <ThumbsUpIcon className="fill-gray-600  size-8" />
            <p className="textTicker-words">Practical</p>
            <WorkSpaceIcon className="fill-gray-600  size-8" />
          </motion.div>
        </div>
      </div>
    </div>
  );
};
