const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const vehicleRoutes = require("./routes/vehicleRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/vehicles", vehicleRoutes);

app.get("/", (req, res) => {
  res.send("MotoTrack API Running");
});

// 🔥 IMPORTANT FIX (WAIT FOR DB)
const startServer = async () => {
  await connectDB();   // ← MUST WAIT

  app.listen(5000, () => {
    console.log("Server running on port 5000");
  });
};

startServer();