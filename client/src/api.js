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
  })};

export const deleteVehicle = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });

  return res.json();
};

export const getServices = async () => {
  const res = await fetch("http://localhost:5000/api/services");
  return res.json();
};

export const addService = async (data) => {
  const res = await fetch("http://localhost:5000/api/services", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res.json();
};

export const deleteService = async (id) => {
  await fetch(`http://localhost:5000/api/services/${id}`, {
    method: "DELETE",
  });
};