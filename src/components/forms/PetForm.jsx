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
    
    <div className="mx-auto max-w-md">
      <h1 className="text-xl font-bold mb-4">Add Pet</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
    <div className="flex items-center">
      <label className="mr-2">Name:</label>
      <input
        type="text"
        name="name"
        value={petData.name}
        onChange={handleInputChange}
        className="border border-gray-300 rounded-md px-3 py-2 w-full"
      />
        </div>
        <div className="flex items-center">
      <label className="mr-2">Type:</label>
      <input
        type="text"
        name="type"
        value={petData.type}
        onChange={handleInputChange}
        className="border border-gray-300 rounded-md px-3 py-2 w-full"
      />
    </div>
    <div className="flex items-center">
      <label className="mr-2">Image URL:</label>
      <input
        type="text"
        name="image_url"
        value={petData.image_url}
        onChange={handleInputChange}
        className="border border-gray-300 rounded-md px-3 py-2 w-full"
      />
    </div>
    <div className="flex justify-between">
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
      >
        Add Pet
      </button>
      <button
        className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors"
        onClick={() => handleCancel()}
      >
        Cancel
      </button>
    </div>
      </form>
    </div>
  );
};


