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
      <div className="invisible">{items[index]}</div>
      <AnimatePresence>
        <motion.div
          key={index}
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "-50%", opacity: 0 }}
          className="absolute top-0 left-0" // absolute is needed for the animation
        >
          {items[index]}
        </motion.div>
      </AnimatePresence>

      <div className="flex space-x-3">
        {Array(items.length)
          .fill(0)
          .map((_, i) => (
            <motion.div
              className="p-3 -mx-6 -my-3"
              whileHover={{ scale: 1.1 }}
              onTap={() => setIndex(i)}
            >
              <motion.div
                key={i}
                className={`rounded-full w-2 h-2 hover:bg-gray-400 ${
                  i === index ? "bg-gray-200" : "bg-gray-500"
                }`}
              />
            </motion.div>
          ))}
      </div>
    </motion.div>
  );
}
