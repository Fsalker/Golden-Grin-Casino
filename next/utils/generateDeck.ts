export const generateDeck = (deckLength: number): number[] => {
  const deck = Array(deckLength)
    .fill(null)
    .map((_, index) => index);
  for (let index = deck.length - 1; index >= 0; --index) {
    const randomIndex = Math.floor(Math.random() * index);
    deck[index] = [deck[randomIndex], (deck[randomIndex] = deck[index])][0];
  }
  return deck;
};
