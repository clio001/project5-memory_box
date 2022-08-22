import React, {useState} from "react";
import {Link as LinkRouter} from "react-router-dom";
import {Grid, Box, Typography, Button, TextField, Collapse, Alert} from "@mui/material";
import {styled} from "@mui/material/styles";
import {gql, useMutation} from "@apollo/client";

import {FormErrors, ErrorSeverity, ErrorMessage} from "../types";




const Group: React.FC = () => {

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
        mt: "55px",
      }}>
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: "200px",
          mb: "70px",
          backgroundColor: "#f6f6f6",
          borderRadius: "0 0 70px 70px",
          background: "#f6f6f6 url(./profile-bg.jpg) center center/cover no-repeat",
         //  background: `#f6f6f6 url(${user?.banner_url ? user?.banner_url : "./profile-bg.jpg"}) center center/cover no-repeat`,
        }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            pt: "90px",
            width: "150px",
            margin: "0 auto",
          }}>
          <img
            src="./profile.svg"
            // src={user?.avatar_url ? user?.avatar_url : "./profile.svg"}
            alt="profile img"
            style={{
              borderRadius: "100px",
              width: "150px",
              boxShadow: "0 0 0px 5px #b5b5b5",
            }}
          />
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          maxWidth: "395px",
          minWidth: "320px",
          height: "65px",
          borderRadius: "10px",
          background: "#FAFAFA",
        }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            alignContent: "center",
            width: "33.33%",
            textAlign: "center",
          }}>
          <Typography
            component="span"
            sx={{
              fontSize: "27px",
              lineHeight: "28px",
              color: "#a1a277",
            }}>
            99
          </Typography>
          <Typography component="span" sx={{fontSize: "13px", color: "#B6B6B6"}}>
            Groups
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            alignContent: "center",
            width: "33.33%",
            textAlign: "center",
            borderRight: "1px solid #DEE3ED",
            borderLeft: "1px solid #DEE3ED",
          }}>
          <Typography
            component="span"
            sx={{
              fontSize: "27px",
              lineHeight: "28px",
              color: "#a1a277",
            }}>
            124
          </Typography>
          <Typography component="span" sx={{fontSize: "13px", color: "#B6B6B6"}}>
            Bookmarks
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            alignContent: "center",
            width: "33.33%",
            textAlign: "center",
          }}>
          <Typography
            component="span"
            sx={{
              fontSize: "27px",
              lineHeight: "28px",
              color: "#a1a277",
            }}>
            37
          </Typography>
          <Typography component="span" sx={{fontSize: "13px", color: "#B6B6B6"}}>
            Comments
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          width: "100%",
          maxWidth: "395px",
          minWidth: "320px",
          mt: "15px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}>
        <Box component="span" m={1} sx={{width: "100%", border: "1px solid #C2C8D0"}}></Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            p: "10px",
            color: "#2D333A",
            fontSize: "13px",
            width: "500px",
          }}>
          MY COLLECTIONS
        </Box>

        <Box component="span" m={1} sx={{width: "100%", border: "1px solid #C2C8D0"}}></Box>
      </Box>

      <Box
        className="myCollections"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "column",
          width: "100%",
          maxWidth: "375px",
          minWidth: "280px",
          padding: "10px 10px",
          mt: "15px",
          mb: "8px",
          background: "#fff",
          boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.13)",
          borderRadius: "10px",
        }}>
        <Box sx={{display: "flex", justifyContent: "space-between"}}>
          <Box sx={{display: "flex", flexDirection: "column"}}>
            <Typography component="span" sx={{color: "#707070", fontWeight: "700"}}>
              My first car
            </Typography>
            <Typography component="span" sx={{fontSize: "11px", color: "#B6B6B6"}}>
              14 pictures | 32 comments
            </Typography>
          </Box>
          <Box sx={{display: "flex", alignItems: "center"}}>
            <LinkRouter to="/" className="no-underline">
              <Button
                sx={{
                  display: "flex",
                  alignItems: "center",
                  color: "#BD5252",
                  fontSize: "12px",
                  fontWeight: "600",
                  border: "1px solid #BD5252",
                  borderRadius: "100px",
                  height: "26px",
                  textTransform: "none",
                }}
                className="btn-viewCollection">
                View Collection
              </Button>
            </LinkRouter>
          </Box>
        </Box>

        <Box sx={{display: "flex", justifyContent: "space-around", mt: "10px"}} className="collection-images">
          <img src="image-1.jpg" alt="" />
          <img src="image-2.jpg" alt="" />
          <img src="image-3.jpg" alt="" />
          <img src="image-4.jpg" alt="" />
        </Box>
      </Box>
    </Grid>
  );
};
export default Group;
