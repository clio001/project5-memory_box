import graphql, { GraphQLSchema } from "graphql";
import { RootQuery } from "./queries.js";

const schema = new GraphQLSchema({
  query: RootQuery,
});

export { schema };
