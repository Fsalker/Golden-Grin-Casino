import { ButtonComponent } from "../types";
import LargeButton from "./Wrappers/LargeButton";
import { useRecoilState } from "recoil";
import {
  acesLeftState,
  cardsDrawnState,
  cardsLeftState,
  deckValuesState,
  gameState,
  numCardsInDeckState,
  loggedInState,
} from "../../recoil/atoms";
import { isCardValueAce } from "../../utils/isCardValueAce";
import dealCardsRequest from "../gql-requests/dealCards";

const Deal: ButtonComponent = () => {
  const [numCardsInDeck] = useRecoilState(numCardsInDeckState);
  const [loggedIn] = useRecoilState(loggedInState);
  const [cardsLeft, setCardsLeft] = useRecoilState(cardsLeftState);
  const [, setCardsDrawn] = useRecoilState(cardsDrawnState);
  const [deckValues, setDeckValues] = useRecoilState(deckValuesState);
  const [acesLeft, setAcesLeft] = useRecoilState(acesLeftState);
  const [, setGameState] = useRecoilState(gameState);

  const handleDeal = async () => {
    if (cardsLeft) {
      // deckValues.length is, in theory, completely optional. BUT it might save our lives someday... 🎵

      let drawnCards: number[];
      let numCardsDealt: number;
      if (!loggedIn) {
        numCardsDealt = Math.min(cardsLeft, 5, deckValues.length);
        const newDeck = [...deckValues];
        drawnCards = newDeck.splice(0, numCardsDealt);
        setDeckValues(newDeck);
      } else {
        drawnCards = (await dealCardsRequest()).data.dealCards;
        numCardsDealt = drawnCards.length;
        setCardsDrawn(drawnCards);
      }

      const numDrawnAces = drawnCards.filter((cardValue: number) =>
        isCardValueAce({ cardValue, numCardsInDeck })
      ).length;
      const newNumCardsLeft = cardsLeft - numCardsDealt;
      const newNumAcesLeft = acesLeft - numDrawnAces;

      if (newNumCardsLeft === 0) {
        // The game has ended
        const gameWon = numDrawnAces > 0;
        setGameState(gameWon ? "won" : "lost");
      }

      setCardsDrawn(drawnCards);
      setCardsLeft(newNumCardsLeft);
      setAcesLeft(newNumAcesLeft);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div data-testid="deal-button" onClick={handleDeal}>
        <LargeButton>DEAL</LargeButton>
      </div>
    </div>
  );
};

export default Deal;
