import * as React from "react";
import { motion, useTransform, useMotionValue } from "framer-motion";

/* eslint-disable jsx-a11y/accessible-emoji */

export function MuscleDude() {
  return (
    <div
      style={{
        display: "flex",
        padding: 80,
        cursor: "pointer",
      }}
    >
      <motion.div>💪</motion.div>
      <motion.div>🤨</motion.div>
      <motion.div style={{ scaleX: -1 }}>💪</motion.div>
    </div>
  );
}
