import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Snackbar,
  Alert,
  RadioGroup,
  FormControlLabel,
  Radio,
  InputAdornment,
  Box,
} from "@mui/material";

import PersonIcon from "@mui/icons-material/Person";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LockIcon from "@mui/icons-material/Lock";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import WcIcon from "@mui/icons-material/Wc";

import { useNavigate } from "react-router-dom";
import "../style.css";

export default function Register() {
  const [form, setForm] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    dob: "",
    gender: "",
  });

  const [loading, setLoading] = useState(false);
  const [snack, setSnack] = useState({
    open: false,
    severity: "success",
    message: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });
  const handleCloseSnack = () => setSnack({ ...snack, open: false });

  const validateForm = () => {
    if (
      !form.fullName ||
      !form.username ||
      !form.email ||
      !form.password ||
      !form.confirmPassword ||
      !form.phone ||
      !form.dob ||
      !form.gender
    ) {
      setSnack({
        open: true,
        severity: "error",
        message: "Please fill in all fields.",
      });
      return false;
    }
    if (form.password !== form.confirmPassword) {
      setSnack({
        open: true,
        severity: "error",
        message: "Passwords do not match.",
      });
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    const payload = {
      full_name: form.fullName,
      username: form.username,
      email: form.email,
      password: form.password,
      phone: form.phone,
      dob: form.dob,
      gender: form.gender,
    };
    setLoading(true);
    try {
      const res = await fetch("https://your-backend.onrender.com/api/register, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok) {
        setSnack({
          open: true,
          severity: "success",
          message: "🎉 Registered successfully! Redirecting to login...",
        });
        setTimeout(() => navigate("/login"), 2000);
      } else {
        let errorMessage = "Registration failed.";
        if (Array.isArray(data.detail)) {
          errorMessage = data.detail.map((err) => err.msg).join(", ");
        } else if (typeof data.detail === "string") {
          errorMessage = data.detail;
        }
        setSnack({ open: true, severity: "error", message: errorMessage });
      }
    } catch (err) {
      console.error(err);
      setSnack({
        open: true,
        severity: "error",
        message: "Network error. Try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Bootstrap Import */}
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
      />

      <div className="auth-page">
        <Container
          maxWidth="sm"
          sx={{
            mt: 6,
            mb: 6,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Paper
            sx={{
              p: 4,
              borderRadius: 3,
              boxShadow: "0px 4px 20px rgba(0,0,0,0.7)",
              width: "100%",
              background: "linear-gradient(145deg, #353839, #353839)",
              color: "white",
              opacity: 0.9,
              border: "2px solid white",
            }}
          >
            <Typography
              variant="h4"
              gutterBottom
              fontWeight="bold"
              textAlign="center"
            >
              Registration Form
            </Typography>
            <Typography
              variant="body1"
              color="white"
              textAlign="center"
              sx={{ mb: 3 }}
            >
              Please provide accurate details to ensure smooth booking and travel.
            </Typography>

            {/* Responsive form with Bootstrap grid */}
            <div className="row g-3">
              <div className="col-12 col-md-6">
                <TextField
                  fullWidth
                  label="Full Name"
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  placeholder="e.g. Ramesh Kumar"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonIcon sx={{ color: "blue" }} />
                      </InputAdornment>
                    ),
                    style: { color: "white" },
                  }}
                  InputLabelProps={{ style: { color: "white" } }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { borderColor: "white" },
                      "&:hover fieldset": { borderColor: "white" },
                      "&.Mui-focused fieldset": { borderColor: "white" },
                    },
                  }}
                />
              </div>

              <div className="col-12 col-md-6">
                <TextField
                  fullWidth
                  label="Username"
                  name="username"
                  value={form.username}
                  onChange={handleChange}
                  placeholder="Choose a unique username"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountCircleIcon sx={{ color: "blue" }} />
                      </InputAdornment>
                    ),
                    style: { color: "white" },
                  }}
                  InputLabelProps={{ style: { color: "white" } }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { borderColor: "white" },
                      "&:hover fieldset": { borderColor: "white" },
                      "&.Mui-focused fieldset": { borderColor: "white" },
                    },
                  }}
                />
              </div>

              <div className="col-12 col-md-6">
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon sx={{ color: "blue" }} />
                      </InputAdornment>
                    ),
                    style: { color: "white" },
                  }}
                  InputLabelProps={{ style: { color: "white" } }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { borderColor: "white" },
                      "&:hover fieldset": { borderColor: "white" },
                      "&.Mui-focused fieldset": { borderColor: "white" },
                    },
                  }}
                />
              </div>

              <div className="col-12 col-md-6">
                <TextField
                  fullWidth
                  label="Phone Number"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="10-digit mobile number"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PhoneIcon sx={{ color: "blue" }} />
                      </InputAdornment>
                    ),
                    style: { color: "white" },
                  }}
                  InputLabelProps={{ style: { color: "white" } }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { borderColor: "white" },
                      "&:hover fieldset": { borderColor: "white" },
                      "&.Mui-focused fieldset": { borderColor: "white" },
                    },
                  }}
                />
              </div>

              <div className="col-12 col-md-6">
                <TextField
                  fullWidth
                  type="password"
                  label="Password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Enter a strong password"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon sx={{ color: "blue" }} />
                      </InputAdornment>
                    ),
                    style: { color: "white" },
                  }}
                  InputLabelProps={{ style: { color: "white" } }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { borderColor: "white" },
                      "&:hover fieldset": { borderColor: "white" },
                      "&.Mui-focused fieldset": { borderColor: "white" },
                    },
                  }}
                />
              </div>

              <div className="col-12 col-md-6">
                <TextField
                  fullWidth
                  type="password"
                  label="Confirm Password"
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  placeholder="Re-enter password"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon sx={{ color: "blue" }} />
                      </InputAdornment>
                    ),
                    style: { color: "white" },
                  }}
                  InputLabelProps={{ style: { color: "white" } }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { borderColor: "white" },
                      "&:hover fieldset": { borderColor: "white" },
                      "&.Mui-focused fieldset": { borderColor: "white" },
                    },
                  }}
                />
              </div>

              <div className="col-12 col-md-6">
                <TextField
                  fullWidth
                  type="date"
                  label="Date of Birth"
                  name="dob"
                  value={form.dob}
                  onChange={handleChange}
                  InputLabelProps={{ shrink: true, style: { color: "white" } }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <CalendarTodayIcon sx={{ color: "blue" }} />
                      </InputAdornment>
                    ),
                    style: { color: "grey" },
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { borderColor: "white" },
                      "&:hover fieldset": { borderColor: "white" },
                      "&.Mui-focused fieldset": { borderColor: "white" },
                    },
                  }}
                />
              </div>

              <div className="col-12 col-md-6">
                <Typography
                  variant="subtitle1"
                  sx={{ mb: 1, display: "flex", alignItems: "center" }}
                >
                  <WcIcon color="primary" sx={{ mr: 1 }} /> Gender
                </Typography>
                <RadioGroup
                  row
                  name="gender"
                  value={form.gender}
                  onChange={handleChange}
                >
                  <FormControlLabel value="Male" control={<Radio />} label="Male" />
                  <FormControlLabel value="Female" control={<Radio />} label="Female" />
                  <FormControlLabel value="Other" control={<Radio />} label="Other" />
                </RadioGroup>
              </div>
            </div>
          </Paper>

          {/* Button outside card */}
          <Box textAlign="center" mt={3}>
            <Button
              variant="contained"
              size="large"
              onClick={handleSubmit}
              disabled={loading}
              sx={{
                px: 5,
                py: 1.5,
                fontSize: "1rem",
                borderRadius: 2,
                background: "linear-gradient(90deg, #1976d2, #0d47a1)",
                boxShadow: 4,
                border: "2px solid white",
              }}
            >
              {loading ? "Registering..." : "Submit"}
            </Button>
          </Box>

          <Snackbar
            open={snack.open}
            autoHideDuration={4000}
            onClose={handleCloseSnack}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
          >
            <Alert
              onClose={handleCloseSnack}
              severity={snack.severity}
              variant="filled"
              sx={{ width: "100%", fontSize: "1rem" }}
            >
              {snack.message}
            </Alert>
          </Snackbar>
        </Container>
      </div>
    </>
  );
}
