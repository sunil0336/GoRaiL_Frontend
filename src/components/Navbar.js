import React from "react";
import { AppBar, Toolbar, Typography, Button, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <AppBar
      position="fixed"
      color="primary"
      sx={{
        boxShadow: "none",
        fontWeight: "bold",
      }}
    >
      <Toolbar className="container-fluid d-flex justify-content-between">
        {/* ✅ Brand Name */}
        <Typography
          variant="h5"
          sx={{ cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          GoRaiL
        </Typography>

        {/* ✅ Bootstrap responsive collapse */}
        <div className="d-none d-md-flex">
          <Button color="inherit" component={Link} to="/" sx={{ textTransform: "none" }}>
            Home
          </Button>
          <Button color="inherit" component={Link} to="/login" sx={{ textTransform: "none" }}>
            Login
          </Button>
          <Button color="inherit" component={Link} to="/register" sx={{ textTransform: "none" }}>
            Register
          </Button>
          <Button color="inherit" component={Link} to="/search" sx={{ textTransform: "none" }}>
            Search Trains
          </Button>
          <Button
            color="inherit"
            onClick={() => navigate("/profile")}
            sx={{ textTransform: "none" }}
          >
            Profile
          </Button>
        </div>

        {/* ✅ Mobile menu icon (only visible on small screens) */}
        <div className="d-md-none">
          <IconButton color="inherit" onClick={() => navigate("/menu")}>
            <MenuIcon />
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
}
