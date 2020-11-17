import * as React from "react";
import { useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import styled from "styled-components";

/* eslint-disable jsx-a11y/accessible-emoji */

const StyledDiv = styled(motion.div)`
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

const MyDiv = React.forwardRef((props, ref) => (
  <div
    ref={ref}
    style={{
      background: "white",
      padding: 16,
      borderRadius: 8,
      boxShadow: "2px 2px 8px rgba(0, 0, 0, 0.4)",
    }}
  >
    {props.children}
  </div>
));

const MotionMyDiv = motion.custom(MyDiv);

function Custom() {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-20, 20]);
  return (
    <MotionMyDiv whileHover={{ scale: 1.2 }} drag style={{ x, rotate }}>
      😍
    </MotionMyDiv>
  );
}

function Comp(props) {
  return (
    <div style={{ fontSize: 80, color: "#eee" }}>{JSON.stringify(props)}</div>
  );
}

function TestKeyRef() {
  const ref = useRef();
  return <Comp key="123" ref={ref} p1="p1" p2="p2" />;
}

export function CustomComponents() {
  return (
    <>
      <StyledComponents />
      <Custom />
      {/* <TestKeyRef /> */}
    </>
  );
}
