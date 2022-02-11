import { ButtonComponent } from '../types';
import SmallButton from './Wrappers/SmallButton';
import { useRecoilState } from 'recoil';
import {
  acesLeftState,
  cardsDrawnState,
  cardsLeftState,
  deckValuesState,
  gameInProgressState,
  numCardsInDeckState,
  offlineGameState,
} from '../../recoil/atoms';
import { startGame } from '../requests/startGame';

const Reset: ButtonComponent = () => {
  const [numCardsInDeck] = useRecoilState(numCardsInDeckState);
  const [offlineGame] = useRecoilState(offlineGameState);
  const [, setGameInProgress] = useRecoilState(gameInProgressState);
  const [, setCardsLeft] = useRecoilState(cardsLeftState);
  const [, setDeckValues] = useRecoilState(deckValuesState);
  const [, setDrawnCards] = useRecoilState(cardsDrawnState);
  const [, setAcesLeft] = useRecoilState(acesLeftState);

  const handleReset = () => {
    startGame({
      setGameInProgress,
      setCardsLeft,
      setDrawnCards,
      offlineGame,
      setDeckValues,
      numCardsInDeck,
      setAcesLeft,
    });
  };

  return (
    <div onClick={handleReset}>
      <SmallButton>Reset</SmallButton>
    </div>
  );
};

export default Reset;