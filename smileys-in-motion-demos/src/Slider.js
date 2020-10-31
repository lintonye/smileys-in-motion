import * as React from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/* eslint-disable jsx-a11y/accessible-emoji */

export function Slider() {
  const knobX = useMotionValue(0);
  return (
    <motion.div
      style={{
        position: "relative",
        width: 350,
        height: 40,
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
      }}
    >
      <motion.div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          right: 0,
          bottom: 0,
          background: "#444",
          borderRadius: 40,
          overflow: "hidden",
        }}
      >
        <motion.div
          style={{ background: "#ffe008", width: knobX, height: "100%" }}
        />
      </motion.div>

      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: 320 }}
        dragMomentum={false}
        dragElastic={false}
        style={{
          x: knobX,
          marginLeft: -30,
          fontSize: 80,
          zIndex: 1,
        }}
      >
        🤨
      </motion.div>
    </motion.div>
  );
}
