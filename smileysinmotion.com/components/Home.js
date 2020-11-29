import * as React from "react";
import {
  useState,
  useEffect,
  useRef,
  useContext,
  useMemo,
  useCallback,
} from "react";
import {
  AnimateSharedLayout,
  motion,
  transform,
  useAnimation,
  useTransform,
  useViewportScroll,
} from "framer-motion";
import { Code, CodeTyping } from "./Code";
import { Carrousel } from "./Carrousel";
import Image from "next/image";
import UAParser from "ua-parser-js";
import Logo from "./Logo";
import { Video } from "./Video";
import { useLocalStorage } from "./useLocalStorage";
import { nanoid } from "nanoid";
import useSound from "use-sound";

function Welcome() {
  return (
    <motion.div
      initial={{ x: "-60vw" }}
      animate={{ x: 0 }}
      className="h-full flex justify-center items-center text-6xl min-h-screen"
    >
      <MrSmiley />
    </motion.div>
  );
}

function MrSmiley() {
  return (
    <motion.span layoutId="smiley" className="inline-block m-3 text-6xl">
      🤨
    </motion.span>
  );
}

function ScrollIndicator({ title = "Scroll" }) {
  return (
    <div>
      <div className="text-center text-sm mt-2 -mb-3 text-gray-400">
        {title}
      </div>
      <motion.div
        className="text-center mt-1"
        animate={{ y: [0, 5], opacity: [0.5, 1] }}
        transition={{ repeat: Infinity, repeatType: "reverse" }}
      >
        ▿
      </motion.div>
    </div>
  );
}

function useInitialBoundingBox() {
  const ref = useRef();
  const [box, setBox] = useState({});
  useEffect(() => {
    const updateBox = () => {
      if (ref.current) {
        const b = ref.current.getBoundingClientRect();
        setBox(
          DOMRectReadOnly.fromRect({
            x: b.left + window.scrollX,
            y: b.top + window.scrollY,
            width: b.width,
            height: b.height,
          })
        );
      }
    };
    updateBox();
    window.addEventListener("resize", updateBox);
    return () => window.removeEventListener("resize", updateBox);
  }, [ref]);
  return [ref, box];
}

function useViewportDimension() {
  const [dim, setDim] = useState({});
  useEffect(() => {
    function updateDim() {
      setDim({ width: window.innerWidth, height: window.innerHeight });
    }
    updateDim();
    window.addEventListener("resize", updateDim);
    return () => window.removeEventListener("resize", updateDim);
  }, []);
  return dim;
}

function Page({ children, className = "", fullScreen = false, onPageScroll }) {
  const [ref, { top, height }] = useInitialBoundingBox();
  const { height: vh } = useViewportDimension();
  const { scrollY } = useViewportScroll();
  // This is to prevent the case when top/height is briefly undefined but used to set up filter/opacity
  // TODO likely this is not necessary!
  const bboxUnavailable = top === undefined || height === undefined;
  const inputRange = bboxUnavailable
    ? [0, 1]
    : [
        ...(top >= vh ? [top - vh, top - vh + 20] : [0]),
        top + (height - vh / 3),
        top + (height - vh / 4),
      ];
  // console.log({ top, vh, inputRange });
  const filter = useTransform(
    scrollY,
    inputRange,
    bboxUnavailable
      ? ["grayscale(0)", "grayscale(0)"]
      : [
          ...(top >= vh ? ["grayscale(0)", "grayscale(0)"] : ["grayscale(0)"]),
          "grayscale(0)",
          "grayscale(1)",
        ]
  );
  const opacity = useTransform(
    scrollY,
    inputRange,
    bboxUnavailable ? [1, 1] : [...(top >= vh ? [1, 1] : [1]), 1, 0.3]
  );
  const indicatorOpacity = useTransform(scrollY, [top, top + 20], [1, 0]);
  useEffect(() => {
    const unsubscribe = scrollY.onChange((y) => {
      const y0 = top - vh > 0 ? top - vh : 0;
      const y1 = top - vh > 0 ? top - vh + height : height;
      // console.log({ y, y0, y1 });
      if (typeof onPageScroll === "function" && y0 <= y && y <= y1) {
        onPageScroll({ pageTop: top, scrollY: y });
      }
    });
    return unsubscribe;
  }, [onPageScroll, top, vh, height]);
  return (
    <motion.div
      style={{ filter, opacity }}
      className={
        className + " relative m-auto " + (fullScreen ? "min-h-screen" : "")
      }
      ref={ref}
      initial={false}
    >
      {children}
      {/* {fullScreen && (
        <motion.div
          className="absolute bottom-1 left-0 right-0"
          style={{ opacity: indicatorOpacity }}
        >
          <ScrollIndicator />
        </motion.div>
      )} */}
    </motion.div>
  );
}

