import * as React from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

/* eslint-disable jsx-a11y/accessible-emoji */

function useInitialViewportBBox() {
  const ref = React.useRef();
  const [bbox, setBbox] = React.useState(0);
  React.useEffect(() => {
    setBbox(ref.current.getBoundingClientRect());
  }, [ref]);
  return [bbox, ref];
}

const clamp = (v, min, max) => Math.min(max, Math.max(v, min));

export function PanMuscleGuy() {
  const rotateArm = useMotionValue(0);
  return (
    <div style={{ display: "flex" }}>
      <motion.div style={{ rotate: rotateArm, originX: 1, cursor: "pointer" }}>
        💪
      </motion.div>
      <motion.div>🤨</motion.div>
      <motion.div style={{ rotate: 0, originX: 0 }}>
        <motion.div style={{ scaleX: -1 }}>💪</motion.div>
      </motion.div>
    </div>
  );
}
