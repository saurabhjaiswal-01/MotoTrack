const Vehicle = require("../models/Vehicle");

// CREATE
const createVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.create(req.body);
    res.status(201).json(vehicle);
  } catch (err) {
    console.error("CREATE ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};

// GET ALL
const getVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find();
    res.json(vehicles);
  } catch (err) {
    console.error("GET ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};

const deleteVehicle = async (req, res) => {
  try {
    await Vehicle.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { createVehicle, getVehicles, deleteVehicle };