function SoundControl({ isSoundOn, onToggleSound }) {
  return (
    <motion.div
      layoutId="sound-control"
      onClick={() => onToggleSound()}
      className="cursor-pointer"
    >
      {isSoundOn ? "sound on" : "muted"}
    </motion.div>
  );
}

const stopUnique = (sound, fade = false) => {
  if (sound && sound.playing()) {
    if (fade) {
      console.log("fade");
      sound.fade(1, 0, 2000);
      setTimeout(() => {
        sound.stop();
      }, 2000);
    } else {
      sound.stop();
    }
  }
};

const playUnique = (sound, fade = false) => {
  if (sound && !sound.playing()) {
    sound.play();
    if (fade) sound.fade(0, 1, 2000);
  }
};

/**
 * 1. stop by fading out
 * 2. don't play two instances of the same audio at the same time
 * 3. provides control for starting and stopping
 * 4. react to isSoundOn
 */
function usePlaySound(url, { autoplay, loop = true }) {
  const { isSoundOn } = useSoundControl();
  const [_, { sound }] = useSound(url, {
    loop,
    // autoplay: autoplay && isSoundOn,
  });
  useEffect(() => {
    if (isSoundOn) {
      autoplay && playUnique(sound);
    } else {
      stopUnique(sound, true);
    }
  }, [isSoundOn, sound, autoplay]);
  const [stopRequested, setStopRequested] = useState(false);
  const play = useCallback(
    (fade) => {
      isSoundOn && playUnique(sound, fade);
      setStopRequested(false);
    },
    [sound, isSoundOn]
  );
  const stop = useCallback(
    (fade) => {
      if (!stopRequested) {
        isSoundOn && stopUnique(sound, fade);
        setStopRequested(true);
      }
    },
    [sound, isSoundOn, stopRequested]
  );
  return [play, stop];
}

function Heading() {
  // initial, typing, typingComplete, scrolled
  const [animate, setAnimate] = useState("initial");
  const [autoSwitchCarrousel, setAutoSwitchCarrousel] = useState(false);
  const [lightsOut, setLightsOut] = useState(true);
  const { isSoundOn, toggleSound } = useSoundControl();
  const [playMusic, stopMusic] = usePlaySound("/bg-music.mp3", {
    autoplay: false,
  });
  return (
    <Page
      className="mx-auto flex flex-col justify-center -mt-16 items-center space-y-8 max-w-xs sm:max-w-xl sm:mt-0"
      fullScreen
      onPageScroll={({ scrollY }) => {
        if (scrollY > 20) {
          // console.log(animate);
          setAnimate("scrolled");
        }
        if (scrollY > 100) {
          stopMusic(true);
        }
      }}
    >
      <motion.h1
        className="text-2xl text-center font-extrabold sm:text-4xl"
        initial={false}
        animate={animate}
        variants={{ initial: { opacity: 0 }, typingComplete: { opacity: 1 } }}
      >
        Build Advanced UI Animations With Framer Motion &amp; React
      </motion.h1>
      <motion.div
        className="text-center mb-6 space-x-3"
        initial={false}
        animate={animate}
        variants={{ initial: { opacity: 0 }, typingComplete: { opacity: 1 } }}
      >
        {Array(5)
          .fill("⭐️")
          .map((s, index) => (
            <span key={index}>{s}</span>
          ))}
      </motion.div>
      {/* <div className="relative mx-auto w-4/5">
        <DanceDemo className="" />
      </div> */}
      <Carrousel
        className="relative mx-auto w-full sm:w-full"
        frameClassName="aspect-16x9"
        border
        autoSwitch={autoSwitchCarrousel}
        lightsOut={lightsOut}
      >
        <DanceDemo
          typingSound={lightsOut}
          onTypingComplete={() => {
            lightsOut && playMusic();
            setTimeout(() => {
              setAnimate("typingComplete");
              setLightsOut(false);
              setTimeout(() => {
                setAutoSwitchCarrousel(true);
              }, 2500);
            }, 1000);
          }}
        />
        <Video src="/images/drag-reorder.mp4" />
        <Video src="/images/shared-element.mp4" />
        <Video src="/images/circular-slider.mp4" />
        <Video src="/images/mount-unmount.mp4" />
        <Video src="/images/theme-toggle.mp4" />
        {/* <Video src="/images/smileyinmotion.mp4" /> */}
      </Carrousel>
      <SoundControl isSoundOn={isSoundOn} onToggleSound={toggleSound} />
      <motion.div
        initial={false}
        animate={animate}
        variants={{
          initial: { opacity: 0 },
          typingComplete: { opacity: 1 },
          scrolled: { opacity: 0, display: "none" }, //TODO why opacity along doesn't work here???
        }}
      >
        <ScrollIndicator />
      </motion.div>
    </Page>
  );
}

