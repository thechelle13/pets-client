import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const PetForm = () => {
  const [petData, setPetData] = useState({
    name: "",
    type: "",
    image_url: "",
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPetData({ ...petData, [name]: value });
  };

  
  const handleCancel = () => {
    navigate("/");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Pet data submitted:", petData);
  };

  return (
    <div>
      <h1>Add Pet</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={petData.name}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Type:</label>
          <input
            type="text"
            name="type"
            value={petData.type}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Image URL:</label>
          <input
            type="text"
            name="image_url"
            value={petData.image_url}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Add Pet</button>
        <button
        className="bg-gray-500 text-white px-4 py-2 rounded-md"
        onClick={() => handleCancel()}
      >
        Cancel
      </button>
      </form>
    </div>
  );
};


