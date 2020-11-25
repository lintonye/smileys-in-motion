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
    {
      col: 0,
      row: 0,
      text: `<div>





</div>`,
    },
    {
      col: 1,
      row: 0,
      text: `<mdiv>





</div>`,
    },
    {
      col: 2,
      row: 0,
      text: `<modiv>





</div>`,
    },
    {
      col: 3,
      row: 0,
      text: `<motdiv>





</div>`,
    },
    {
      col: 4,
      row: 0,
      text: `<motidiv>





</div>`,
    },
    {
      col: 5,
      row: 0,
      text: `<motiodiv>





</div>`,
    },
    {
      col: 6,
      row: 0,
      text: `<motiondiv>





</div>`,
    },
    {
      col: 7,
      row: 0,
      text: `<motion.div>





</div>`,
    },
    {
      col: 3,
      row: 6,
      text: `<motion.div>





</mdiv>`,
    },
    {
      col: 4,
      row: 6,
      text: `<motion.div>





</modiv>`,
    },
    {
      col: 5,
      row: 6,
      text: `<motion.div>





</motdiv>`,
    },
    {
      col: 6,
      row: 6,
      text: `<motion.div>





</motidiv>`,
    },
    {
      col: 7,
      row: 6,
      text: `<motion.div>





</motiodiv>`,
    },
    {
      col: 8,
      row: 6,
      text: `<motion.div>





</motiondiv>`,
    },
    {
      col: 9,
      row: 6,
      text: `<motion.div>





</motion.div>`,
    },
    {
      col: 12,
      row: 0,
      text: `<motion.div >





</motion.div>`,
    },
    {
      col: 13,
      row: 0,
      text: `<motion.div a>





</motion.div>`,
    },
    {
      col: 14,
      row: 0,
      text: `<motion.div an>





</motion.div>`,
    },
    {
      col: 15,
      row: 0,
      text: `<motion.div ani>





</motion.div>`,
    },
    {
      col: 16,
      row: 0,
      text: `<motion.div anim>





</motion.div>`,
    },
    {
      col: 17,
      row: 0,
      text: `<motion.div anima>





</motion.div>`,
    },
    {
      col: 18,
      row: 0,
      text: `<motion.div animat>





</motion.div>`,
    },
    {
      col: 19,
      row: 0,
      text: `<motion.div animate>





</motion.div>`,
    },
    {
      col: 20,
      row: 0,
      text: `<motion.div animate=>





</motion.div>`,
    },
    {
      col: 21,
      row: 0,
      text: `<motion.div animate=">





</motion.div>`,
    },
    {
      col: 22,
      row: 0,
      text: `<motion.div animate="d>





</motion.div>`,
    },
    {
      col: 23,
      row: 0,
      text: `<motion.div animate="da>





</motion.div>`,
    },
    {
      col: 24,
      row: 0,
      text: `<motion.div animate="dan>





</motion.div>`,
    },
    {
      col: 25,
      row: 0,
      text: `<motion.div animate="danc>





</motion.div>`,
    },
    {
      col: 26,
      row: 0,
      text: `<motion.div animate="dance>





</motion.div>`,
    },
    {
      col: 27,
      row: 0,
      text: `<motion.div animate="dance">





</motion.div>`,
    },
  ];
}

function Cursor({ col, row }) {
  const charWidth = 14.6;
  const cursorHeight = 20;
  const lineHeight = 40;
  return (
    <motion.div
      className="w-1 bg-gray-400 absolute"
      style={{
        height: cursorHeight,
        x: col * charWidth,
        y: row * lineHeight,
        left: 24,
        top: 38,
      }}
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
  );
}

export function CodeTyping({ sequence, onTypingComplete }) {
  const [index, setIndex] = useState(0);
  const codes = createCodes(sequence);
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((i) => (i < codes.length - 1 ? i + 1 : i));
    }, 50);
    return () => clearInterval(interval);
  }, [codes]);
  useEffect(() => {
    if (index === codes.length - 1 && typeof onTypingComplete === "function")
      onTypingComplete();
  }, [index, codes]);
  const code = codes[index];
  return (
    <div className="relative">
      <Code>{code.text}</Code>
      <Cursor col={code.col} row={code.row} />
    </div>
  );
}
