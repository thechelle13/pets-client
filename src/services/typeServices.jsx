export const getTypes = () => {
    return fetch(`http://localhost:8000/types`, {
      method: "GET",
      headers: {
        Authorization: `Token ${localStorage.getItem("auth_token")}`,
        "Content-Type": "application/json",
      },
    })
    .then((res) => res.json())
  };