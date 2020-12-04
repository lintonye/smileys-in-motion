import * as React from "react";
import { motion, AnimateSharedLayout, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
  useLocation,
} from "react-router-dom";

/* eslint-disable jsx-a11y/accessible-emoji */

function Tab({ title, color, active, onSelect }) {
  return (
    <motion.div onClick={onSelect} style={{ cursor: "pointer" }}>
      <motion.div style={{ padding: "8px 16px 8px 16px" }}>{title}</motion.div>
      {active && (
        <motion.div
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
    <motion.div style={{ fontSize: 120 }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
        }}
      >
        {Array(15)
          .fill(0)
          .map((_, i) => (
            <div key={i}>{children}</div>
          ))}
      </div>
    </motion.div>
  );
}

function Tabs({ activeIndex, onSelect }) {
  const history = useHistory();
  return (
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
  );
}

function TabContents({ direction }) {
  return (
    <Switch>
      {tabs.map(({ path, content }) => (
        <Route exact path={path} key={path}>
          <TabContent>{content}</TabContent>
        </Route>
      ))}
    </Switch>
  );
}

const tabs = [
  { title: "Root", color: "#7b7c76", path: "/", content: "🥔" },
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
