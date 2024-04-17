import React, { useState } from "react";

export const PostForm = () => {
  const [postData, setPostData] = useState({
    description: "",
    sitStartDate: "",
    sitEndDate: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPostData({ ...postData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic to submit post data
    console.log("Post data submitted:", postData);
  };

  return (
    <div>
      <h1>Add Post</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Description:</label>
          <input
            type="text"
            name="description"
            value={postData.description}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Sit Start Date:</label>
          <input
            type="date"
            name="sitStartDate"
            value={postData.sitStartDate}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Sit End Date:</label>
          <input
            type="date"
            name="sitEndDate"
            value={postData.sitEndDate}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Add Post</button>
      </form>
    </div>
  );
};


