// export const getUser = async (token) => {
//   try {
//     const response = await fetch(`http://localhost:8000/users`, {
//       method: "GET",
//       headers: {
//         Authorization: `Token ${localStorage.getItem("auth_token")}`,
//         "Content-Type": "application/json",
//       },
//     });
//     if (!response.ok) {
//       throw new Error("Failed to fetch user data");
//     }
//     const data = await response.json();
//     console.log("User Information Fetched:", data[0]);
//     return data[0]; 
//   } catch (error) {
//     console.error("Error fetching user data:", error);
//     throw error; 
//   }
// };

// export const getUser = async (token) => {
//   try {
//     console.log("Token used for fetching user data:", token); 
//     const response = await fetch(`http://localhost:8000/users`, {
//       method: "GET",
//       headers: {
//         Authorization: `Token ${localStorage.getItem("auth_token")}`,
//         "Content-Type": "application/json",
//       },
//     });
//     if (!response.ok) {
//       throw new Error("Failed to fetch user data");
//     }
//     const data = await response.json();
//     console.log("User Information Fetched:", data);
//     return data[1]; 
//   } catch (error) {
//     console.error("Error fetching user data:", error);
//     throw error; 
//   }
// };

  
  export const updateUser = (userId, updatedUser) => {
    console.log("Data sent to API for edit:", updatedUser);
    return fetch(`http://localhost:8000/users/${userId}`, {
      method: "PUT",
      headers: {
        Authorization: `Token ${localStorage.getItem("auth_token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedUser),
    });
  };
  
  export const deleteUser = (userId) => {
    return fetch(`http://localhost:8000/users/${userId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Token ${localStorage.getItem("auth_token")}`,
      },
    });
  };

  // export const getUser = async (token) => {
//   try {
//     const response = await fetch(`http://localhost:8000/users`, {
//       method: "GET",
//       headers: {
//         Authorization: `Token ${localStorage.getItem("auth_token")}`,
//         "Content-Type": "application/json",
//       },
//     });
//     if (!response.ok) {
//       throw new Error("Failed to fetch user data");
//     }
//     const data = await response.json();
//     console.log("User Information Fetched:", data[0]);
//     return data[0]; 
//   } catch (error) {
//     console.error("Error fetching user data:", error);
//     throw error; 
//   }
// };


export const getUser = () => {
  return fetch(`http://localhost:8000/users`, {
    method: "GET",
    headers: {
      Authorization: `Token ${localStorage.getItem("auth_token")}`,
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
};
// export const getUser = async (token) => {

//   console.log("Token used for fetching user data:", token); 
//   const response = await fetch(`http://localhost:8000/users`, {
//     method: "GET",
//   headers: {
//     Authorization: `Token ${localStorage.getItem("auth_token")}`,
//     "Content-Type": "application/json",
//   },
// }).then((res) => res.json());
// };

// export const getUser = async (token) => {
//   try {
//     console.log("Token used for fetching user data:", token); 
//     const response = await fetch(`http://localhost:8000/users`, {
//       method: "GET",
//       headers: {
//         Authorization: `Token ${token}`,
//         "Content-Type": "application/json",
//       },
//     });
//     if (!response.ok) {
//       throw new Error("Failed to fetch user data");
//     }
//     const data = await response.json();
    
//     // Find the user that matches the provided token
//     const currentUser = data.find(user => user.token === token);
    
//     if (!currentUser) {
//       throw new Error("User not found for the provided token");
//     }
    
//     console.log("User Information Fetched:", currentUser);
//     return currentUser;
//   } catch (error) {
//     console.error("Error fetching user data:", error);
//     throw error; 
//   }
// };

// export const getUser = async (token) => {
//   try {
//     console.log("Token used for fetching user data:", token); 
//     const response = await fetch(`http://localhost:8000/users`, {
//       method: "GET",
//       headers: {
//         Authorization: `Token ${token}`,
//         "Content-Type": "application/json",
//       },
//     });

//     if (!response.ok) {
//       throw new Error("Failed to fetch user data");
//     }

//     const data = await response.json();

//     // Find the user whose token matches the provided token
//     const currentUser = data.find(user => user.token === token);

//     if (!currentUser) {
//       throw new Error("User not found for the provided token");
//     }

//     return currentUser;

//   } catch (error) {
//     console.error("Error fetching user data:", error);
//     throw error; 
//   }
// };

