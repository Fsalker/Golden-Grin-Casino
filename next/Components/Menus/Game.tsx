import { FunctionComponent } from 'react';
import Deal from '../Buttons/Deal';
import Reset from '../Buttons/Reset';
import LeaveGame from '../Buttons/LeaveGame';
import DrawnCards from '../Cards/DrawnCards';
import AcesLeftCounter from '../Counters/AcesLeftCounter';
import CardsLeftCounter from '../Counters/CardsLeftCounter';
import { useRecoilState } from 'recoil';
import { cardsLeftState, gameState } from '../../recoil/atoms';

const Game: FunctionComponent = () => {
  const [cardsLeft] = useRecoilState(cardsLeftState);
  const [gameStatus] = useRecoilState(gameState);

  const unfinishedGameButtons = (
    <>
      <Deal />
      <div className="flex justify-between mx-16 mt-4">
        <LeaveGame />
        <Reset />
      </div>
    </>
  );

  const finishedGameButtons = (
    <>
      <div className="flex flex-col items-center mx-16 mt-4">
        <Reset text={'Play Again'} />
      </div>
      <div className="flex items-left mx-16 mt-4">
        <LeaveGame />
      </div>
    </>
  );

  const gameButtons = gameStatus === 'in progress' ? unfinishedGameButtons : finishedGameButtons;

  return (
    <div className="h-full">
      <div className="h-3/4">
        <div className="flex justify-center">
          <CardsLeftCounter />
          <div className="mx-4" />
          <AcesLeftCounter />
        </div>
        <div className="mt-24">
          <DrawnCards />
        </div>
      </div>
      <div>{gameButtons}</div>
    </div>
  );
};

export default Game;
