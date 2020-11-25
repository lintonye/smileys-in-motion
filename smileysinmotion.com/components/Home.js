import * as React from "react";
import { useState, useEffect, useRef } from "react";
import {
  AnimateSharedLayout,
  motion,
  transform,
  useAnimation,
  useTransform,
  useViewportScroll,
} from "framer-motion";
import { Code } from "./Code";
import { Carrousel } from "./Carrousel";
import Image from "next/image";

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
        className="text-center"
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
  const inputRange = [
    ...(top >= vh ? [top - vh, top - vh + 20] : [0]),
    top + height / 3,
    top + height / 2,
  ];
  // console.log({ top, vh, inputRange });
  const filter = useTransform(scrollY, inputRange, [
    ...(top >= vh ? ["grayscale(0)", "grayscale(0)"] : ["grayscale(0)"]),
    "grayscale(0)",
    "grayscale(1)",
  ]);
  const opacity = useTransform(scrollY, inputRange, [
    ...(top >= vh ? [1, 1] : [1]),
    1,
    0.3,
  ]);
  const indicatorOpacity = useTransform(scrollY, [top, top + 20], [1, 0]);
  useEffect(() => {
    const unsub = scrollY.onChange((y) => {
      // console.log({ y, y0: top - vh + 20 });
      if (
        typeof onPageScroll === "function" &&
        top - vh <= y &&
        y <= top - vh + height
      ) {
        onPageScroll({ pageTop: top, scrollY: y });
      }
    });
    return unsub;
  }, [onPageScroll, top, vh, height]);
  return (
    <motion.div
      style={{ filter, opacity }}
      className={
        className + " relative m-auto " + (fullScreen ? "h-screen" : "")
      }
      ref={ref}
      initial={false}
    >
      {children}
      {fullScreen && (
        <motion.div
          className="absolute bottom-1 left-0 right-0"
          style={{ opacity: indicatorOpacity }}
        >
          <ScrollIndicator />
        </motion.div>
      )}
    </motion.div>
  );
}

function Heading() {
  const [danceDemoAnimate, setDanceDemoAnimate] = useState("beforeSeen");
  useEffect(() => {
    setTimeout(() => {
      setDanceDemoAnimate(["readyToPlay", "playing"]);
    }, 500);
  }, []);
  return (
    <Page
      className="max-w-xl mx-auto flex flex-col justify-center align-middle space-y-8"
      fullScreen
    >
      <h1 className="text-4xl text-center font-extrabold">
        Build Advanced UI Animations With Framer Motion &amp; React
      </h1>
      <div className="text-center mb-6 space-x-3">
        {Array(5)
          .fill("⭐️")
          .map((s, index) => (
            <span key={index}>{s}</span>
          ))}
      </div>
      <Carrousel className="relative mx-auto">
        <DanceDemo animate={danceDemoAnimate} />
        <DanceDemo animate={danceDemoAnimate} />
        <DanceDemo animate={danceDemoAnimate} />
        <DanceDemo animate={danceDemoAnimate} />
        <DanceDemo animate={danceDemoAnimate} />
        <DanceDemo animate={danceDemoAnimate} />
      </Carrousel>
      <motion.div
        className="text-lg space-y-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 4 }}
      >
        <p>
          This is Framer Motion: add a "motion." prefix, sprinkle some props,
          animate on! It's THAT easy!
        </p>
        <p className="text-sm">
          PS: Guess what the "video" above was made with?
        </p>
      </motion.div>
    </Page>
  );
}

