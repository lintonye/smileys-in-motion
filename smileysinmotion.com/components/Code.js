import * as React from "react";
import Prism from "prismjs";
import { useEffect, useState } from "react";

import { motion, useAnimation } from "framer-motion";

export function Code({ children, inline, lang = "html", highlight = true }) {
  useEffect(() => {
    if (highlight) {
      Prism.highlightAll();
    }
  }, [children, highlight]);
  return inline ? (
    <code className={`language-${lang}`}>{children}</code>
  ) : (
    <div className="text-lg relative flex sm:text-3xl">
      <pre className="relative overflow-hidden">
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
      col: 12,
      row: 0,
      text: `<motion.div >





</div>`,
    },
    {
      col: 13,
      row: 0,
      text: `<motion.div a>





</div>`,
    },
    {
      col: 14,
      row: 0,
      text: `<motion.div an>





</div>`,
    },
    {
      col: 15,
      row: 0,
      text: `<motion.div ani>





</div>`,
    },
    {
      col: 16,
      row: 0,
      text: `<motion.div anim>





</div>`,
    },
    {
      col: 17,
      row: 0,
      text: `<motion.div anima>





</div>`,
    },
    {
      col: 18,
      row: 0,
      text: `<motion.div animat>





</div>`,
    },
    {
      col: 19,
      row: 0,
      text: `<motion.div animate>





</div>`,
    },
    {
      col: 20,
      row: 0,
      text: `<motion.div animate=>





</div>`,
    },
    {
      col: 21,
      row: 0,
      text: `<motion.div animate=">





</div>`,
    },
    {
      col: 22,
      row: 0,
      text: `<motion.div animate="d>





</div>`,
    },
    {
      col: 23,
      row: 0,
      text: `<motion.div animate="da>





</div>`,
    },
    {
      col: 24,
      row: 0,
      text: `<motion.div animate="dan>





</div>`,
    },
    {
      col: 25,
      row: 0,
      text: `<motion.div animate="danc>





</div>`,
    },
    {
      col: 26,
      row: 0,
      text: `<motion.div animate="dance>





</div>`,
    },
    {
      col: 27,
      row: 0,
      text: `<motion.div animate="dance">





</div>`,
    },
    {
      col: 3,
      row: 6,
      text: `<motion.div animate="dance">





</mdiv>`,
    },
    {
      col: 4,
      row: 6,
      text: `<motion.div animate="dance">





</modiv>`,
    },
    {
      col: 5,
      row: 6,
      text: `<motion.div animate="dance">





</motdiv>`,
    },
    {
      col: 6,
      row: 6,
      text: `<motion.div animate="dance">





</motidiv>`,
    },
    {
      col: 7,
      row: 6,
      text: `<motion.div animate="dance">





</motiodiv>`,
    },
    {
      col: 8,
      row: 6,
      text: `<motion.div animate="dance">





</motiondiv>`,
    },
    {
      col: 9,
      row: 6,
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
    // TODO cursor is hidden on mobile.
    <motion.div
      className="invisible w-1 bg-gray-400 absolute sm:visible"
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

export function CodeTyping({ sequence, onTypingComplete, initialDelay = 0 }) {
  const [index, setIndex] = useState(0);
  const codes = createCodes(sequence);
  useEffect(() => {
    const timeout = setTimeout(
      () => {
        setIndex((i) => (i < codes.length - 1 ? i + 1 : i));
      },
      index === 0 ? initialDelay * 1000 : Math.min(100, Math.random() * 700)
    );
    return () => clearTimeout(timeout);
  }, [codes, index]);
  useEffect(() => {
    if (index === codes.length - 1 && typeof onTypingComplete === "function")
      onTypingComplete();
  }, [index, codes]);
  const code = codes[index];
  return (
    <div className="relative">
      {/* To prevent flickering, only highlight the code in the end. */}
      <Code highlight={index === codes.length - 1}>{code.text}</Code>
      {index > 0 && <Cursor col={code.col} row={code.row} />}
    </div>
  );
}
