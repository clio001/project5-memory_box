import Comment from "../models/commentModel.js";

// * GET comments by item_id

const getCommentsByItemId = async (request, response) => {
  try {
    const comments = await Comment.find({
      item_id: "62d7fbf96c245665ce97ea06",
    });
    response.status(200).json({
      comments,
    });
  } catch (error) {
    response.status(404).json({
      msg: "Error: No comments found.",
      error,
    });
  }
};

export { getCommentsByItemId };
