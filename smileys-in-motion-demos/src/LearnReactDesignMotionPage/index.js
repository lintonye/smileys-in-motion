import * as React from "react";
import { useState, useEffect, useRef } from "react";
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

function ScrollIndicator({ title = "Scroll" }) {
  return (
    <div>
      <div className="text-center text-sm mt-2 -mb-3 text-gray-400">
        {title}
      </div>
      <motion.div
        className="text-center"
        animate={{ y: [0, 5], opacity: [0.5, 1] }}
        transition={{ repeat: Infinity, repeatType: "reverse" }}
      >
        ▿
      </motion.div>
    </div>
  );
}

function useInitialBoundingBox() {
  const ref = useRef();
  const [box, setBox] = useState({});
  useEffect(() => {
    if (ref.current) {
      const b = ref.current.getBoundingClientRect();
      setBox(b);
    }
  }, [ref]);
  return [ref, box];
}

function useViewportDimension() {
  const [dim, setDim] = useState({});
  useEffect(() => {
    function updateDim() {
      setDim({ width: window.innerWidth, height: window.innerHeight });
    }
    updateDim();
    window.addEventListener("resize", updateDim);
    return () => window.removeEventListener("resize", updateDim);
  }, []);
  return dim;
}

function Page({ children, className, fullScreen = false }) {
  const [ref, { top, height }] = useInitialBoundingBox();
  const { height: vh } = useViewportDimension();
  const { scrollY } = useViewportScroll();
  const inputRange = [
    ...(top >= vh ? [top - vh, top - vh + 20] : [0]),
    top + height / 3,
    top + height / 2,
  ];
  // console.log({ top, vh, inputRange });
  const filter = useTransform(scrollY, inputRange, [
    ...(top >= vh ? ["grayscale(0)", "grayscale(0)"] : ["grayscale(0)"]),
    "grayscale(0)",
    "grayscale(1)",
  ]);
  const opacity = useTransform(scrollY, inputRange, [
    ...(top >= vh ? [1, 1] : [1]),
    1,
    0.3,
  ]);
  const indicatorOpacity = useTransform(scrollY, [top, top + 20], [1, 0]);
  return (
    <motion.div
      style={{ filter, opacity }}
      className={
        className + " relative m-auto " + (fullScreen ? "h-screen" : "")
      }
      ref={ref}
    >
      {children}
      {fullScreen && (
        <motion.div
          className="absolute bottom-1 left-0 right-0"
          style={{ opacity: indicatorOpacity }}
        >
          <ScrollIndicator />
        </motion.div>
      )}
    </motion.div>
  );
}

function Heading() {
  const [danceDemoAnimate, setDanceDemoAnimate] = useState("beforeSeen");
  useEffect(() => {
    setTimeout(() => {
      setDanceDemoAnimate(["readyToPlay", "playing"]);
    }, 500);
  }, []);
  return (
    <Page
      className="max-w-xl mx-auto flex flex-col justify-center align-middle space-y-8"
      fullScreen
    >
      <h1 className="text-4xl text-center">
        Build Advanced UI Animations With Framer Motion &amp; React
      </h1>
      <div className="text-center mb-6 space-x-4">
        {Array(5)
          .fill("⭐️")
          .map((s) => (
            <span>{s}</span>
          ))}
      </div>
      {/* <h2 className="text-center text-lg mb-6">
        A comprehensive Framer Motion course on{" "}
        <span className="line-through">abusing emojis</span> the mental model,
        tips &amp; tricks, and common pitfalls
      </h2> */}
      <div className="pb-10">
        <DanceDemo animate={danceDemoAnimate} />
      </div>
      <motion.div
        className="text-lg space-y-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3 }}
      >
        <p>
          This is Framer Motion: add a "motion." prefix, sprinkle some props,
          animate on! It's THAT easy!
        </p>
        <p className="text-sm">
          PS: Guess what the "video" above was made with?
        </p>
      </motion.div>
    </Page>
  );
}

