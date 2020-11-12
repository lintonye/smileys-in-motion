import * as React from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

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
  const rotateLeft = useMotionValue(0);
  const rotateRight = useTransform(rotateLeft, (r) => -r);
  const [leftArmBoundingBox, leftArmRef] = useInitialViewportBBox();
  function getAngleToBottomRight(info) {
    const { bottom, right } = leftArmBoundingBox;
    const x = right - info.point.x;
    const y = bottom - info.point.y;
    const a = (Math.atan2(y, x) * 180) / Math.PI;
    return a;
  }
  let initialPointerAngle = 0,
    initialRotateLeft = 0;
  return (
    <div style={{ display: "flex" }}>
      <motion.div
        style={{ rotate: rotateLeft, originX: 1, cursor: "pointer" }}
        ref={leftArmRef}
        onPanStart={(e, info) => {
          initialPointerAngle = getAngleToBottomRight(info);
          initialRotateLeft = rotateLeft.get();
        }}
        onPan={(e, info) => {
          const delta = getAngleToBottomRight(info) - initialPointerAngle;
          const newRotate = clamp(initialRotateLeft + delta, -30, 30);
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
