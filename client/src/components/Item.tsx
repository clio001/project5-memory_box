import { Typography, Grid, Box, Avatar, Divider, Paper } from "@mui/material";

import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import Comment from "./Comment";
import Map from "./Map";
import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useMutation, gql, useQuery } from "@apollo/client";
import InputField from "./InputField";
import { Link as LinkRouter, useLocation, useNavigate } from "react-router-dom";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

function Item() {
  const { user } = useContext(UserContext);
  type x = {
    [key: string]: any;
  };
  const singleItem: x = useLocation();
//   console.log(">>>>>>>>>>>", singleItem?.state.element2.id);

  const itemId: x = singleItem.state.element2.id;

  const SINGLE_ITEM = gql`
    query Item {
      item(id: "${itemId}") {
        id
		  title
		  description
      type
      location {
        latitude
        longitude
      }
		  user_id
		  file_url
		  createdBy {
			_id
			firstName
			lastName
			avatar_url
		  }
		  comments {
			id
			body
			item_id
			user_id
			author {
				_id
				firstName
				comments {
					id
				}
			lastName
			avatar_url
			}
			likes {
				id
				comment_id
				user_id
			}
		  }
      }
    }
  `;
  const { loading, error, data, refetch } = useQuery(SINGLE_ITEM);

//   console.log("DATADATA ", data);

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
      {/* {data && console.log("Query data: ", data)} */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          flexWrap: "nowrap",
          mt: "60px",
			 position: "relative",
        }}
      >
			        <LinkRouter to="/group">
          <Box sx={{position: "absolute", display: "flex", alignItems: "center", top: "20px", left: "15px", color: "#fff"}}>
            <Box sx={{display: "flex", alignItems: "center", justifyContent: "center", width: "40px", height: "40px", background: "#fff", borderRadius: "100px", mr: "8px", boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.13)"}}>
              <ArrowBackIosNewIcon sx={{color: "#AEAEAE"}} />
            </Box>
            <Box sx={{fontSize: "12px", textShadow: "0px 0px 8px #484848"}}>Go back</Box>
          </Box>
        </LinkRouter>
        <Box></Box>
        <img src={data && data.item.file_url} width="100%" />
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
              src={data && data.item.createdBy.avatar_url}
              sx={{ width: "26", height: "26" }}
            />
            <Typography color="text.secondary" ml={1}>
              {data && data.item.createdBy.firstName}{" "}
              {data && data.item.createdBy.lastName}
            </Typography>
          </Box>
          <BookmarkBorderIcon sx={{ color: "#666500", mr: "0.3rem" }} />
        </Paper>
        <Typography variant="h5" sx={{ color: "#473800", mt: "1rem" }}>
          {data && data.item.title}
        </Typography>
        <Typography variant="subtitle1" sx={{ color: "gray" }}>
          {data && data.item.type}
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
                June 10, 1920
              </Typography>
            </Divider>
            <Typography mt={1}>{data && data.item.description}</Typography>
          </Box>


          <div>
            <Divider>
              <Typography variant="body2" color="text.secondary">
                Location
              </Typography>
            </Divider>
            <Box mt={1} mb={3}>
              {data && data.item.location.latitude && <Map data={data} />}
            </Box>
          </div>

          <Divider>
            <Typography variant="body2" color="text.secondary">
              Comments {data && data.item.comments.length}
            </Typography>
          </Divider>
          <Box sx={{ mb: "5rem" }}>
            {" "}
            {data && data.item.comments.length === 0 ? (
              <>
                <Box
                  sx={{ display: "flex", justifyContent: "center", mt: "1rem" }}
                >
                  <Typography variant="body2" color="text.secondary">
                    Be the first to comment ...
                  </Typography>
                </Box>
              </>
            ) : (
              data &&
              data.item.comments.map((element: any, i: number) => {
                return (
                  <Comment
                    key={i}
                    data={element}
                    user={user}
                    refetch={refetch}
                  />
                );
              })
            )}
          </Box>
          {data && <InputField data={data} user={user} refetch={refetch} />}
        </Box>
      </Box>
    </Grid>
  );
}

export default Item;
