import * as React from "react";
import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

const variants = {
  enter: (direction) => {
    return {
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction) => {
    return {
      zIndex: 0,
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0,
    };
  },
};

export function Carrousel({ children, className, frameClassName }) {
  const [index, setIndex] = useState(0);
  const items = React.Children.toArray(children);
  const prevIndex = useRef(0);
  useEffect(() => (prevIndex.current = index));
  const direction = Math.sign(index - prevIndex.current);
  return (
    <motion.div
      className={`relative flex flex-col justify-center items-center ${className}`}
    >
      <div className={`relative w-full ${frameClassName}`}>
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={index}
            initial={"enter"}
            animate={"center"}
            custom={direction}
            exit={"exit"}
            variants={variants}
            className="absolute top-0 left-0 w-full" // absolute is needed for the animation
          >
            {items[index]}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex space-x-2 mt-4">
        {items.length > 1 &&
          Array(items.length)
            .fill(0)
            .map((_, i) => (
              <motion.div
                key={i}
                className={`rounded-full w-2 h-2 hover:bg-gray-400 ${
                  i === index ? "bg-gray-200" : "bg-gray-500"
                }`}
                whileHover={{ scale: 1.1 }}
                onTap={() => setIndex(i)}
              />
            ))}
      </div>
    </motion.div>
  );
}
