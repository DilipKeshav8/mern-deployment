const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const path = require("path");
require("dotenv").config();

// Middleware
const corsOptions = {
  origin: ["http://localhost", "http://localhost:3000"]
};
app.use(express.json());
app.use(cors(corsOptions));

// Serve static files from React
app.use(express.static(path.join(__dirname, "../client/build")));

// API Route
app.get("/api", (req, res) => {
  res.status(200).json({ message: "Hello from backend" });
});

// Fallback to React frontend
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

// Connect MongoDB and start server
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    const PORT = process.env.PORT || 8000;
    app.listen(PORT, () => {
      console.log(`App is Listening on PORT ${PORT}`);
    });
  })
  .catch(err => {
    console.log(err);
  });