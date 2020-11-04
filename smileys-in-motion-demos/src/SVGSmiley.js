import * as React from "react";
import { motion } from "framer-motion";

export function SVGSmiley() {
  return (
    <svg
      width={150}
      height={150}
      viewBox="0 0 82 85"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <motion.path
        d="M42.9341 2C88.8601 7.5 95.5 80 42.9341 83C16.4767 82 0.500006 61.5 2.00008 38.5C5.00008 16 13.8794 8.00444 36 2M37.4429 29C30.9534 30.5 24.9631 22.5 20.4703 28M49.4236 19.5C49.4236 19.5 54.9148 15 58.9083 15C62.9019 15 63.4011 18.5 63.4011 18.5M58.9083 54H25.9615M28.9566 33.5C34.947 33.5 34.947 42 28.9566 42C25.674 41.5725 21.9679 36.5 26.9598 33.5M55.414 29C60.9051 30.5 62.3017 42.6328 55.414 42C48.5263 41.3672 51.5519 28.1549 53.4172 29"
        stroke="#FFD766"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 0.6 }}
        transition={{ duration: 2, yoyo: Infinity }}
      />
    </svg>
  );
}
