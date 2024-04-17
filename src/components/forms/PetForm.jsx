import React, { useState } from "react";

export const PetForm = () => {
  const [petData, setPetData] = useState({
    name: "",
    type: "",
    image_url: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPetData({ ...petData, [name]: value });
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
      </form>
    </div>
  );
};


