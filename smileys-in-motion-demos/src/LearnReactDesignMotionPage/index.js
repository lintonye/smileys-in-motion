import * as React from "react";
import { useState, useEffect } from "react";
import {
  AnimateSharedLayout,
  motion,
  useTransform,
  useViewportScroll,
} from "framer-motion";

function Welcome() {
  return (
    <motion.div
      initial={{ x: "-60vw" }}
      animate={{ x: 0 }}
      className="h-full flex justify-center items-center text-6xl"
    >
      <motion.div layoutId="smiley">🤨</motion.div>
    </motion.div>
  );
}

function Main() {
  return (
    <motion.div>
      <motion.h1
        className="text-5xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <motion.span layoutId="smiley" className="inline-block mr-3">
          🤨
        </motion.span>
        Smileys In Motion
      </motion.h1>
      <motion.h2
        className="text-3xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.5 } }}
      >
        A course on Framer Motion, and abusing emojis
      </motion.h2>
    </motion.div>
  );
}

function Dance() {
  const commonTransition = {
    repeat: Infinity,
    repeatType: "reverse",
    duration: 0.3,
    // repeatDelay: 0.1,
  };
  return (
    <motion.div
      className="text-6xl relative w-64 h-64"
      initial="chill"
      animate={"dance"}
    >
      <motion.div
        className="absolute"
        style={{ top: 10, left: 60, originX: "center", originY: "bottom" }}
        variants={{
          chill: {},
          dance: { rotate: [-15, 15], transition: commonTransition },
        }}
      >
        🤨
      </motion.div>
      <motion.div
        className="absolute"
        style={{ top: 120, left: 80, originX: "center", originY: "top" }}
        variants={{
          chill: {},
          dance: { rotate: [-5, 5], transition: commonTransition },
        }}
      >
        🦵
      </motion.div>
      <motion.div
        className="absolute"
        style={{ top: 130, left: 60, originX: "center", originY: "top" }}
        variants={{
          chill: {},
          dance: { rotate: [5, -5], transition: commonTransition },
        }}
      >
        🦵
      </motion.div>
      <motion.div
        className="absolute text-4xl"
        style={{ top: 80, left: 30, rotate: -90 }}
        variants={{
          chill: {},
          dance: { y: [-10, 10], transition: commonTransition },
        }}
      >
        👊
      </motion.div>
      <motion.div
        className="absolute text-4xl"
        style={{ top: 90, left: 120, rotate: -90, scaleX: -1 }}
        variants={{
          chill: {},
          dance: { y: [10, -10], transition: commonTransition },
        }}
      >
        👊
      </motion.div>
    </motion.div>
  );
}

function Test() {
  return <motion.span animate={{ scale: 4 }}>🦶</motion.span>;
}

export function LearnReactDesignMotionPage() {
  const [isMain, setIsMain] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setIsMain(true);
    }, 1000);
  }, []);
  return (
    <motion.div className="bg-gray-900 h-screen text-gray-200">
      {/* <AnimateSharedLayout>
        {isMain ? <Main /> : <Welcome />}
      </AnimateSharedLayout> */}
      {/* <Dance /> */}
      <Test />
    </motion.div>
  );
}
