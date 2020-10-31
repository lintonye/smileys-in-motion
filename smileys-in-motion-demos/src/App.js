import * as React from "react";
import { Demo1_Fistful } from "./Demo1_Fistful";
import { Demo2_BodyParts } from "./Demo2_BodyParts";

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
      {/* <Demo1_Fistful /> */}
      <Demo2_BodyParts />
    </div>
  );
}
