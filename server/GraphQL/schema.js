import graphql, { GraphQLSchema } from "graphql";
import { Mutation } from "./mutations.js";
import { RootQuery } from "./queries.js";

const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});

export { schema };
