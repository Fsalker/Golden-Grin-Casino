import apolloClient from "../../utils/apolloClient";
import { gql } from "@apollo/client";

export default async () => {
  const { data, errors } = await apolloClient.mutate({
    mutation: gql`
      mutation {
        leaveGame
      }
    `,
  });

  return { data, errors };
};
