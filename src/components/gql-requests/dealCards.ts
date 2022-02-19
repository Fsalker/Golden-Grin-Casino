import apolloClient from "../../utils/apolloClient";
import { mutationDealCards } from "./gql-queries";

export default async () => {
  const { data, errors } = await apolloClient.mutate({
    mutation: mutationDealCards,
  });

  return { data, errors };
};
