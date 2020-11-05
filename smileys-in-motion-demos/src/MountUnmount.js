import * as React from "react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import produce from "immer";

/* eslint-disable jsx-a11y/accessible-emoji */

function FleeingSmiley() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    setTimeout(() => setVisible(true), 500);
  }, []);
  return (
    visible && <motion.div onClick={() => setVisible(false)}>🤨</motion.div>
  );
}

function Bars() {
  const allFaces = "😇 😃 🥱 🤩 😢 😎 🤯".split(" ");
  const [faces, setFaces] = useState([]);
  const [index, setIndex] = useState(0);
  const addButton = (
    <motion.div
      style={{
        cursor: "pointer",
        background: "#444",
        color: "#fff",
        borderRadius: 8,
        padding: "0 16px 8px 16px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: 60,
      }}
      whileHover={{ scale: 1.2 }}
      onClick={() => {
        if (index < allFaces.length) {
          setFaces((fs) => [...fs, allFaces[index]]);
          setIndex((i) => i + 1);
        }
      }}
    >
      +
    </motion.div>
  );
  return (
    <>
      {addButton}
      <ul style={{ listStyleType: "none", fontSize: 50 }}>
        <AnimatePresence>
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
              key={f}
              initial={{ x: -200, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
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
        </AnimatePresence>
      </ul>
    </>
  );
}

function Poker() {
  const allFaces = "😇 😃 🥱 🤩 😢 😎 🤯".split(" ");
  const allFaceData = allFaces.map((face, index) => ({
    face,
    rotate: (index - allFaces.length / 2) * 15,
  }));
  const [faces, setFaces] = useState([]);
  useEffect(() => {
    let i = 0;
    const inter = setInterval(() => {
      if (i < allFaceData.length) {
        setFaces((fs) => [...fs, allFaceData[i]]);
        i++;
      } else {
        clearInterval(inter);
      }
    }, 150);
    return () => clearInterval(inter);
  }, []);
  return (
    <ul
      style={{
        listStyleType: "none",
        fontSize: 50,
        display: "grid",
        gridTemplateColumns: `repeat(${allFaceData.length}, 50px)`,
      }}
    >
      <AnimatePresence>
        {faces.map((fd) => (
          <motion.li
            style={{
              cursor: "pointer",
              backgroundColor: "#f0f0f0",
              boxShadow: "1px 1px 8px rgba(0,0,0,0.4)",
              borderRadius: 8,
              marginTop: 8,
              height: 200,
              width: 150,
              textAlign: "left",
              padding: 16,
              originX: "bottom",
              rotate: fd.rotate,
            }}
            initial={{ y: -200, rotate: 0 }}
            animate={{
              rotate: fd.rotate,
              y: 0,
            }}
            whileHover={{ backgroundColor: "#ecd" }}
            key={fd.face}
            // layout
            exit={{
              y: -260,
              rotate: 0,
              scale: 0.6,
              opacity: [1, 1, 0],
              transition: { ease: "easeInOut" },
            }}
            onClick={() => {
              setFaces(
                produce(faces, (draft) => {
                  const idx = draft.findIndex((item) => item.face === fd.face);
                  console.log(idx);

                  draft.splice(idx, 1);
                })
              );
            }}
          >
            {fd.face}
          </motion.li>
        ))}
      </AnimatePresence>
    </ul>
  );
}

export function MountUnmount() {
  return (
    <>
      <FleeingSmiley />
      {/* <Bars /> */}
      {/* <Poker /> */}
    </>
  );
}
