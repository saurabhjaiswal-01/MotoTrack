import { useEffect, useState } from "react";
import {
  getVehicles,
  addVehicle,
  deleteVehicle,
  getServices,
  addService
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

  return (
      <div style={{
        minHeight: "100vh",
        background: "#0f172a",
        color: "white",
        textAlign: "center",
        padding: "40px"
      }}>
      <h1>MotoTrack 🚗</h1>

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
        {vehicles.map((v) => (
          <div key={v._id}>
            {v.name} - {v.numberPlate}
            <button onClick={() => handleDelete(v._id)}>Delete</button>
          </div>
        ))}

        <h2>Service History</h2>

        {services.map((s, i) => (
          <div
            key={i}
            style={{
              background: "#1e293b",
              padding: "10px",
              margin: "10px",
              borderRadius: "8px",
            }}
          >
            <p>Service: {s.serviceType}</p>
            <p>Cost: ₹{s.cost}</p>
            <p>Date: {s.serviceDate}</p>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default App;