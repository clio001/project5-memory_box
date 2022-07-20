import { response } from "express";
import Item from "../models/itemModel.js";

// * GET all items

const getAllItems = async (request, response) => {
  try {
    const items = await Item.find({});
    response.status(200).json({
      total: items.length,
      msg: "Success: All items retrieved.",
      msgAlert: "success",
      items,
    });
  } catch (error) {
    response.send({
      msg: "Error: Unable to find all items.",
      msgAlert: "error",
      error,
    });
  }
};

export { getAllItems };
