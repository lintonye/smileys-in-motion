import * as React from "react";
import { Fistful } from "./Fistful";
import { SVGSmiley } from "./SVGSmiley";
import { ThemeToggle } from "./ThemeToggle";
import { EmojiPicker } from "./EmojiPicker";
import { LayoutExamples } from "./LayoutExamples";
import { MountUnmount } from "./MountUnmount";
import { InitialStyleAnimate } from "./InitialStyleAnimate";
import { DragAndLayoutAnimation } from "./DragAndLayoutAnimation";
import { PanMuscleGuy } from "./PanMuscleGuy";

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
      {/* <SVGSmiley /> */}
      {/* <ThemeToggle /> */}
      {/* <EmojiPicker /> */}
      {/* <LayoutExamples /> */}
      {/* <MountUnmount /> */}
      {/* <InitialStyleAnimate /> */}
      {/* <DragAndLayoutAnimation /> */}
      <PanMuscleGuy />
    </div>
  );
}
