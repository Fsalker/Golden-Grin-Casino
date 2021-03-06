import type { NextPage } from "next";
import Head from "next/head";
import MainMenu from "../components/Menus/MainMenu";
import Game from "../components/Menus/Game";
import { useRecoilState } from "recoil";
import { gameState } from "../recoil/atoms";

const Home: NextPage = () => {
  const [gameStatus] = useRecoilState(gameState);

  const gameInProgress = gameStatus !== null;

  return (
    <div className="h-screen bg-gradient-to-b">
      <Head>
        <title>Card Game</title>
        <meta name="description" content="Now available in 4K" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {gameInProgress && <Game />}
      {!gameInProgress && <MainMenu />}
    </div>
  );
};

export default Home;
