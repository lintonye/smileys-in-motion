import * as React from "react";
import { motion, AnimateSharedLayout, AnimatePresence } from "framer-motion";
import { useState } from "react";
import img16x9 from "./poop-unsplash-640x480.jpg";
import imgSquare from "./poop-unsplash-480x480.jpg";

/* eslint-disable jsx-a11y/accessible-emoji */

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

function DialogTransition() {
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
          {sports.map((s) => (
            <motion.div
              style={{
                padding: 16,
                background: "#444",
                borderRadius: 8,
                cursor: "pointer",
                boxShadow: "0 2px 8px rgba(0,0,0,0.4)",
              }}
              whileHover={{ scale: 1.1 }}
              onTap={() => setSelectedSport(s)}
              layoutId={`card-${s}`}
              key={s}
            >
              <motion.div layoutId={`emoji-${s}`}>{s}</motion.div>
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

function Tab({ title, color, active, onSelect }) {
  return (
    <motion.div onClick={onSelect} style={{ cursor: "default" }}>
      <motion.div
        whileHover={{ color: "#fff" }}
        animate={{ color: active ? "#fff" : "#999" }}
        style={{ padding: "8px 16px 8px 16px" }}
      >
        {title}
      </motion.div>
      {active && (
        <motion.div
          layoutId="indicator"
          style={{ height: 4, width: "100%", borderRadius: 4 }}
          animate={{ background: color }}
        />
      )}
    </motion.div>
  );
}

function Tabs() {
  const [index, setIndex] = useState(0);
  const tabs = [
    { title: "Apple", color: "#F22" },
    { title: "Plum", color: "#6565fe" },
    { title: "Banana", color: "#2F2" },
  ];
  return (
    <AnimateSharedLayout>
      <div style={{ display: "flex", fontSize: 25, color: "#eee" }}>
        {tabs.map((tab, i) => (
          <Tab
            {...tab}
            key={tab.title}
            onSelect={() => setIndex(i)}
            active={index === i}
          />
        ))}
      </div>
    </AnimateSharedLayout>
  );
}

function LayoutSwitcher({ children, layouts = undefined }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const finalLayouts = layouts || React.Children.toArray(children);
  return (
    <AnimateSharedLayout>
      <div
        onClick={() =>
          setCurrentIndex((i) => (i < finalLayouts.length - 1 ? i + 1 : 0))
        }
      >
        {finalLayouts[currentIndex]}
      </div>
    </AnimateSharedLayout>
  );
}

function DOMReuse() {
  return (
    <LayoutSwitcher
      layouts={[
        <motion.div>
          <motion.div layoutId="happy">😄</motion.div>
          <motion.div layoutId="sad">😡</motion.div>
        </motion.div>,
        <motion.div>
          <motion.div layoutId="happy">😄</motion.div>
        </motion.div>,
        <motion.div>
          <motion.div layoutId="sad">😡</motion.div>
          <motion.div layoutId="happy">😄</motion.div>
        </motion.div>,
      ]}
    ></LayoutSwitcher>
  );
}

function AspectRatio() {
  return (
    <LayoutSwitcher>
      {/* <motion.img src={img16x9} layoutId="img" />
      <motion.img src={imgSquare} style={{ width: 200 }} layoutId="img" /> */}
      <motion.div layoutId="text" style={{ fontSize: 40, color: "#eee" }}>
        Moootion 🐮
      </motion.div>
      <motion.div layoutId="text" style={{ fontSize: 100, color: "#eee" }}>
        Moootion 🐮
      </motion.div>
    </LayoutSwitcher>
  );
}

export function SharedLayout() {
  return (
    <>
      {/* <Tabs /> */}
      <AspectRatio />
      {/* <DialogTransition /> */}
    </>
  );
}
