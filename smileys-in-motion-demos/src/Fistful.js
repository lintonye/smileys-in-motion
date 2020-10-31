import { motion } from "framer-motion";
import * as React from "react";

/* eslint-disable jsx-a11y/accessible-emoji */

export function Fistful() {
  return (
    <div style={{ display: "flex", zIndex: 1 }}>
      <motion.div
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
      <div>🤨</div>
      <div style={{ transform: "scaleX(-1)" }}>👊</div>
    </div>
  );
}
