import * as React from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useState, useRef } from "react";

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

function CircularSlider({ initialValue, onChange }) {
  // Dimensions
  const knobSize = 20;
  const arcWidth = 400;
  const arcStrokeWidth = 4;
  const arcHeight = arcWidth / 2;
  const arcRadius = arcHeight - arcStrokeWidth;
  const [ref, containerBBox] = useBoundingBox();

  return (
    <motion.div style={{ position: "relative" }} ref={ref}>
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
        }}
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
