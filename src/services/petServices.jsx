export const getUserPets = () => {
  return fetch(`http://localhost:8000/pets`, {
    method: "GET",
    headers: {
      Authorization: `Token ${localStorage.getItem("auth_token")}`,
      "Content-Type": "application/json",
    },
  })
  .then((res) => {
    console.log("Response data from getUserPets API:", res);
    return res.json();
  });
};

// export const getUserPets = async (token) => {
//   try {
//     const response = await fetch('http://localhost:8000/pets', {
//       method: 'GET',
//       headers: {
//         Authorization: `Token ${localStorage.getItem("auth_token")}`,
//         'Content-Type': 'application/json',
//       },
//     });

//     if (!response.ok) {
//       throw new Error('Failed to fetch pet data');
//     }

//     const data = await response.json();
//     console.log('Pet Information Fetched:', data);
//     return data;
//   } catch (error) {
//     console.error('Error fetching pet data:', error);
//     throw error;
//   }
// };


export const getPetById = (id) => {
  return fetch(`http://localhost:8000/pets/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Token ${localStorage.getItem("auth_token")}`,
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
};