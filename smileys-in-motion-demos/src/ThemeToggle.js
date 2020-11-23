import * as React from "react";
import { motion, useCycle } from "framer-motion";

/* eslint-disable jsx-a11y/accessible-emoji */

export function ThemeToggle() {
  const [mode, cycleMode] = useCycle("light", "dark");
  const toggleWidth = 200;
  const knobWidth = 110;
  const clouds = (
    <motion.div
      style={{
        color: "#fff",
        position: "absolute",
        scale: 0.5,
        top: -20,
        left: 80,
      }}
      variants={{
        light: {
          opacity: [0.9, 0.5],
          x: [20, -20],
          transition: { duration: 2, repeat: Infinity, repeatType: "reverse" },
        },
        dark: { opacity: 0 },
      }}
    >
      ☁️
    </motion.div>
  );
  const stars = (
    <>
      <motion.div
        style={{ color: "#fff", position: "absolute", scale: 0.07 }}
        variants={{
          light: { opacity: 0 },
          dark: {
            opacity: [1, 0.5, 0.8],
            transition: {
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
            },
          },
        }}
      >
        ✦
      </motion.div>
      <motion.div
        style={{
          color: "#eef",
          position: "absolute",
          scale: 0.1,
          top: -40,
          left: 20,
        }}
        variants={{
          light: { opacity: 0 },
          dark: {
            opacity: [0.4, 1, 0.5],
            transition: {
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
            },
          },
        }}
      >
        ✦
      </motion.div>
    </>
  );
  const knob = (
    <>
      <motion.div
        style={{ margin: -30, cursor: "pointer", position: "absolute" }}
        onClick={() => cycleMode()}
        variants={{
          light: { rotate: 0, opacity: 1, x: 0 },
          dark: { rotate: 180, opacity: 0, x: toggleWidth - knobWidth / 2 },
        }}
      >
        🌞
      </motion.div>
      <motion.div
        style={{
          margin: -30,
          cursor: "pointer",
          position: "absolute",
          scale: 0.9,
        }}
        onClick={() => cycleMode()}
        variants={{
          light: { rotate: -180, opacity: 0, x: 0 },
          dark: { rotate: 0, opacity: 1, x: toggleWidth - knobWidth / 2 },
        }}
      >
        🌝
      </motion.div>
    </>
  );
  return (
    <motion.div
      style={{
        borderRadius: 80,
        background: "#444",
        width: toggleWidth,
        height: 90,
        display: "flex",
        justifyContent: "flex-start",
        border: "1px solid blue",
        position: "relative",
      }}
      // animate={{ background: mode === "light" ? "#9fe3f4" : "#000526" }}
      animate={mode}
      variants={{
        light: { background: "#9fe3f4", borderColor: "#fff" },
        dark: { background: "#000526", borderColor: "#00f" },
      }}
    >
      {clouds}
      {stars}
      {knob}
    </motion.div>
  );
}
