import * as React from "react";
import { useState, useEffect } from "react";
import {
  AnimateSharedLayout,
  motion,
  transform,
  useAnimation,
  useTransform,
  useViewportScroll,
} from "framer-motion";
import { Code } from "./Code";

function Welcome() {
  return (
    <motion.div
      initial={{ x: "-60vw" }}
      animate={{ x: 0 }}
      className="h-full flex justify-center items-center text-6xl min-h-screen"
    >
      <MrSmiley />
    </motion.div>
  );
}

function MrSmiley() {
  return (
    <motion.span layoutId="smiley" className="inline-block m-3 text-6xl">
      🤨
    </motion.span>
  );
}

function Heading() {
  return (
    <div className="max-w-5xl mx-auto">
      <motion.h1
        className="text-5xl pt-60 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        Master Framer Motion, Build Awesome Animations. Like this page.
      </motion.h1>
      <div
        className="text-2xl mt-40 max-w-lg m-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.5 } }}
      >
        <MrSmiley />
        <p>Framer Motion is great.</p>
        <p>So great that it sometimes feels like cheating.</p>
        <p>Framer Motion is great.</p>
        <p>So great that it sometimes feels like cheating.</p>
      </div>
    </div>
  );
}

function DanceDemo({ animate }) {
  const line1 = useAnimation();
  const line2 = useAnimation();
  const dancingGuy = useAnimation();
  useEffect(() => {
    async function play() {
      switch (animate) {
        case "beforeSeen":
          break;
        case "readyToPlay":
          dancingGuy.start("readyToPlay");
          break;
        case "playing":
          await line1.start("typing");
          await line1.start("reveal");
          await line2.start("typing");
          await dancingGuy.start("playing");
          break;
        case "afterSeen":
          await line2.start("reveal");
          dancingGuy.start("afterSeen");
      }
    }
    play();
  }, [animate]);
  return (
    <motion.div
      className="m-auto max-w-3xl"
      animate={animate}
      variants={{
        beforeSeen: { filter: "grayscale(0)" },
        afterSeen: { filter: "grayscale(1)" },
      }}
    >
      <Code
        typingMasks={[
          {
            id: "line1",
            top: "8%",
            left: "6%",
            chars: 27,
            animate: line1,
          },
          {
            id: "line2",
            top: "82%",
            left: "6%",
            chars: 13,
            animate: line2,
          },
        ]}
      >{`<motion.div animate="dance">




</motion.div>`}</Code>
      <div className="-mt-72">
        <DancingGuy animate={dancingGuy} />
      </div>
    </motion.div>
  );
}

function Quiz() {
  return (
    <div>
      <h1 className="my-96">Quiz</h1>
    </div>
  );
}

function Main() {
  const { scrollYProgress } = useViewportScroll();
  // Variants: beforeSeen =scroll=> readyToPlay =scroll=> playing =scroll=> afterSeen
  const [danceDemoAnimate, setDanceDemoAnimate] = useState("beforeSeen");
  useEffect(() => {
    const unsub = scrollYProgress.onChange((y) => {
      if (danceDemoAnimate !== "afterSeen") {
        // Weird that this extra "beforeSeen" is needed here. Bug of transform?
        const newAnimate = transform(
          y,
          [0, 0.4, 0.5, 0.6, 0.9],
          ["beforeSeen", "beforeSeen", "readyToPlay", "playing", "afterSeen"]
        );
        // console.log({ y, newAnimate });
        setDanceDemoAnimate(newAnimate);
      }
    });
    return unsub;
  }, []);
  return (
    <div className="min-h-screen">
      <Heading />
      <DanceDemo animate={danceDemoAnimate} />
      <Quiz />
    </div>
  );
}

function DancingGuy({ animate }) {
  const commonTransition = {
    repeat: Infinity,
    repeatType: "reverse",
    duration: 0.3,
    // repeatDelay: 0.1,
  };
  return (
    <motion.div
      className="m-auto text-6xl relative w-64 h-64"
      initial={"beforeSeen"}
      animate={animate}
    >
      <motion.div
        className="absolute"
        style={{ top: 15, left: 60, originX: "center", originY: "bottom" }}
        variants={{
          beforeSeen: { opacity: 0 },
          readyToPlay: { opacity: 1 },
          playing: { rotate: [-15, 15], transition: commonTransition },
          afterSeen: { rotate: 0 },
        }}
      >
        🤨
      </motion.div>
      <motion.div
        className="absolute"
        style={{ top: 120, left: 80, originX: "center", originY: "top" }}
        variants={{
          beforeSeen: { opacity: 0 },
          readyToPlay: { opacity: 1 },
          playing: { rotate: [-5, 5], transition: commonTransition },
          afterSeen: { rotate: 0 },
        }}
      >
        🦵
      </motion.div>
      <motion.div
        className="absolute"
        style={{ top: 130, left: 60, originX: "center", originY: "top" }}
        variants={{
          beforeSeen: { opacity: 0 },
          readyToPlay: { opacity: 1 },
          playing: { rotate: [5, -5], transition: commonTransition },
          afterSeen: { rotate: 0 },
        }}
      >
        🦵
      </motion.div>
      <motion.div
        className="absolute text-4xl"
        style={{ top: 80, left: 30, rotate: -90 }}
        variants={{
          beforeSeen: { opacity: 0 },
          readyToPlay: { opacity: 1 },
          playing: { y: [-10, 10], transition: commonTransition },
          afterSeen: { y: 0 },
        }}
      >
        👊
      </motion.div>
      <motion.div
        className="absolute text-4xl"
        style={{ top: 90, left: 120, rotate: -90, scaleX: -1 }}
        variants={{
          beforeSeen: { opacity: 0 },
          readyToPlay: { opacity: 1 },
          playing: { y: [10, -10], transition: commonTransition },
          afterSeen: { y: 0 },
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
    <div className="bg-gray-900 text-gray-200">
      <AnimateSharedLayout>
        {isMain ? <Main /> : <Welcome />}
      </AnimateSharedLayout>
    </div>
  );
}
