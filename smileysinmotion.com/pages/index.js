import Head from "next/head";
import { Home } from "../components/Home";

export default function HomePage() {
  const siteName = "Smiley In Motion";
  const pageTitle = `Get really good at Framer Motion | ${siteName}`;
  const description =
    "A comprehensive Framer Motion course on mental models, tips &amp; tricks, and common pitfalls";
  const twitterHandle = "lintonye";
  const currentURL = "https://smileyinmotion.com";
  const previewImage = `${currentURL}/images/social-card.png`;
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <title>{pageTitle}</title>
        <meta name="description" content={description} />
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" key="twcard" />
        <meta name="twitter:creator" content={twitterHandle} key="twhandle" />

        {/* Open Graph */}
        <meta property="og:url" content={currentURL} key="ogurl" />
        <meta property="og:image" content={previewImage} key="ogimage" />
        <meta property="og:site_name" content={siteName} key="ogsitename" />
        <meta property="og:title" content={pageTitle} key="ogtitle" />
        <meta property="og:description" content={description} key="ogdesc" />
      </Head>
      <Home />
    </>
  );
}
