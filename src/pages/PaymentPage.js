import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
  Paper,
  Snackbar,
  Alert,
} from "@mui/material";
import axios from "axios";

export default function PaymentPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const train = location.state?.train;

  const [passengerName, setPassengerName] = useState("");
  const [seats, setSeats] = useState(1);
  const [totalPrice, setTotalPrice] = useState(train?.price || 0);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [snack, setSnack] = useState({
    open: false,
    severity: "error",
    message: "",
  });
  const paymentSubmitted = useRef(false);
  const [processing, setProcessing] = useState(false);

  const closeSnack = () => setSnack({ ...snack, open: false });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) navigate("/login");
    else setEmail(user.email);
  }, [navigate]);

  if (!train) return <Typography>No Train Info Found</Typography>;

  const handleSeatChange = (e) => {
    const seatCount = Number(e.target.value);
    setSeats(seatCount);
    setTotalPrice(seatCount * train.price);
  };

  const validate = () => {
    if (!passengerName.trim() || passengerName.length < 2) {
      setSnack({
        open: true,
        severity: "warning",
        message: "Passenger name must be at least 2 characters.",
      });
      return false;
    }
    if (!email.trim()) {
      setSnack({
        open: true,
        severity: "warning",
        message: "Email is required.",
      });
      return false;
    }
    if (!phone.trim() || !/^\d{10}$/.test(phone)) {
      setSnack({
        open: true,
        severity: "warning",
        message: "Phone number must be exactly 10 digits.",
      });
      return false;
    }
    if (!seats || seats < 1) {
      setSnack({
        open: true,
        severity: "warning",
        message: "Seats must be at least 1.",
      });
      return false;
    }
    return true;
  };

  const handlePayment = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) return navigate("/login");
    if (!validate()) return;
    if (paymentSubmitted.current) return;

    paymentSubmitted.current = true;
    setProcessing(true);

    const options = {
      key: "rzp_test_82K1eUDvrHocUu",
      amount: totalPrice * 100,
      currency: "INR",
      name: "GoRaiL",
      description: `Booking for ${train.name}`,
      handler: async function (response) {
        try {
          const receipt = {
            passengerName,
            email,
            phone,
            seats,
            totalPrice,
            train,
            paymentId: response.razorpay_payment_id,
            date: new Date().toLocaleString(),
          };

          await axios.post("https://your-backend.onrender.com/api/book, {
            user_id: user.id,
            train_id: train.id,
            passenger_name: passengerName,
            seats,
            payment_id: receipt.paymentId,
            notes: "Paid via Razorpay",
          });

          navigate("/receipt", { state: { receipt } });
        } catch (err) {
          console.error("Booking failed:", err.response?.data || err);
          setSnack({
            open: true,
            severity: "error",
            message: "Booking failed. Try again.",
          });
          paymentSubmitted.current = false;
        }
      },
      prefill: { name: passengerName, email, contact: phone },
      theme: { color: "#1976d2" },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const isFormValid =
    passengerName.trim().length >= 2 &&
    /^\d{10}$/.test(phone) &&
    seats >= 1 &&
    !processing;

  return (
    <div className="payment-page container-fluid d-flex justify-content-center align-items-center p-3">
      <style>{`
        .payment-page {
          background: url("/pay.jpg") no-repeat center center fixed;
          background-size: cover;
          min-height: 100vh;
        }
        .MuiDialog-paper {
          border-radius: 18px !important;
          background: rgba(57, 54, 53, 0.8) !important;
          backdrop-filter: blur(12px) saturate(180%) !important;
          box-shadow: 0 12px 35px rgba(0,0,0,0.3) !important;
          border: 2px solid white !important;
          overflow: hidden;
          opacity: 0.95;
        }
        .MuiDialogTitle-root {
          font-weight: bold;
          text-align: center;
          font-size: 1.2rem !important;
          background: linear-gradient(45deg, #ff9800, #ffc107);
          color: white !important;
          padding: 14px 0 !important;
          letter-spacing: 0.5px;
        }
        .receipt-box {
          border-radius: 12px;
          background: rgba(245, 245, 245, 0.9);
          padding: 16px;
          text-align: center;
        }
      `}</style>

      <Dialog
        open
        fullWidth
        maxWidth="sm"
        BackdropProps={{ sx: { backgroundColor: "transparent" } }}
      >
        <DialogTitle>🚆 Payment for {train.name}</DialogTitle>
        <DialogContent dividers>
          <div className="container">
            <div className="row text-center mb-3">
              <div className="col-12">
                <Typography variant="subtitle1">
                  {train.from_station} → {train.to_station} at {train.time}
                </Typography>
                <Typography variant="subtitle2">
                  💺 Price per Seat: ₹{train.price}
                </Typography>
              </div>
            </div>

            <div className="row">
              <div className="col-12 col-md-6 mb-3">
                <TextField
                  fullWidth
                  label="Passenger Name"
                  value={passengerName}
                  onChange={(e) => setPassengerName(e.target.value)}
                  required
                  InputProps={{ style: { color: "white" } }}
                  InputLabelProps={{ style: { color: "white" } }}
                />
              </div>

              <div className="col-12 col-md-6 mb-3">
                <TextField
                  fullWidth
                  label="Phone Number"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  inputProps={{ maxLength: 10, pattern: "\\d{10}" }}
                  InputProps={{ style: { color: "white" } }}
                  InputLabelProps={{ style: { color: "white" } }}
                />
              </div>

              <div className="col-12 col-md-6 mb-3">
                <TextField
                  fullWidth
                  label="Email (from login)"
                  type="email"
                  value={email}
                  disabled
                  required
                  InputProps={{ style: { color: "white" } }}
                  InputLabelProps={{ style: { color: "white" } }}
                />
              </div>

              <div className="col-12 col-md-6 mb-3">
                <TextField
                  fullWidth
                  label="Seats"
                  type="number"
                  value={seats}
                  onChange={handleSeatChange}
                  required
                  inputProps={{ min: 1 }}
                  InputProps={{ style: { color: "white" } }}
                  InputLabelProps={{ style: { color: "white" } }}
                />
              </div>
            </div>

            <Paper className="receipt-box mt-3">
              <Typography variant="h6">Total Price: ₹{totalPrice}</Typography>
            </Paper>
          </div>
        </DialogContent>

        <DialogActions className="d-flex justify-content-between px-3 pb-3">
          <Button onClick={() => navigate("/search")} color="secondary">
            Cancel
          </Button>
          <Button
            onClick={handlePayment}
            variant="contained"
            color="primary"
            disabled={!isFormValid}
          >
            💳 Pay with Razorpay
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snack.open}
        autoHideDuration={3500}
        onClose={closeSnack}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={closeSnack}
          severity={snack.severity}
          variant="filled"
          sx={{ fontWeight: 600 }}
        >
          {snack.message}
        </Alert>
      </Snackbar>
    </div>
  );
}
