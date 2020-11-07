import * as React from "react";
import { motion, useCycle } from "framer-motion";
import { useState, useRef, useEffect } from "react";

const toX = (v) => (typeof v === "number" ? { x: v } : v);
const initials = [false, 0].map(toX);
const animates = [200, 400].map(toX);
const styles = [0, 0].map(toX);

export function InitialStyleAnimate() {
  const [index, setIndex] = useState(0);
  const [mode, cycleMode] = useCycle("boring", "smiling");
  const prevValues = useRef({});
  useEffect(() => {
    prevValues.current = {
      initial: initials[index],
      animate: animates[index],
      style: styles[index],
    };
  }, [index]);
  const stringifyEqual = (v1, v2) => JSON.stringify(v1) === JSON.stringify(v2);
  return (
    <motion.div
      initial={false}
      animate={mode}
      variants={{ smiling: { transition: { staggerChildren: 0.1 } } }}
    >
      <motion.div
        style={{
          position: "relative",
          left: -50,
          width: 500,
          height: 350,
          ...styles[index],
        }}
        initial={initials[index]}
        animate={animates[index]}
        transition={{ ease: "easeInOut" }}
        onClick={() => setIndex((i) => (i < initials.length - 1 ? i + 1 : 0))}
      >
        <motion.div
          style={{ position: "absolute", top: 0, left: 0 }}
          variants={{ boring: { y: `-60vh` }, smiling: { y: 0 } }}
        >
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
          variants={{
            boring: { rotate: 0, y: 120 },
            smiling: { rotate: -5, y: 0 },
          }}
        >
          <div>initial</div>
          <div
            style={{
              color:
                prevValues.current.initial === undefined ||
                stringifyEqual(prevValues.current.initial, initials[index])
                  ? "#000"
                  : "#f00",
            }}
          >
            {JSON.stringify(initials[index])}
          </div>
          <div>animate</div>
          <div
            style={{
              color:
                prevValues.current.animate === undefined ||
                stringifyEqual(prevValues.current.animate, animates[index])
                  ? "#000"
                  : "#f00",
            }}
          >
            {JSON.stringify(animates[index])}
          </div>
          <div>style</div>
          <div
            style={{
              color:
                prevValues.current.style === undefined ||
                stringifyEqual(prevValues.current.style, styles[index])
                  ? "#000"
                  : "#f00",
            }}
          >
            {JSON.stringify(styles[index])}
          </div>
        </motion.div>
        <motion.div
          style={{ position: "absolute", top: 20, left: -100 }}
          variants={{
            boring: { x: `-100vw` },
            smiling: { x: 0, transition: { ease: "easeOut" } },
          }}
        >
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
          variants={{
            boring: { x: `100vw` },
            smiling: { x: 0, transition: { ease: "easeOut" } },
          }}
        >
          💪
        </motion.div>
        <motion.div
          style={{ position: "absolute", top: 215, left: 40 }}
          variants={{
            boring: { y: `100vh` },
            smiling: { y: 0, transition: { ease: "easeOut" } },
          }}
        >
          🦵
        </motion.div>
        <motion.div
          style={{ position: "absolute", top: 225, left: 10 }}
          variants={{
            boring: { x: `100vw` },
            smiling: { x: 0, transition: { ease: "easeOut" } },
          }}
        >
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
        <div style={{ position: "absolute", left: 0 }} onClick={cycleMode}>
          0
        </div>
        <div style={{ position: "absolute", left: 200 }}>200</div>
        <div style={{ position: "absolute", left: 400 }}>400</div>
      </div>
    </motion.div>
  );
}
