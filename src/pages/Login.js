import React, { useState } from "react";
import {
  Container,
  Paper,
  Box,
  Avatar,
  Typography,
  TextField,
  Button,
  Snackbar,
  Alert,
  InputAdornment,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [snack, setSnack] = useState({ open: false, severity: "info", message: "" });
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const closeSnack = () => setSnack({ ...snack, open: false });

  const validate = () => {
    if (!form.email.trim() || !form.password) {
      setSnack({ open: true, severity: "warning", message: "Please enter email and password." });
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    const existingUser = localStorage.getItem("user");
    if (existingUser) {
      if (!window.confirm("Another user is already logged in. Log out first?")) return;
      localStorage.removeItem("user");
    }

    if (!validate()) return;

    setLoading(true);

    try {
      const res = await fetch("https://your-backend.onrender.com/api/login, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email.trim(), password: form.password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("user", JSON.stringify(data));
        setSnack({
          open: true,
          severity: "success",
          message: `Welcome back, ${data.name}! Redirecting...`,
        });
        setTimeout(() => navigate("/search"), 1100);
      } else {
        let errorMsg = "Invalid credentials.";
        if (data.detail) {
          if (typeof data.detail === "string") errorMsg = data.detail;
          else if (Array.isArray(data.detail)) errorMsg = data.detail.map(e => e.msg).join(", ");
        }
        setSnack({ open: true, severity: "error", message: errorMsg });
      }
    } catch (err) {
      console.error(err);
      setSnack({ open: true, severity: "error", message: "Network error. Try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page container my-5">
      <div className="row justify-content-center">
        {/* Responsive column (12 on mobile, 8 on tablet, 6 on desktop) */}
        <div className="col-12 col-md-8 col-lg-6">
          <Container
            maxWidth="sm"
            sx={{
              minHeight: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
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
              <Box sx={{ textAlign: "center", mb: 2 }}>
                <Avatar sx={{ mx: "auto", bgcolor: "primary.main", width: 64, height: 64 }}>
                  <LockOutlinedIcon sx={{ fontSize: 36 }} />
                </Avatar>
                <Typography variant="h5" sx={{ mt: 1, fontWeight: 700, color: "white" }}>
                  Welcome
                </Typography>
                <Typography variant="body2" sx={{ mt: 1, color: "white", opacity: 0.8 }}>
                  Sign in to manage bookings and view your tickets.
                </Typography>
              </Box>

              <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
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
                />
                <TextField
                  fullWidth
                  label="Password"
                  name="password"
                  type="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Your password"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon sx={{ color: "blue" }} />
                      </InputAdornment>
                    ),
                    style: { color: "white" },
                  }}
                  InputLabelProps={{ style: { color: "white" } }}
                />
              </Box>

              <Typography variant="body2" align="center" sx={{ mt: 2, color: "white" }}>
                Don't have an account?{" "}
                <Button onClick={() => navigate("/register")} size="small" sx={{ color: "#90caf9" }}>
                  Register
                </Button>
              </Typography>
            </Paper>

            <Button
              variant="contained"
              size="large"
              onClick={handleSubmit}
              disabled={loading}
              sx={{ mt: 3, px: 8, py: 1.5, fontWeight: 700 }}
            >
              {loading ? "Signing in..." : "Sign In"}
            </Button>

            <Snackbar
              open={snack.open}
              autoHideDuration={3500}
              onClose={closeSnack}
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
              <Alert onClose={closeSnack} severity={snack.severity} variant="filled">
                {snack.message}
              </Alert>
            </Snackbar>
          </Container>
        </div>
      </div>
    </div>
  );
}
