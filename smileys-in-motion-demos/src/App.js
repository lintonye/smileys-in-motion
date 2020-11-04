import * as React from "react";
import { Fistful } from "./Fistful";
import { SVGSmiley } from "./SVGSmiley";
import { ThemeToggle } from "./ThemeToggle";

export default function App() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: 120,
        height: "100vh",
      }}
    >
      {/* <Fistful /> */}
      {/* <SVGSmiley /> */}
      <ThemeToggle />
    </div>
  );
}
