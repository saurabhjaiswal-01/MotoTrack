const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const vehicleRoutes = require("./routes/vehicleRoutes");

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// connect DB
connectDB();

// routes
app.use("/api/vehicles", vehicleRoutes);

// test route
app.get("/", (req, res) => {
  res.send("MotoTrack API Running");
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});