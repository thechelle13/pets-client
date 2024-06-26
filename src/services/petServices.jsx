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

// export const createPet = (pet) => {
//   return fetch(`http://localhost:8000/pets)`, {
// method: "POST",
// headers: {
//   Authorization: `Token ${localStorage.getItem("auth_token")}`,
//       "Content-Type": "application/json"  },
//       body: JSON.stringify(pet)
//     }).then((res) => res.json())
// }

export const createPet = async (petData, token) => {
  try {
    const response = await fetch(`http://localhost:8000/pets`, {
      method: "POST",
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(petData),
    });

    if (!response.ok) {
      throw new Error("Failed to create pet");
    }

    return response.json(); 
  } catch (error) {
    console.error("Error creating pet:", error);
    throw error;
  }
};


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

export const deletePet = (petId) => {
  return fetch(`http://localhost:8000/pets/${petId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Token ${localStorage.getItem("auth_token")}`,
    },
  });
};