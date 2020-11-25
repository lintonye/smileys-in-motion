import * as React from "react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export function Carrousel({ children, className }) {
  const [index, setIndex] = useState(0);
  const items = React.Children.toArray(children);
  return (
    <motion.div
      className={`relative flex flex-col justify-center items-center ${className}`}
    >
      {/* Render it normally to make room */}
      <div className="invisible w-full">{items[index]}</div>
      <AnimatePresence initial={false}>
        <motion.div
          key={index}
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "-50%", opacity: 0 }}
          className="absolute top-0 left-0 w-full" // absolute is needed for the animation
        >
          {items[index]}
        </motion.div>
      </AnimatePresence>

      <div className="flex space-x-2">
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