function DanceDemo({ animate }) {
  const line1 = useAnimation();
  const line2 = useAnimation();
  const dancingGuy = useAnimation();
  useEffect(() => {
    async function play(anim) {
      switch (anim) {
        case "beforeSeen":
          break;
        case "readyToPlay":
          await dancingGuy.start("readyToPlay");
          break;
        case "playing":
          await line1.start("typing");
          await line1.start("reveal");
          await line2.start("typing");
          await dancingGuy.start("playing");
          break;
        case "afterSeen":
          await line2.start("reveal");
          // await dancingGuy.stop();
          await dancingGuy.start("afterSeen");
      }
    }
    async function playAll(anims) {
      for (let anim of anims) {
        // console.log(anim);
        await play(anim);
      }
    }
    const anims = Array.isArray(animate) ? animate : [animate];
    playAll(anims);
  }, [animate]);
  return (
    <motion.div
      className="m-auto max-w-3xl"
      initial={false}
      animate={animate}
      variants={{
        beforeSeen: { filter: "grayscale(0)", opacity: 0 },
        readyToPlay: { opacity: 1 },
        afterSeen: { filter: "grayscale(0)" },
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
      <div className="-mt-60">
        <DancingGuy animate={dancingGuy} />
      </div>
    </motion.div>
  );
}

function Foot({ repeatType = null }) {
  return (
    <motion.span
      className="inline-block"
      initial={{ scale: 1 }}
      animate={{ scale: 4 }}
      transition={{
        ...(repeatType ? { repeat: Infinity, repeatType } : { type: "ease" }),
        duration: 2,
      }}
    >
      🦶
    </motion.span>
  );
}

function Option({ children }) {
  return (
    <motion.div className="border-2 border-solid border-gray-700 rounded-md p-8 cursor-pointer hover:border-blue-500 hover:bg-gray-800">
      {children}
    </motion.div>
  );
}

function QuizAnswer() {
  return (
    <Page className="m-auto max-w-xl pt-10 space-y-8 text-lg">
      <p>The correct answer is D -- there is no animation at all! </p>

      <p>
        It's NOT a bug. It's due to{" "}
        <a href="https://stackoverflow.com/a/14883287">the rules of HTML</a>:
        <Code inline>span</Code> has{" "}
        <Code inline lang="css">
          display: inline
        </Code>{" "}
        by default, and CSS transforms (such as
        <Code inline>scale</Code>) don't work on inline elements. To make it
        work, we could set its display to either <Code inline>block</Code> or{" "}
        <Code inline>inline-block</Code>.
      </p>

      <p>
        Framer Motion is a great library. But it can be tricky to get it to work
        in real-world applications. This is not to blame the library. It's
        because the reality is complex. Web development IS tricky!
      </p>

      <p>Here are a few more examples:</p>
      <ul>
        <li>How would I make Motion work with React Router?</li>
        <li>Why is the text distorted during the transition?</li>
        <li>
          Why doesn't <Code inline>AnimatePresence</Code> work even if you set
          the element to{" "}
          <Code inline lang="css">
            display: none
          </Code>
          ?
        </li>
        <li>I removed an item from the list, why is it still there?</li>
        <li>
          Why does{" "}
          <Code inline>{`<AnimateSharedLayout type="crossfade">`}</Code> work
          the same as <Code inline>switch</Code>?
        </li>
        <li>...</li>
      </ul>

      <p>
        I've been struggling on all these questions since 2019 when Motion V1
        was launched. You'd likely stumble upon them too!{" "}
      </p>

      <p>
        I've spent a lot of time chasing down the why's and solutions. As an
        example, it took me 3 full days to understand{" "}
        <Code inline>AnimateSharedLayout</Code> and its relationship to{" "}
        <Code inline>AnimatePresence</Code>.
      </p>

      <h2>Good news: Since I've spent the time, you don't have to!</h2>
    </Page>
  );
}

function Quiz() {
  return (
    <Page className="max-w-xl space-y-6 text-lg pt-16" fullScreen>
      <p className="">
        Well, if Framer Motion is so easy to use, what is the point of making a
        course? Let me ask you a question first. 👇
      </p>

      <Code>{`<motion.span animate={{ scale: 4 }}>
🦶
</motion.span>
`}</Code>
      <p className="text-center">What kind of animation would you get?</p>
      <div className="grid grid-cols-2 gap-2">
        <Option id="A">
          <Foot repeatType={null} />
        </Option>
        <Option id="B">
          <Foot repeatType={"loop"} />
        </Option>
        <Option id="C">
          <Foot repeatType={"reverse"} />
        </Option>
        <Option id="D">None of the above</Option>
      </div>
    </Page>
  );
}

function Main() {
  return (
    <div>
      <Heading />
      <Quiz />
      <QuizAnswer />
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
      className="m-auto text-6xl relative w-48 h-64"
      initial={"beforeSeen"}
      animate={animate}
    >
      <motion.div
        className="absolute"
        style={{ top: 15, left: 60, originX: "center", originY: "bottom" }}
        variants={{
          beforeSeen: { opacity: 0, rotate: -15 },
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
          beforeSeen: { opacity: 0, rotate: -5 },
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
          beforeSeen: { opacity: 0, rotate: 5 },
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
          beforeSeen: { opacity: 0, y: -10 },
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
          beforeSeen: { opacity: 0, y: 10 },
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
      <Main />
      {/* <AnimateSharedLayout>
        {isMain ? <Main /> : <Welcome />}
      </AnimateSharedLayout> */}
    </div>
  );
}
