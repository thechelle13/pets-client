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

export const createPet = (pet) => {
  return fetch(`http://localhost:8000/pets)`, {
method:Post,
headers: {
  Authorization: `Token ${localStorage.getItem("auth_token")}`,
      "Content-Type": "application/json"  },
      body: JSON.stringify(pet)
    }).then((res) => res.json())
}

export const updatePet = (id, updatedPetInfo) => {
  return fetch(`http://localhost:8000/pets/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Token ${localStorage.getItem("auth_token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedPetInfo),
  }).then((res) => res.json());
};
