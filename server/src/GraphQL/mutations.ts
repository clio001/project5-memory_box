import graphql, {GraphQLObjectType, GraphQLList, GraphQLID, GraphQLString, GraphQLBoolean} from "graphql";
import _ from "lodash";
import {ItemType, UserType, CommentType, BookmarkType, LikeType} from "./typeDefs.js";
import User from "../models/userModel.js";
import Item from "../models/itemModel.js";
import Comment from "../models/commentModel.js";
import Bookmark from "../models/bookmarkModel.js";
import Like from "../models/likeModel.js";
import bcrypt from "bcrypt";
import {createToken} from "../utils/jwt.js";
import {gql} from "apollo-server-express";
import {finished} from "stream/promises";

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    // * ADD NEW USER
    addUser: {
      type: UserType,
      args: {
        email: {type: GraphQLString},
        password: {type: GraphQLString},
      },
      async resolve(parent, args) {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(args.password, salt);

        let newUser = new User({
          email: args.email,
          password: hash,
        });
        return await newUser.save();
      },
    },

    // * LOGIN USER
    loginUser: {
      type: UserType,
      args: {
        email: {type: GraphQLString},
        password: {type: GraphQLString},
      },
      async resolve(parent, args) {
        // * 1. verify password using bcrypt compare
        const existingUser = await User.findOne({
          email: args.email,
        });
        if (!existingUser) {
          throw Error(`${args.email} does not exist.`);
        } else {
          const isVerified = await bcrypt.compare(args.password, existingUser.password);
          if (!isVerified) {
            throw Error(`Incorrect password.`);
          } else {
            console.log("Password correct.");
            // * 2. Issue token
            const token = createToken(existingUser.id);
            console.log("Token: ", token);
            return {...existingUser.toObject(), token};
          }
        }
      },
    },

    // * UPDATE USER INFO
    updateUser: {
      type: UserType,
      args: {
        id: {type: GraphQLID},
        firstName: {type: GraphQLString},
        lastName: {type: GraphQLString},
        avatar_url: {type: GraphQLString},
        banner_url: {type: GraphQLString},
        location: {type: GraphQLString},
      },
      async resolve(parent, args) {
        return await User.findByIdAndUpdate(args.id, {
          firstName: args.firstName,
          lastName: args.lastName,
          avatar_url: args.avatar_url,
          banner_url: args.banner_url,
          location: args.location,
        });
      },
    },

    // * DELETE USER

    deleteUser: {
      type: UserType,
      args: {
        id: {type: GraphQLString},
        token: {type: GraphQLString},
      },
      async resolve(parent, args, context) {
        if (!args.token) return null;
        return await User.findByIdAndDelete(args.id);
      },
    },

    // * ADD NEW ITEM
    addItem: {
      type: ItemType,
      args: {
        title: {type: GraphQLString},
        description: {type: GraphQLString},
        createdBy: {type: GraphQLString},
        user_id: {type: GraphQLString},
        type: {type: GraphQLString},
        file_url: {type: GraphQLString},
        share: {type: GraphQLBoolean},
      },
      // const item : Item= {
      //   title,
      // }
      async resolve(parent, args, context) {
        if (!context.user) return null;
        let newItem = new Item<dbModel.Item>({
          title: args.title,
          description: args.description,
          createdBy: args.createdBy,
          user_id: args.user_id,
          type: args.type,
          file_url: args.file_url,
          share: args.share,
        });
        return await newItem.save();
      },
    },

    // * UPDATE ITEM
    updateItem: {
      type: ItemType,
      args: {
        id: {type: GraphQLID},
        title: {type: GraphQLString},
        description: {type: GraphQLString},
        type: {type: GraphQLString},
        file_url: {type: GraphQLString},
        share: {type: GraphQLBoolean},
      },
      async resolve(parent, args, context) {
        if (!context.user) return null;
        return await Item.findByIdAndUpdate(args.id, {
          title: args.title,
          description: args.description,
          type: args.type,
          file_url: args.file_url,
          share: args.share,
        });
      },
    },

    // * DELETE ITEM

    deleteItem: {
      type: ItemType,
      args: {
        id: {type: GraphQLString},
      },
      async resolve(parent, args, context) {
        if (!context.user) return null;
        return await Item.findByIdAndDelete(args.id);
      },
    },

    // * ADD COMMENT

    addComment: {
      type: CommentType,
      args: {
        body: {type: GraphQLString},
        user_id: {type: GraphQLString},
        item_id: {type: GraphQLString},
      },
      async resolve(parent, args, context) {
        if (!context.user) return null;
        let newComment = new Comment<dbModel.Comment>({
          body: args.body,
          user_id: args.user_id,
          item_id: args.item_id,
        });
        return await newComment.save();
      },
    },

    // * UPDATE COMMENT

    updateComment: {
      type: CommentType,
      args: {
        id: {type: GraphQLID},
        body: {type: GraphQLString},
      },
      async resolve(parent, args, context) {
        if (!context.user) return null;
        return await Comment.findByIdAndUpdate(args.id, {
          body: args.body,
        });
      },
    },

    // * DELETE COMMENT

    deleteComment: {
      type: CommentType,
      args: {
        id: {type: GraphQLString},
      },
      async resolve(parent, args, context) {
        if (!context.user) return null;
        return await Comment.findByIdAndDelete(args.id);
      },
    },

    // * ADD BOOKMARK

    addBookmark: {
      type: BookmarkType,
      args: {
        user_id: {type: GraphQLString},
        item_id: {type: GraphQLString},
      },
      async resolve(parent, args, context) {
        if (!context.user) return null;
        let newBookmark = new Bookmark<dbModel.Bookmark>({
          user_id: args.user_id,
          item_id: args.item_id,
        });
        return await newBookmark.save();
      },
    },

    // * DELETE BOOKMARK

    deleteBookmark: {
      type: BookmarkType,
      args: {
        id: {type: GraphQLString},
      },
      async resolve(parent, args, context) {
        if (!context.user) return null;
        return await Bookmark.findByIdAndDelete(args.id);
      },
    },

    // * ADD LIKE

    addLike: {
      type: LikeType,
      args: {
        user_id: {type: GraphQLString},
        comment_id: {type: GraphQLString},
      },
      async resolve(parent, args, context) {
        if (!context.user) return null;
        let newLike = new Like<dbModel.Like>({
          user_id: args.user_id,
          comment_id: args.comment_id,
        });
        return await newLike.save();
      },
    },

    // * DELETE LIKE

    deleteLike: {
      type: LikeType,
      args: {
        id: {type: GraphQLString},
      },
      async resolve(parent, args, context) {
        if (!context.user) return null;
        return await Like.findByIdAndDelete(args.id);
      },
    },

    //  // * FILE  UPLOAD
    //  // uploadFile(file: Upload!): string!,

    //  singleUpload: {
    //    type: FileType,
    //    args: {
    //      file: {type: SingleUploadType},
    //    },
    //    async resolve(parent, {file}) {
    //      try {
    //        const {createReadStream, filename, mimetype, encoding} = await file;

    //        const stream = createReadStream();

    //        const out = require("fs").createWriteStream(`./ assets/${filename}.jpg`);

    //        stream.pipe(out);
    //        await finished(out);

    //        return {filename, mimetype, encoding};
    //      } catch (error) {
    //        console.log("Error uploading single file", error);
    //      }
    //    },
    //  },
  },
});

export {Mutation};
