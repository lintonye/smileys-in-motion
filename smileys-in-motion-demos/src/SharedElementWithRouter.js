import * as React from "react";
import { motion, AnimateSharedLayout, AnimatePresence } from "framer-motion";
import { useState } from "react";
import img16x9 from "./poop-unsplash-640x480.jpg";
import imgSquare from "./poop-unsplash-480x480.jpg";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link as RRLink,
  useParams,
} from "react-router-dom";

/* eslint-disable jsx-a11y/accessible-emoji */

function Link(props) {
  return (
    <RRLink {...props} style={{ color: "white", textDecoration: "none" }} />
  );
}

function SportModal({ sportId, onClose }) {
  const idx = sports.findIndex((s) => s.id === sportId);
  const sport = sports[idx];
  const toolbar = (
    <motion.div
      style={{
        fontSize: 12,
        display: "flex",
        justifyContent: "flex-end",
        alignSelf: "flex-end",
      }}
    >
      <Link to="/">
        <motion.div
          style={{ cursor: "pointer", padding: 8 }}
          whileHover={{ scale: 1.1 }}
          initial={{ opacity: 0, y: -20 }}
          animate={{
            opacity: 1,
            y: 0,
            transition: { delay: 0.3, ease: "easeOut" },
          }}
        >
          ╳&nbsp; Close
        </motion.div>
      </Link>
    </motion.div>
  );
  return (
    <motion.div
      style={{
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        background: "rgba(0,0,0,0.6)",
        position: "absolute",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
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
        layoutId={`card-${sport.id}`}
      >
        {toolbar}
        <motion.div style={{ fontSize: 180 }} layoutId={`emoji-${sport.id}`}>
          {sport.title}
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

const sports = "🏄‍♂️ 🏊‍♀ ️🚴‍♀️ 🤽‍♀️ 🏇 🏌️‍♀️ 🤾 🤸‍♀️ 🏋️‍ ️⛹ ️🤺 🚣‍♀️"
  .split(" ")
  .map((s, idx) => ({ id: `itm-${idx}`, title: s }));

function Sports() {
  const { activeSportId } = useParams();
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
            <Link to={`/sport/${s.id}`} key={s.id}>
              <motion.div
                style={{
                  padding: 16,
                  background: "#444",
                  borderRadius: 8,
                  cursor: "pointer",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.4)",
                }}
                whileHover={{ scale: 1.1 }}
                layoutId={`card-${s.id}`}
              >
                <motion.div layoutId={`emoji-${s.id}`}>{s.title}</motion.div>
              </motion.div>
            </Link>
          ))}
        </motion.div>
        <AnimatePresence>
          {activeSportId && <SportModal sportId={activeSportId} />}
        </AnimatePresence>
      </AnimateSharedLayout>
    </div>
  );
}

export function SharedElementWithRouter() {
  return (
    <Router>
      <Switch>
        <Route path="/sport/:activeSportId">
          <Sports />
        </Route>
        <Route path="/">
          <Sports />
        </Route>
      </Switch>
    </Router>
  );
}
