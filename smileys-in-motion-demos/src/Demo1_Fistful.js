import * as React from "react";

/* eslint-disable jsx-a11y/accessible-emoji */

export function Demo1_Fistful() {
  return (
    <div style={{ display: "flex" }}>
      <div>👊</div>
      <div>🤨</div>
      <div style={{ transform: "scaleX(-1)" }}>👊</div>
    </div>
  );
}
