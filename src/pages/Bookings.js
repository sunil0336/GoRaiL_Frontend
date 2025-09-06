import React, { useEffect, useState } from "react";
import { Container, Paper, Typography, Divider } from "@mui/material";

export default function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [trains, setTrains] = useState({});
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);

  useEffect(() => {
    if (!user) return;

    const fetchBookings = async () => {
      try {
        const BASE_URL = "https://gorail-project.onrender.com/api";

        const res = await fetch(`${BASE_URL}/bookings/${user.id}`);
        if (!res.ok) return setBookings([]);
        const data = await res.json();
        setBookings(data);

        const trainIds = [...new Set(data.map((b) => b.train_id))];
        const trainsData = {};
        await Promise.all(
          trainIds.map(async (id) => {
            const trainRes = await fetch(`${BASE_URL}/trains/${id}`);
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
    <div
      style={{
        minHeight: "100vh",
        backgroundImage: "url('/src/train2.jpg')", // <-- your image path
        backgroundSize: "cover",
        backgroundPosition: "center",
        paddingTop: "80px", // to avoid navbar overlap if fixed
      }}
    >
      <Container maxWidth="md" sx={{ py: 5 }}>
        <Paper sx={{ p: 4, borderRadius: 3, background: "rgba(53, 56, 57, 0.85)" }}>
          <Typography
            variant="h5"
            sx={{ mb: 4, textAlign: "center", fontWeight: 700, color: "white" }}
          >
            My Bookings
          </Typography>

          {bookings.length === 0 ? (
            <Typography sx={{ textAlign: "center", color: "gray" }}>
              No bookings yet.
            </Typography>
          ) : (
            bookings.map((b, i) => {
              const train = trains[b.train_id];
              if (!train) {
                return (
                  <Paper
                    key={i}
                    sx={{ p: 3, mb: 3, borderRadius: 2, background: "rgba(0,0,0,0.5)" }}
                  >
                    <Typography sx={{ color: "white" }}>Loading train info...</Typography>
                  </Paper>
                );
              }

              return (
                <Paper
                  key={i}
                  sx={{ p: 3, mb: 3, borderRadius: 2, background: "rgba(0,0,0,0.5)" }}
                >
                  <Typography variant="h6" sx={{ mb: 1, color: "white" }}>
                    🚆 {train.name}
                  </Typography>
                  <Typography sx={{ color: "white" }}>
                    📍 Route: {train.from_station} → {train.to_station}
                  </Typography>
                  <Typography sx={{ color: "white" }}>⏰ Time: {train.time}</Typography>
                  <Typography sx={{ color: "white" }}>
                    📅 Date: {new Date(train.date).toLocaleDateString()}
                  </Typography>

                  <Divider sx={{ my: 1, borderColor: "#888" }} />

                  <Typography sx={{ color: "white" }}>
                    👤 Passenger: {b.passenger_name}
                  </Typography>
                  <Typography sx={{ color: "white" }}>🎟 Seats: {b.seats}</Typography>
                  <Typography sx={{ color: "white" }}>
                    💰 Price per seat: ₹{b.booked_price}
                  </Typography>
                  <Typography sx={{ color: "white", fontWeight: 600 }}>
                    🏷 Total Price: ₹{b.total_price}
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
