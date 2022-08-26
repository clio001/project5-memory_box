import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { Box, Typography, InputBase, Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

const ADD_COMMENT = gql`
  mutation AddComment($body: String, $user_id: String, $item_id: String) {
    addComment(body: $body, user_id: $user_id, item_id: $item_id) {
      id
      body
      user_id
      author {
        _id
        firstName
        lastName
      }
    }
  }
`;

function InputField(props: any) {
  const itemData = props.data;
  const user = props.user;
  const refetch = props.refetch;

  const [newComment, setNewComment] = useState("");

  const [addComment] = useMutation(ADD_COMMENT);

  const handleAddComment = () => {
    addComment({
      variables: {
        body: newComment,
        user_id: user._id,
        item_id: itemData.item.id,
      },
    });
    let field: any = document.getElementById("userComment");
    field.value = "";
    window.scrollTo(0, document.body.scrollHeight);
    refetch();
  };

  return (
    <div>
      <Box
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          width: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            width: "100%",
            height: "3rem",
            paddingTop: "0.5rem",
            paddingBottom: "0.5rem",
            border: "1px",
            backgroundColor: "white",
          }}
        >
          <InputBase
            id="userComment"
            sx={{ ml: 2, flex: 1 }}
            placeholder="New comment ..."
            inputProps={{ "aria-label": "New comment" }}
            multiline
            maxRows={3}
            onChange={(e) => setNewComment(e.target.value)}
          />

          <span>
            <Button
              variant="outlined"
              style={{
                marginRight: "0.5rem",
                marginLeft: "0.5rem",
                borderColor: "#666500",
              }}
              onClick={handleAddComment}
            >
              <SendIcon sx={{ color: "#666500" }} />
            </Button>
          </span>
        </Box>
      </Box>
    </div>
  );
}

export default InputField;
