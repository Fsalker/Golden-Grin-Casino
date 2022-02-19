import apolloClient from "../../utils/apolloClient";
import { queryAccountHistory } from "./gql-queries";

type accountHistoryRequestParams = {
  spanMinutes: number;
};

export default async ({ spanMinutes }: accountHistoryRequestParams) => {
  console.log("Querying for acc history...");
  const { data, errors } = await apolloClient.query({
    query: queryAccountHistory,
    variables: {
      spanMinutes,
    },
    fetchPolicy: "no-cache",
  });

  return { data, errors };
};
