export const getAllComments = () => {
    return fetch(`http://localhost:8000/comments`, {
      method: "GET",
      headers: {
        Authorization: `Token ${localStorage.getItem("auth_token")}`,
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
  };