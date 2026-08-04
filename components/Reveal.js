"use client";

import { motion } from "framer-motion";

const VARIANTS = {
  up: { hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0 } },
  zoom: { hidden: { opacity: 0, scale: 0.94 }, show: { opacity: 1, scale: 1 } },
  fade: { hidden: { opacity: 0 }, show: { opacity: 1 } },
};

export default function Reveal({ children, as = "div", effect = "up", delay = 0, once = true, className }) {
  const MotionTag = motion[as] ?? motion.div;
  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount: 0.3 }}
      variants={VARIANTS[effect]}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </MotionTag>
  );
}

export function RevealGroup({ children, as = "div", stagger = 0.12, className }) {
  const MotionTag = motion[as] ?? motion.div;
  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ staggerChildren: stagger }}
    >
      {children}
    </MotionTag>
  );
}

export function RevealItem({ children, as = "div", effect = "up", className }) {
  const MotionTag = motion[as] ?? motion.div;
  return (
    <MotionTag className={className} variants={VARIANTS[effect]} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}>
      {children}
    </MotionTag>
  );
}
