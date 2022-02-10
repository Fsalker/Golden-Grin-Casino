import { ButtonComponent } from '../types';
import SmallButton from './Wrappers/SmallButton';
import { useRecoilState } from 'recoil';
import { gameInProgressState } from '../../recoil/atoms';

const LeaveGame: ButtonComponent = () => {
  const [, setGameInProgress] = useRecoilState(gameInProgressState);

  const handleLeaveGame = () => {
    setGameInProgress(false);
    // localStorage.setItem('gameInProgress', 'false');
  };

  return (
    <div onClick={handleLeaveGame}>
      <SmallButton>Leave Game</SmallButton>
    </div>
  );
};

export default LeaveGame;
