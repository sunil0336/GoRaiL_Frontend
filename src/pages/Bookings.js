import React, { useEffect, useState } from "react";
import { Container, Paper, Typography, Divider } from "@mui/material";

export default function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [trains, setTrains] = useState({});
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user) return;

    const fetchBookings = async () => {
      try {
        const res = await fetch(`https://gorail-project.onrender.com/api/bookings/${user.id}`);
        if (!res.ok) return setBookings([]);
        const data = await res.json();
        setBookings(data);

        const trainIds = [...new Set(data.map((b) => b.train_id))];
        const trainsData = {};
        await Promise.all(
          trainIds.map(async (id) => {
            const trainRes = await fetch(`http://localhost:8000/api/trains/${id}`);
            if (trainRes.ok) trainsData[id] = await trainRes.json();
          })
        );
        setTrains(trainsData);
      } catch (err) {
        console.error("Error fetching bookings:", err);
      }
    };

    fetchBookings();
  }, [user]);

  return (
    <div className="auth-page">
      <Container
        maxWidth="md"
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          py: 5,
        }}
      >
        <Paper
          elevation={8}
          sx={{
            p: 4,
            borderRadius: 3,
            width: "100%",
            background: "rgba(53, 56, 57, 0.95)",
            border: "2px solid white",
            color: "white",
          }}
        >
          <Typography
            variant="h5"
            sx={{ mb: 4, fontWeight: 700, textAlign: "center" }}
          >
            My Bookings
          </Typography>

          {bookings.length === 0 ? (
            <Typography variant="body1" sx={{ textAlign: "center", color: "gray" }}>
              No bookings yet.
            </Typography>
          ) : (
            bookings.map((b, i) => {
              const train = trains[b.train_id];
              if (!train) return null;

              return (
                <Paper
                  key={i}
                  sx={{
                    p: 3,
                    mb: 3,
                    borderRadius: 2,
                    background: "rgba(255,255,255,0.08)",
                    border: "1px solid #444",
                    color: "white",
                  }}
                >
                  {/* Train Info */}
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                    🚆 {train.name}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 0.5 }}>
                    📍 <strong>Route:</strong> {train.from_station} → {train.to_station}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 0.5 }}>
                    ⏰ <strong>Time:</strong> {train.time}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    📅 <strong>Date:</strong> {new Date(train.date).toLocaleDateString()}
                  </Typography>

                  <Divider sx={{ borderColor: "#888", my: 1 }} />

                  {/* Passenger / Booking Info */}
                  <Typography variant="body1" sx={{ fontWeight: 600, mb: 0.5 }}>
                    👤 Passenger: {b.passenger_name}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 0.5 }}>
                    🎟 <strong>Seats:</strong> {b.seats}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 0.5 }}>
                    💰 <strong>Price per seat:</strong> ₹{b.booked_price}
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    🏷 <strong>Total Price:</strong> ₹{b.total_price}
                  </Typography>
                </Paper>
              );
            })
          )}
        </Paper>
      </Container>
    </div>
  );
}
