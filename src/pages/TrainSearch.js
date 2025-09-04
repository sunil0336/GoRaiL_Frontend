import React, { useState, useEffect } from "react";
import {
  Container, Typography, TextField, Table, TableBody, TableCell,
  TableHead, TableRow, Button, Paper, Select, MenuItem, FormControl, InputLabel, Chip
} from "@mui/material";
import { CheckCircle, Cancel, Train } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export default function TrainSearch() {
  const [search, setSearch] = useState("");
  const [timeFilter, setTimeFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [trains, setTrains] = useState([]);

  const navigate = useNavigate();

  // Fallback dummy data in case backend is down
  const dummyTrains = [];

  useEffect(() => {
    fetch("https://your-backend.onrender.com/api/trains)
      .then(res => res.json())
      .then(data => setTrains(data))
      .catch(() => setTrains(dummyTrains));
  }, []);

  const filteredTrains = trains.filter((t) => {
    const matchesSearch = t.name.toLowerCase().includes(search.toLowerCase()) ||
                          t.from_station.toLowerCase().includes(search.toLowerCase()) ||
                          t.to_station.toLowerCase().includes(search.toLowerCase());
    const matchesTime = timeFilter ? t.time.startsWith(timeFilter) : true;
    const matchesType = typeFilter ? t.train_type === typeFilter : true;
    return matchesSearch && matchesTime && matchesType;
  });

  return (
    <div className="auth-page">
      <Container fluid="true" className="mt-4">
        {/* Title */}
        <Typography variant="h4" gutterBottom className="d-flex align-items-center gap-2 text-center text-md-start">
          <Train /> Search Trains
        </Typography>

        {/* Search and Filters in responsive grid */}
        <div className="row g-3">
          <div className="col-12 col-md-6">
            <TextField
              fullWidth
              label="Search by Train Name or Station"
              variant="outlined"
              sx={{
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "#353935",
                  color: "white",
                  opacity: 0.8,
                  border: "2px solid white",
                  "& fieldset": { borderColor: "white" },
                  "&:hover fieldset": { borderColor: "#aaa" },
                  "&.Mui-focused fieldset": { borderColor: "white" },
                },
                "& .MuiInputLabel-root": { color: "white" },
                "& .MuiInputLabel-root.Mui-focused": { color: "white" },
              }}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="col-6 col-md-3">
            <FormControl fullWidth
              sx={{
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "#353935",
                  color: "white",
                  opacity: 0.8,
                  border: "2px solid white",
                  "& fieldset": { borderColor: "white" },
                  "&:hover fieldset": { borderColor: "#aaa" },
                  "&.Mui-focused fieldset": { borderColor: "white" },
                },
                "& .MuiInputLabel-root": { color: "white" },
                "& .MuiInputLabel-root.Mui-focused": { color: "white" },
              }}
            >
              <InputLabel>Time Slot</InputLabel>
              <Select value={timeFilter} onChange={(e) => setTimeFilter(e.target.value)}>
                <MenuItem value="">All</MenuItem>
                <MenuItem value="08">Morning (08:00)</MenuItem>
                <MenuItem value="12">Afternoon (12:00)</MenuItem>
                <MenuItem value="16">Evening (16:00)</MenuItem>
              </Select>
            </FormControl>
          </div>

          <div className="col-6 col-md-3">
            <FormControl fullWidth
              sx={{
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "#353935",
                  color: "white",
                  opacity: 0.8,
                  border: "2px solid white",
                  "& fieldset": { borderColor: "white" },
                  "&:hover fieldset": { borderColor: "#aaa" },
                  "&.Mui-focused fieldset": { borderColor: "white" },
                },
                "& .MuiInputLabel-root": { color: "white" },
                "& .MuiInputLabel-root.Mui-focused": { color: "white" },
              }}
            >
              <InputLabel>Train Type</InputLabel>
              <Select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
                <MenuItem value="">All</MenuItem>
                <MenuItem value="Local">Local</MenuItem>
                <MenuItem value="Rapid">Rapid</MenuItem>
                <MenuItem value="Express">Express</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>

        {/* Responsive Table */}
        <div className="table-responsive mt-4">
          <Paper sx={{ borderRadius: 2, overflow: "hidden" }}>
            <Table>
              <TableHead sx={{ backgroundColor: "#1976d2", border: "2px solid black" }}>
                <TableRow>
                  <TableCell sx={{ color: "white" }}>Train Name</TableCell>
                  <TableCell sx={{ color: "white" }}>From</TableCell>
                  <TableCell sx={{ color: "white" }}>To</TableCell>
                  <TableCell sx={{ color: "white" }}>Time</TableCell>
                  <TableCell sx={{ color: "white" }}>Type</TableCell>
                  <TableCell sx={{ color: "white" }}>Price</TableCell>
                  <TableCell sx={{ color: "white" }}>Status</TableCell>
                  <TableCell sx={{ color: "white" }}>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredTrains.map((train) => (
                  <TableRow
                    key={train.id}
                    sx={{
                      backgroundColor: train.available ? "#e8f5e9" : "#ffebee",
                      border: "2px solid black",
                    }}
                  >
                    <TableCell>{train.name}</TableCell>
                    <TableCell>{train.from_station}</TableCell>
                    <TableCell>{train.to_station}</TableCell>
                    <TableCell>{train.time}</TableCell>
                    <TableCell>
                      <Chip
                        label={train.train_type}
                        color={train.type === "First Class" ? "primary" : "secondary"}
                      />
                    </TableCell>
                    <TableCell>₹{train.price}</TableCell>
                    <TableCell>
                      {train.available ? (
                        <CheckCircle sx={{ color: "green" }} />
                      ) : (
                        <Cancel sx={{ color: "red" }} />
                      )}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="primary"
                        disabled={!train.available}
                        onClick={() => {
                          const user = JSON.parse(localStorage.getItem("user"));
                          if (!user) {
                            alert("⚠️ Please login first to book tickets!");
                            navigate("/login");
                            return;
                          }
                          navigate("/payment", { state: { train } });
                        }}
                      >
                        Book Ticket
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </div>
      </Container>
    </div>
  );
}
