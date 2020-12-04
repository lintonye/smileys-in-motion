import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

/* eslint-disable jsx-a11y/accessible-emoji */

function useBoundingBox() {
  const ref = useRef();
  const [box, setBox] = useState({});
  useEffect(() => {
    const updateBox = () => {
      if (ref.current) {
        const b = ref.current.getBoundingClientRect();
        setBox(
          DOMRectReadOnly.fromRect({
            x: b.left + window.scrollX,
            y: b.top + window.scrollY,
            width: b.width,
            height: b.height,
          })
        );
      }
    };
    updateBox();
    window.addEventListener("resize", updateBox);
    return () => window.removeEventListener("resize", updateBox);
  }, [ref]);
  return [ref, box];
}

const clamp = (v, min, max) => Math.min(max, Math.max(v, min));

export function PanMuscleGuy() {
  const rotateArm = useMotionValue(0);
  const [leftArmRef, leftArmBoundingBox] = useBoundingBox();
  function getAngleToBottomRight(info) {
    const { bottom, right } = leftArmBoundingBox;
    const x = right - info.point.x;
    const y = bottom - info.point.y;
    const a = (Math.atan2(y, x) * 180) / Math.PI;
    return a;
  }
  let initialPanAngle = 0,
    initialRotate = 0;
  return (
    <div style={{ display: "flex" }}>
      <motion.div
        style={{ rotate: rotateArm, originX: 1, cursor: "pointer" }}
        ref={leftArmRef}
        onPanStart={(e, info) => {
          initialPanAngle = getAngleToBottomRight(info);
          initialRotate = rotateArm.get();
        }}
        onPan={(e, info) => {
          const delta = getAngleToBottomRight(info) - initialPanAngle;
          const newRotate = clamp(initialRotate + delta, -30, 30);
          rotateArm.set(newRotate);
        }}
      >
        💪
      </motion.div>
      <motion.div>🤨</motion.div>
      <motion.div style={{ rotate: 0, originX: 0 }}>
        <motion.div style={{ scaleX: -1 }}>💪</motion.div>
      </motion.div>
    </div>
  );
}
