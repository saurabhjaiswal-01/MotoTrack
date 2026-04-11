const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema({
  name: { type: String, required: true },
  numberPlate: { type: String, required: true },
  model: String,
  fuelType: String,
});

module.exports = mongoose.model("Vehicle", vehicleSchema);