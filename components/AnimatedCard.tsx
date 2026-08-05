"use client";

import { motion } from "framer-motion";

export default function AnimatedCard({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 35,
        scale: 0.96,
      }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      transition={{
        type: "spring",
        stiffness: 70,
        damping: 18,
        mass: 0.8,
        delay,
      }}
    >
      {children}
    </motion.div>
  );
}