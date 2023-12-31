import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
const NavBar = () => {
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="title" color="inherit">
            New York City Accident Data Visualiser
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};
export default NavBar;
