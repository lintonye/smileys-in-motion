import * as React from "react";

export function Video({
  play = true,
  src,
  posterUrl,
  width = undefined,
  height = undefined,
  maxWidth = undefined,
  style,
  ...props
}) {
  const videoRef = React.useRef();
  React.useEffect(() => {
    const videoElement = videoRef.current;
    if (videoElement) {
      if (play) videoElement.play();
      else videoElement.pause();
    }
  }, [play, videoRef]);
  return (
    <video
      ref={videoRef}
      src={src}
      autoPlay={false}
      loop
      muted
      playsInline
      poster={posterUrl}
      style={{
        ...style,
        width,
        height,
        maxWidth,
      }}
      {...props}
    />
  );
}
