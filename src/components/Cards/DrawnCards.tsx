import { CardSymbols } from "../types";
import Card from "./Card";
import { FunctionComponent, useEffect, useState } from "react";
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
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      const newWindowWidth = window.innerWidth;
      setWindowWidth(newWindowWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isTinyScreen = windowWidth < 640;
  const canRotateCards = !isTinyScreen && gameStatus === "in progress"; // TODO: Also, don't rotate them when we're on a small display

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

  const cardsDiv = !isTinyScreen ? (
    <div className="flex justify-center">{cards}</div>
  ) : (
    <>
      <div className="flex justify-center">{cards.slice(0, 3)}</div>
      <div
        className={`flex justify-center ${cards.length > 3 ? "mt-[20px]" : ""}`}
      >
        {cards.slice(3, 5)}
      </div>
    </>
  );

  return <div>{cardsDiv}</div>;
};

export default DrawnCards;
