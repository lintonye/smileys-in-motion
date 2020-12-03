import * as React from "react";
import {
  motion,
  useMotionValue,
  animate,
  AnimatePresence,
  useTransform,
} from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { PhoneScreen } from "./PhoneScreen";
import useMeasure from "react-use-measure";

/* eslint-disable jsx-a11y/accessible-emoji */

const spring = { type: "spring", damping: 16 };

function BottomSheet({ onClose, snapPoints = [], y, underLayer, children }) {
  const [snapIndex, setSnapIndex] = useState(0);
  // const controls = useDragControls();
  const [ref, { height: screenHeight }] = useMeasure();
  const [fullScreen, setFullScreen] = useState(false);
  const sheetY = useMotionValue(0);
  useEffect(() => {
    if (screenHeight > 0) sheetY.set(-snapPoints[snapIndex]);
  }, [sheetY, screenHeight]);
  useEffect(() => {
    if (y && typeof y.set === "function") {
      const unsubscribe = sheetY.onChange((sy) => y.set(sy));
      return unsubscribe;
    }
  }, [y, sheetY]);
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
      {/* Under layer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        exit={{ y: "100%" }}
        style={{ position: "absolute", top: screenHeight, left: 0, right: 0 }}
      >
        {underLayer}
      </motion.div>
      {/* Draggable content */}
      <motion.div
        style={{
          position: "absolute",
          top: screenHeight,
          left: 0,
          right: 0,
          y: sheetY,
        }}
        drag="y"
        dragConstraints={{ top: -screenHeight }}
        dragElastic={false}
        onDragEnd={(_, info) => {
          const snapPointY = -sheetY.get();
          console.log({ snapPointY });
          const snPoints = [0, ...snapPoints, screenHeight];

          for (let i = 0; i < snPoints.length - 1; i++) {
            if (snPoints[i] <= snapPointY && snapPointY <= snPoints[i + 1]) {
              const half = (snPoints[i] + snPoints[i + 1]) / 2;
              if (i === 0 && snapPointY < half)
                typeof onClose === "function" && onClose();
              else
                animate(
                  sheetY,
                  snapPointY < half ? -snPoints[i] : -snPoints[i + 1],
                  spring
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
          transition={spring}
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
            boxShadow: "2px -2px 8px rgb(0,0,0,.1)",
            paddingTop: 20,
          }}
        >
          {/* drag handle */}
          <div
            style={{
              margin: "auto",
              marginTop: -12,
              marginBottom: 12,
              height: 3,
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

function Gallery() {
  const photos = [
    "https://images.unsplash.com/photo-1500042738280-d2cf3121aa44?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjg1ODY2fQ",
    "https://images.unsplash.com/photo-1529168912995-348197746b79?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjg1ODY2fQ",
    "https://images.unsplash.com/photo-1445623168371-714eea2f2833?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjg1ODY2fQ",
    "https://images.unsplash.com/photo-1475066392170-59d55d96fe51?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjg1ODY2fQ",
    "https://images.unsplash.com/photo-1504731026313-e68ebd5ff02c?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjg1ODY2fQ",
    "https://images.unsplash.com/photo-1536154010-6ab8a1d741d2?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjg1ODY2fQ",
    "https://images.unsplash.com/photo-1525945882052-c5c66ba342b3?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjg1ODY2fQ",
    "https://images.unsplash.com/photo-1542622466-cbbe173c10ca?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjg1ODY2fQ",
    "https://images.unsplash.com/photo-1510926078773-369698bda778?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjg1ODY2fQ",
  ];
  return (
    <div
      style={{
        borderRadius: `5px 5px 0 0`,
        display: "flex",
        overflow: "scroll",
        backgroundColor: "#fff",
      }}
    >
      {photos.map((photo) => (
        <img
          src={photo}
          key={photo}
          style={{
            width: 200,
            height: 180,
            flexShrink: 0,
            boxShadow: "inset 0px 0px 10px rgba(0,0,0,0.25)",
            pointerEvents: "none",
            marginRight: 2,
          }}
        />
      ))}
    </div>
  );
}

export function BottomSheetDemo() {
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
  const y = useMotionValue(0);
  const galleryY = useTransform(y, (y) => (y >= -410 ? y * 1.8 : -410 * 1.8));
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
              y={y}
              underLayer={
                <motion.div
                  style={{
                    y: galleryY,
                    marginTop: 150,
                    width: "100%",
                  }}
                >
                  <Gallery />
                </motion.div>
              }
            >
              <img
                src="/gmap-bottom-sheet.png"
                style={{ width: "100%", pointerEvents: "none", zIndex: 1 }}
              />
            </BottomSheet>
          )}
        </AnimatePresence>
      </PhoneScreen>
    </motion.div>
  );
}
