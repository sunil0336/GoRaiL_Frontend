import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Container, Typography, Paper, Button, Box } from "@mui/material";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function ReceiptPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const receipt = location.state?.receipt;

  if (!receipt) return <Typography>No Receipt Found</Typography>;

  const handleDownload = () => {
    const doc = new jsPDF("p", "mm", "a4");

    // ===== Card Background =====
    doc.setFillColor(53, 56, 57); // Onyx (dark grey-black)
    doc.rect(15, 30, 180, 230, "F"); // Card area

    // ===== Card Border =====
    doc.setDrawColor(255, 165, 0); // Orange border
    doc.setLineWidth(1.5);
    doc.rect(15, 30, 180, 230);

    // ===== Header =====
    doc.setFillColor(30, 30, 30); // Darker strip
    doc.rect(15, 30, 180, 25, "F");
    doc.setTextColor(255, 165, 0); // Orange title
    doc.setFontSize(18);
    doc.text("GoRaiL - Payment Receipt", 105, 47, { align: "center" });

    // ===== Passenger Info Table =====
    autoTable(doc, {
      startY: 70,
      margin: { left: 25, right: 25 },
      theme: "grid",
      head: [["Field", "Details"]],
      body: [
        ["Passenger", receipt.passengerName],
        ["Train", receipt.train.name],
        ["Route", `${receipt.train.from_station} To ${receipt.train.to_station}`],
        ["Time", receipt.train.time],
        ["Seats", receipt.seats],
        ["Total Paid", `Rs ${receipt.totalPrice}`],
        ["Payment ID", receipt.paymentId],
        ["Date", receipt.date],
      ],
      styles: {
        fontSize: 12,
        cellPadding: 6,
        textColor: [255, 255, 255],
        lineColor: [80, 80, 80],
        lineWidth: 0.5,
      },
      headStyles: {
        fillColor: [255, 165, 0],
        textColor: [0, 0, 0],
        fontStyle: "bold",
      },
      bodyStyles: {
        fillColor: [30, 30, 30],
      },
      alternateRowStyles: {
        fillColor: [45, 45, 45],
      },
      columnStyles: {
        0: { fontStyle: "bold", cellWidth: 60 },
        1: { cellWidth: 100 },
      },
    });

    // ===== Footer =====
    doc.setFillColor(30, 30, 30);
    doc.rect(15, 255, 180, 20, "F");
    doc.setTextColor(200, 200, 200);
    doc.setFontSize(10);
    doc.text("Thank you for booking with GoRaiL", 105, 268, {
      align: "center",
    });

    doc.save("Train_Ticket_Receipt.pdf");
  };

  return (
    <>
      <style>{`
        body {
          margin: 0;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background: url("/rec.jpg") no-repeat center center fixed;
          background-size: cover;
        }
      `}</style>

      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          p: 2,
        }}
      >
        <Container maxWidth="sm">
          <Paper
            sx={{
              p: 4,
              borderRadius: 3,
              boxShadow: "0px 8px 24px rgba(0,0,0,0.2)",
              textAlign: "center",
              background: " rgba(57, 54, 53, 0.8)",
              opacity: 0.8,
              border: "2px solid black",
              color: "white",
            }}
          >
            <Typography
              variant="h5"
              gutterBottom
              sx={{ fontWeight: "bold", color: "deepskyblue" }}
            >
              Payment Receipt
            </Typography>

            <Typography>Passenger: {receipt.passengerName}</Typography>
            <Typography>Train: {receipt.train.name}</Typography>
            <Typography>
              Route: {receipt.train.from_station} → {receipt.train.to_station}
            </Typography>
            <Typography>⏰ Time: {receipt.train.time}</Typography>
            <Typography>Seats: {receipt.seats}</Typography>
            <Typography>Total Paid: ₹{receipt.totalPrice}</Typography>
            <Typography>Payment ID: {receipt.paymentId}</Typography>
            <Typography>Date: {receipt.date}</Typography>

            <Box sx={{ mt: 3 }}>
              <Button
                sx={{ mr: 2, borderRadius: 2, px: 3 }}
                variant="contained"
                onClick={() => navigate("/")}
              >
                Go Home
              </Button>

              <Button
                sx={{ borderRadius: 2, px: 3 }}
                variant="contained"
                color="primary"
                onClick={handleDownload}
              >
                Download Receipt
              </Button>
            </Box>
          </Paper>
        </Container>
      </Box>
    </>
  );
}
