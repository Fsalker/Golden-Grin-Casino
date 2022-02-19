import apolloClient from "../../utils/apolloClient";
import { mutationLeaveGame } from "./gql-queries";

export default async () => {
  const { data, errors } = await apolloClient.mutate({
    mutation: mutationLeaveGame,
  });

  return { data, errors };
};
