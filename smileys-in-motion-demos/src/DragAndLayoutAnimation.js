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

function Item({ onMove, index, title }) {
  const [dragging, setDragging] = useState(false);
  return (
    <motion.li
      style={{
        cursor: "pointer",
        background: "#444",
        borderRadius: 8,
        minWidth: 200,
        marginTop: 8,
        padding: 8,
        position: "relative", // need this to enable z-index
      }}
      whileHover={{ scale: 1.1, zIndex: 1 }}
      whileTap={{
        scale: 1.2,
        zIndex: 2,
        boxShadow: "1px 1px 15px rgb(0,0,0,0.25)",
      }}
      drag="y"
      layout
      onViewportBoxUpdate={(box, delta) => {
        if (dragging) {
          const height = box.y.max - box.y.min;
          const targetIndex = Math.floor(delta.y.translate / height) + index;
          if (targetIndex !== index) {
            // console.log(
            //   { detaY: delta.y.translate },
            //   { targetIndex },
            //   { index },
            //   { title }
            // );
            onMove(index, targetIndex);
          }
        }
      }}
      onDragStart={() => {
        setDragging(true);
      }}
      onDragEnd={() => {
        setDragging(false);
      }}
    >
      {title}
    </motion.li>
  );
}

const allFaces = "😇 😃 🥱 🤩 😢 😎 🤯"
  .split(" ")
  .map((f, idx) => `${idx} ${f}`);

function DragToReorder() {
  const [faces, setFaces] = useState(allFaces);
  return (
    <ul style={{ listStyleType: "none", fontSize: 50 }}>
      {faces.map((f, index) => (
        <Item
          key={f}
          index={index}
          title={f}
          onMove={(idx, targetIndex) => {
            if (0 <= targetIndex && targetIndex < faces.length) {
              setFaces((fs) => move(fs, idx, targetIndex));
            }
          }}
        />
      ))}
    </ul>
  );
}

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
      {/* <SimpleDrag /> */}
      <DragToReorder />
    </>
  );
}
