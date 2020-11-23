import * as React from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

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

function CircularSlider({ initialValue, onChange }) {
  // Dimensions
  const knobSize = 20;
  const arcWidth = 400;
  const arcStrokeWidth = 4;
  const arcHeight = arcWidth / 2;
  const arcRadius = arcHeight - arcStrokeWidth;
  const [containerBBox, ref] = useInitialViewportBBox();

  const knobAngle = useMotionValue(initialValue * Math.PI);
  const knobAnglePortion = useTransform(knobAngle, (a) => a / Math.PI);

  // Knob coordinates
  const knobX = useTransform(
    knobAngle,
    (a) => arcWidth / 2 - Math.cos(a) * arcRadius
  );
  const knobY = useTransform(knobAngle, (a) => -Math.sin(a) * arcRadius);

  const updateKnobAngle = (point) => {
    const { left, top } = containerBBox;
    const x = point.x - (left + arcWidth / 2);
    // const angle = clamp(Math.PI - Math.atan2(y, x), 0, Math.PI);
    /**
     * NOTE: the commented line above causes the angle being set to PI when moving below the X axis. The correct way is to limit y to quadrat 1 and 2 (the line below).
     */
    const y = Math.max(top + arcHeight - point.y, 0);
    const angle = Math.PI - Math.atan2(y, x);
    knobAngle.set(angle);
  };

  // Dispatch onChange
  useEffect(() => {
    const unsub = knobAnglePortion.onChange(
      (p) => typeof onChange === "function" && onChange(p)
    );
    return unsub;
  }, [knobAnglePortion, onChange]);

  return (
    <motion.div
      style={{ position: "relative" }}
      ref={ref}
      onPan={(e, info) => {
        updateKnobAngle(info.point);
      }}
      onTap={(e, info) => {
        updateKnobAngle(info.point);
      }}
    >
      {/* Knob */}
      <motion.div
        style={{
          position: "absolute",
          left: -knobSize / 2,
          top: arcHeight - knobSize / 2,
          width: knobSize,
          height: knobSize,
          background: "#4876e0",
          borderRadius: "50%",
          boxShadow: "2px 2px 8px rgba(0,0,0,.4)",
          x: knobX,
          y: knobY,
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 1.2 }}
      />
      {/* Arc */}
      <svg
        height={arcHeight}
        width={arcWidth}
        fill="none"
        viewBox="0 0 810 405"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M805 405C805 184.086 625.914 5 405 5C184.086 5 5 184.086 5 405"
          stroke="#4b4b4b"
          strokeWidth={arcStrokeWidth}
        />
        {/* This path is reversed from the above. */}
        <motion.path
          d="M5,405 C5,184.086 184.086,5 405,5 C625.914,5 805,184.086 805,405"
          stroke="#4876e0"
          strokeWidth={arcStrokeWidth}
          style={{ pathLength: knobAnglePortion }}
        />
      </svg>
    </motion.div>
  );
}

export function CircularSliderDemo() {
  const [volume, setVolume] = useState(30);
  return (
    <motion.div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircularSlider
        initialValue={volume / 100}
        onChange={(portion) => setVolume(Math.round(portion * 100))}
      />
      <motion.div style={{ margin: "-80px auto", color: "#eee", fontSize: 60 }}>
        {volume}
      </motion.div>
    </motion.div>
  );
}
