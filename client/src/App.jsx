import { useEffect, useState } from "react";
import { getVehicles, addVehicle } from "./api";

function App() {
  const [vehicles, setVehicles] = useState([]);
  const [name, setName] = useState("");
  const [numberPlate, setNumberPlate] = useState("");

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    const data = await getVehicles();
    setVehicles(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await addVehicle({ name, numberPlate });

    setName("");
    setNumberPlate("");

    fetchVehicles();
  };

  return (
    <div style={{ padding: "20px" }}>
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

      <h2>Vehicles</h2>

      <ul>
        {vehicles.map((v) => (
          <li key={v._id}>
            {v.name} - {v.numberPlate}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;