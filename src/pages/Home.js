import React from "react";
import { useNavigate } from "react-router-dom";
import "../index.css";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-page">
      <div className="home-container">
        <h1>🚆 Railway Ticket Booking</h1>
        <h2>Your trusted platform for seamless train reservations</h2>
        <button onClick={() => navigate("/login")}>Get Started</button>
      </div>
    </div>
  );
}