function DanceDemo({ typingSound, className, onTypingComplete }) {
  const [danceGuyAnimate, setDanceGuyAnimate] = useState("readyToPlay");
  const [borderAnimate, setBorderAnimate] = useState("borderHidden");
  const { isSoundOn } = useSoundControl();
  const [_, stopTypingSound] = usePlaySound("/typing-sound.mp3", {
    autoplay: typingSound,
  });
  return (
    <motion.div
      className={`${className}`}
      initial={false}
      animate={borderAnimate}
      variants={{
        borderHidden: { "--tw-border-opacity": 0 },
        borderVisible: { "--tw-border-opacity": 1 },
      }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        // transition={{ delay: 0.5 }}
      >
        <CodeTyping
          initialDelay={0.9}
          sequence={[
            `<div>





</div>`,
            `<motion.div>





</motion.div>`,
            `<motion.div animate="dance">





</motion.div>`,
          ]}
          onTypingComplete={() => {
            setDanceGuyAnimate("playing");
            setBorderAnimate("borderVisible");
            stopTypingSound();
            typeof onTypingComplete === "function" && onTypingComplete();
          }}
        />
      </motion.div>
      <motion.div
        className="-mt-52 -mb-8 sm:mb-0 sm:-mt-64"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <DancingGuy animate={danceGuyAnimate} />
      </motion.div>
    </motion.div>
  );
}

function Fist({ repeatType = null, duration = undefined, className }) {
  return (
    <motion.span
      className={`inline-block ${className}`}
      initial={{ scale: 1 }}
      animate={{ scale: 4 }}
      transition={{
        ...(repeatType ? { repeat: Infinity, repeatType } : { type: "ease" }),
        duration,
      }}
    >
      👊
    </motion.span>
  );
}

function Check({ size = 26, strokeWidth = 2 }) {
  return (
    <svg
      width={size}
      height={(19 / 26) * size}
      viewBox="0 0 26 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <motion.path
        d="M1 8.5L6.5 18l19-17"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.5 }}
      />
    </svg>
  );
}

function Cross(props) {
  const [secondPath, setSecondPath] = useState("hidden");
  return (
    <motion.svg
      width={19}
      height={18}
      viewBox="0 0 19 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <motion.path
        d="M1 1l15.5 16"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        initial={"hidden"}
        animate={"visible"}
        variants={{
          hidden: { pathLength: 0 },
          visible: { pathLength: 1 },
        }}
        transition={{ duration: 0.25 }}
        onAnimationComplete={() => {
          setSecondPath("visible");
        }}
      />
      <motion.path
        d="M18 1L1 17"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        initial="hidden"
        animate={secondPath}
        variants={{
          hidden: { opacity: 0, pathLength: 0 }, //TODO why opacity is needed here?
          visible: { opacity: 1, pathLength: 1 },
        }}
        transition={{ duration: 0.25 }}
      />
    </motion.svg>
  );
}

