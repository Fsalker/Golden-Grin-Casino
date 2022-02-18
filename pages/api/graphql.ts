import type { NextApiRequest, NextApiResponse } from 'next';
import { ApolloServer } from 'apollo-server-micro';
import { typeDefs } from './gql-modules/schema';
import { resolvers } from './gql-modules/resolvers';
import { getJwtPayload, validateJwt } from './gql-modules/auth';
import { JwtPayload } from './gql-modules/types';

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const jwt: string = req.headers.authorization || '';
    if (validateJwt(jwt)) {
      const jwtPayload: JwtPayload = getJwtPayload(jwt);
      return { userId: jwtPayload.userId };
    }
  },
});

const startServer = apolloServer.start();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await startServer;
  await apolloServer.createHandler({
    path: '/api/graphql',
  })(req, res);
}

export const config = {
  api: {
    bodyParser: false,
  },
};
