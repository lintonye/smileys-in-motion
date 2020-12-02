import * as React from "react";
import { motion, useMotionValue, animate } from "framer-motion";
import { useState, useRef, useEffect } from "react";

/* eslint-disable jsx-a11y/accessible-emoji */

function BottomSheet({ onClose }) {
  const sheetY = useMotionValue(0);
  // const controls = useDragControls();
  return (
    <motion.div
      style={{
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
      }}
    >
      <motion.div
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          background: "rgba(0,0,0,0.25)",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />
      <motion.div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 300,
          y: sheetY,
        }}
        drag="y"
        // dragControls={controls}
        dragConstraints={{ top: 0, bottom: 200 }}
        // dragPropagation={true}
        dragElastic={false}
        onDragEnd={(_, info) => {
          if (sheetY.get() < 80) {
            animate(sheetY, 0, { type: "spring" });
          } else {
            onClose();
          }
        }}
      >
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          style={{
            background: "#fff",
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            top: 0,
            borderRadius: 8,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <h2>This is a bottom sheet (drag down to dismiss) </h2>
          {/* <button onClick={onClose} style={{ alignSelf: "center" }}>
            Close
          </button> */}
          <motion.div
            id="scrollingContainer"
            style={{
              overflow: "scroll",
              flex: 1,
              WebkitOverflowScrolling: "touch",
            }}
            // onPan={(event, info) => {
            //   const element = document.getElementById("scrollingContainer");
            //   // console.log("pan", element.scrollTop, info.offset.y);
            //   if (element.scrollTop <= 0 && info.offset.y > 10) {
            //     controls.start(event, { snapToCursor: false });
            //     // onClose();
            //   }
            // }}
          >
            {Array(20)
              .fill(0)
              .map((_, idx) => (
                <div key={idx}>Line{idx}</div>
              ))}
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export function BottomSheetDemo() {
  return <BottomSheet />;
}
