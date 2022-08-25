import React from "react";
import {Link as LinkRouter, Navigate, useNavigate} from "react-router-dom";
import {useQuery, gql} from "@apollo/client";
import {Grid, Box, Typography, IconButton, Button, Avatar} from "@mui/material";
import LocalPoliceOutlinedIcon from "@mui/icons-material/LocalPoliceOutlined";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import {UserContext} from "../context/UserContext";


import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';



const GroupList: React.FC = () => {
    const {user, setUser} = React.useContext(UserContext);
const navigate = useNavigate()

// const handleOpen = (e: any) => {
// 	item({
// 		variables: {
// 			id: user?._id,
// 		}
// 	}
// }

	 
  

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
          background: `#f6f6f6 url(${user && user?.groups[0].banner_url ? user?.groups[0].banner_url : "./profile-bg.jpg"}) center center/cover no-repeat`,
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
            src={user && user?.groups[0].avatar_url ? user?.groups[0].avatar_url : "./profile.svg"}
            alt="profile img"
            style={{
              borderRadius: "10px",
              width: "150px",
				  height: "150px",
              boxShadow: "0 0 0px 5px #b5b5b5",
            }}
          />
        </Box>
      </Box>

		<Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', maxWidth: '395px', minWidth: '320px'}}>
			<Box>
				<Typography variant="h1" sx={{fontSize:'30px'}}>
				{user && user?.groups[0].name}
				
				</Typography>
			</Box>
			<Box>
				<IconButton aria-label="delete" size="medium" sx={{background: '#f1f1f1'}}>
					<AddIcon fontSize="inherit"  />
				</IconButton>
			</Box>
		</Box>




		<Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', maxWidth: '395px', minWidth: '320px',height: "31px", background: "#F4F6FC ", borderRadius: "100px", p: "10px", mt: "15px"}}>
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

		<Box sx={{display: 'flex', alignItems: 'center', width: '100%', maxWidth: '395px', minWidth: '320px', mt: "10px"}}>
			<Box sx={{display: 'flex'}}><Avatar alt="Remy Sharp" src={user && user?.avatar_url ? user?.avatar_url : "./profile.svg"} sx={{width: "20px",height: "20px",mr: "5px"}} />
			<Box>
				<Typography component="p" sx={{fontSize: '13px'}}>Admin · May 22</Typography>
			</Box>
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


			<Box sx={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "column",
          width: "100%",
          maxWidth: "375px",
          minWidth: "280px",

        }}>
				{user && user?.groups[0].items.map((element2: any, i: string) => 
					{return <Box
					className="myCollections" key={i}
					sx={{
						display: "flex",
						justifyContent: "space-between",
						flexDirection: "column",
						padding: "10px 10px",
						mt: "10px",
						mb: "8px",
						background: "#fff",
						boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.13)",
						borderRadius: "10px",
					}}>
					<Box sx={{display: "flex", justifyContent: "space-between"}}>
						<Box className="collection-images">
							<a href="./collections">
								<img src={element2.file_url} alt={element2.title} width="150px" height="100px"  />
							</a>
						</Box>
						<Box sx={{pl: "10px"}}>
							<Typography component="p">{element2.title}</Typography>
							<Typography component="p" sx={{fontSize: "12px"}}>{element2.description}</Typography>
							<LinkRouter  to="/item" state={{ element2 }}>
								<Button
								variant="contained"
								size="large"
								disableElevation
								className="buttons"
								type="submit"
								sx={{
									width: "130px",
									height: "26px",
									fontSize: "12px!important",
								}}
								// onClick={() => navigate("/items", {state: element2})}
								>
								Open Item
								</Button>
							</LinkRouter>
						</Box>
					</Box>
					</Box>
				})}
			</Box>
      
    </Grid>
  );
};
export default GroupList;
