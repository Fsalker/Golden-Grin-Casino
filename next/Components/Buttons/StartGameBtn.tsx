import { ButtonComponent } from '../types';
import LargeButton from './Wrappers/LargeButton';
import { useRecoilState } from 'recoil';
import {
  acesLeftState,
  cardsDrawnState,
  cardsLeftState,
  deckValuesState,
  gameState,
  numCardsInDeckState,
  offlineGameState,
} from '../../recoil/atoms';
import { startGame } from '../requests/startGame';

const StartGameBtn: ButtonComponent = () => {
  const [numCardsInDeck] = useRecoilState(numCardsInDeckState);
  const [offlineGame] = useRecoilState(offlineGameState);
  const [, setCardsLeft] = useRecoilState(cardsLeftState);
  const [, setDeckValues] = useRecoilState(deckValuesState);
  const [, setDrawnCards] = useRecoilState(cardsDrawnState);
  const [, setAcesLeft] = useRecoilState(acesLeftState);
  const [, setGameState] = useRecoilState(gameState);

  const handleStartGame = () => {
    startGame({
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
    <div onClick={handleStartGame}>
      <LargeButton>Start Game</LargeButton>
    </div>
  );
};

export default StartGameBtn;
