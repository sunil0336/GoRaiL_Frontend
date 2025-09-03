import React from "react";
import { Card, CardContent, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import "../index.css";

export default function IndexPage() {
  return (
    <div className="video-background">
      {/* ✅ Use video from public folder */}
      <video autoPlay loop muted playsInline>
        <source src="/videos/train3.mp4" type="video/mp4" />
      </video>

      <div className="overlay">
        <Card
          sx={{
            maxWidth: 520,
            maxHeight: 320,
            p: 6,
            textAlign: "center",
            backgroundColor: "rgba(53, 56, 57, 0.95)",
            color : "white",
            borderRadius: "16px",
            backdropFilter: "blur(6px)",
            boxShadow: "0 8px 25px rgba(0,0,0,0.3)",
            opacity: 0.8,
            border: "2px solid white",
          }}
        >
          <CardContent>
            <Typography variant="h4" gutterBottom>
              🚆Welcome To GoRaiL🚆
            </Typography>
            <Typography variant="body1" gutterBottom>
              Book your train tickets easily and quickly.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to="/Login"
              sx={{ mt: 2 }}
              border= "2px solid white"
            >
              Get Started
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
