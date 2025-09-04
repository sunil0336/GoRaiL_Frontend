import React from "react";
import { Card, CardContent, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import "../index.css";

export default function IndexPage() {
  return (
    <div className="video-background">
      {/* ✅ Background Video */}
      <video autoPlay loop muted playsInline>
        <source src="/videos/train3.mp4" type="video/mp4" />
      </video>

      {/* ✅ Responsive Overlay */}
      <div className="overlay d-flex justify-content-center align-items-center text-center p-3">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-md-8 col-lg-6">
              <Card
                sx={{
                  width: "100%",
                  p: { xs: 3, sm: 4, md: 6 }, // adaptive padding
                  textAlign: "center",
                  backgroundColor: "rgba(53, 56, 57, 0.95)",
                  color: "white",
                  borderRadius: "16px",
                  backdropFilter: "blur(6px)",
                  boxShadow: "0 8px 25px rgba(0,0,0,0.3)",
                  opacity: 0.9,
                  border: "2px solid white",
                }}
              >
                <CardContent>
                  <Typography
                    variant="h4"
                    gutterBottom
                    sx={{ fontSize: { xs: "1.8rem", md: "2.2rem" } }}
                  >
                    🚆 Welcome To GoRaiL 🚆
                  </Typography>
                  <Typography
                    variant="body1"
                    gutterBottom
                    sx={{ fontSize: { xs: "0.9rem", md: "1rem" } }}
                  >
                    Book your train tickets easily and quickly.
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    component={Link}
                    to="/Login"
                    sx={{
                      mt: 2,
                      px: { xs: 3, md: 5 },
                      py: { xs: 1, md: 1.5 },
                      fontSize: { xs: "0.9rem", md: "1rem" },
                    }}
                  >
                    Get Started
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