function Option({
  id,
  title,
  selected,
  isAnswer,
  onSelect,
  selectable,
  children,
}) {
  const [hovered, setHovered] = useState(false);
  const hover = selectable
    ? (selected
        ? isAnswer
          ? "hover:border-green-400"
          : "hover:border-red-400"
        : "hover:border-blue-400") + " cursor-pointer"
    : "";
  return (
    <motion.div
      className={`relative border-2 border-solid border-gray-700 border-opacity-80 rounded-md p-8 flex space-x-4 bg-opacity-30 
      ${hover}
      ${selected && isAnswer && "bg-green-900 border-green-500 "}
      ${selected && !isAnswer && "bg-red-900 border-red-500 "}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onTap={() => selectable && typeof onSelect === "function" && onSelect()}
    >
      <span className="text-gray-400">{id}.</span>
      <span>{hovered && children ? children : title}</span>
      {(selected || (!selectable && isAnswer)) && (
        <div
          className={`absolute right-6 mt-2 ${
            isAnswer ? "text-green-500" : "text-red-500"
          }`}
        >
          {isAnswer ? (
            <Check className="stroke-current" />
          ) : (
            <Cross className="stroke-current" />
          )}
        </div>
      )}
    </motion.div>
  );
}

function QuizAnswer() {
  return (
    <Page className="max-w-xs pt-10 space-y-8 text-lg sm:max-w-xl">
      <p>The correct answer is D because -- there is no animation at all! </p>

      <p>
        It's NOT a bug. It's due to{" "}
        <a href="https://stackoverflow.com/a/14883287" className="underline">
          the rules of HTML
        </a>
        :<Code inline>span</Code> has{" "}
        <Code inline lang="css">
          display: inline
        </Code>{" "}
        by default, and CSS transforms (such as
        <Code inline>scale</Code>) don't work on inline elements if its parent
        is a block element. To make it work, we could set its display to either{" "}
        <Code inline>block</Code> or <Code inline>inline-block</Code>. You can
        play with{" "}
        <a
          href="https://codesandbox.io/s/festive-stallman-580rz?file=/src/App.js"
          className="underline"
        >
          the code here
        </a>
        .
      </p>

      <p>
        Framer Motion is a great library. But it can be tricky to get it to work
        in real-world applications. This is not to blame the library. It's
        because the reality is complex. Web development sometimes IS tricky!
      </p>

      <p>Here are a few more examples:</p>
      <ul className="list-arrow">
        <li>How would I make Motion work with React Router?</li>
        <li>Why is the text distorted during the transition?</li>
        <li>
          Why doesn't <Code inline>AnimatePresence</Code> work even if you set
          the element to{" "}
          <Code inline lang="css">
            display: none
          </Code>
          ?
        </li>
        <li>I removed an item from the list, why is it still there?</li>
        <li>
          Why does{" "}
          <Code inline>{`<AnimateSharedLayout type="crossfade">`}</Code> behave
          the same as{" "}
          <Code inline>{`<AnimateSharedLayout type="switch">`}</Code>?
        </li>
        <li>...</li>
      </ul>

      <p>
        I've struggled on questions like these since 2019 when Motion V1 was
        launched. You'd likely, if not already, stumble upon them too!
      </p>

      <p>
        I've spent <strong>hundreds of hours</strong> chasing down the why's and
        solutions. As an example, it took me 3 days to understand{" "}
        <Code inline>AnimateSharedLayout</Code> and its relationship to{" "}
        <Code inline>AnimatePresence</Code>. Three full days!
      </p>

      <h2 className="text-2xl">
        Good news: I've turned these struggling hours into
        <span className="font-extrabold"> a faster solution for you</span>! 👇
      </h2>
    </Page>
  );
}

function Quiz() {
  const [choice, setChoice] = useState(null);
  const options = [
    {
      id: "A",
      title: "quickly scales 4x",
      preview: <Fist repeatType={null} className="ml-4" />,
    },

    {
      id: "B",
      title: "quickly scales 4x, loop",
      preview: <Fist repeatType={"reverse"} className="ml-4" />,
    },

    {
      id: "C",
      title: "slowly scales 4x",
      preview: <Fist duration={1} className="ml-4" />,
    },

    { id: "D", title: "none of the above" },
  ];
  const [uid, setUid] = useLocalStorage("userId");
  if (uid === undefined) setUid(nanoid());
  const questionId = "framer-motion-span-animate";
  return (
    <Page className="max-w-xs space-y-6 text-lg pt-16 mb-16 min-h-screen sm:max-w-xl sm:mb-32">
      <p>
        This is Framer Motion. Add a "motion." prefix. Sprinkle some props.
        Animate on!
      </p>
      <p>It's THAT easy!</p>
      <p className="font-bold text-xl">But, let me ask you a question. 👇</p>
      <div className="border-solid border-2 border-gray-500 rounded-2xl ">
        <Code>{`<div>
   <motion.span 
     animate={{ scale: 4 }}>
    👊
   </motion.span>
</div>
`}</Code>
      </div>
      <p className="text-center">What kind of animation would you get?</p>
      <div className="grid gap-2 grid-cols-1 sm:grid-cols-2">
        {options.map(({ id, title, preview }) => (
          <Option
            id={id}
            isAnswer={id === "D"}
            key={id}
            title={title}
            selected={choice === id}
            selectable={choice === null}
            onSelect={() => {
              setChoice(id);
              fetch(
                `https://us-central1-together-courses.cloudfunctions.net/quizAnswer?userId=${uid}&questionId=${questionId}&answerId=D`,
                { method: "POST", body: id }
              ).then((response) => console.log(response.status));
            }}
          >
            {preview}
          </Option>
        ))}
      </div>
      {choice && (
        <motion.div
          className="text-center text-gray-400"
          initial={false}
          animate={choice === null ? "hidden" : "visible"}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1 },
          }}
        >
          <ScrollIndicator title="Scroll to see why" />
        </motion.div>
      )}
    </Page>
  );
}

