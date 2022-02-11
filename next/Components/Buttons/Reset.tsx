import SmallButton from './Wrappers/SmallButton';
import { useRecoilState } from 'recoil';
import {
  acesLeftState,
  cardsDrawnState,
  cardsLeftState,
  deckValuesState,
  gameInProgressState,
  gameState,
  numCardsInDeckState,
  offlineGameState,
} from '../../recoil/atoms';
import { startGame } from '../requests/startGame';

type ResetProps = {
  text?: string;
};

const Reset = ({ text = 'Reset' }: ResetProps) => {
  const [numCardsInDeck] = useRecoilState(numCardsInDeckState);
  const [offlineGame] = useRecoilState(offlineGameState);
  const [, setGameInProgress] = useRecoilState(gameInProgressState);
  const [, setCardsLeft] = useRecoilState(cardsLeftState);
  const [, setDeckValues] = useRecoilState(deckValuesState);
  const [, setDrawnCards] = useRecoilState(cardsDrawnState);
  const [, setAcesLeft] = useRecoilState(acesLeftState);
  const [, setGameState] = useRecoilState(gameState);

  const handleReset = () => {
    startGame({
      setGameInProgress,
      setCardsLeft,
      setDrawnCards,
      offlineGame,
      setDeckValues,
      numCardsInDeck,
      setAcesLeft,
      setGameState,
    });
  };

  return (
    <div onClick={handleReset}>
      <SmallButton>{text}</SmallButton>
    </div>
  );
};

export default Reset;
