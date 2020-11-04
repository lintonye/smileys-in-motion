import { motion } from "framer-motion";
import * as React from "react";

/* eslint-disable jsx-a11y/accessible-emoji */

export function Fistful() {
  return (
    <div style={{ display: "flex" }}>
      <motion.div
        animate={{
          scale: 2,
          transition: {
            type: "spring",
            delay: 0,
            stiffness: 500,
            damping: 11,
            mass: 1,
          },
        }}
      >
        👊
      </motion.div>
      <div>🤨</div>
      <div style={{ transform: "scaleX(-1)" }}>👊</div>
    </div>
  );
}