function Confetti() {
  const bits = "🎊  🍇 🍷 🌈".split(" ");
  return (
    <motion.div className="absolute text-lg">
      {bits.map((b) => (
        <span>{b}</span>
      ))}
    </motion.div>
  );
}

function CourseIntroLogo() {
  const [animate, setAnimate] = useState("beforeSeen");
  return (
    //TODO could be better orchestrated instead of relying on delay
    <motion.div className="relative">
      <motion.div
        style={{ originX: "center", originY: "center" }}
        variants={{
          beforeSeen: { opacity: 1, rotate: 0 },
          playing: { opacity: 0, rotate: 360, transition: { delay: 2 } },
        }}
      >
        <motion.div
          variants={{
            beforeSeen: { x: "-50vw" },
            playing: {
              x: 0,
              opacity: 1,
              transition: { delay: 1, damping: 15, type: "spring" },
            },
          }}
        >
          🤨
        </motion.div>
      </motion.div>
      <motion.div
        className="absolute"
        style={{ left: -28, top: -42 }}
        variants={{
          beforeSeen: { opacity: 0, rotate: -360 },
          playing: { opacity: 1, rotate: 0, transition: { delay: 2 } },
        }}
      >
        <Logo className="w-20 sm:w-32" />
      </motion.div>
    </motion.div>
  );
}

function CourseIntro() {
  const [animate, setAnimate] = useState("beforeSeen");
  return (
    <Page
      className="max-w-xs sm:max-w-lg"
      onPageScroll={({ pageTop, scrollY }) => {
        setAnimate("playing");
      }}
    >
      <motion.div
        className="space-y-16 sm:space-y-16"
        initial={false}
        animate={animate}
      >
        <div>
          <div className="text-center font-semibold mt-32 mb-7 flex text-3xl space-x-6 sm:space-x-11 sm:text-5xl">
            <CourseIntroLogo />
            <motion.h1
              className="z-10"
              variants={{
                beforeSeen: { opacity: 0, scale: 1 },
                playing: { scale: [20, 1], opacity: [0, 1] },
              }}
            >
              Smiley In Motion
            </motion.h1>
          </div>
          {/* <Confetti /> */}
          <motion.h2
            className="text-center sm:text-lg"
            variants={{
              beforeSeen: { opacity: 0 },
              playing: { opacity: 1, transition: { delay: 1.5 } },
            }}
          >
            A Framer Motion course on{" "}
            <span className="line-through">abusing emojis</span> mental models,
            tips &amp; tricks, and common pitfalls
          </motion.h2>
        </div>
        <div className="text-center text-gray-400">
          <span className="text-4xl text-white font-extralight">2</span> hours
          of <span className="text-4xl text-white font-extralight">24</span>{" "}
          bite-sized HD videos
        </div>
        <motion.div className="space-y-16">
          <Feature emoji="🧠" title="Focus on mental models">
            <li>Get started from the fundamentals</li>
            <li>
              Build a complete mental model of all the features. Know when to
              use what.
            </li>
          </Feature>
          <Feature emoji="🌏" title="Real-world use cases">
            <li>Drag to reorder, Circular slider</li>
            <li>Bottom sheet, Parallax scroll</li>
            <li>Tabs, Shared element transition (React Router)</li>
            <li>And... this page!</li>
          </Feature>
          <Feature emoji="📃" title="Cheat sheets">
            <li>Bite-size content summaries</li>
            <li>A list of pitfalls I've stumbled upon</li>
          </Feature>
          <Feature emoji="😉" title="Fun examples">
            <li>
              As promised, this course includes tricks about abusing emojis.
            </li>
          </Feature>
        </motion.div>
      </motion.div>
    </Page>
  );
}

function Feature({ emoji, title, children }) {
  return (
    <div className="flex items-center space-x-6 sm:space-x-8 ">
      <div className="text-6xl sm:text-8xl" style={{ filter: "saturate(0.4)" }}>
        {emoji}
      </div>
      <ul>
        <li className="text-xl font-bold sm:text-2xl">{title}</li>
        {children}
      </ul>
    </div>
  );
}

