import { ApolloClient, InMemoryCache } from '@apollo/client';
import { typeDefs } from '../pages/api/gql-modules/schema';

const apolloClient = new ApolloClient({
  uri: 'http://localhost:3000/api/graphql',
  cache: new InMemoryCache(),
  typeDefs,
});

export default apolloClient;
