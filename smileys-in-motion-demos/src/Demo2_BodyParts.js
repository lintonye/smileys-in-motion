import * as React from "react";
import { motion } from "framer-motion";

/* eslint-disable jsx-a11y/accessible-emoji */

export function Demo2_BodyParts() {
  return (
    <div style={{ display: "flex" }}>
      <motion.div whileHover={{ scale: 1.1 }} drag dragMomentum={false}>
        🤨
      </motion.div>
      <motion.div whileHover={{ scale: 1.1 }} drag dragMomentum={false}>
        👍
      </motion.div>
      <motion.div whileHover={{ scale: 1.1 }} drag dragMomentum={false}>
        🦵
      </motion.div>
      <motion.div whileHover={{ scale: 1.1 }} drag dragMomentum={false}>
        🦵
      </motion.div>
      <motion.div whileHover={{ scale: 1.1 }} drag dragMomentum={false}>
        🖖
      </motion.div>
    </div>
  );
}
