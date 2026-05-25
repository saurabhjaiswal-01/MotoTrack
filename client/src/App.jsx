import "./App.css";
import { useEffect, useState } from "react";
import {
  getVehicles,
  addVehicle,
  deleteVehicle,
  getServices,
  addService,
  deleteService,
} from "./api";

function App() {
  const [vehicles, setVehicles] = useState([]);
  const [services, setServices] = useState([]);

  const [selectedVehicle, setSelectedVehicle] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [cost, setCost] = useState("");
  const [serviceDate, setServiceDate] = useState("");
  
  const [name, setName] = useState("");
  const [numberPlate, setNumberPlate] = useState("");

  const [filterVehicle, setFilterVehicle] = useState("");

  useEffect(() => {
    fetchVehicles();
    fetchServices();
  }, []);

  const fetchVehicles = async () => {
    const data = await getVehicles();
    setVehicles(data);
  };

  const fetchServices = async () => {
    const data = await getServices();
    setServices(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await addVehicle({ name, numberPlate });

    setName("");
    setNumberPlate("");

    fetchVehicles();
  };

  const handleServiceSubmit = async (e) => {
    e.preventDefault();

  await addService({
    vehicleId: selectedVehicle,
    serviceType,
    cost,
    serviceDate,
  });

  setServiceType("");
  setCost("");
  setServiceDate("");

  fetchServices();
  };

  const handleDelete = async (id) => {
    await deleteVehicle(id);
  fetchVehicles();
  };

  const handleDeleteService = async (id) => {
  await deleteService(id);
  fetchServices();
  };

  const totalVehicles = vehicles.length;

  const totalServices = services.length;

  const totalCost = services.reduce(
    (sum, s) => sum + Number(s.cost),
    0
  );

  const filteredServices = filterVehicle
  ? services.filter((s) => s.vehicleId === filterVehicle)
  : services;

  return (
      <div className="container">
      <h1>MotoTrack 🚗</h1>
      

      <div className="dashboard">
        <div className="dashboard-card">
          <h3>Total Vehicles</h3>
          <p>{totalVehicles}</p>
        </div>

        <div className="dashboard-card">
          <h3>Total Services</h3>
          <p>{totalServices}</p>
        </div>

        <div className="dashboard-card">
          <h3>Total Cost</h3>
          <p>₹{totalCost}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Vehicle Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          placeholder="Number Plate"
          value={numberPlate}
          onChange={(e) => setNumberPlate(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>

      <h2>Add Service</h2>

      <form onSubmit={handleServiceSubmit}>
        <select
          value={selectedVehicle}
          onChange={(e) => setSelectedVehicle(e.target.value)}
        >
          <option value="">Select Vehicle</option>

          {vehicles.map((v) => (
            <option key={v._id} value={v._id}>
              {v.name}
            </option>
          ))}
        </select>

        <input
          placeholder="Service Type"
          value={serviceType}
          onChange={(e) => setServiceType(e.target.value)}
        />

        <input
          placeholder="Cost"
          value={cost}
          onChange={(e) => setCost(e.target.value)}
        />

        <input
          type="date"
          value={serviceDate}
          onChange={(e) => setServiceDate(e.target.value)}
        />

        <button type="submit">Add Service</button>
      </form>

      <h2>Vehicles</h2>

      <ul>
        {vehicles.length === 0 ? (
          <p>No vehicles added yet</p>
        ) : (
          vehicles.map((v) => (
            <div key={v._id} className="vehicle-card">
              {v.name} - {v.numberPlate}

              <button
                className="delete-btn"
                onClick={() => handleDelete(v._id)}
              >
                Delete
              </button>
            </div>
          ))
        )}
      </ul>

        <h2>Service History</h2>

        <select
          value={filterVehicle}
          onChange={(e) => setFilterVehicle(e.target.value)}
        >
          <option value="">All Vehicles</option>

          {vehicles.map((v) => (
            <option key={v._id} value={v._id}>
              {v.name}
            </option>
          ))}
        </select>

        {filteredServices.length === 0 ? (
          <p>No services found</p>
        ) : (
          filteredServices.map((s, i) => (
            <div key={i} className="service-card">
              <p>Service: {s.serviceType}</p>
              <p>Cost: ₹{s.cost}</p>
              <p>Date: {s.serviceDate}</p>

              <button
                className="delete-btn"
                onClick={() => handleDeleteService(s._id)}
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>);
}

export default App;