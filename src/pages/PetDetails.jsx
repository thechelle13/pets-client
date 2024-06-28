import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deletePet, getPetById, updatePet } from "../services/petServices";
import { getTypes } from "../services/typeServices";

export const PetDetails = () => {
  const { petId } = useParams();
  const [pet, setPet] = useState(null);
  const [types, setTypes] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [savingChanges, setSavingChanges] = useState(false);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    getPetById(petId)
      .then((pet) => {
        setPet(pet);
      })
      .catch((error) => console.error("Error fetching pet:", error));
  }, [petId]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const typesData = await getTypes();
        setTypes(typesData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleDeletePet = async () => {
    if (window.confirm("Are you sure you want to delete this pet?")) {
      try {
        await deletePet(petId);
        navigate("/");
      } catch (error) {
        console.error("Error deleting pet:", error);
      }
    }
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
    <main className="bg-gradient-to-b from-blue-500 to-purple-500 min-h-screen flex flex-col">
    <div className="text-center my-8 p-6 rounded-lg shadow-lg max-w-md mx-auto">
      <h1 className="text-5xl font-semibold mb-4 text-white">Pet</h1>
        {pet && (
          <>
            {isEditing ? (
              <form className="bg-gradient-to-b from-green-200 to-green-800 text-center p-6 rounded-lg shadow-lg w-full max-w-2xl mx-auto">
                <div className="mb-4">
                  <label htmlFor="name" className="block font-bold mb-2">
                    Name:
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={pet.name}
                    onChange={handleInputChange}
                    className="border border-gray-300 rounded-md px-4 py-2 w-full"
                    
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="type" className="block font-bold mb-2">
                    Type:
                  </label>
                  <select
                    name="type"
                    id="type"
                    value={pet.type}
                    onChange={handleInputChange}
                    className="border border-gray-300 rounded-md px-4 py-2 w-full"
                  >
                    {types.map((type) => (
                      <option key={type.id} value={type.label}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-4">
                  <label htmlFor="image_url" className="block font-bold mb-2">
                    Image:
                  </label>
                  <input
                    type="text"
                    name="image_url"
                    id="image_url"
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
              <button
                  className="bg-red-500 text-white px-4 py-2 rounded-md mr-2 hover:bg-red-700"
                  onClick={handleDeletePet}
                >
                  Delete Pet
                </button>
            </>
          )}
        </div>
      </div>
      <div className="mt-4 text-center">
        <Link to="/" className="text-blue-900 hover:underline">
          Back to Home
        </Link>
      {/* </div> */}
    </div>
    </main>
  );
};
