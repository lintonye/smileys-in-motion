import { useState } from "react";
import { motion } from "framer-motion";
import produce from "immer";

export function Demo_DragReorder() {
  const [faces, setFaces] = useState(
    "😇 😃 🥱 🤩 😢 😎 🤯".split(" ").map((f, idx) => `${idx} ${f}`)
  );
  const [targetIndex, setTargetIndex] = useState(-1);
  const [isDragging, setDragging] = useState(false);
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
            padding: 8,
          }}
          whileHover={{ scale: 1.1, zIndex: 1 }}
          whileTap={{
            scale: 1.2,
            zIndex: 2,
            boxShadow: "1px 1px 15px rgb(0,0,0,0.25)",
          }}
          animate={targetIndex === index && isDragging ? "target" : "normal"}
          variants={{
            target: { border: "2px dashed #fee" },
            normal: { border: "0" },
          }}
          key={f}
          layout
          drag="y"
          onDragStart={() => {
            setDragging(true);
          }}
          onDrag={(e, info) => {
            const { top, bottom } = e.target.getBoundingClientRect();
            const height = bottom - top + 1;
            const targetIndex =
              index +
              (info.offset.y > 0
                ? Math.ceil(info.offset.y / height - 0.4)
                : Math.floor(info.offset.y / height + 0.4));
            if (targetIndex !== index) setTargetIndex(targetIndex);
          }}
          onDragEnd={(e, info) => {
            if (targetIndex >= 0)
              setFaces(
                produce(faces, (draft) => {
                  const x = draft[index];
                  if (index > targetIndex)
                    for (let i = index; i > targetIndex; i--) {
                      draft[i] = draft[i - 1];
                    }
                  else
                    for (let i = index; i < targetIndex; i++) {
                      draft[i] = draft[i + 1];
                    }
                  draft[targetIndex] = x;
                })
              );
            setDragging(false);
            setTargetIndex(-1);
          }}
        >
          {f}
        </motion.li>
      ))}
    </ul>
  );
}
