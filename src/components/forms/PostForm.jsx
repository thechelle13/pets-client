import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const PostForm = () => {
  const [postData, setPostData] = useState({
    description: "",
    sitStartDate: "",
    sitEndDate: "",
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPostData({ ...postData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic to submit post data
    console.log("Post data submitted:", postData);
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <main className="bg-gradient-to-b from-blue-500 to-purple-500 min-h-screen flex flex-col">
    <div className="flex flex-col items-center mt-4">
      <form onSubmit={handleSubmit} className="bg-gradient-to-b from-green-200 to-green-800 text-center p-6 rounded-lg shadow-lg w-full max-w-2xl mx-auto">
        <h1 className="text-5xl font-semibold mb-4 text-white">Add Post</h1>
        <div className="form-field mb-4">
          <label className="block font-bold mb-1 text-black" htmlFor="description">
            Description:
          </label>
          <textarea
            className="textarea-field border border-gray-300 rounded-md p-2 w-full h-32 resize-none"
            name="description"
            id="description"
            value={postData.description}
            onChange={handleInputChange}
            maxLength={200}
            placeholder="Enter your post here (max 200 characters)"
          />
        </div>
          <div className="form-field mb-4">
            <label className="block font-bold mb-1 text-black" htmlFor="sitStartDate">
              Sit Start Date:
            </label>
            <input
              className="input-field border p-2 w-full"
              type="date"
              name="sitStartDate"
              id="sitStartDate"
              value={postData.sitStartDate}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-field mb-4">
            <label className="block font-bold mb-1 text-black" htmlFor="sitEndDate">
              Sit End Date:
            </label>
            <input
              className="input-field border p-2 w-full"
              type="date"
              name="sitEndDate"
              id="sitEndDate"
              value={postData.sitEndDate}
              onChange={handleInputChange}
            />
          </div>

          <div className="flex justify-between mt-4">
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-700"
            >
              Add Post
            </button>
            <button
              type="button"
              className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-700"
              onClick={handleCancel}
            >
              Cancel
            </button>

          </div>
        </form>
      </div>
    </main>
  );
};
