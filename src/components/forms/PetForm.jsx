import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SleepingCat } from "./SleepingCat";
import { getTypes } from "../../services/typeServices";
import { getUser } from "../../services/userServices";
import { updatePet } from "../../services/petServices";

export const PetForm = ({ token }) => {
  const [user, setUser] = useState({});
  const [petData, setPetData] = useState({
    name: "",
    type: 0,
    image_url: "",
  });
  const [types, setTypes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (token) {
          const userData = await getUser(token);
          setUser(userData);

          const typesData = await getTypes();
         
          setTypes(typesData);

          setLoading(false);
          
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, [token]);

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPetData({ ...petData, [name]: value });
  };

  const handleCancel = () => {
    navigate("/");
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log("Pet data submitted:", petData);
  // };

  // if (loading) {
  //   console.log("Loading...");
  //   return <div>Loading...</div>;
  // }
  // console.log("Rendering form...");


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await updatePet(user.id, petData); 
      if (response.status === 200) {
        console.log("Pet data submitted successfully:", petData);
      
        navigate("/");
      } else {
        console.error("Failed to submit pet data:", response.statusText);
      }
    } catch (error) {
      console.error("Error submitting pet data:", error);
    }
  };
  
  

  return (
    <div className="mx-auto max-w-md">
      <h1 className="text-xl font-bold mb-4">Add Pet</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center">
          <label htmlFor="name" className="mr-2">Pet Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={petData.name}
            onChange={handleInputChange}
            className="border border-gray-300 rounded-md px-3 py-2 w-full"
            autoComplete="name"
          />
        </div>

        <div className="flex items-center">
          <label htmlFor="type" className="mr-2">Type:</label>
          <select
            name="type"
            id="type"
            value={petData.type}
            onChange={handleInputChange}
            className="border border-gray-300 rounded-md px-3 py-2 w-full"
            style={{ color: 'black', backgroundColor: 'white' }}
          >
            <option value="">Select type</option>
            {types.map((type) => {
             
              return (
                <option 
                  key={type.id} 
                  value={type.id} 
                  style={{ color: 'black', backgroundColor: 'white' }}
                >

                  {type.label}
                </option>
              );
            })}
          </select>
        </div>

        <div className="flex items-center">
          <label htmlFor="image_url" className="mr-2">Image URL:</label>
          <input
            type="text"
            id="image_url"
            name="image_url"
            value={petData.image_url}
            onChange={handleInputChange}
            className="border border-gray-300 rounded-md px-3 py-2 w-full"
            autoComplete="url"
          />
        </div>

        
        
        <div className="flex justify-between mb-4">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
            onClick={handleSubmit}
          >
            Add Pet
          </button>
          <button
            type="button"
            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </form>
    
      <div  className="mt-16">
  <SleepingCat />
</div>

    
    </div>
  );
};
