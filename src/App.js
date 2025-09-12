import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import Navbar from "./components/Navbar";
import theme from "./theme";

import IndexPage from "./pages/IndexPage";  // video background landing page
import Login from "./pages/Login";          // background image
import Register from "./pages/Register";    // background image
import TrainSearch from "./pages/TrainSearch"; // background image
import Booking from "./pages/Booking";      // background image
import Home from "./pages/Home";
import PaymentPage from "./pages/PaymentPage";
import ReceiptPage from "./pages/ReceiptPage";
import Profile from "./pages/Profile";
import Bookings from "./pages/Bookings";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Navbar />
        <div style={{ paddingTop: "64px" }}>
          <Routes>
            {/* Landing page with video background */}
            <Route path="/" element={<IndexPage />} />

            {/* Other pages keep image background */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/search" element={<TrainSearch />} />
            <Route path="/booking/:id" element={<Booking />} />

            {/* Optional Home page */}
            <Route path="/home" element={<Home />} />
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/receipt" element={<ReceiptPage />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/bookings" element={<Bookings />} />

          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}
