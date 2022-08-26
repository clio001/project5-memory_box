import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import {
  Box,
  Typography,
  Avatar,
  Modal,
  TextField,
  Button,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import ClearIcon from "@mui/icons-material/Clear";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";

// * Mutations

const DELETE_COMMENT = gql`
  mutation DeleteComment($deleteCommentId: String) {
    deleteComment(id: $deleteCommentId) {
      id
    }
  }
`;

const UPDATE_COMMENT = gql`
  mutation UpdateComment($updateCommentId: ID, $body: String) {
    updateComment(id: $updateCommentId, body: $body) {
      id
      body
    }
  }
`;

const ADD_LIKE = gql`
  mutation AddLike($userId: ID, $commentId: String) {
    addLike(user_id: $userId, comment_id: $commentId) {
      id
    }
  }
`;

const DELETE_LIKE = gql`
  mutation DeleteLike($deleteLikeId: String) {
    deleteLike(id: $deleteLikeId) {
      id
    }
  }
`;

function Comment(props: any) {
  const comment = props.data;
  const user = props.user;
  const refetch = props.refetch;

  const [openModal, setOpenModal] = useState(false);
  const [updatedComment, setUpdatedComment] = useState("");

  const [deleteComment] = useMutation(DELETE_COMMENT);
  const [updateComment] = useMutation(UPDATE_COMMENT);
  const [addLike] = useMutation(ADD_LIKE);
  const [deleteLike] = useMutation(DELETE_LIKE);

  // * GraphQL handler functions
  const handleUpdateComment = () => {
    updateComment({
      variables: {
        updateCommentId: comment.id,
        body: updatedComment,
      },
    });
    setOpenModal(false);
    refetch();
  };

  const handleAddLike = () => {
    addLike({
      variables: {
        userId: user._id,
        commentId: comment.id,
      },
    });
    refetch();
  };

  return (
    <div>
      <Box className="comment-box">
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          {" "}
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <Avatar src={comment && comment.author.avatar_url} />
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography variant="body2">
                {comment && comment.author.firstName} {""}
                {comment && comment.author.lastName}
              </Typography>

              <Typography variant="caption" color="text.secondary">
                Comments: {comment.author.comments.length}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            {comment && user && comment.user_id === user._id && (
              <div>
                <EditIcon
                  sx={{ color: "gray", marginRight: "0.3rem" }}
                  fontSize="small"
                  onClick={() => setOpenModal(true)}
                />
                <Modal open={openModal} onClose={() => setOpenModal(false)}>
                  <Box className="modalStyle">
                    <Box>
                      <EditIcon
                        fontSize="large"
                        sx={{ color: "#666500", mb: "1rem" }}
                      />
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "16.5rem",
                        backgroundColor: "white",
                        padding: "0.5rem",
                        borderRadius: "25px",
                        marginBottom: "0.5rem",
                      }}
                    >
                      <Avatar
                        src={comment && comment.author.avatar_url}
                        sx={{ width: "26", height: "26" }}
                      />
                      <Typography color="text.secondary" ml={1}>
                        {comment && comment.author.firstName}{" "}
                        {comment && comment.author.lastName}
                      </Typography>
                    </Box>

                    <TextField
                      multiline
                      maxRows={8}
                      defaultValue={comment.body}
                      onChange={(e) => setUpdatedComment(e.target.value)}
                      sx={{ backgroundColor: "#f4f6fc" }}
                    />
                    <Box mt={2}>
                      <Button
                        variant="outlined"
                        onClick={handleUpdateComment}
                        sx={{ color: "#666500", borderColor: "#666500" }}
                      >
                        Edit
                      </Button>
                    </Box>
                  </Box>
                </Modal>

                <ClearIcon
                  sx={{ color: "gray" }}
                  fontSize="small"
                  onClick={() => {
                    deleteComment({
                      variables: { deleteCommentId: comment?.id },
                    });
                    refetch();
                  }}
                />
              </div>
            )}
          </Box>
        </Box>
        <Box
          sx={{
            backgroundColor: "#f4f6fc",
            padding: "0.5rem",
            borderRadius: "10px",
            marginTop: "0.5rem",
          }}
        >
          <Typography variant="body2">{comment && comment.body}</Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
              alignItems: "center",
              marginTop: "0.5rem",
            }}
          >
            {comment && user && comment.likes.length > 0 ? (
              comment.likes.map((like: any) => {
                if (like.user_id === user._id) {
                  return (
                    <ThumbUpAltIcon
                      sx={{ color: "gray", mr: "0.5rem" }}
                      fontSize="small"
                      onClick={() => {
                        deleteLike({
                          variables: { deleteLikeId: like.id },
                        });
                        refetch();
                      }}
                    />
                  );
                } else {
                  return (
                    <ThumbUpOffAltIcon
                      sx={{ color: "gray", mr: "0.5rem" }}
                      fontSize="small"
                      onClick={handleAddLike}
                    />
                  );
                }
              })
            ) : (
              <ThumbUpOffAltIcon
                sx={{ color: "gray", mr: "0.5rem" }}
                fontSize="small"
                onClick={handleAddLike}
              />
            )}

            <Typography variant="caption">
              {comment && comment.likes.length} / 11:34
            </Typography>
          </Box>
        </Box>
      </Box>
    </div>
  );
}

export default Comment;
