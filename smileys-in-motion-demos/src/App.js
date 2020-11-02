import * as React from "react";
import { BodyParts } from "./BodyParts";
import { Fistful } from "./Fistful";
import { MuscleDude } from "./MuscleDude";
import { Slider } from "./Slider";

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
      {/* <Fistful /> */}
      {/* <BodyParts /> */}
      {/* <Slider /> */}
      <MuscleDude />
    </div>
  );
}