function PricingCard({
  title,
  subtitle,
  footnote,
  price,
  discountedPrice,
  purchaseLink,
  featured,
  className,
  children,
}) {
  return (
    <div
      className={`${
        featured ? "border-indigo-400" : "border-blue-400"
      } border-solid border-2 p-8 
    rounded-lg flex flex-col justify-center items-center space-y-6 bg-gray-900 " ${className}`}
    >
      <div className="font-semibold text-lg text-center">{title}</div>
      <div
        className={`text-center ${
          featured ? "text-indigo-400" : "text-blue-400"
        }`}
      >
        {subtitle}
      </div>
      <ul className="list-outside list-none">
        {React.Children.map(children, (c, i) => (
          <li key={i} className="flex space-x-2 items-baseline">
            <span
              className={`${featured ? "text-indigo-400" : "text-blue-400"}`}
            >
              <Check size={12} strokeWidth={4} />
            </span>
            {c}
          </li>
        ))}
      </ul>
      <div className="space-x-4">
        <span className="line-through">${price}</span>
        <span className="text-4xl">${discountedPrice}</span>
        <span>USD</span>
      </div>
      <a
        href={purchaseLink}
        className={`rounded-md px-4 py-2 ${
          featured
            ? "bg-indigo-600 hover:bg-indigo-500"
            : "bg-blue-600 hover:bg-blue-500"
        }`}
      >
        Buy Now
      </a>
      <div className="text-sm text-gray-400">{footnote}</div>
    </div>
  );
}

function Quote({ photo, name, company, companyLink, title, children }) {
  return (
    <div className="flex flex-col items-end space-y-1">
      <div className="font-serif italic text-lg sm:text-2xl">{children}</div>
      <Image
        src={photo}
        width={100}
        height={100}
        className="rounded-full self-end"
      />
      <div>{name}</div>
      <div>
        {title}
        {company && ", "}
        <a href={companyLink} className={`${companyLink && "underline"}`}>
          {company}
        </a>
      </div>
    </div>
  );
}

function Pricing() {
  return (
    <Page className="max-w-xs space-y-8 mt-16 sm:max-w-2xl sm:space-y-16 sm:mt-32">
      <h1 className="text-4xl text-center font-semibold">Get The Course</h1>
      <div className="flex flex-col sm:-space-x-3 sm:items-end sm:flex-row">
        <PricingCard
          title="Smiley In Motion"
          subtitle="For designers and developers experienced in React"
          price={99}
          discountedPrice={59}
          footnote="Black Friday deal!"
          purchaseLink="https://sso.teachable.com/secure/157508/checkout/2635049/smileys-in-motion?coupon_code=BF2020"
          className="mb-5"
        >
          <div>24 lessons, 2 hours of HD videos</div>
          <div>All starter and final code for you to follow along</div>
          <div>Cheat sheets</div>
        </PricingCard>
        <PricingCard
          featured
          title="React + Framer Starship bundle"
          subtitle="Learn from the start. No JS experience required"
          price={299}
          discountedPrice={199}
          footnote="Black Friday deal!"
          purchaseLink="https://sso.teachable.com/secure/157508/checkout/1669960/prototyping-with-react-framer-starship-bundle?coupon_code=BF2020"
        >
          <div>14 Modules, 50 lessons, 10+ hours of HD videos</div>
          <div>
            Includes <strong>Smiley In Motion</strong>
          </div>
          <div>All starter and final code for you to follow along</div>
          <div>
            Check out{" "}
            <a
              className="underline"
              href="https://learnreact.design/prototyping-with-react-framer"
            >
              course details
            </a>
          </div>
        </PricingCard>
      </div>
      <Carrousel
        className="max-w-2xl mx-auto"
        frameClassName="pb-80 sm:pb-64"
        autoSwitch={false}
      >
        <Quote
          photo="/images/kristof.webp"
          name="Kristóf Poduszló"
          company="Copyfolio"
          companyLink="https://copyfol.io/"
          title="Front-end Engineer"
        >
          Such a comprehensive overview isn't available throughout the entire
          official docs. The mental models are explained intuitively and without
          leaving any doubt for listeners.
        </Quote>
        <Quote
          photo="/images/winnie.webp"
          name="Winnie Chen"
          // company="Copyfolio"
          title="UX Designer"
        >
          I really like the simple yet interesting emoji analogies used in the
          projects! Also the course points out what are the possible challenges
          users might face using Motion library, which is helpful to save time
          from troubleshooting on our own.
        </Quote>
        <Quote
          photo="/images/remco.webp"
          name="Remco van den Top"
          company="Graphius"
          title="UX Designer"
        >
          The way you build your courses with emojis is very engaging and easy
          to understand.
        </Quote>
      </Carrousel>
    </Page>
  );
}

