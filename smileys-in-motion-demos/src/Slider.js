import * as React from "react";
import { motion, useMotionValue } from "framer-motion";

export function Slider() {
  const valueWidth = useMotionValue(0);
  return (
    <motion.div style={{ position: "relative" }}>
      <motion.div
        style={{
          width: 350,
          height: 40,
          background: "#444",
          borderRadius: 40,
          overflow: "hidden",
        }}
      >
        <motion.div
          style={{ background: "#ffe008", width: valueWidth, height: "100%" }}
        />
      </motion.div>
      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: 310 }}
        dragMomentum={false}
        dragElastic={false}
        style={{
          position: "absolute",
          top: -26,
          left: -20,
          x: valueWidth,
          fontSize: 80,
        }}
      >
        🤨
      </motion.div>
    </motion.div>
  );
}
