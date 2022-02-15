import type { NextPage } from 'next';
import Head from 'next/head';
import MainMenu from '../Components/Menus/MainMenu';
import Game from '../Components/Menus/Game';
import { useRecoilState } from 'recoil';
import { gameState } from '../recoil/atoms';

const Home: NextPage = () => {
  const [gameStatus] = useRecoilState(gameState);

  const gameInProgress = gameStatus !== null;

  return (
    <div className="bg-gradient-to-b h-screen">
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
