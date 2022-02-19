import apolloClient from "../../utils/apolloClient";
import { mutationStartGame } from "./gql-queries";

export type startGameRequestParams = { numCardsInDeck: number };

export default async ({ numCardsInDeck }: startGameRequestParams) => {
  const { data, errors } = await apolloClient.mutate({
    mutation: mutationStartGame,
    variables: {
      numCardsInDeck,
    },
  });

  return { data, errors };
};
