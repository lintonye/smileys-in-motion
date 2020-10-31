import * as React from "react";
import { BodyParts } from "./BodyParts";
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
      <BodyParts />
      {/* <Fistful /> */}
    </div>
  );
}
