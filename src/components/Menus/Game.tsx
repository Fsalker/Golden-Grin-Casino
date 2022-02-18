import { FunctionComponent } from "react";
import Deal from "../Buttons/Deal";
import Reset from "../Buttons/Reset";
import LeaveGame from "../Buttons/LeaveGame";
import DrawnCards from "../Cards/DrawnCards";
import AcesLeftCounter from "../Counters/AcesLeftCounter";
import CardsLeftCounter from "../Counters/CardsLeftCounter";
import { useRecoilState } from "recoil";
import { gameState } from "../../recoil/atoms";
import GameWonBannerDesktop from "../../../public/gameWonBannerDesktop.svg";
import ConfettiLeft from "../../../public/confettiLeft.svg";
import ConfettiRight from "../../../public/confettiRight.svg";

const Game: FunctionComponent = () => {
  const [gameStatus] = useRecoilState(gameState);

  const confetti =
    gameStatus === "won" ? (
      <div className="fixed top-[40%]">
        <img
          src={ConfettiLeft.src}
          className="fixed sm:left-[90px] left-[16px] w-[70px] h-[119px] sm:w-[231px] sm:h-[392px]"
        />
        <img
          src={ConfettiRight.src}
          className="fixed sm:right-[90px] right-[16px] w-[86px] h-[109px] sm:w-[286px] sm:h-[362px]"
        />
      </div>
    ) : (
      ""
    );

  const winBanner =
    gameStatus === "won" ? (
      <div className="flex justify-center sm:mt-[-46px] mt-[-40px] mb-[-24px]">
        <img src={GameWonBannerDesktop.src} />
      </div>
    ) : (
      ""
    );

  const loseText = (
    <div
      className="flex flex-col items-center font-courierPrime sm:text-[36px] text-[24px] text-white"
      style={{ visibility: gameStatus === "lost" ? "visible" : "hidden" }}
    >
      <div>You lose.</div>
      <div>Better luck next time!</div>
    </div>
  );

  const unfinishedGameButtons = (
    <>
      <Deal />
      <div className="flex justify-between sm:mx-16 sm:mt-4 mt-[34px] mx-4">
        <LeaveGame />
        <Reset />
      </div>
    </>
  );

  const finishedGameButtons = (
    <div className="mt-[-66px]">
      {loseText}
      <div className="flex flex-col items-center mx-16 mt-4">
        <Reset text={"Play Again"} />
      </div>
      <div className="flex mx-16 mt-4 items-left">
        <LeaveGame />
      </div>
    </div>
  );

  const gameButtons =
    gameStatus === "in progress" ? unfinishedGameButtons : finishedGameButtons;

  return (
    <div className="h-full">
      <div className="h-[70%]">
        <div className="flex justify-center">
          <CardsLeftCounter />
          <div className="mx-4" />
          <AcesLeftCounter />
        </div>
        {confetti}
        {winBanner}
        <div className="mt-24">
          <DrawnCards />
        </div>
      </div>
      <div>{gameButtons}</div>
    </div>
  );
};

export default Game;
