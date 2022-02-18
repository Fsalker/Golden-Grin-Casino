import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { typeDefs } from "../pages/api/gql-modules/schema";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
  uri: "http://localhost:3000/api/graphql",
  // uri: "http://host.docker.internal:3000/api/graphql",
});

const authLink = setContext((_, { headers }) => {
  const jwt = localStorage.getItem("jwt");
  return {
    headers: {
      ...headers,
      authorization: jwt ? jwt : "",
    },
  };
});

const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  typeDefs,
});

export default apolloClient;
