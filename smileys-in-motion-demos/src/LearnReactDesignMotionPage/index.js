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

export function LearnReactDesignMotionPage() {
  const [isMain, setIsMain] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setIsMain(true);
    }, 1000);
  }, []);
  return (
    <motion.div className="bg-gray-900 h-screen text-gray-200">
      <AnimateSharedLayout>
        {isMain ? <Main /> : <Welcome />}
      </AnimateSharedLayout>
    </motion.div>
  );
}
