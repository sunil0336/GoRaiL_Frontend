import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import Navbar from "./components/Navbar";
import theme from "./theme";

// ✅ Import pages
import IndexPage from "./pages/IndexPage";   // Video background landing page
import Login from "./pages/Login";           // Background image
import Register from "./pages/Register";     // Background image
import TrainSearch from "./pages/TrainSearch"; // Background image
import Booking from "./pages/Booking";       // Background image
import Home from "./pages/Home";
import PaymentPage from "./pages/PaymentPage";
import ReceiptPage from "./pages/ReceiptPage";
import Profile from "./pages/Profile";       // Profile page

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        {/* ✅ Fixed Navbar on top */}
        <Navbar />

        {/* ✅ Use Bootstrap container for responsiveness */}
        <div className="container-fluid" style={{ paddingTop: "70px" }}>
          <div className="row justify-content-center">
            <div className="col-12">
              <Routes>
                {/* Landing page with video background */}
                <Route path="/" element={<IndexPage />} />

                {/* Other pages with background images */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/search" element={<TrainSearch />} />
                <Route path="/booking/:id" element={<Booking />} />

                {/* Extra pages */}
                <Route path="/home" element={<Home />} />
                <Route path="/payment" element={<PaymentPage />} />
                <Route path="/receipt" element={<ReceiptPage />} />
                <Route path="/profile" element={<Profile />} />
              </Routes>
            </div>
          </div>
        </div>
      </Router>
    </ThemeProvider>
  );
}
