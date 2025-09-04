import React from "react";
import { Container, Paper, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    navigate("/login");
    return null;
  }

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="auth-page">
      <Container maxWidth="sm" sx={{ mt: 5 }}>
        <Paper sx={{ p: 4, borderRadius: 3, textAlign: "center", background: "rgba(53,56,57,0.95)", color: "white" ,border: "2px solid white" }}>
          <Typography variant="h5" gutterBottom>
            👤 User Profile
          </Typography>
          <Typography>Email: {user.email}</Typography>
          <Typography>Username: {user.username}</Typography>
          <Typography>Full Name: {user.full_name}</Typography>
          
          <Button
            variant="contained"
            sx={{ mt: 3, background: "linear-gradient(90deg,#1976d2,#0d47a1)" }}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Paper>
      </Container>
    </div>
  );
}
