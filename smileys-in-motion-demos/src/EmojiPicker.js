import * as React from "react";
import { motion, useCycle } from "framer-motion";

/* eslint-disable jsx-a11y/accessible-emoji */

export function EmojiPicker() {
  const emojis = "😱 😇 🙂 🙃 😉 😍 🥰 🤪 😎 🤓 😳 😟 😆 😅 😫 😭 🥶 😰 😓 🤗 🤔 🤭 🤫 🥴 😡".split(
    " "
  );
  const [mode, cycleMode] = useCycle("close", "open");
  const grid = (
    <motion.div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(5, auto)",
        gridGap: 8,
        fontSize: 30,
        background: "#666",
        padding: 8,
        boxShadow: "0 1px 4px rgba(255, 255, 255, 0.4)",
        originY: "bottom",
        originX: "left",
        marginLeft: 60,
        marginBottom: -26,
      }}
      initial={false}
      animate={mode}
      variants={{
        open: {
          scale: 1,
          transition: {
            staggerChildren: 0.02,
            delayChildren: 0.2,
            type: "spring",
            damping: 12,
          },
        },
        close: {
          scale: 0,
          transition: {
            duration: 0.2,
            // when: "afterChildren",
            // staggerChildren: 0.02,
            // staggerDirection: -1
          },
        },
      }}
    >
      {emojis.map((e) => (
        <motion.div
          key={e}
          style={{ border: "1px solid #666", padding: 4 }}
          whileHover={{ borderColor: "#3ff" }}
          onClick={cycleMode}
          variants={{
            open: { scale: 1, transition: { duration: 0.1 } },
            close: { scale: 0, transition: { duration: 0.1 } },
          }}
        >
          {e}
        </motion.div>
      ))}
    </motion.div>
  );

  const toolbar = (
    <motion.ul
      style={{
        background: "#444",
        fontSize: 30,
        display: "grid",
        gridTemplateColumns: "repeat(10, auto)",
        listStyleType: "none",
      }}
    >
      <motion.li onClick={cycleMode} style={{}} whileHover={{ scale: 1.2 }}>
        🙂
      </motion.li>
    </motion.ul>
  );

  return (
    <motion.div>
      {grid}
      {toolbar}
    </motion.div>
  );
}
