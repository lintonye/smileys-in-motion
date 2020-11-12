import * as React from "react";
import { useState } from "react";
import {
  animate,
  motion,
  useMotionValue,
  useMotionTemplate,
  useCycle,
} from "framer-motion";
import produce from "immer";
import { useEffect } from "react";
import move from "array-move";

/* eslint-disable jsx-a11y/accessible-emoji */

function SimpleDrag() {
  const smileyX = useMotionValue(0);
  return (
    <div>
      <motion.div drag style={{ x: smileyX }}>
        🤨
      </motion.div>
      <motion.div>👣</motion.div>
    </div>
  );
}

export function DragAndLayoutAnimation() {
  return (
    <>
      <SimpleDrag />
    </>
  );
}
