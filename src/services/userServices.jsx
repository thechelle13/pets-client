export const getUser = () => {
    return fetch(`http://localhost:8000/users`, {
      method: "GET",
      headers: {
        Authorization: `Token ${localStorage.getItem("auth_token")}`,
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
  };

  export const getUserById = (id) => {
    console.log()
    return fetch(`http://localhost:8000/users/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Token ${localStorage.getItem("auth_token")}`,
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
  };
  
  
  export const editUser = (userId, updatedUser) => {
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