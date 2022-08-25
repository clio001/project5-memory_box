import { Typography, Grid, Box, Avatar, Divider, Paper } from "@mui/material";

import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import Comment from "./Comment";
import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useMutation, gql, useQuery } from "@apollo/client";
import InputField from "./InputField";
import { useLocation, useNavigate } from "react-router-dom";

function Item() {

	type x = {
	[key: string]: any;
}
const singleItem: x = useLocation()
console.log(">>>>>>>>>>>", singleItem?.state.element2.id)


const itemId: x = singleItem.state.element2.id

  const SINGLE_ITEM = gql`
    query Item {
      item(id: "${itemId}") {
        id
		  title
		  description
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
  const { loading, error, data } = useQuery(SINGLE_ITEM);

  console.log("DATADATA ",data)

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
              {data && data.item.description}
            </Typography>
          </Box>
          <Divider>
            <Typography variant="body2" color="text.secondary">
              Location
            </Typography>
          </Divider>
          <div>asdn</div>
          <Divider>
            <Typography variant="body2" color="text.secondary">
              Comments {data && data.item.comments.length}
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
            {data && data.item.comments.length === 0 ? (
              <>
                <Typography variant="body2" color="text.secondary">
                  Be the first to comment ...
                </Typography>
              </>
            ) : (
              data &&
              data.item.comments.map((element: any, i: number) => {console.log(element)
                return <Comment key={i} data={element} user={data.item.createdBy} />;
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
