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
      drag="y"
    >
      {title}
    </motion.li>
  );
}

const allFaces = "😇 😃 🥱 🤩 😢 😎 🤯"
  .split(" ")
  .map((f, idx) => `${idx} ${f}`);

export function DragToReorder() {
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
