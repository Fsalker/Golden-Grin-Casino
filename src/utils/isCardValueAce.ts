export type isCardValueAceParams = {
  cardValue: number;
  numCardsInDeck: number;
};

export const isCardValueAce = ({
  cardValue,
  numCardsInDeck,
}: isCardValueAceParams) => cardValue % (numCardsInDeck / 4) === 0;
