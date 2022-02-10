import { FunctionComponent } from 'react';
import Deal from '../Buttons/Deal';
import Reset from '../Buttons/Reset';
import LeaveGame from '../Buttons/LeaveGame';
import DrawnCards from '../Cards/DrawnCards';
import AcesLeftCounter from '../Counters/AcesLeftCounter';
import CardsLeftCounter from '../Counters/CardsLeftCounter';

const Game: FunctionComponent = () => {
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
      <div>
        <Deal />
        <div className="flex justify-between mx-16 mt-4">
          <LeaveGame />
          <Reset />
        </div>
      </div>
    </div>
  );
};

export default Game;
