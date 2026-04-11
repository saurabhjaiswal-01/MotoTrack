const BASE_URL = "http://localhost:5000/api/vehicles";

export const getVehicles = async () => {
  const res = await fetch(BASE_URL);
  return res.json();
};

export const addVehicle = async (data) => {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res.json();
};