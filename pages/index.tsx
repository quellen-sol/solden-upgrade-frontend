import type { NextPage } from "next";
import Head from "next/head";
import { NavBar } from "../components/NavBar";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>The Sol Den - Upgrade Packs</title>
        <meta name="description" content="Upgrade your fighters' stats here by using your upgrade packs!" />
        <meta name="og:image" content="/logo.png" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar />
    </>
  );
};

export default Home;
