import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  // Listen for localStorage changes (cross-tab or same tab update)
  useEffect(() => {
    const handleStorageChange = () => {
      setUser(JSON.parse(localStorage.getItem("user")));
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <AppBar position="fixed" color="primary" sx={{ boxShadow: "none", fontWeight: "bold" }}>
      <Toolbar>
        <Typography variant="h5" sx={{ flexGrow: 1 }}>
          GoRaiL
        </Typography>

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
      </Toolbar>
    </AppBar>
  );
}
