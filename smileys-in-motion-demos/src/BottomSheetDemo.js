import * as React from "react";
import {
  motion,
  useMotionValue,
  animate,
  AnimatePresence,
} from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { PhoneScreen } from "./PhoneScreen";
import useMeasure from "react-use-measure";

/* eslint-disable jsx-a11y/accessible-emoji */

function BottomSheet({ onClose, snapPoints = [], children }) {
  const [snapIndex, setSnapIndex] = useState(0);
  // const controls = useDragControls();
  const [ref, { height: screenHeight }] = useMeasure();
  const [fullScreen, setFullScreen] = useState(false);
  console.log({ fullScreen });
  const sheetY = useMotionValue(0);
  useEffect(() => {
    if (screenHeight > 0) sheetY.set(screenHeight - snapPoints[snapIndex]);
  }, [sheetY, screenHeight]);
  return (
    <motion.div
      ref={ref}
      style={{
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        overflow: fullScreen ? "scroll" : "hidden",
      }}
    >
      {/* Backdrop */}
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
        onTap={() => typeof onClose === "function" && onClose()}
      />
      {/* Draggable content */}
      <motion.div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          // height: snapPoints[snapIndex],
          y: sheetY,
        }}
        drag="y"
        dragConstraints={{ top: 0 }}
        dragElastic={false}
        onDragEnd={(_, info) => {
          const snapPointY = screenHeight - sheetY.get();
          const snPoints = [0, ...snapPoints, screenHeight];

          for (let i = 0; i < snPoints.length - 1; i++) {
            if (snPoints[i] <= snapPointY && snapPointY <= snPoints[i + 1]) {
              const half = (snPoints[i] + snPoints[i + 1]) / 2;
              if (i === 0 && snapPointY < half)
                typeof onClose === "function" && onClose();
              else
                animate(
                  sheetY,
                  snapPointY < half
                    ? screenHeight - snPoints[i]
                    : screenHeight - snPoints[i + 1]
                );
              setFullScreen(i === snPoints.length - 2 && snapPointY > half);
              break;
            }
          }
        }}
      >
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          style={{
            background: "#fff",
            // position: "absolute",
            // bottom: 0,
            // left: 0,
            // right: 0,
            // top: 0,
            borderRadius: 8,
            display: "flex",
            flexDirection: "column",
            paddingTop: 20,
          }}
        >
          <div
            style={{
              margin: "auto",
              marginTop: -12,
              marginBottom: 12,
              height: 5,
              width: 30,
              background: "#bbb",
              borderRadius: 4,
            }}
          />
          {children}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export function BottomSheetDemo() {
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
  return (
    <motion.div style={{ fontSize: 16 }}>
      <PhoneScreen background="url(/map-bg.png)">
        <motion.img
          src="/map-pin.svg"
          initial={{ y: "-100vh" }}
          animate={{ y: 0 }}
          style={{
            position: "absolute",
            top: 220,
            left: 130,
          }}
          onClick={(e) => {
            setBottomSheetVisible(true);
          }}
        />
        <AnimatePresence>
          {bottomSheetVisible && (
            <BottomSheet
              onClose={() => setBottomSheetVisible(false)}
              snapPoints={[170, 400]}
            >
              <img
                src="/gmap-bottom-sheet.png"
                style={{ width: "100%", pointerEvents: "none" }}
              />
            </BottomSheet>
          )}
        </AnimatePresence>
      </PhoneScreen>
    </motion.div>
  );
}
