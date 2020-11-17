import * as React from "react";
import { motion, useAnimation } from "framer-motion";
import { useRef } from "react";

/* eslint-disable jsx-a11y/accessible-emoji */

function AnimationControls() {
  const controls = useAnimation();
  async function dance() {
    await controls.start({ x: 200 });
    await controls.start({ x: -200 });
    await controls.start({ scaleX: -1 });
    await controls.start({ x: 0 });
    await controls.start({ scaleX: 1 });
  }
  async function jump() {
    await controls.start({
      y: -200,
      x: -100,
      transition: { ease: "easeInOut" },
    });
    await controls.start({ y: 0, x: -100 });
  }
  return (
    <motion.div
      animate={controls}
      style={{ fontSize: 200 }}
      onTap={async () => {
        await jump();
        await dance();
      }}
    >
      🕺
    </motion.div>
  );
}

export function ImperativeControls() {
  return (
    <>
      <AnimationControls />
    </>
  );
}
