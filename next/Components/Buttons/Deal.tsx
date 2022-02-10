import { ButtonComponent } from '../types';
import LargeButton from './Wrappers/LargeButton';
import { useRecoilState } from 'recoil';
import {
  acesLeftState,
  cardsDrawnState,
  cardsLeftState,
  deckValuesState,
  numCardsInDeckState,
  offlineGameState,
} from '../../recoil/atoms';

const Deal: ButtonComponent = () => {
  const [numCardsInDeck] = useRecoilState(numCardsInDeckState);
  const [offlineGame] = useRecoilState(offlineGameState);
  const [cardsLeft, setCardsLeft] = useRecoilState(cardsLeftState);
  const [, setCardsDrawn] = useRecoilState(cardsDrawnState);
  const [deckValues, setDeckValues] = useRecoilState(deckValuesState);
  const [acesLeft, setAcesLeft] = useRecoilState(acesLeftState);
  const handleDeal = () => {
    if (cardsLeft) {
      // deckValues.length is, in theory, completely optional. BUT it might save our lives someday... 🎵
      const numCardsDealt = Math.min(cardsLeft, 5, deckValues.length);

      if (offlineGame) {
        const newDeck = [...deckValues];
        const drawnCards = newDeck.splice(0, numCardsDealt);
        const numDrawnAces = drawnCards.filter(
          (cardValue) => cardValue % (numCardsInDeck / 4) === 0
        ).length;
        console.log(drawnCards, numCardsInDeck);
        console.log('Drawn aces = ', numDrawnAces);

        setCardsDrawn(drawnCards);
        setDeckValues(newDeck);
        setCardsLeft(cardsLeft - numCardsDealt);
        setAcesLeft(acesLeft - numDrawnAces);
      }
    }
  };

  return (
    <div onClick={handleDeal} className="flex flex-col items-center">
      <LargeButton>DEAL</LargeButton>
    </div>
  );
};

export default Deal;
