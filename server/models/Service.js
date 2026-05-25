const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  vehicleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vehicle",
    required: true,
  },

  serviceType: {
    type: String,
    required: true,
  },

  cost: {
    type: Number,
    required: true,
  },

  serviceDate: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Service", serviceSchema);