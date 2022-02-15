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
import { isCardValueAce } from '../../utils/isCardValueAce';

const Deal: ButtonComponent = () => {
  const [numCardsInDeck] = useRecoilState(numCardsInDeckState);
  const [offlineGame] = useRecoilState(offlineGameState);
  const [cardsLeft, setCardsLeft] = useRecoilState(cardsLeftState);
  const [, setCardsDrawn] = useRecoilState(cardsDrawnState);
  const [deckValues, setDeckValues] = useRecoilState(deckValuesState);
  const [acesLeft, setAcesLeft] = useRecoilState(acesLeftState);
  const [, setGameState] = useRecoilState(gameState);

  const handleDeal = () => {
    if (cardsLeft) {
      // deckValues.length is, in theory, completely optional. BUT it might save our lives someday... 🎵
      const numCardsDealt = Math.min(cardsLeft, 5, deckValues.length);

      if (offlineGame) {
        const newDeck = [...deckValues];
        const drawnCards = newDeck.splice(0, numCardsDealt);
        const numDrawnAces = drawnCards.filter((cardValue) =>
          isCardValueAce({ cardValue, numCardsInDeck })
        ).length;
        const newNumCardsLeft = cardsLeft - numCardsDealt;
        const newNumAcesLeft = acesLeft - numDrawnAces;

        if (newNumCardsLeft === 0) {
          // The game has ended
          const gameWon = numDrawnAces > 0;

          setGameState(gameWon ? 'won' : 'lost');
        }

        setCardsDrawn(drawnCards);
        setDeckValues(newDeck);
        setCardsLeft(newNumCardsLeft);
        setAcesLeft(newNumAcesLeft);
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
