import { ButtonComponent } from '../types';
import SmallButton from './Wrappers/SmallButton';
import { useRecoilState } from 'recoil';
import { gameState } from '../../recoil/atoms';
import leaveGameRequest from '../gql-requests/leaveGame';

const LeaveGame: ButtonComponent = () => {
  const [gameStatus, setGameState] = useRecoilState(gameState);

  const handleLeaveGame = async () => {
    if (gameStatus === 'in progress') {
      await leaveGameRequest();
    }
    setGameState(null);
  };

  return (
    <div onClick={handleLeaveGame}>
      <SmallButton>Leave Game</SmallButton>
    </div>
  );
};

export default LeaveGame;
