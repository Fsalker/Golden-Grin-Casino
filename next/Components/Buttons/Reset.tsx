import SmallButton from './Wrappers/SmallButton';
import { useRecoilState } from 'recoil';
import {
  acesLeftState,
  cardsDrawnState,
  cardsLeftState,
  deckValuesState,
  gameState,
  loggedInState,
  numCardsInDeckState,
} from '../../recoil/atoms';
import { startGame } from './common';
import { FunctionComponent } from 'react';

interface ResetProps {
  text?: string;
}

const Reset: FunctionComponent<ResetProps> = ({ text = 'Reset' }) => {
  const [numCardsInDeck] = useRecoilState(numCardsInDeckState);
  const [loggedIn] = useRecoilState(loggedInState);
  const [, setCardsLeft] = useRecoilState(cardsLeftState);
  const [, setDeckValues] = useRecoilState(deckValuesState);
  const [, setDrawnCards] = useRecoilState(cardsDrawnState);
  const [, setAcesLeft] = useRecoilState(acesLeftState);
  const [, setGameState] = useRecoilState(gameState);

  const handleReset = async () => {
    await startGame({
      setCardsLeft,
      setDrawnCards,
      loggedIn,
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
