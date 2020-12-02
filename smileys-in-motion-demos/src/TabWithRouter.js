import * as React from "react";
import { motion, AnimateSharedLayout, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import img16x9 from "./poop-unsplash-640x480.jpg";
import imgSquare from "./poop-unsplash-480x480.jpg";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link as RRLink,
  useParams,
  useHistory,
  useLocation,
} from "react-router-dom";

/* eslint-disable jsx-a11y/accessible-emoji */

const variants = {
  enter: (direction) => {
    return {
      x: direction > 0 ? "50vw" : "-50vw",
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
      x: direction < 0 ? "50vw" : "-50vw",
    };
  },
};

function Tab({ title, color, active, onSelect }) {
  return (
    <motion.div onClick={onSelect} style={{ cursor: "pointer" }}>
      <motion.div
        whileHover={{ color: "#fff" }}
        initial={false}
        animate={{ color: active ? "#fff" : "#999" }}
        style={{ padding: "8px 16px 8px 16px" }}
      >
        {title}
      </motion.div>
      {active && (
        <motion.div
          layoutId="indicator"
          style={{ height: 4, width: "100%", borderRadius: 4 }}
          initial={false}
          animate={{ background: color }}
        />
      )}
    </motion.div>
  );
}

function TabContent({ children, direction }) {
  return (
    <motion.div
      initial="enter"
      animate="center"
      exit="exit"
      variants={variants}
      style={{ fontSize: 120 }}
      custom={direction}
      // transition={{ type: "spring", stiffness: 300, damping: 30 }}
      transition={{ duration: 0.2 }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
        }}
      >
        {Array(15)
          .fill(0)
          .map((_, i) => (
            <div>{children}</div>
          ))}
      </div>
    </motion.div>
  );
}

function Tabs({ activeIndex, onSelect }) {
  const history = useHistory();
  return (
    <AnimateSharedLayout>
      <div style={{ display: "flex", fontSize: 25, color: "#eee" }}>
        {tabs.map((tab, i) => (
          <Tab
            {...tab}
            key={tab.title}
            onSelect={() => {
              onSelect(i);
              history &&
                typeof history.push === "function" &&
                history.push(tab.path);
            }}
            active={activeIndex === i}
          />
        ))}
      </div>
    </AnimateSharedLayout>
  );
}

function TabContents({ direction }) {
  const location = useLocation();
  return (
    <AnimatePresence exitBeforeEnter={true} custom={direction} initial={false}>
      <Switch key={location.pathname} location={location}>
        {tabs.map(({ path, content }) => (
          <Route exact path={path} key={path}>
            <TabContent direction={direction}>{content}</TabContent>
          </Route>
        ))}
      </Switch>
    </AnimatePresence>
  );
}

const tabs = [
  { title: "Apples", color: "#64ff22", path: "/apples", content: "🍏" },
  { title: "Grapes", color: "#8b65fe", path: "/grapes", content: "🍇" },
  { title: "Bananas", color: "#e2ff22", path: "/bananas", content: "🍌" },
];

function TabApp() {
  const location = useLocation();
  const currentIndex = tabs.findIndex((tab) => tab.path === location.pathname);
  const [index, setIndex] = useState(currentIndex);
  const prevIndex = useRef(-1);
  useEffect(() => (prevIndex.current = index));
  const direction = Math.sign(index - prevIndex.current);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        border: "1px solid #888",
        borderRadius: 8,
        padding: 16,
        minWidth: "50%",
        minHeight: "50%",
      }}
    >
      <Tabs activeIndex={index} onSelect={(i) => setIndex(i)} />
      <TabContents direction={direction} />
    </div>
  );
}

export function TabWithRouter() {
  return (
    <Router>
      <TabApp />
    </Router>
  );
}

// function TabWithoutRouter() {
//   const [index, setIndex] = useState(0);
//   const prevIndex = useRef(-1);
//   useEffect(() => (prevIndex.current = index));
//   const direction = Math.sign(index - prevIndex.current);
//   const tab = tabs[index];
//   return (
//     <div
//       style={{
//         display: "flex",
//         flexDirection: "column",
//         overflow: "hidden",
//         border: "1px solid #888",
//         borderRadius: 8,
//         padding: 16,
//         minWidth: "50%",
//         minHeight: "50%",
//         position: "relative",
//       }}
//     >
//       <Tabs activeIndex={index} onSelect={(i) => setIndex(i)} />

//       <AnimatePresence exitBeforeEnter custom={direction}>
//         <div
//           style={{ position: "absolute", top: 80, width: "100%" }}
//           key={tab.path}
//         >
//           <TabContent direction={direction}>{tab.content}</TabContent>
//         </div>
//       </AnimatePresence>
//     </div>
//   );
// }
