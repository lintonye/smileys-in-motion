import * as React from "react";
import Prism from "prismjs";
import { useEffect, useState } from "react";

import { motion, useAnimation } from "framer-motion";

// Variants: block, typing, reveal
// TODO: Remove this
function TypingMask({ top, left, chars, speed = 1, animate }) {
  const xBlock = Array(chars * 2 + 1).fill(`0%`);
  const pixelsPerChar = 15;
  const totalWidth = pixelsPerChar * chars;
  const x = Array(chars)
    .fill(0)
    .map((_, idx) => idx / chars)
    .reduce(
      (result, current, index) => [
        ...result,
        current,
        current,
        ...(index === chars - 1 ? [1] : []), // append a 1 at the end
      ],
      []
    )
    .map((percent) => percent * totalWidth);
  const times = Array(chars)
    .fill(0)
    .reduce(
      (result, current, index) => [
        ...result,
        index / chars,
        (index + 1) / chars - 0.00001,
        ...(index === chars - 1 ? [1] : []), // append a 1 at the end
      ],
      []
    );
  // console.log({ x, xBlock, times });
  return (
    <motion.div
      className="bg-gray-400 absolute"
      initial="block"
      animate={animate}
      variants={{
        block: { x: 0, opacity: 1 },
        typing: {
          x,
          // opacity: 1,
          transition: {
            duration: (chars * speed) / 20,
            ease: [0.79, 0.07, 0, 1.04],
            times,
          },
        },
        reveal: { opacity: 0 },
      }}
      style={{
        width: `90%`,
        height: 25,
        top,
        left,
        backgroundColor: "#1e1e1e",
      }}
    >
      <motion.div
        className="h-full w-1"
        variants={{
          block: {
            opacity: 0,
          },
          typing: { opacity: 1 },
          reveal: { opacity: 0 },
        }}
      >
        <motion.div
          className="h-full w-full bg-gray-400"
          animate={{
            opacity: [1, 1, 0],
            transition: {
              repeat: Infinity,
              repeatType: "loop",
              repeatDelay: 0.6,
              duration: 0.5,
              times: [0, 0.8, 1],
            },
          }}
        />
      </motion.div>
    </motion.div>
  );
}

export function Code({ children, inline, lang = "html", typingMasks = [] }) {
  useEffect(() => {
    Prism.highlightAll();
  }, [children]);
  return inline ? (
    <code className={`language-${lang}`}>{children}</code>
  ) : (
    <div className="text-3xl relative flex">
      <pre className="text-3xl  relative">
        <code className={`language-${lang}`}>{children}</code>
        {typingMasks.map((mask) => (
          <TypingMask {...mask} key={mask.id} />
        ))}
      </pre>
    </div>
  );
}

function createCodes(sequence) {
  return [
    `<div>





</div>`,
    `<mdiv>





</div>`,
    `<modiv>





</div>`,
    `<motdiv>





</div>`,
    `<motidiv>





</div>`,
    `<motiodiv>





</div>`,
    `<motiondiv>





</div>`,
    `<motion.div>





</div>`,
    `<motion.div>





</mdiv>`,
    `<motion.div>





</modiv>`,
    `<motion.div>





</motdiv>`,
    `<motion.div>





</motidiv>`,
    `<motion.div>





</motiodiv>`,
    `<motion.div>





</motiondiv>`,
    `<motion.div>





</motion.div>`,
  ];
}

export function CodeTyping({ sequence, onTypingComplete }) {
  const [index, setIndex] = useState(0);
  const codes = createCodes(sequence);
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((i) => (i < codes.length - 1 ? i + 1 : i));
    }, 200);
    return () => clearInterval(interval);
  }, [codes]);
  useEffect(() => {
    if (index === codes.length - 1 && typeof onTypingComplete === "function")
      onTypingComplete();
  }, [index, codes]);
  return <Code>{codes[index]}</Code>;
}
