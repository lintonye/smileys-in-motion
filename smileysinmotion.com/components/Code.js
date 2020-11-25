import * as React from "react";
import Prism from "prismjs";
import { useEffect, useState } from "react";

import { motion, useAnimation } from "framer-motion";

export function Code({ children, inline, lang = "html" }) {
  useEffect(() => {
    Prism.highlightAll();
  }, [children]);
  return inline ? (
    <code className={`language-${lang}`}>{children}</code>
  ) : (
    <div className="text-3xl relative flex">
      <pre className="text-3xl  relative">
        <code className={`language-${lang}`}>{children}</code>
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
