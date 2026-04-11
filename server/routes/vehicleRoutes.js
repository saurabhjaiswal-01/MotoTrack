const express = require("express");
const router = express.Router();

const {
  createVehicle,
  getVehicles,
  deleteVehicle
} = require("../controllers/vehicleController");

router.post("/", createVehicle);
router.get("/", getVehicles);
router.delete("/:id", deleteVehicle);

module.exports = router;