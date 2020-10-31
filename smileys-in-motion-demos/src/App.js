import * as React from "react";
import { Demo2_BodyParts } from "./Demo2_BodyParts";
import { Fistful } from "./Fistful";

export default function App() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: 120,
        height: "100vh",
        userSelect: "none",
      }}
    >
      <Demo2_BodyParts />
      {/* <Fistful /> */}
    </div>
  );
}
