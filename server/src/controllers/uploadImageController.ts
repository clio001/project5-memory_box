import { v2 as cloudinary } from "cloudinary";
import { Request, Response } from "express";
import User from "../models/userModel.js";
import Item from "../models/itemModel.js";

type APIresponse = {
  msg: string;
  msgAlert: string;
  avatar_url?: string;
  banner_url?: string;
  error?: object;
};

type Path = {
  path: string;
};
interface RequestWithFile extends Request {
  file: Path;
}

// * AVATAR UPLOAD

const uploadAvatar = async (
  req: RequestWithFile,
  res: Response<APIresponse>
): Promise<void> => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: `memory-box/${req.body.user_id}`,
    }); // create folder for each user

    await User.findByIdAndUpdate(req.body.user_id, {
      avatar_url: result.url,
    });

    res.status(200).json({
      msg: "Avatar uploaded.",
      msgAlert: "success",
      avatar_url: result.url,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Unable to upload avatar image.",
      msgAlert: "error",
    });
  }
};

// * BANNER UPLOAD

const uploadBanner = async (
  req: RequestWithFile,
  res: Response<APIresponse>
) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: `memory-box/${req.body.user_id}`,
    }); // create folder for each user

    await User.findByIdAndUpdate(req.body.user_id, {
      banner_url: result.url,
    });

    res.status(200).json({
      msg: "Banner uploaded.",
      msgAlert: "success",
      banner_url: result.url,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Unable to upload banner image.",
      msgAlert: "error",
      error: error,
    });
  }
};

// * ITEM IMAGE UPLOAD

const uploadItemImage = async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: `memory-box/${req.body.user_id}`,
    }); // create folder for each user

    // TODO Update to combine with item creation mutation
    /* await Item.findByIdAndUpdate(req.body.user_id, {
      file_url: result.url,
      user_id: req.body.user_id,
    }); */

    res.status(200).json({
      msg: "Item image uploaded.",
      msgAlert: "success",
      itemImage_url: result.url,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Unable to upload item image.",
      msgAlert: "error",
      error,
    });
  }
};

export { uploadAvatar, uploadBanner, uploadItemImage };
