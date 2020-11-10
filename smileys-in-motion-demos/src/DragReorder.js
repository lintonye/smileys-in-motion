import * as React from "react";
import { useState } from "react";
import {
  animate,
  motion,
  useMotionValue,
  useMotionTemplate,
} from "framer-motion";
import produce from "immer";
import { useEffect } from "react";

function Item({ title, index, onMove }) {
  const y = useMotionValue(0);
  const [isDragged, setDragged] = useState(false);
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
      onDrag={(e, info) => {
        const { top } = e.target.parentElement.getBoundingClientRect();
        const targetIndex = Math.floor((info.point.y - top) / 83);
        onMove(targetIndex);
      }}
      onDragStart={() => {
        setDragged(true);
      }}
      onDragEnd={() => {
        // TODO cancel the offset caused by drag
        setDragged(false);
      }}
    >
      {title}
    </motion.li>
  );
}

function move(array, index, targetIndex) {
  const x = array[index];
  if (index > targetIndex)
    for (let i = index; i > targetIndex; i--) {
      array[i] = array[i - 1];
    }
  else
    for (let i = index; i < targetIndex; i++) {
      array[i] = array[i + 1];
    }
  array[targetIndex] = x;
}

export function DragReorder() {
  const [faces, setFaces] = useState(
    "😇 😃 🥱 🤩 😢 😎 🤯".split(" ").map((f, idx) => `${idx} ${f}`)
  );
  return (
    <ul style={{ listStyleType: "none", fontSize: 50 }}>
      {faces.map((f, index) => (
        <Item
          index={index}
          key={f}
          title={f}
          onMove={(targetIndex) => {
            if (0 <= targetIndex && targetIndex < faces.length) {
              setFaces(
                produce(faces, (draft) => {
                  move(draft, index, targetIndex);
                })
              );
            }
          }}
        />
      ))}
    </ul>
  );
}