function DanceDemo({ animate }) {
  const line1 = useAnimation();
  const line2 = useAnimation();
  const dancingGuy = useAnimation();
  useEffect(() => {
    async function play(anim) {
      switch (anim) {
        case "beforeSeen":
          break;
        case "readyToPlay":
          await dancingGuy.start("readyToPlay");
          break;
        case "playing":
          await line1.start("typing");
          await line1.start("reveal");
          await line2.start("typing");
          await dancingGuy.start("playing");
          break;
        case "afterSeen":
          await line2.start("reveal");
          // await dancingGuy.stop();
          await dancingGuy.start("afterSeen");
      }
    }
    async function playAll(anims) {
      for (let anim of anims) {
        // console.log(anim);
        await play(anim);
      }
    }
    const anims = Array.isArray(animate) ? animate : [animate];
    playAll(anims);
  }, [animate]);
  return (
    <motion.div
      initial={false}
      animate={animate}
      variants={{
        beforeSeen: { filter: "grayscale(0)", opacity: 0 },
        readyToPlay: { opacity: 1 },
        afterSeen: { filter: "grayscale(0)" },
      }}
    >
      <Code
        typingMasks={[
          {
            id: "line1",
            top: "8%",
            left: "6%",
            chars: 27,
            animate: line1,
          },
          {
            id: "line2",
            top: "82%",
            left: "6%",
            chars: 13,
            animate: line2,
          },
        ]}
      >{`<motion.div animate="dance">




</motion.div>`}</Code>
      <div className="-mt-60">
        <DancingGuy animate={dancingGuy} />
      </div>
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

function Option({ id, title, selected, onSelect, children }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      className={`border-2 border-solid border-gray-700 rounded-md p-8 cursor-pointer hover:border-blue-400 flex space-x-4 ${
        selected && "border-blue-500 bg-gray-800 hover:bg-gray-800"
      }`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onTap={() => typeof onSelect === "function" && onSelect()}
    >
      <span className="text-gray-400">{id}.</span>
      <span>{hovered && children ? children : title}</span>
    </motion.div>
  );
}

function QuizAnswer() {
  return (
    <Page className="m-auto max-w-xl pt-10 space-y-8 text-lg">
      <p>The correct answer is D -- there is no animation at all! </p>

      <p>
        It's NOT a bug. It's due to{" "}
        <a href="https://stackoverflow.com/a/14883287">the rules of HTML</a>:
        <Code inline>span</Code> has{" "}
        <Code inline lang="css">
          display: inline
        </Code>{" "}
        by default, and CSS transforms (such as
        <Code inline>scale</Code>) don't work on inline elements. To make it
        work, we could set its display to either <Code inline>block</Code> or{" "}
        <Code inline>inline-block</Code>.
      </p>

      <p>
        Framer Motion is a great library. But it can be tricky to get it to work
        in real-world applications. This is not to blame the library. It's
        because the reality is complex. Web development sometimes IS tricky!
      </p>

      <p>Here are a few more examples:</p>
      <ul className="list-disc list-inside">
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
  return (
    <Page className="max-w-xl space-y-6 text-lg pt-16" fullScreen>
      <p className="">
        Well, if Framer Motion is so easy to use, what is the point of making a
        course? Let me ask you a question first. 👇
      </p>

      <Code>{`<motion.span animate={{ scale: 4 }}>
👊
</motion.span>
`}</Code>
      <p className="text-center">
        What kind of animation would you get (hover to preview)?
      </p>
      <div className="grid grid-cols-2 gap-2">
        {options.map(({ id, title, preview }) => (
          <Option
            id={id}
            key={id}
            title={title}
            selected={choice === id}
            onSelect={() => setChoice(id)}
          >
            {preview}
          </Option>
        ))}
      </div>
      {choice && (
        <motion.div
          className="text-center text-gray-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          Scroll to reveal the answer
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

function CourseIntro() {
  const [animate, setAnimate] = useState("beforeSeen");
  return (
    <Page
      className="max-w-lg"
      onPageScroll={({ pageTop, scrollY }) => {
        setAnimate("playing");
      }}
    >
      <motion.div className="space-y-16" initial={false} animate={animate}>
        <div>
          <div className="text-center font-semibold text-5xl mt-32 mb-4 flex space-x-4">
            <motion.div
              variants={{
                beforeSeen: { x: "-40vw" },
                playing: {
                  x: 0,
                  transition: { delay: 1, damping: 15, type: "spring" },
                },
              }}
            >
              🤨
            </motion.div>
            <motion.h1
              className=""
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
            className="text-center text-lg"
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
          <Feature emoji="🌏" title="Real-world examples">
            <li>Drag to reorder, Circular slider</li>
            <li>Bottom sheet, Parallax scroll</li>
            <li>Tabs, Shared element transition (React Router)</li>
            <li>And... this page!</li>
          </Feature>
          <Feature emoji="📃" title="Cheat sheet">
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
    <div className="flex space-x-8 items-center">
      <div className="text-8xl" style={{ filter: "saturate(0.4)" }}>
        {emoji}
      </div>
      <ul>
        <li className="text-2xl font-bold">{title}</li>
        {children}
      </ul>
    </div>
  );
}

function PricingCard({
  title,
  subtitle,
  price,
  discountedPrice,
  purchaseLink,
  featured,
  className,
  children,
}) {
  return (
    <div
      className={`border-blue-400 border-solid border-2 p-8 
    rounded-lg flex flex-col justify-center items-center space-y-6 ${
      featured ? "bg-gray-900" : "bg-gray-800 "
    } ${className}`}
    >
      <div className="font-semibold text-lg text-center">{title}</div>
      <div className="text-center text-blue-400">{subtitle}</div>
      <ul className="list-outside list-disc ml-4">{children}</ul>
      <div className="space-x-4">
        <span className="line-through">${price}</span>
        <span className="text-4xl">${discountedPrice}</span>
        <span>USD</span>
      </div>
      <a
        href={purchaseLink}
        className="rounded-md bg-blue-600 px-3 py-2 hover:bg-blue-500"
      >
        Buy Now
      </a>
    </div>
  );
}

function Quote({ photo, name, company, title, children }) {
  return (
    <div className="flex flex-col items-end">
      <div className="font-serif text-2xl italic">{children}</div>
      <Image
        src={photo}
        width={100}
        height={100}
        className="rounded-full self-end"
      />
      <div>{name}</div>
      <div>
        {title}, {company}
      </div>
    </div>
  );
}

function Pricing() {
  return (
    <Page className="max-w-2xl space-y-16 mt-32">
      <h1 className="text-4xl text-center font-semibold">Get The Course</h1>
      <div className="flex -space-x-3 items-end">
        <PricingCard
          title="Smiley In Motion"
          subtitle="For designers and developers with React experience"
          price={99}
          discountedPrice={59}
          purchaseLink="#"
          className="mb-5"
        >
          <li>24 lessons, 2 hours of HD videos</li>
          <li>All starter and final code for you to follow along</li>
          <li>Pitfall cheat sheet</li>
        </PricingCard>
        <PricingCard
          featured
          title="React + Framer Starship bundle"
          subtitle="Learn from the start. No JS experience required"
          price={299}
          discountedPrice={199}
        >
          <li>14 Modules, 50 HD video lessons, 10+ hours</li>
          <li>
            Includes <strong>Smiley In Motion</strong>
          </li>
          <li>All starter and final code for you to follow along</li>
          <li>
            Check out course details{" "}
            <a
              className="underline"
              href="https://learnreact.design/prototyping-with-react-framer"
            >
              here
            </a>
          </li>
        </PricingCard>
      </div>
      <div className="max-w-2xl mx-auto">
        <Quote
          photo="/images/remco.webp"
          name="Remco van den Top"
          company="Graphius"
          title="UX Designer"
        >
          The way you build your courses with emojis is very engaging and easy
          to understand.
        </Quote>
      </div>
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
    "r1. Drag to reorder",
    "r2. Circular slider",
    "r3. Tabs (AnimatePresence and React Router 5)",
    "r4. Shared element transition (with React Router 5)",
    "r5. Bottom sheet",
    "r6. smileyinmotion.com (coming soon)",
  ],
  "Cheat sheets": [
    "All starter and final code",
    "Cheat sheet: pitfalls & solutions",
  ],
};

function Content() {
  return (
    <Page className="max-w-lg space-y-16 mt-32 text-lg">
      <h1 className="text-4xl text-center font-semibold">Table Of Contents</h1>
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
                    className="text-sm border border-solid border-blue-800 rounded py-1 px-2
                     text-gray-300 hover:border-blue-600 hover:text-white"
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
    <div className="flex space-x-4 items-center">
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
    <Page className="max-w-2xl space-y-16 mt-32">
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

function Main() {
  return (
    <div className="pb-64">
      <Heading />
      <Quiz />
      <QuizAnswer />
      <CourseIntro />
      <Pricing />
      <Content />
      <Bios />
    </div>
  );
}

function DancingGuy({ animate }) {
  const commonTransition = {
    repeat: Infinity,
    repeatType: "reverse",
    duration: 0.3,
    // repeatDelay: 0.1,
  };
  return (
    <motion.div
      className="m-auto text-6xl relative w-48 h-64"
      initial={"beforeSeen"}
      animate={animate}
    >
      <motion.div
        className="absolute"
        style={{ top: 15, left: 60, originX: "center", originY: "bottom" }}
        variants={{
          beforeSeen: { opacity: 0, rotate: -15 },
          readyToPlay: { opacity: 1 },
          playing: { rotate: [-15, 15], transition: commonTransition },
          afterSeen: { rotate: 0 },
        }}
      >
        🤨
      </motion.div>
      <motion.div
        className="absolute"
        style={{ top: 120, left: 80, originX: "center", originY: "top" }}
        variants={{
          beforeSeen: { opacity: 0, rotate: -5 },
          readyToPlay: { opacity: 1 },
          playing: { rotate: [-5, 5], transition: commonTransition },
          afterSeen: { rotate: 0 },
        }}
      >
        🦵
      </motion.div>
      <motion.div
        className="absolute"
        style={{ top: 130, left: 60, originX: "center", originY: "top" }}
        variants={{
          beforeSeen: { opacity: 0, rotate: 5 },
          readyToPlay: { opacity: 1 },
          playing: { rotate: [5, -5], transition: commonTransition },
          afterSeen: { rotate: 0 },
        }}
      >
        🦵
      </motion.div>
      <motion.div
        className="absolute text-4xl"
        style={{ top: 80, left: 30, rotate: -90 }}
        variants={{
          beforeSeen: { opacity: 0, y: -10 },
          readyToPlay: { opacity: 1 },
          playing: { y: [-10, 10], transition: commonTransition },
          afterSeen: { y: 0 },
        }}
      >
        👊
      </motion.div>
      <motion.div
        className="absolute text-4xl"
        style={{ top: 90, left: 120, rotate: -90, scaleX: -1 }}
        variants={{
          beforeSeen: { opacity: 0, y: 10 },
          readyToPlay: { opacity: 1 },
          playing: { y: [10, -10], transition: commonTransition },
          afterSeen: { y: 0 },
        }}
      >
        👊
      </motion.div>
    </motion.div>
  );
}

function Test() {
  return <motion.span animate={{ scale: 4 }}>🦶</motion.span>;
}

export function Home() {
  const [isMain, setIsMain] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setIsMain(true);
    }, 1000);
  }, []);
  return (
    <div className="bg-gray-900 text-gray-200">
      <Main />
      {/* <AnimateSharedLayout>
        {isMain ? <Main /> : <Welcome />}
      </AnimateSharedLayout> */}
    </div>
  );
}
