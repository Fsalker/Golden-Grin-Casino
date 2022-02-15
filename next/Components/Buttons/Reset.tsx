import SmallButton from './Wrappers/SmallButton';
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
import { FunctionComponent } from 'react';

interface ResetProps {
  text?: string;
}

const Reset: FunctionComponent<ResetProps> = ({ text = 'Reset' }) => {
  const [numCardsInDeck] = useRecoilState(numCardsInDeckState);
  const [offlineGame] = useRecoilState(offlineGameState);
  const [, setCardsLeft] = useRecoilState(cardsLeftState);
  const [, setDeckValues] = useRecoilState(deckValuesState);
  const [, setDrawnCards] = useRecoilState(cardsDrawnState);
  const [, setAcesLeft] = useRecoilState(acesLeftState);
  const [, setGameState] = useRecoilState(gameState);

  const handleReset = () => {
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
    <div onClick={handleReset}>
      <SmallButton>{text}</SmallButton>
    </div>
  );
};

export default Reset;
