export const getUserPets = () => {
  return fetch(`http://localhost:8000/pets`, {
    method: "GET",
    headers: {
      Authorization: `Token ${localStorage.getItem("auth_token")}`,
      "Content-Type": "application/json",
    },
  })
  .then((res) => {
  
    return res.json();
  });
};



export const getPetById = (id) => {
  return fetch(`http://localhost:8000/pets/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Token ${localStorage.getItem("auth_token")}`,
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
};