const content = {
  Foundation: [
    {
      title: "1. Framer Motion mental model",
      preview:
        "https://school.learnreact.design/courses/1217265/lectures/27255965",
    },
    {
      title: "2. Animate any HTML or SVG tag",
      preview:
        "https://school.learnreact.design/courses/1217265/lectures/27255961",
    },
    {
      title: "3. Keyframes and animation value types",
      preview:
        "https://school.learnreact.design/courses/1217265/lectures/27255960",
    },
    "4. Spy on animations with MotionValue",
    "5. Orchestrate animations in a React tree",
    "6. Stagger children animations",
    "7. Animate layout changes",
    "8. Animate mount/unmount transitions",
    "9. AnimatePresence, key and layout",
    "10. Understand initial, style, and animate",
    "11. Drag gesture",
    "12. Drag & MotionValue",
    "13. Drag & layout animation",
    "14. Add custom dragging with pan gesture",
    "15. Animate shared items across components",
    "16. Spy on scroll progress",
    "17. Take control of animations imperatively",
    "18. Animate custom components",
  ],
  "Real-world Examples": [
    "r1. Drag to reorder (coming soon)",
    "r2. Circular slider (coming soon)",
    "r3. Tabs (AnimatePresence and React Router 5) (coming soon)",
    "r4. Shared element transition (with React Router 5) (coming soon)",
    "r5. Bottom sheet (coming soon)",
    "r6. smileyinmotion.com (coming soon)",
  ],
  "Cheat sheets": [
    "All starter and final code",
    "Cheat sheet: pitfalls & solutions (coming soon)",
  ],
};

