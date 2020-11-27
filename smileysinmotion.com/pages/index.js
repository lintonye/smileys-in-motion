import Head from "next/head";
import { Home } from "../components/Home";

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Get really good at Framer Motion</title>
        <meta
          name="description"
          content="A comprehensive Framer Motion course on mental models, tips &amp; tricks, and common pitfalls"
        />
      </Head>
      <Home />
    </>
  );
}
