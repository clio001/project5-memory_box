import * as React from "react";
import {Link as LinkRouter} from "react-router-dom";

import {AppBar, ListItemIcon, Box, Toolbar, IconButton, Typography, MenuItem, Menu, Badge, useScrollTrigger, Slide} from "@mui/material/";

import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import MoreIcon from "@mui/icons-material/MoreVert";

interface Props {
  children: React.ReactElement;
}

function HideOnScroll({children}: Props) {
  const trigger = useScrollTrigger({});
  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

const Appbar: React.FC = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}>
      <LinkRouter to="/my-account" style={{display: "flex", alignItems: "center", textDecoration: "none"}}>
        <MenuItem onClick={handleMenuClose}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          My Account
        </MenuItem>
      </LinkRouter>
      <LinkRouter to="/groups" style={{display: "flex", alignItems: "center", textDecoration: "none"}}>
        <MenuItem onClick={handleMenuClose}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Group
        </MenuItem>
      </LinkRouter>
      <MenuItem onClick={handleMenuClose}>
        <ListItemIcon>
          <Logout fontSize="small" />
        </ListItemIcon>
        Logout
      </MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}>
      {/* <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem> */}
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton size="large" aria-label="account of current user" aria-controls="primary-search-account-menu" aria-haspopup="true" color="inherit">
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{flexGrow: 1}}>
      <HideOnScroll>
        <AppBar
          sx={{
            backgroundColor: "#fff",
            color: "#818181",
            height: "64px",
            justifyContent: "center",
          }}>
          <Toolbar>
            <IconButton size="large" edge="start" color="inherit" aria-label="open drawer">
              <MenuIcon />
            </IconButton>
            <Box sx={{display: {xs: "block", sm: "none"}}}>
              <LinkRouter to="/" style={{textDecoration: "none"}}>
                <img
                  src="/logo-appbar.svg"
                  alt="MEMORYBOX by Alejandro and John"
                  style={{
                    width: "125px",
                    height: "28px",
                    marginTop: "5px",
                    marginLeft: "5px",
                  }}
                />
              </LinkRouter>
            </Box>
            <Typography variant="h6" noWrap component="div" sx={{display: {xs: "none", sm: "block"}}}>
              <Box>
                <LinkRouter to="/" style={{textDecoration: "none"}}>
                  <img
                    src="/logo-appbar.svg"
                    alt="MEMORYBOX by Alejandro and John"
                    style={{
                      width: "125px",
                      height: "28px",
                      marginTop: "10px",
                      marginLeft: "5px",
                    }}
                  />
                </LinkRouter>
              </Box>
            </Typography>
            {/* <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
              />
            </Search> */}
            <Box sx={{flexGrow: 1}} />
            <Box sx={{display: {xs: "none", sm: "flex"}}}>
              {/* <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                <Badge badgeContent={4} color="error">
                  <MailIcon />
                </Badge>
              </IconButton>
              <IconButton size="large" aria-label="show 17 new notifications" color="inherit">
                <Badge badgeContent={17} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton> */}
              <IconButton size="large" edge="end" aria-label="account of current user" aria-controls={menuId} aria-haspopup="true" onClick={handleProfileMenuOpen} color="inherit">
                <AccountCircle />
              </IconButton>
            </Box>
            <Box sx={{display: {xs: "flex", sm: "none"}}}>
              <IconButton size="large" aria-label="show more" aria-controls={mobileMenuId} aria-haspopup="true" onClick={handleMobileMenuOpen} color="inherit">
                <MoreIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
};

export default Appbar;
