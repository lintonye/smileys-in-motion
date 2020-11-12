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
  const [foo, cycleFoo] = useCycle(false, true);
  return (
    <div>
      <motion.div
        drag
        // layout
        // style={{ x: smileyX }}
        onViewportBoxUpdate={(box, delta) => {
          console.log({ box }, { delta });
          smileyX.set(delta.x.translate);
        }}
      >
        🤨
      </motion.div>
      <motion.div style={{ x: smileyX }} onTap={cycleFoo}>
        👣
      </motion.div>
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
