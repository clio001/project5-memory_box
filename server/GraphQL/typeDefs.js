import graphql, {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLBoolean,
} from "graphql";
import _ from "lodash";

const UserType = new GraphQLObjectType({
  name: "User",
  fields: {
    id: { type: GraphQLID },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    comments: { type: GraphQLString },
    bookmarks: { type: GraphQLString },
    items: { type: GraphQLString },
    groups: { type: GraphQLString },
    following: { type: GraphQLString },
    location: { type: GraphQLString },
  },
});

const ItemType = new GraphQLObjectType({
  name: "Item",
  fields: {
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    createdBy: { type: GraphQLString },
    location: { type: GraphQLString },
    type: { type: GraphQLString },
    file_url: { type: GraphQLString },
    comments: { type: GraphQLString },
    bookmarks: { type: GraphQLString },
    like: { type: GraphQLString },
    share: { type: GraphQLBoolean },
  },
});

export { UserType, ItemType };
