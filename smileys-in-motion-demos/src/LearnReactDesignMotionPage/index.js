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
      className="h-full flex justify-center items-center text-6xl min-h-screen"
    >
      <motion.div layoutId="smiley">🤨</motion.div>
    </motion.div>
  );
}

function Heading() {
  return (
    <div className="max-w-5xl mx-auto">
      <motion.h1
        className="text-5xl mt-60 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <motion.span layoutId="smiley" className="inline-block mr-3">
          🤨
        </motion.span>
        Master Framer Motion, Build Awesome Animations. Like this page.
      </motion.h1>
      <div
        className="text-2xl mt-40 max-w-lg m-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.5 } }}
      >
        <p>Framer Motion is great.</p>
        <p>So great that it sometimes feels like cheating.</p>
        <p>Framer Motion is great.</p>
        <p>So great that it sometimes feels like cheating.</p>
      </div>
    </div>
  );
}

function Code({ children }) {
  return (
    <pre>
      <code>{children}</code>
    </pre>
  );
}

function DanceDemo() {
  return (
    <div className="m-auto max-w-lg">
      <Code>{`
      <motion.div animate="dance">

      </motion.div>
      `}</Code>
      <DancingGuy />
    </div>
  );
}

function Quiz() {
  return (
    <div>
      <h1>Quiz</h1>
    </div>
  );
}

function Main() {
  return (
    <div className="min-h-screen">
      <Heading />
      <DanceDemo />
      <Quiz />
    </div>
  );
}

function DancingGuy() {
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
    <div className="bg-gray-900 text-gray-200 overflow-auto">
      <AnimateSharedLayout>
        {isMain ? <Main /> : <Welcome />}
      </AnimateSharedLayout>
      {/* <Dance /> */}
      <Test />
    </div>
  );
}
