import { Typography, Grid, Box, Avatar, Divider, Chip } from "@mui/material";
import MapIcon from "@mui/icons-material/Map";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import Comment from "./Comment";
import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useMutation, gql, useQuery } from "@apollo/client";

function Item() {
  const USER_ITEM = gql`
    query Users {
      user(id: "62e938668989205442df9506") {
        avatar_url
        items {
          title
          description
          file_url
          createdBy {
            firstName
            lastName
          }
          comments {
            id
            body
            author {
              firstName
              lastName
              avatar_url
            }
          }
        }
        email
      }
    }
  `;
  const { loading, error, data } = useQuery(USER_ITEM);

  return (
    <Grid
      container
      alignItems="stretch"
      justifyContent="center"
      columns={12}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        flexWrap: "nowrap",
      }}
    >
      {data && console.log(data)}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          flexWrap: "nowrap",
          mt: "60px",
        }}
      >
        <img src={data && data.user.items[0].file_url} width="100%" />

        <Box sx={{ ml: "0.5rem", mr: "0.5rem" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
              padding: "0.5rem",
            }}
          >
            <MapIcon sx={{ color: "#666500" }} />
            <BookmarkBorderIcon sx={{ color: "#666500" }} />
          </Box>

          <Typography variant="h6" sx={{ color: "#473800" }}>
            {data && data.user.items[0].title}
          </Typography>
          <Typography color="text.secondary">
            {data && data.user.items[0].createdBy.firstName}{" "}
            {data && data.user.items[0].createdBy.lastName}
          </Typography>
          <Box
            sx={{
              backgroundColor: "#e0d9cc",
              padding: "0.5rem",
              borderRadius: "5px",
              mt: "1rem",
              mb: "0.5rem",
            }}
          >
            <Typography variant="body2" color="text.secondary" mb={0.5}>
              Description
            </Typography>
            <Typography>{data && data.user.items[0].description}</Typography>
          </Box>

          <Divider>
            <Chip
              label="Comments"
              sx={{
                backgroundColor: "#666500",
                color: "white",
                fontSize: "12px",
                padding: "1rem",
                marginTop: "1rem",
                marginBottom: "1rem",
              }}
            />
          </Divider>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <Avatar src="" sx={{ width: 36, height: 36 }} />
            <Avatar src="" sx={{ width: 36, height: 36, ml: "0.5rem" }} />
            <Avatar src="" sx={{ width: 36, height: 36, ml: "0.5rem" }} />
          </Box>
          <Box sx={{ mb: "2rem" }}>
            {" "}
            {data &&
              data.user.items[0].comments.map((element: any, i: number) => {
                return <Comment key={i} data={element} />;
              })}
          </Box>
        </Box>
      </Box>
    </Grid>
  );
}

export default Item;
