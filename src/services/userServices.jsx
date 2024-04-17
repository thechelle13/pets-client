export const getUser = async () => {
  try {
    const token = localStorage.getItem("auth_token");
    console.log("Token sent to API:", token);

    const response = await fetch(`http://localhost:8000/users`, {
      method: "GET",
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
    });


    if (!response.ok) {
      throw new Error("Failed to fetch user data");
    }
    const data = await response.json();
    console.log("User Information Fetched:", data);
    return data; 
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error; 
  }
};


  
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










