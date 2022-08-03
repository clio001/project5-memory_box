import graphql, {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLBoolean,
  GraphQLList,
} from "graphql";
import _ from "lodash";
import Bookmark from "../models/bookmarkModel.js";
import Comment from "../models/commentModel.js";
import Group from "../models/groupModel.js";
import Item from "../models/itemModel.js";
import Like from "../models/likeModel.js";
import User from "../models/userModel.js";

// * TOKEN

const TokenType = new GraphQLObjectType({
  name: "Token",
  fields: () => ({
    token: { type: GraphQLString },
  }),
});

// * USER

const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    _id: { type: GraphQLID },
    token: { type: GraphQLString },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    email: { type: GraphQLString },
    avatar_url: { type: GraphQLString },
    banner_url: { type: GraphQLString },
    role: { type: GraphQLString },
    password: { type: GraphQLString },
    comments: {
      type: new GraphQLList(CommentType),
      async resolve(parent, args) {
        return await Comment.find({ user_id: parent.id });
      },
    },
    bookmarks: {
      type: new GraphQLList(BookmarkType),
      async resolve(parent, args) {
        return await Bookmark.find({ user_id: parent.id });
      },
    },
    likes: {
      type: new GraphQLList(LikeType),
      async resolve(parent, args) {
        return await Like.find({ user_id: parent.id });
      },
    },
    items: {
      type: new GraphQLList(ItemType),
      async resolve(parent, args) {
        return await Item.find({ createdBy: parent.id });
      },
    },
    groups: {
      type: new GraphQLList(GroupType),
      async resolve(parent, args) {
        return await Group.find({ members: parent.id });
      },
    },
    following: { type: GraphQLString },
    location: { type: GraphQLString },
  }),
});

// * ITEM

const ItemType = new GraphQLObjectType({
  name: "Item",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    user_id: { type: GraphQLString },
    createdBy: {
      type: UserType,
      async resolve(parent, args) {
        return await User.findById(parent.user_id);
      },
    },
    location: { type: GraphQLString },
    type: { type: GraphQLString },
    file_url: { type: GraphQLString },
    comments: {
      type: new GraphQLList(CommentType),
      async resolve(parent, args) {
        return await Comment.find({ item_id: parent.id });
      },
    },
    bookmarks: {
      type: new GraphQLList(BookmarkType),
      async resolve(parent, args) {
        return await Bookmark.find({ item_id: parent.id });
      },
    },
    share: { type: GraphQLBoolean },
  }),
});

// * GROUP

const GroupType = new GraphQLObjectType({
  name: "Group",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    avatar_url: { type: GraphQLString },
    banner_url: { type: GraphQLString },
    location: { type: GraphQLString },
    members: {
      type: new GraphQLList(UserType),
      async resolve(parent, args) {
        return await User.find({ groups: parent.id });
      },
    },

    items: { type: GraphQLString },
    public: { type: GraphQLBoolean },
  }),
});

// * COMMENT

const CommentType = new GraphQLObjectType({
  name: "Comment",
  fields: () => ({
    id: { type: GraphQLID },
    body: { type: GraphQLString },
    item_id: { type: GraphQLString },
    user_id: { type: GraphQLString },
    author: {
      type: UserType,
      async resolve(parent, args) {
        return await User.findById(parent.user_id);
      },
    },
    likes: {
      type: new GraphQLList(LikeType),
      async resolve(parent, args) {
        return await Like.find({ comment_id: parent.id });
      },
    },
  }),
});

// * LIKE

const LikeType = new GraphQLObjectType({
  name: "Like",
  fields: () => ({
    id: { type: GraphQLID },
    comment_id: { type: GraphQLString },
    user_id: { type: GraphQLString },
    author: {
      type: UserType,
      async resolve(parent, args) {
        return await User.findById(parent.user_id);
      },
    },
  }),
});

// * BOOKMARK

const BookmarkType = new GraphQLObjectType({
  name: "Bookmark",
  fields: () => ({
    id: { type: GraphQLID },
    item_id: { type: GraphQLString },
    user_id: { type: GraphQLString },
    author: {
      type: UserType,
      async resolve(parent, args) {
        return await User.findById(parent.user_id);
      },
    },
  }),
});

export { UserType, ItemType, CommentType, LikeType, BookmarkType, GroupType };