function Content() {
  return (
    <Page className="max-w-xs space-y-8 mt-16 text-base sm:max-w-lg sm:space-y-16 sm:mt-32 sm:text-lg">
      <h1 className="text-3xl text-center font-semibold sm:text-4xl">
        Table Of Contents
      </h1>
      <div className="space-y-2 border-solid border-2 border-blue-900 rounded-lg">
        {Object.keys(content).map((section) => (
          <div key={section} className="space-y-2">
            <div className="bg-blue-900 py-1 px-3">{section}</div>
            <ul className="space-y-2 py-1 px-3">
              {content[section].map((lesson) => {
                const lessonTitle = lesson.title || lesson;
                const preview = lesson.preview && (
                  <a
                    href={lesson.preview}
                    className="text-sm border border-solid border-blue-500 rounded py-1 px-2
                     text-gray-300 hover:border-blue-400 hover:text-white hover:bg-gray-800"
                  >
                    Preview
                  </a>
                );
                return (
                  <li
                    key={lessonTitle}
                    className="flex justify-between items-center"
                  >
                    {lessonTitle}
                    {preview}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </Page>
  );
}

function Bio({ photo, title, children }) {
  return (
    <div className="flex flex-col space-y-4 items-center sm:flex-row sm:space-x-4">
      <Image
        src={photo}
        width={150}
        height={150}
        className="rounded-full flex-shrink-0"
      />
      <div className="flex-1 space-y-4">
        <h2 className="text-2xl font-semibold">{title}</h2>
        {children}
      </div>
    </div>
  );
}

function Bios() {
  return (
    <Page className="max-w-xs space-y-8 mt-16 sm:max-w-2xl sm:space-y-16 sm:mt-32">
      <Bio photo="/images/linton.jpg" title="Hi! I'm Linton!">
        <p>
          I'm a full-stack developer and I love design. I've been teaching React
          since 2017 and I'm loving it! I'm also the author of a couple of
          courses at Treehouse and Lynda.
        </p>
        <p>
          My dark little secret: 😈 creating this course is also my special way
          to learn all things about design and React -- trying to explain things
          clearly has taken my understanding of the concepts to a whole new
          level.
        </p>

        <p>Thrilled to be on this journey with you!</p>
      </Bio>
      <Bio photo="/images/beebee.jpg" title="Hey! I'm Beebee!">
        <p>
          I'm a designer and animator. I draw inspiration from my dream diaries.
        </p>

        <p>
          In my dreams, I saw mammoths chasing little bears on a circus. I
          managed to turn missiles launched from North Korea into splendid
          firework shows. I convinced the Emperor of Qin Dynasty to stop
          killing. I chatted with Prince Edwards in Chinese. I was left in awe
          by the weirdly breathtaking scenes made up of lily pads, lotus, water
          grass and pale dead fish...
        </p>

        <p>What's in your dreams?</p>
      </Bio>
    </Page>
  );
}

function Acknowledgement() {
  return (
    <Page className="max-w-xs space-y-8 mt-16 sm:max-w-2xl sm:space-y-16 sm:mt-32 text-center">
      <hr className="border-gray-700" />
      <p className="font-serif italic text-xl text-gray-300">
        Special Thanks to{" "}
        <a href="https://twitter.com/mattgperry" className="underline">
          Matt Perry
        </a>{" "}
        for answering my endless questions.
      </p>
      <hr className="border-gray-700" />
    </Page>
  );
}

const SoundControlContext = React.createContext({
  isSoundOn: false,
  toggleSound: null,
});

function useSoundControl() {
  const { isSoundOn, toggleSound } = useContext(SoundControlContext);
  return { isSoundOn, toggleSound };
}

function DancingGuyTest() {
  const [_, _2] = usePlaySound("/bg-music.mp3", {
    autoplay: true,
  });
  return <DancingGuy animate="playing" />;
}

function Main() {
  const [isSoundOn, setIsSoundOn] = useState(false);
  const toggleSound = () => setIsSoundOn((b) => !b);

  return (
    <SoundControlContext.Provider value={{ isSoundOn, toggleSound }}>
      <div className="pb-64">
        {/* <DancingGuyTest /> */}
        <Heading />
        <Quiz />
        <QuizAnswer />
        <CourseIntro />
        <Pricing />
        <Content />
        <Bios />
        <Acknowledgement />
      </div>
    </SoundControlContext.Provider>
  );
}

function useOS() {
  const [osType, setOsType] = useState(null);
  useEffect(() => {
    const parser = new UAParser();
    const os = parser.getOS();
    setOsType(os.name);
  }, []);
  return osType;
}

function Leg() {
  const os = useOS();
  const shouldFlip = !["iOS", "Mac OS"].includes(os);
  return (
    <motion.div style={shouldFlip ? { scaleX: -1, rotate: -35 } : {}}>
      🦵
    </motion.div>
  );
}

function DancingGuy({ animate }) {
  const commonTransition = {
    repeat: Infinity,
    repeatType: "loop",
    duration: 2.1,
    // repeatDelay: 0.1,
  };
  return (
    <motion.div
      className="m-auto relative w-48 h-64 text-6xl scale-60 transform sm:scale-100"
      initial={"readyToPlay"}
      animate={animate}
    >
      <motion.div
        className="absolute"
        style={{ top: 15, left: 60, originX: "center", originY: "bottom" }}
        variants={{
          // beforeSeen: { opacity: 0, rotate: -15 },
          readyToPlay: { opacity: 1, rotate: 0 },
          playing: {
            rotate: [0, -25, 0, -25, 0, 25, 0, 25, 0],
            transition: commonTransition,
          },
          // afterSeen: { rotate: 0 },
        }}
      >
        🤨
      </motion.div>
      <motion.div
        className="absolute"
        style={{ top: 120, left: 80, originX: "center", originY: "top" }}
        variants={{
          // beforeSeen: { opacity: 0, rotate: -5 },
          readyToPlay: { opacity: 1, rotate: 0 },
          playing: {
            // y: [0, -30, 0, -30, 0, 30, 0, 30, 0],
            rotate: [0, -10, 0, -10, 0, 10, 0, 10, 0],
            transition: commonTransition,
          },
          // afterSeen: { rotate: 0 },
        }}
      >
        <Leg />
      </motion.div>
      <motion.div
        className="absolute"
        style={{ top: 130, left: 60, originX: "center", originY: "top" }}
        variants={{
          // beforeSeen: { opacity: 0, rotate: 5 },
          readyToPlay: { opacity: 1, rotate: 0 },
          playing: {
            // y: [0, 30, 0, 30, 0, 30, 0, 30, 0],
            rotate: [0, 10, 0, 10, 0, -10, 0, -10, 0],
            transition: commonTransition,
          },
          // afterSeen: { rotate: 0 },
        }}
      >
        <Leg />
      </motion.div>
      <motion.div
        className="absolute text-4xl"
        style={{ top: 80, left: 30 }}
        variants={{
          // beforeSeen: { opacity: 0, y: -10 },
          readyToPlay: { opacity: 1, y: 0 },
          playing: {
            y: [0, -30, 0, -30, 0, 30, 0, 30, 0],
            rotate: [0, -25, 0, -25, 0, 25, 0, 25, 0],
            transition: commonTransition,
          },
          // afterSeen: { y: 0 },
        }}
      >
        <motion.div style={{ rotate: -90 }}>👊</motion.div>
      </motion.div>
      <motion.div
        className="absolute text-4xl"
        style={{ top: 90, left: 120 }}
        variants={{
          // beforeSeen: { opacity: 0, y: 10 },
          readyToPlay: { opacity: 1, y: 0 },
          playing: {
            y: [0, 30, 0, 30, 0, -30, 0, -30, 0],
            rotate: [0, -25, 0, -25, 0, 25, 0, 25, 0],
            transition: commonTransition,
          },
          // afterSeen: { y: 0 },
        }}
      >
        <motion.div style={{ rotate: -90, scaleX: -1 }}>👊</motion.div>
      </motion.div>
    </motion.div>
  );
}

export function Home() {
  return (
    <div className="bg-gray-900 text-gray-200">
      <Main />
    </div>
  );
}
