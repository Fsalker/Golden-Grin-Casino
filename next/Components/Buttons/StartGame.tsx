import { ButtonComponent } from '../types';
import LargeButton from './Wrappers/LargeButton';

const StartGame: ButtonComponent = () => {
  return (
    <div>
      <LargeButton>Start Game</LargeButton>
    </div>
  );
};

export default StartGame;
