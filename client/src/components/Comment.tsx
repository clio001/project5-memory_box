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

function Comment(props: any) {
  const comment = props.data;
  const user = props.user;
  const [openModal, setOpenModal] = useState(false);
  const [updatedComment, setUpdatedComment] = useState("");

  const [deleteComment] = useMutation(DELETE_COMMENT);
  const [updateComment] = useMutation(UPDATE_COMMENT);

  const handleUpdateComment = () => {
    updateComment({
      variables: {
        updateCommentId: comment.id,
        body: updatedComment,
      },
    });
  };

  return (
    <div>
      {/* {comment && console.log("comment", comment)} */}
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
                    <TextField
                      multiline
                      maxRows={8}
                      defaultValue={comment.body}
                      onChange={(e) => setUpdatedComment(e.target.value)}
                    />
                    <Button variant="outlined" onClick={handleUpdateComment}>
                      Submit
                    </Button>
                  </Box>
                </Modal>
                {/* USE MODAL FOR EDIT */}

                <ClearIcon
                  sx={{ color: "gray" }}
                  fontSize="small"
                  onClick={() => {
                    deleteComment({
                      variables: { deleteCommentId: comment?.id },
                    });
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
            <ThumbUpOffAltIcon
              sx={{ color: "gray", mr: "0.5rem" }}
              fontSize="small"
            />
            <Typography variant="caption">11:34</Typography>
          </Box>
        </Box>
      </Box>
    </div>
  );
}

export default Comment;
