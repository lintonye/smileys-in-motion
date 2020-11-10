import * as React from "react";
import { motion } from "framer-motion";
import { useState } from "react";
import produce from "immer";

export function DragReorder() {
  const [faces, setFaces] = useState("😇 😃 🥱 🤩 😢 😎 🤯".split(" "));
  const [draggingIndex, setDraggingIndex] = useState(-1);
  return (
    <ul style={{ listStyleType: "none", fontSize: 50 }}>
      {faces.map((f, index) => (
        <motion.li
          style={{
            cursor: "pointer",
            background: "#444",
            borderRadius: 8,
            minWidth: 200,
            marginTop: 8,
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 1.2 }}
          key={f}
          layout
          drag="y"
          onDragStart={() => {
            setDraggingIndex(index);
          }}
          onDrag={(e, info) => {
            const { top, bottom } = e.target.getBoundingClientRect();
            const height = bottom - top + 1;
            if (info.offset.y > height / 2) {
              setFaces(
                produce(faces, (draft) => {
                  const x = draft[index + 1];
                  draft[index] = x;
                  draft[index + 1] = f;
                })
              );
            }
          }}
        >
          {f}
        </motion.li>
      ))}
    </ul>
  );
}
