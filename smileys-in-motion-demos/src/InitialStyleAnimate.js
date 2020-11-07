import * as React from "react";
import { motion } from "framer-motion";
import { useState } from "react";

export function InitialStyleAnimate() {
  const [index, setIndex] = useState(0);
  const toX = (v) => (typeof v === "number" ? { x: v } : v);
  const initials = [0, false, 400].map(toX);
  const animates = [0, 400, 400].map(toX);
  const styles = [200, 200, 400].map(toX);
  return (
    <motion.div>
      <motion.div
        style={{
          position: "relative",
          width: 500,
          height: 350,
          ...styles[index],
        }}
        initial={initials[index]}
        animate={animates[index]}
        transition={{ ease: "easeInOut" }}
        onClick={() => setIndex((i) => (i < initials.length - 1 ? i + 1 : 0))}
      >
        <motion.div style={{ position: "absolute", top: 0, left: 0 }}>
          🤨
        </motion.div>
        <motion.div
          style={{
            fontSize: 18,
            background: "yellow",
            position: "absolute",
            marginLeft: -20,
            marginTop: 10,
            rotate: -5,
            // width: 120,
            // height: 120,
            top: 110,
            borderRadius: 40,
            padding: 20,
            display: "grid",
            gridTemplateColumns: "auto 1fr",
            gridColumnGap: 8,
          }}
        >
          <div>initial</div>
          <div>{JSON.stringify(initials[index])}</div>
          <div>animate</div>
          <div>{JSON.stringify(animates[index])}</div>
          <div>style</div>
          <div>{JSON.stringify(styles[index])}</div>
        </motion.div>
        <motion.div style={{ position: "absolute", top: 20, left: -100 }}>
          💪
        </motion.div>
        <motion.div
          style={{
            position: "absolute",
            top: 0,
            left: 100,
            scaleX: -1,
            rotate: 30,
          }}
        >
          💪
        </motion.div>
        <motion.div style={{ position: "absolute", top: 215, left: 40 }}>
          🦵
        </motion.div>
        <motion.div style={{ position: "absolute", top: 225, left: 10 }}>
          🦵
        </motion.div>
      </motion.div>
      <div
        style={{
          color: "#eee",
          position: "relative",
          top: 10,
          fontSize: 30,
          borderTopWidth: 4,
          borderTopColor: "#fff",
          borderTopStyle: "solid",
          width: 500,
          padding: 8,
        }}
      >
        <div style={{ position: "absolute", left: 0 }}>0</div>
        <div style={{ position: "absolute", left: 200 }}>200</div>
        <div style={{ position: "absolute", left: 400 }}>400</div>
      </div>
    </motion.div>
  );
}
