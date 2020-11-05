import * as React from "react";
import { useState } from "react";
import { motion, useCycle } from "framer-motion";
import "./layoutExamples.css";
import produce from "immer";

function Remove() {
  const [faces, setFaces] = useState("😇 😃 🥱 🤩 😢 😎 🤯".split(" "));
  return (
    <ul style={{ listStyleType: "none", fontSize: 50 }}>
      {faces.map((f) => (
        <motion.li
          style={{
            cursor: "pointer",
            background: "#444",
            borderRadius: 8,
            minWidth: 200,
            marginTop: 8,
            padding: 4,
            textAlign: "center",
            boxShadow: "1px 1px 8px rgba(0,0,0,0.4)",
          }}
          whileHover={{ scale: 1.2 }}
          layout
          key={f}
          exit={{ x: 260, opacity: 0, transition: { ease: "easeIn" } }}
          onClick={() => {
            setFaces(
              produce(faces, (draft) => {
                const idx = draft.indexOf(f);
                draft.splice(idx, 1);
              })
            );
          }}
        >
          {f}
        </motion.li>
      ))}
    </ul>
  );
}

function ParentDisplay() {
  const faces = "😇 😃 🥱 🤩 😢 😎 🤯".split(" ");
  const [className, cycleClassName] = useCycle(
    "flex",
    "block",
    "grid3",
    "grid4"
  );
  return (
    <motion.div className={className}>
      {faces.map((f) => (
        <motion.div onClick={cycleClassName} key={f} layout>
          {f}
        </motion.div>
      ))}
    </motion.div>
  );
}

function ScaleCorrection() {
  const [width, cycleWidth] = useCycle(200, 400, 600);
  return (
    <motion.div
      style={{
        background: "purple",
        borderRadius: 16,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 32,
        width,
      }}
      onClick={cycleWidth}
      layout
    >
      <motion.div layout>🤨</motion.div>
    </motion.div>
  );
}

export function LayoutExamples() {
  return (
    <>
      {/* <ParentDisplay /> */}
      {/* <Remove /> */}
      <ScaleCorrection />
    </>
  );
}
