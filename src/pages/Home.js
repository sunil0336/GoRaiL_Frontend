import React from "react";
import { useNavigate } from "react-router-dom";
import "../index.css";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-page d-flex align-items-center justify-content-center text-center">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-10 col-lg-8">
            <div className="home-container p-4 p-md-5 rounded shadow">
              <h1 className="mb-3" style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)" }}>
                🚆 Railway Ticket Booking
              </h1>
              <h2
                className="mb-4"
                style={{ fontSize: "clamp(1rem, 2.5vw, 1.5rem)", fontWeight: "400" }}
              >
                Your trusted platform for seamless train reservations
              </h2>
              <button
                className="btn btn-primary px-4 py-2"
                style={{ fontSize: "1rem", borderRadius: "8px" }}
                onClick={() => navigate("/login")}
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
