import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getPetById, updatePet } from "../services/petServices";

export const PetDetails = () => {
  const { petId } = useParams();
  const [pet, setPet] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [savingChanges, setSavingChanges] = useState(false);

  useEffect(() => {
    getPetById(petId)
      .then((pet) => {
        setPet(pet);
      })
      .catch((error) => console.error("Error fetching pet:", error));
  }, [petId]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPet((prevPet) => ({
      ...prevPet,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      setSavingChanges(true);
      await updatePet(petId, pet);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating pet:", error);
    } finally {
      setSavingChanges(false);
    }
  };

  return (
    <div className="mx-auto max-w-md">
      <div className="mt-4 text-center">
        <h1 className="text-blue-900">Pet</h1>
      </div>
      <div className="my-4 p-4 border rounded">
        {pet && (
          <>
            {isEditing ? (
              <form>
                <div className="mb-4">
                  <label htmlFor="name" className="block font-bold mb-2">
                    Name:
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="description"
                    value={pet.name}
                    onChange={handleInputChange}
                    className="border border-gray-300 rounded-md px-4 py-2 w-full"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="type" className="block font-bold mb-2">
                    Type:
                  </label>
                  <input
                    type="text"
                    name="type"
                    id="sitStartDate"
                    value={pet.type}
                    onChange={handleInputChange}
                    className="border border-gray-300 rounded-md px-4 py-2 w-full"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="image" className="block font-bold mb-2">
                    Image:
                  </label>
                  <input
                    type="text"
                    name="image_url"
                    id="sitEndDate"
                    value={pet.image_url}
                    onChange={handleInputChange}
                    className="border border-gray-300 rounded-md px-4 py-2 w-full"
                  />
                </div>
              </form>
            ) : (
              <>
                <div className="mb-4">
                  <div>Name: {pet.name}</div>
                  <div>Type: {pet.type}</div>
                  <div>Image: <img src={pet.image_url} alt={pet.name} className="w-full max-w-md" /></div>
                </div>
              </>
            )}
          </>
        )}

        <div className="mt-4 flex justify-center">
          {pet && (
            <>
              {isEditing ? (
                <>
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2 hover:bg-blue-700"
                    onClick={handleSave}
                    disabled={savingChanges}
                  >
                    {savingChanges ? "Saving..." : "Save"}
                  </button>
                  <button
                    className="bg-gray-500 text-white px-4 py-2 rounded-md mr-2 hover:bg-gray-700"
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2 hover:bg-blue-700"
                  onClick={handleEdit}
                >
                  Edit
                </button>
              )}
            </>
          )}
        </div>
      </div>
      <div className="mt-4 text-center">
        <Link to="/" className="text-blue-900 hover:underline">
          Back to Home
        </Link>
      </div>
    </div>
  );
};
