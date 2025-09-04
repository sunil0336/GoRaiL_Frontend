import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate(); // ✅ now navigate works

  return (
    <AppBar
      position="fixed"
      color="primary"
      sx={{
        boxShadow: "none",
        fontWeight: "bold", // fixed text_bold issue
      }}
    >
      <Toolbar>
        <Typography variant="h5" sx={{ flexGrow: 1 }}>
          GoRaiL
        </Typography>

        <Button
          color="inherit"
          component={Link}
          to="/"
          sx={{ textTransform: "none" }}
        >
          Home
        </Button>
        <Button
          color="inherit"
          component={Link}
          to="/login"
          sx={{ textTransform: "none" }}
        >
          Login
        </Button>
        <Button
          color="inherit"
          component={Link}
          to="/register"
          sx={{ textTransform: "none" }}
        >
          Register
        </Button>
        <Button
          color="inherit"
          component={Link}
          to="/search"
          sx={{ textTransform: "none" }}
        >
          Search Trains
        </Button>

        {/* ✅ Fixed navigate call */}
        <Button
          color="inherit"
          onClick={() => navigate("/profile")}
          sx={{ textTransform: "none" }}
        >
          Profile
        </Button>
      </Toolbar>
    </AppBar>
  );
}
