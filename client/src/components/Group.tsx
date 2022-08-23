import React from "react";
import {Link as LinkRouter} from "react-router-dom";
import {useQuery, gql} from "@apollo/client";
import {Grid, Box, Typography, IconButton, Button, Avatar} from "@mui/material";
import LocalPoliceOutlinedIcon from "@mui/icons-material/LocalPoliceOutlined";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import {UserContext} from "../context/UserContext";

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';



const GroupList: React.FC = () => {
  const {user, setUser} = React.useContext(UserContext);
  console.log(user);


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
          background: `#f6f6f6 url(${user?.banner_url ? user?.banner_url : "./profile-bg.jpg"}) center center/cover no-repeat`,
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
            src={user?.avatar_url ? user?.avatar_url : "./profile.svg"}
            alt="profile img"
            style={{
              borderRadius: "10px",
              width: "150px",
              boxShadow: "0 0 0px 5px #b5b5b5",
            }}
          />
        </Box>
      </Box>

		<Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', maxWidth: '395px', minWidth: '320px'}}>
			<Box>
				<Typography variant="h1" sx={{fontSize:'30px'}}>East Berlin Group</Typography>
			</Box>
			<Box>
				<IconButton aria-label="delete" size="medium" sx={{background: '#f1f1f1'}}>
					<AddIcon fontSize="inherit"  />
				</IconButton>
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
			 mb: "10px"
        }}>
        <Box component="span"  sx={{width: "100%", border: "1px solid #C2C8D0"}}></Box>

      </Box>

		<Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', maxWidth: '395px', minWidth: '320px',height: "31px", background: "#F4F6FC ", borderRadius: "100px", p: "10px"}}>
			<Box sx={{display: 'flex', alignItems: 'center'}}>
				<Avatar alt="Remy Sharp" src="https://mui.com/static/images/avatar/1.jpg" sx={{width: "33px",height: "33px",mr: "5px"}} />
				<Avatar alt="Travis Howard" src="https://mui.com/static/images/avatar/2.jpg" sx={{width: "33px",height: "33px",mr: "5px"}} />
				<Avatar alt="Cindy Baker" src="https://mui.com/static/images/avatar/3.jpg" sx={{width: "33px",height: "33px",mr: "5px"}} />
			</Box>
			<Box>
				<Button variant="contained" disableElevation size="small" sx={{borderRadius: '100px'}}>
					Join
				</Button>
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
          COLLECTIONS
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
          mt: "10px",
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
				<IconButton aria-label="delete" size="small" sx={{background: '#f1f1f1', mr: '5px'}}>
					<FavoriteBorderIcon fontSize="inherit"  />
				</IconButton>
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
                Open
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
export default GroupList;

// <Box>
//   <div>
//     {data &&
//       data?.users.map((param: any) => (
//         <div key={param.id}>
//           <h2>{param.firstName}</h2>
//         </div>
//       ))}
//   </div>
// </Box>;