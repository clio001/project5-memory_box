import graphql, {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLBoolean,
  GraphQLList,
} from "graphql";
import _ from "lodash";
import Comment from "../models/commentModel.js";

const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLID },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    email: { type: GraphQLString },
    avatar_url: { type: GraphQLString },
    password: { type: GraphQLString },
    comments: { type: GraphQLString },
    bookmarks: { type: GraphQLString },
    items: { type: GraphQLString },
    groups: { type: GraphQLString },
    following: { type: GraphQLString },
    location: { type: GraphQLString },
  }),
});

const ItemType = new GraphQLObjectType({
  name: "Item",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    createdBy: { type: GraphQLString },
    location: { type: GraphQLString },
    type: { type: GraphQLString },
    file_url: { type: GraphQLString },
    comments: {
      type: new GraphQLList(CommentType),
      async resolve(parent, args) {
        return await Comment.where("item_id").equals(parent.id).exec();
      },
    },
    bookmarks: { type: GraphQLString },
    like: { type: GraphQLString },
    share: { type: GraphQLBoolean },
  }),
});

const GroupType = new GraphQLObjectType({
  name: "Group",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    location: { type: GraphQLString },
    members: { type: GraphQLList },
  }),
});

const CommentType = new GraphQLObjectType({
  name: "Comment",
  fields: () => ({
    id: { type: GraphQLID },
    author: { type: GraphQLString },
    body: { type: GraphQLString },
    item_id: { type: GraphQLString },
    user_id: { type: GraphQLString },
  }),
});
export { UserType, ItemType, CommentType };
