import * as React from "react";
import { useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import styled from "styled-components";

/* eslint-disable jsx-a11y/accessible-emoji */

const StyledDiv = styled.div`
  background: white;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.4);
`;

function StyledComponents() {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-20, 20]);
  return (
    <StyledDiv whileHover={{ scale: 1.2 }} drag style={{ x, rotate }}>
      😍
    </StyledDiv>
  );
}

const MyDiv = (props) => (
  <div
    style={{
      background: "white",
      padding: 16,
      borderRadius: 8,
      boxShadow: "2px 2px 8px rgba(0, 0, 0, 0.4)",
    }}
  >
    {props.children}
  </div>
);

function Custom() {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-20, 20]);
  return (
    <MyDiv whileHover={{ scale: 1.2 }} drag style={{ x, rotate }}>
      😇
    </MyDiv>
  );
}

export function CustomComponents() {
  return (
    <>
      <StyledComponents />
      {/* <Custom /> */}
    </>
  );
}
