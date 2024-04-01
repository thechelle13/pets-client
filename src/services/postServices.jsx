export const getAllPosts = () => {
    return fetch(`http://localhost:8000/posts`, {
      method: "GET",
      headers: {
        Authorization: `Token ${localStorage.getItem("auth_token")}`,
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
  };

  export const deletePost = (postId) => {
    return fetch(`http://localhost:8000/posts/${postId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Token ${localStorage.getItem("auth_token")}`,
        "Content-Type": "application/json",
      },
    })
  };

  export const getPostById = (id) => {
    return fetch(`http://localhost:8000/posts/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Token ${localStorage.getItem("auth_token")}`,
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
  };
  
//   const handleDelete = async () => {
//     // deletion logic here

//      await fetch(`http://localhost:8000/posts/${post.id}`, {
//          method: "DELETE",
//         headers: {
//              Authorization: `Token ${JSON.parse(localStorage.getItem("pet_token")).token}`
//          }
//      });
//           if (response.status === 204) {
//           fetchPosts(showAll)
//          }
    
// };