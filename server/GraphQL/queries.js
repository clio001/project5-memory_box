import graphql, {
  GraphQLObjectType,
  GraphQLList,
  GraphQLID,
  GraphQLString,
  GraphQLBoolean,
} from "graphql";
import _ from "lodash";
import { ItemType, UserType } from "./typeDefs.js";
import User from "../models/userModel.js";
import Item from "../models/itemModel.js";

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    users: {
      type: new GraphQLList(UserType),
      async resolve(parent, args) {
        return await User.find({});
      },
    },
    user: {
      type: UserType,
      args: {
        id: { type: GraphQLID },
      },
      async resolve(parent, args) {
        return await User.findById(args.id);
      },
    },
    items: {
      type: new GraphQLList(ItemType),
      async resolve(parent, args) {
        return await Item.find({});
      },
    },
    item: {
      type: ItemType,
      args: { id: { type: GraphQLID } },
      async resolve(parent, args) {
        return await Item.findById(args.id);
      },
    },
  },
});

export { RootQuery };
