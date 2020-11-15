import * as React from "react";
import { motion, useElementScroll, useTransform } from "framer-motion";
import { useRef } from "react";

/* eslint-disable jsx-a11y/accessible-emoji */

function Parallax() {
  const rocket = (
    <>
      <motion.div
        style={{
          position: "absolute",
          rotate: -45,
          left: 200,
          top: 250,
          scale: 1.3,
          zIndex: 2,
        }}
      >
        🚀
      </motion.div>
    </>
  );

  const background = (
    <motion.div
      style={{
        position: "absolute",
      }}
    >
      <motion.div
        style={{
          position: "absolute",
          top: 200,
          scale: 0.5,
        }}
      >
        🌘
      </motion.div>
      <motion.div
        style={{
          position: "absolute",
          color: "#fff",
          left: 350,
          top: 200,
          scale: 0.5,
        }}
      >
        🪐
      </motion.div>
    </motion.div>
  );
  const content = (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1 style={{ color: "#fff", fontSize: 30, marginTop: 80 }}>
        Fly Me To The Moon
      </h1>
      <div
        style={{
          width: 1400,
          height: 1400,
          marginTop: 200,
          paddingTop: 100,
          background: "#000526",
          borderRadius: "50%",
          boxShadow:
            "inset 0 7px 39px -7px rgba(255,255,255,0.4), inset 2px 7px 9px -7px rgba(255,255,255,0.6)",
          color: "#eee",
          fontSize: 15,
          zIndex: 1,
          lineHeight: 1.5,
          textAlign: "center",
        }}
      >
        Fly me to the moon
        <br />
        Let me play among the stars
        <br />
        Let me see what spring is like
        <br />
        On a-Jupiter and Mars
        <br />
        <br />
        In other words: hold my hand
        <br />
        In other words: baby, kiss me
        <br />
        <br />
        Fill my heart with song
        <br />
        And let me sing for ever more
        <br />
        You are all I long for
        <br />
        All I worship and adore
        <br />
        <br />
        In other words: please, be true
        <br />
        In other words: I love you
        <br />
        <br />
        Fill my heart with song
        <br />
        Let me sing for ever more
        <br />
        You are all I long for
        <br />
        All I worship and adore
        <br />
        <br />
        In other words: please, be true
        <br />
        In other words, in other words: I love you
        <br />
        <br />
        <p>
          <em>
            Design inspired by{" "}
            <a href="https://epicreact.dev/" style={{ color: "#eee" }}>
              Epic React
            </a>
          </em>
        </p>
      </div>
    </div>
  );
  return (
    <div
      style={{
        width: 500,
        height: 400,
        background: "#000526",
        overflowY: "scroll",
        overflowX: "hidden",
        position: "relative",
        border: "1px solid blue",
        borderRadius: 8,
        padding: 8,
      }}
    >
      {background}
      {content}
      {rocket}
    </div>
  );
}

export function TrackScrollProgress() {
  return (
    <>
      <Parallax />
    </>
  );
}
