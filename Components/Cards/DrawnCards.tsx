import { CardSymbols } from "../types";
import Card from "./Card";
import { FunctionComponent } from "react";
import { useRecoilState } from "recoil";
import {
  cardsDrawnState,
  gameState,
  numCardsInDeckState,
} from "../../recoil/atoms";
import { cardValuePool } from "../constants";

const mapIndexToCardSymbol = ["♣", "♦", "♥", "♠"];

const DrawnCards: FunctionComponent = () => {
  const [numCardsInDeck] = useRecoilState(numCardsInDeckState);
  const [cardsDrawn] = useRecoilState(cardsDrawnState);
  const [gameStatus] = useRecoilState(gameState);

  const canRotateCards = gameStatus === "in progress"; // TODO: Also, don't rotate them when we're on a small display

  const cards = cardsDrawn.map((cardValue, index) => {
    if (cardValue < 0 || cardValue >= numCardsInDeck) {
      console.error(
        `Error: cardValue `,
        cardValue,
        ` is invalid in a deck with ${numCardsInDeck} cards.`
      );
    }

    const cardNumber =
      cardValuePool[Math.floor(cardValue % (numCardsInDeck / 4))];
    const cardSymbol = mapIndexToCardSymbol[
      Math.floor(cardValue / (numCardsInDeck / 4))
    ] as CardSymbols;

    return (
      <Card
        key={`drawn-card-${index}`}
        cardNumber={cardNumber}
        cardSymbol={cardSymbol}
        cardIndex={index}
        canRotateCards={canRotateCards}
      />
    );
  });

  return <div className="flex justify-center">{cards}</div>;
};

export default DrawnCards;
