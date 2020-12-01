import * as React from "react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import produce from "immer";

/* eslint-disable jsx-a11y/accessible-emoji */

function MrSmiley({ onKick }) {
  const headLeft = 130;
  const headTop = 0;
  const footAnimate = useAnimation();
  return (
    <div
      style={{
        position: "relative",
        height: 300,
        width: 380,
        // backgroundColor: "red",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: headLeft,
          top: headTop,
        }}
      >
        🤨
      </div>
      <div
        style={{
          position: "absolute",
          left: headLeft + 40,
          top: headTop + 250,
        }}
      >
        🦵
      </div>
      <motion.div
        style={{
          position: "absolute",
          left: headLeft + 0,
          top: headTop + 270,
          originX: "left",
          originY: 0.2,
        }}
        animate={footAnimate}
        onTap={async () => {
          await footAnimate.start({
            rotate: [0, 30, 0, -15],
            transition: { type: "spring", mass: 30, stiffness: 20 },
          });
          typeof onKick === "function" && onKick();
          footAnimate.start({ rotate: -30 });
        }}
      >
        🦵
      </motion.div>

      <div
        style={{
          position: "absolute",
          left: headLeft - 150,
          top: headTop - 43,
        }}
      >
        ☝️
      </div>
      <div
        style={{
          position: "absolute",
          left: headLeft + 140,
          top: headTop + 80,
        }}
      >
        👉
      </div>
    </div>
  );
}

function Demo() {
  const balls = "🏀 🏈 🏐".split(" ");
  const [index, setIndex] = useState(0);
  const ball = balls[index];
  return (
    <div style={{ textAlign: "left" }}>
      {/* AnimatePresence pattern 3 */}
      <AnimatePresence>
        <motion.div
          onClick={() => setIndex((i) => (i < balls.length - 1 ? i + 1 : 0))}
          initial={{ x: `-80vw` }}
          animate={{ x: 0 }}
          exit={{ x: "80vw" }}
        >
          {ball}
        </motion.div>
      </AnimatePresence>
      <MrSmiley />
    </div>
  );
}

export function MoreAnimatePresence() {
  return (
    <>
      <Demo />
    </>
  );
}
