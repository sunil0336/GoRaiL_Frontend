import React, { useState } from "react";
import { useParams } from "react-router-dom";
import trains from "../data/trains";
import { Container, Typography, TextField, Button, Paper, Grid } from "@mui/material";

export default function Booking() {
  const { id } = useParams();
  const train = trains.find((t) => t.id.toString() === id);
  const [form, setForm] = useState({ name: "", age: "", seats: 1 });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleBooking = () => alert(`Ticket booked for ${form.name} on ${train.name}`);

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>Book Ticket</Typography>
        <Typography variant="h6" gutterBottom>
          {train.name} | {train.from} → {train.to} | {train.time}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>Price per seat: ₹{train.price}</Typography>

        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={12}>
            <TextField fullWidth label="Passenger Name" name="name" onChange={handleChange} />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth label="Age" name="age" onChange={handleChange} />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth label="Seats" type="number" name="seats" onChange={handleChange} />
          </Grid>
          <Grid item xs={12}>
            <Button fullWidth variant="contained" onClick={handleBooking}>Confirm Booking</Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}
