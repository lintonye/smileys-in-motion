import * as React from "react";
import Lottie from "react-lottie";

export function LottiePlayer({
  data,
  loop = true,
  autoplay = true,
  stopped,
  paused,
}) {
  const defaultOptions = {
    loop,
    autoplay,
    animationData: data,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <Lottie
      options={defaultOptions}
      // height={200}
      // width={600}
      isStopped={stopped}
      isPaused={paused}
    />
  );
}
