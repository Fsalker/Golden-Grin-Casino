import apolloClient from "../../utils/apolloClient";
import { gql } from "@apollo/client";

export type startGameRequestParams = { numCardsInDeck: number };

export default async ({ numCardsInDeck }: startGameRequestParams) => {
  const { data, errors } = await apolloClient.mutate({
    mutation: gql`
      mutation ($numCardsInDeck: Int!) {
        startGame(numCardsInDeck: $numCardsInDeck)
      }
    `,
    variables: {
      numCardsInDeck,
    },
  });

  return { data, errors };
};
