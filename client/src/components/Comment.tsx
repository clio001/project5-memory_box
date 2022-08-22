import React from "react";
import { Box, Typography, Avatar } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import ClearIcon from "@mui/icons-material/Clear";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";

function Comment(props: any) {
  const comment = props.data;

  return (
    <div>
      {comment && console.log("DATA", comment)}
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
            <Typography variant="body2">
              {comment && comment.author.firstName} {""}
              {comment && comment.author.lastName}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <EditIcon
              sx={{ color: "#666500", marginRight: "0.3rem" }}
              fontSize="small"
            />
            <ClearIcon sx={{ color: "#666500" }} fontSize="small" />
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
            <Typography variant="caption">11:34</Typography>
            <ThumbUpOffAltIcon
              sx={{ color: "#666500", ml: "0.3rem" }}
              fontSize="small"
            />
          </Box>
        </Box>
      </Box>
    </div>
  );
}

export default Comment;
