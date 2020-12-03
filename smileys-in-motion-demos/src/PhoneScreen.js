import * as React from "react";
import { motion } from "framer-motion";

const phoneWidth = 300;
const phoneHeight = (phoneWidth * 1023) / 510;
const screenWidth = phoneWidth - 40;
const screenHeight = (screenWidth * 2436) / 1125;

function Frame({
  width,
  height,
  background,
  borderRadius,
  children,
  top,
  left,
  overflow,
  ...props
}) {
  return (
    <motion.div
      {...props}
      style={{
        width,
        height,
        background,
        borderRadius,
        top,
        left,
        overflow,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        position: "absolute",
        /* https://stackoverflow.com/a/44949525 */
        // .safari-overflow-fix {
        "-webkit-transform": "translateZ(0)",
        "-webkit-mask-image":
          "-webkit-radial-gradient(circle, white 100%, black 100%)",
        // }
      }}
    >
      {children}
    </motion.div>
  );
}

export function PhoneScreen(props) {
  return (
    <div
      style={{ width: phoneWidth, height: phoneHeight, position: "relative" }}
    >
      {/* Phone frame */}
      <Frame
        width={phoneWidth}
        height={phoneHeight}
        borderRadius={30}
        center
        background="url(https://cdn.glitch.com/071e5391-90f7-476b-b96c-1f51f7106b0c%2F510px-IPhone_X_vector.svg.png)"
        style={{ backgroundSize: "cover" }}
        onTap={props.onTap}
      >
        {/* Screen enclosure */}
        <Frame
          background={props.background}
          width={screenWidth}
          height={screenHeight}
          left={(phoneWidth - screenWidth) / 2}
          top={20}
          overflow="hidden"
          borderRadius={25}
          style={{ backgroundSize: "cover" }}
        >
          {props.children}
        </Frame>
        {/* Knotch */}
        <Frame
          width={phoneWidth}
          height={40}
          borderRadius={30}
          background="url(https://cdn.glitch.com/071e5391-90f7-476b-b96c-1f51f7106b0c%2Fiphone-knotch.png?v=1560384088002)"
          style={{ backgroundSize: "cover" }}
        />
      </Frame>
    </div>
  );
}
