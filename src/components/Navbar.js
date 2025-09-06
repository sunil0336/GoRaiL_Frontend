import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <AppBar position="fixed" color="primary" sx={{ boxShadow: "none", fontWeight: "bold" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Logo */}
        <Typography variant="h5">GoRaiL</Typography>

        {/* Menu buttons */}
        <Box sx={{ display: "flex", gap: 2 }}>
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
          <Button color="inherit" component={Link} to="/bookings" sx={{ textTransform: "none" }}>
            Bookings
          </Button>
          <Button color="inherit" component={Link} to="/profile" sx={{ textTransform: "none" }}>
            Profile
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
