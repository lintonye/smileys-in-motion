import { Fistful } from "./Fistful";
import { SVGSmiley } from "./SVGSmiley";
import { ThemeToggle } from "./ThemeToggle";
import { EmojiPicker } from "./EmojiPicker";

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
      {/* <ThemeToggle /> */}
      <EmojiPicker />
    </div>
  );
}
