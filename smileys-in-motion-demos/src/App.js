import * as React from "react";
import { Fistful } from "./Fistful";
import { SVGSmiley } from "./SVGSmiley";

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
      <Fistful />
      {/* <SVGSmiley /> */}
    </div>
  );
}
