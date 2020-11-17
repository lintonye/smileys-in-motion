import * as React from "react";
import { motion, useAnimation } from "framer-motion";
import { useRef } from "react";

/* eslint-disable jsx-a11y/accessible-emoji */

function AnimationControls() {
  return <motion.div style={{ fontSize: 200 }}>🕺</motion.div>;
}

export function ImperativeControls() {
  return (
    <>
      <AnimationControls />
    </>
  );
}
