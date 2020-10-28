import { useState } from "react";
import { motion } from "framer-motion";
import produce from "immer";
import { useEffect } from "react";

/*

 This example attempts to use animate to simulate drag&reorder. It's mostly working, however, there's an unwanted animation when dropping the dragged item. That seems difficult to resolve.

*/

export function Demo_DragReorder() {
  const itemHeight = 83;
  const [faces, setFaces] = useState(
    "😇 😃 🥱 🤩 😢 😎 🤯".split(" ").map((f, idx) => `${idx} ${f}`)
  );
  const [targetIndex, setTargetIndex] = useState(-1);
  const [dragIndex, setDragIndex] = useState(-1);
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
            position: "relative", // need this to enable z-index
          }}
          whileHover={{ scale: 1.1, zIndex: 1 }}
          whileTap={{
            scale: 1.2,
            zIndex: 2,
            boxShadow: "1px 1px 15px rgb(0,0,0,0.25)",
          }}
          animate={{
            y:
              targetIndex === -1 || dragIndex === -1
                ? 0
                : dragIndex > targetIndex
                ? targetIndex <= index && index < dragIndex
                  ? itemHeight
                  : 0
                : dragIndex < index && index <= targetIndex
                ? -itemHeight
                : 0,
          }}
          key={f}
          drag="y"
          onDragStart={() => {
            setDragIndex(index);
          }}
          onDrag={(e, info) => {
            const targetIndex =
              index +
              (info.offset.y > 0
                ? Math.ceil(info.offset.y / itemHeight - 0.4)
                : Math.floor(info.offset.y / itemHeight + 0.4));
            if (targetIndex !== index) setTargetIndex(targetIndex);
          }}
          onDragEnd={(e, info) => {
            if (targetIndex >= 0) {
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
            }
            setDragIndex(-1);
            setTargetIndex(-1);
          }}
        >
          {f}
        </motion.li>
      ))}
    </ul>
  );
}
