import { Typography, Grid, Box, Avatar, Divider, Paper } from "@mui/material";

import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import Comment from "./Comment";
import Map from "./Map";
import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useMutation, gql, useQuery } from "@apollo/client";
import InputField from "./InputField";

function Item() {
  const USER_ITEM = gql`
    query Users {
      user(id: "62e938668989205442df9506") {
        _id
        avatar_url
        items {
          id
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
            user_id
            likes {
              id
              comment_id
              user_id
              author {
                _id
                firstName
                lastName
              }
            }
            author {
              firstName
              lastName
              avatar_url
              comments {
                id
              }
            }
          }
        }
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
      {data && console.log("Query data: ", data)}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          flexWrap: "nowrap",
          mt: "60px",
        }}
      >
        <Box></Box>
        <img src={data && data.user.items[0].file_url} width="100%" />
        <Paper
          elevation={5}
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0.3rem",
            borderRadius: "25px",
            marginTop: "-25px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              width: "16rem",
            }}
          >
            <Avatar
              src={data && data.user.avatar_url}
              sx={{ width: "26", height: "26" }}
            />
            <Typography color="text.secondary" ml={1}>
              {data && data.user.items[0].createdBy.firstName}{" "}
              {data && data.user.items[0].createdBy.lastName}
            </Typography>
          </Box>
          <BookmarkBorderIcon sx={{ color: "#666500", mr: "0.3rem" }} />
        </Paper>
        <Typography variant="h5" sx={{ color: "#473800", mt: "1rem" }}>
          {data && data.user.items[0].title}
        </Typography>
        <Box sx={{ ml: "0.5rem", mr: "0.5rem" }}>
          <Box
            sx={{
              padding: "0.5rem",
              borderRadius: "5px",
              mt: "0.5rem",
              mb: "0.5rem",
            }}
          >
            <Divider>
              <Typography variant="body2" color="text.secondary">
                June, 10, 1920
              </Typography>
            </Divider>
            <Typography mt={1}>
              {data && data.user.items[0].description}
            </Typography>
          </Box>

          <Divider>
            <Typography variant="body2" color="text.secondary">
              Location
            </Typography>
          </Divider>
          <Map />
          <Divider>
            <Typography variant="body2" color="text.secondary">
              Comments {data && data.user.items[0].comments.length}
            </Typography>
          </Divider>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              mt: 1,
            }}
          >
            <Avatar src="" sx={{ width: 36, height: 36 }} />
            <Avatar src="" sx={{ width: 36, height: 36, ml: "0.5rem" }} />
            <Avatar src="" sx={{ width: 36, height: 36, ml: "0.5rem" }} />
          </Box>
          <Box sx={{ mb: "5rem" }}>
            {" "}
            {data && data.user.items[0].comments.length === 0 ? (
              <>
                <Typography variant="body2" color="text.secondary">
                  Be the first to comment ...
                </Typography>
              </>
            ) : (
              data &&
              data.user.items[0].comments.map((element: any, i: number) => {
                return <Comment key={i} data={element} user={data.user} />;
              })
            )}
          </Box>
          {data && <InputField data={data} />}
        </Box>
      </Box>
    </Grid>
  );
}

export default Item;
