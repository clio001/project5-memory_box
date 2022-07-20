import { response } from "express";
import Item from "../models/itemModel.js";

// * GET all items

const getAllItems = async () => {
  try {
    const items = await Item.find({});
    response.status(200).json({
      total: items.length,
      msg: "Success: All items retrieved.",
      msgAlert: "success",
      items,
    });
  } catch (error) {
    response.status(404).json({
      msg: "Error: Unable to find all items.",
      msgAlert: "error",
      error,
    });
  }
};

export { getAllItems };
