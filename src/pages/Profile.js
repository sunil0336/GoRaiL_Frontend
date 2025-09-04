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
    <div className="auth-page container-fluid d-flex justify-content-center align-items-center p-3">
      <style>{`
        .auth-page {
          background: url("/profilebg.jpg") no-repeat center center fixed;
          background-size: cover;
          min-height: 100vh;
        }
      `}</style>

      <Container maxWidth="sm">
        <div className="row justify-content-center">
          <div className="col-12 col-md-10">
            <Paper
              className="p-4 text-center"
              sx={{
                borderRadius: 3,
                background: "rgba(53,56,57,0.95)",
                color: "white",
                border: "2px solid white",
              }}
            >
              <Typography variant="h5" gutterBottom>
                👤 User Profile
              </Typography>
              <div className="text-start mt-3">
                <Typography>Email: {user.email}</Typography>
                <Typography>Username: {user.username}</Typography>
                <Typography>Full Name: {user.full_name}</Typography>
              </div>

              <div className="d-grid mt-4">
                <Button
                  variant="contained"
                  sx={{
                    background: "linear-gradient(90deg,#1976d2,#0d47a1)",
                    fontWeight: "bold",
                  }}
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </div>
            </Paper>
          </div>
        </div>
      </Container>
    </div>
  );
}
