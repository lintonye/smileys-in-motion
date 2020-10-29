import { motion, useMotionValue, useTransform } from "framer-motion";
import * as React from "react";

/* eslint-disable jsx-a11y/accessible-emoji */

export function Demo1_Fistful() {
  const scaleLeft = useMotionValue(1);
  const scaleRight = useTransform(scaleLeft, (s) => 1 / s);
  const rotateHead = useTransform(scaleLeft, [0.5, 2], [-10, 10]);
  return (
    <div style={{ display: "flex" }}>
      <motion.div
        style={{ scale: scaleLeft, zIndex: 1 }}
        animate={{
          scale: [1, 0.5, 2],
          transition: {
            times: [0, 0.8, 1],
            yoyo: Infinity,
          },
        }}
      >
        👊
      </motion.div>
      <motion.div style={{ rotate: rotateHead }}>🤨</motion.div>
      <motion.div style={{ scaleX: -1, scale: scaleRight }}>👊</motion.div>
    </div>
  );
}
