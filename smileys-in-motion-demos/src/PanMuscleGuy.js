import * as React from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

export function PanMuscleGuy() {
  const rotateLeft = useMotionValue(0);
  const rotateRight = useTransform(rotateLeft, (r) => -r);
  function getAngleToBottomRight(e, info) {
    const { bottom, right } = e.target.getBoundingClientRect();
    const x = right - info.point.x;
    const y = bottom - info.point.y;
    const a = (Math.atan2(y, x) * 180) / Math.PI;
    return a;
  }
  const clamp = (v, min, max) => Math.min(max, Math.max(v, min));
  let initialAngle = 0;
  return (
    <div style={{ display: "flex" }}>
      <motion.div
        style={{ rotate: rotateLeft, originX: 1, cursor: "pointer" }}
        onPanStart={(e, info) => {
          initialAngle = getAngleToBottomRight(e, info);
        }}
        onPan={(e, info) => {
          const delta = getAngleToBottomRight(e, info) - initialAngle;
          const newRotate = clamp(rotateLeft.get() + delta, -30, 30);
          rotateLeft.set(newRotate);
        }}
      >
        💪
      </motion.div>
      <motion.div>🤨</motion.div>
      <motion.div style={{ rotate: rotateRight, originX: 0 }}>
        <motion.div style={{ scaleX: -1 }}>💪</motion.div>
      </motion.div>
    </div>
  );
}
