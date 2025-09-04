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
    doc.setFillColor(53, 56, 57);
    doc.rect(15, 30, 180, 230, "F");

    // ===== Card Border =====
    doc.setDrawColor(255, 165, 0);
    doc.setLineWidth(1.5);
    doc.rect(15, 30, 180, 230);

    // ===== Header =====
    doc.setFillColor(30, 30, 30);
    doc.rect(15, 30, 180, 25, "F");
    doc.setTextColor(255, 165, 0);
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
      {/* Bootstrap Import */}
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
      />

      <style>{`
        body {
          margin: 0;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background: url("/rec.jpg") no-repeat center center fixed;
          background-size: cover;
        }
      `}</style>

      <Box
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "100vh", padding: "15px" }}
      >
        <Container fluid="sm">
          <Paper
            className="mx-auto text-center"
            style={{
              maxWidth: "600px",
              padding: "30px",
              borderRadius: "15px",
              boxShadow: "0px 8px 24px rgba(0,0,0,0.2)",
              background: "rgba(57, 54, 53, 0.8)",
              border: "2px solid black",
              color: "white",
            }}
          >
            <Typography
              variant="h5"
              gutterBottom
              style={{ fontWeight: "bold", color: "deepskyblue" }}
            >
              Payment Receipt
            </Typography>

            {/* Responsive Info using Bootstrap Grid */}
            <div className="row text-start mt-3">
              <div className="col-12 col-md-6">
                <p><b>Passenger:</b> {receipt.passengerName}</p>
                <p><b>Train:</b> {receipt.train.name}</p>
                <p><b>Route:</b> {receipt.train.from_station} → {receipt.train.to_station}</p>
                <p><b>Time:</b> {receipt.train.time}</p>
              </div>
              <div className="col-12 col-md-6">
                <p><b>Seats:</b> {receipt.seats}</p>
                <p><b>Total Paid:</b> ₹{receipt.totalPrice}</p>
                <p><b>Payment ID:</b> {receipt.paymentId}</p>
                <p><b>Date:</b> {receipt.date}</p>
              </div>
            </div>

            {/* Buttons */}
            <Box className="d-flex flex-wrap justify-content-center gap-2 mt-3">
              <Button
                variant="contained"
                onClick={() => navigate("/")}
                className="px-4"
              >
                Go Home
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleDownload}
                className="px-4"
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
