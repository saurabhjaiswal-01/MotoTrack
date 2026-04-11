import { useEffect, useState } from "react";
import { getVehicles, addVehicle, deleteVehicle  } from "./api";

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

      <h2>Vehicles</h2>

      <ul>
        {vehicles.map((v) => (
          <div key={v._id}>
            {v.name} - {v.numberPlate}
            <button onClick={() => handleDelete(v._id)}>Delete</button>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default App;