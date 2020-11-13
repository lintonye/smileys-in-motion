import * as React from "react";
import { motion, AnimateSharedLayout, AnimatePresence } from "framer-motion";
import { useState } from "react";

function SportModal({ type, onClose }) {
  const toolbar = (
    <motion.div
      style={{
        fontSize: 12,
        display: "flex",
        justifyContent: "flex-end",
        alignSelf: "flex-end",
      }}
    >
      <motion.div
        style={{ cursor: "pointer", padding: 8 }}
        whileHover={{ scale: 1.1 }}
        onClick={() => onClose()}
        initial={{ opacity: 0, y: -20 }}
        animate={{
          opacity: 1,
          y: 0,
          transition: { delay: 0.3, ease: "easeOut" },
        }}
      >
        ╳&nbsp; Close
      </motion.div>
    </motion.div>
  );
  return (
    <motion.div
      style={{
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        // pointerEvents: "all",
        background: "rgba(0,0,0,0.6)",
        position: "absolute",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      // key={type}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        style={{
          top: 120,
          left: 40,
          right: 40,
          borderRadius: 8,
          padding: `8px 16px 16px 16px`,
          boxShadow: "0 2px 16px rgba(0,0,0,0.4)",
          background: "#666",
          color: "#eee",
          textAlign: "left",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
        layoutId={`card-${type}`}
      >
        {toolbar}
        <motion.div style={{ fontSize: 180 }} layoutId={`emoji-${type}`}>
          {type}
        </motion.div>
        <motion.p
          style={{ fontSize: 14, lineHeight: 1.5 }}
          initial={{ opacity: 0, y: 200 }}
          animate={{
            opacity: 1,
            y: 0,
            transition: { delay: 0.3, ease: "easeOut" },
          }}
          exit={{ y: 200 }}
        >
          Water polo is a competitive team sport played in water between two
          teams. The game consists of four quarters in which the two teams
          attempt to score goals by throwing the ball into the opposing team's
          goal. The team with the most goals at the end of the game wins the
          match. Each team is made up of six field players and one goalkeeper.
          Excluding the goalkeeper, players participate in both offensive and
          defensive roles. Water polo is typically played in an all-deep pool so
          that players cannot touch the bottom.
        </motion.p>
      </motion.div>
    </motion.div>
  );
}
export function SharedElement() {
  const sports = "🏄‍♂️ 🏊‍♀ ️🚴‍♀️ 🤽‍♀️ 🏇 🏌️‍♀️ 🤾 🤸‍♀️ 🏋️‍ ️⛹ ️🤺 🚣‍♀️".split(" ");
  const [selectedSport, setSelectedSport] = useState(null);
  return (
    <div style={{ position: "relative" }}>
      <AnimateSharedLayout type="crossfade">
        <motion.div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr 1fr",
            gridGap: 8,
          }}
        >
          {sports.map((a) => (
            <motion.div
              style={{
                padding: 16,
                background: "#444",
                borderRadius: 8,
                cursor: "pointer",
                boxShadow: "0 2px 8px rgba(0,0,0,0.4)",
              }}
              whileHover={{ scale: 1.1 }}
              onTap={() => setSelectedSport(a)}
              layoutId={`card-${a}`}
              key={a}
            >
              <motion.div layoutId={`emoji-${a}`}>{a}</motion.div>
            </motion.div>
          ))}
        </motion.div>
        <AnimatePresence>
          {selectedSport && (
            <SportModal
              type={selectedSport}
              onClose={() => setSelectedSport(null)}
            />
          )}
        </AnimatePresence>
      </AnimateSharedLayout>
    </div>
  );
}
