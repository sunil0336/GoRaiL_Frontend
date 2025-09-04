import React, { useState } from "react";
import { useParams } from "react-router-dom";
import trains from "../data/trains";
import { Container, Typography, TextField, Button, Paper } from "@mui/material";

export default function Booking() {
  const { id } = useParams();
  const train = trains.find((t) => t.id.toString() === id);
  const [form, setForm] = useState({ name: "", age: "", seats: 1 });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleBooking = () =>
    alert(`✅ Ticket booked for ${form.name} on ${train.name}`);

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-10 col-lg-8">
            <Paper
              className="p-4 p-md-5 shadow rounded"
              sx={{ background: "rgba(53,56,57,0.95)", color: "white" }}
            >
              <Typography
                variant="h4"
                gutterBottom
                className="text-center"
                style={{ fontSize: "clamp(1.5rem, 3vw, 2.2rem)" }}
              >
                🎟️ Book Ticket
              </Typography>

              <Typography variant="h6" gutterBottom className="text-center">
                {train.name} | {train.from} → {train.to} | {train.time}
              </Typography>

              <Typography
                variant="subtitle1"
                gutterBottom
                className="text-center mb-4"
              >
                Price per seat: ₹{train.price}
              </Typography>

              <form>
                <div className="mb-3">
                  <TextField
                    fullWidth
                    label="Passenger Name"
                    name="name"
                    onChange={handleChange}
                    variant="outlined"
                    InputLabelProps={{ style: { color: "#ccc" } }}
                    sx={{
                      background: "white",
                      borderRadius: "8px",
                    }}
                  />
                </div>

                <div className="mb-3">
                  <TextField
                    fullWidth
                    label="Age"
                    name="age"
                    onChange={handleChange}
                    variant="outlined"
                    InputLabelProps={{ style: { color: "#ccc" } }}
                    sx={{
                      background: "white",
                      borderRadius: "8px",
                    }}
                  />
                </div>

                <div className="mb-3">
                  <TextField
                    fullWidth
                    label="Seats"
                    type="number"
                    name="seats"
                    onChange={handleChange}
                    variant="outlined"
                    InputLabelProps={{ style: { color: "#ccc" } }}
                    sx={{
                      background: "white",
                      borderRadius: "8px",
                    }}
                  />
                </div>

                <Button
                  fullWidth
                  variant="contained"
                  onClick={handleBooking}
                  sx={{
                    mt: 2,
                    background: "linear-gradient(90deg,#1976d2,#0d47a1)",
                  }}
                >
                  Confirm Booking
                </Button>
              </form>
            </Paper>
          </div>
        </div>
      </div>
    </Container>
  );
}
