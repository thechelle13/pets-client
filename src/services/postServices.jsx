export const getAllPosts = () => {
    return fetch(`http://localhost:8000/posts`, {
      method: "GET",
      headers: {
        Authorization: `Token ${localStorage.getItem("auth_token")}`,
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
  };

  // export const createPost = async (postData, token) => {
  //   try {
  //     const response = await fetch(`http://localhost:8000/posts`, {
  //       method: "POST",
  //       headers: {
  //         Authorization: `Token ${token}`,
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(postData),
  //     });
  
  //     if (!response.ok) {
  //       throw new Error("Failed to create post");
  //     }
  
  //     return response.json(); 
  //   } catch (error) {
  //     console.error("Error creating post:", error);
  //     throw error;
  //   }
  // };
  export const createPost = async (postData, token) => {
    try {
      const response = await fetch(`http://localhost:8000/posts`, {
        method: "POST",
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });
  
      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Failed to create post: ${errorMessage}`);
      }
  
      return response.json();
    } catch (error) {
      console.error("Error creating post:", error);
      throw error;
    }
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


export const updatePost = async (postId, postData) => {
 
    return fetch(`http://localhost:8000/posts/${postId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Token ${localStorage.getItem("auth_token")}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    });
    
  
};


export const editPost = (updatedPost) => {
  return fetch(`http://localhost:8000/posts/${updatedPost.id}`, {
    method: "PUT",
    headers: {
      Authorization: `Token ${localStorage.getItem("auth_token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedPost),})
}

export const addLikeToPost = async (postId) => {
  const response = await fetch(`http://localhost:8000/posts/${postId}`, {
      method: "POST",
      headers: {
          Authorization: `Token ${localStorage.getItem("auth_token")}`,
          "Content-Type": "application/json",
      },
  });
  return response.json();
};

export const addCommentToPost = async (postId, commentText) => {
  const response = await fetch(`http://localhost:8000/comments/${postId}`, {
      method: "POST",
      headers: {
          Authorization: `Token ${localStorage.getItem("auth_token")}`,
          "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: commentText }),
  });
  return response.json();
};