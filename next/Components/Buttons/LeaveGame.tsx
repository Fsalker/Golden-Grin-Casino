import { ButtonComponent } from '../types';
import SmallButton from './Wrappers/SmallButton';
import { useRecoilState } from 'recoil';
import { gameState } from '../../recoil/atoms';

const LeaveGame: ButtonComponent = () => {
  const [, setGameState] = useRecoilState(gameState);

  const handleLeaveGame = () => {
    setGameState(null);
  };

  return (
    <div onClick={handleLeaveGame}>
      <SmallButton>Leave Game</SmallButton>
    </div>
  );
};

export default LeaveGame;
