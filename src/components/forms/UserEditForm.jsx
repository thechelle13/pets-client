import React, { useState, useEffect } from "react";
import { getUser, updateUser } from "../../services/userServices";
import { useNavigate, useParams } from "react-router-dom";

export const UserEditForm = ({ token}) => {
  const { userId } = useParams();
  const [editedUserInfo, setEditedUserInfo] = useState({
    email: "",
    firstName: "",
    lastName: "",
    petUser: {
      bio: "",
      city: "",
    },
  });
  const [savingChanges, setSavingChanges] = useState(false);
  const [loading, setLoading] = useState(true); 

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (token) {
          const userData = await getUser(userId);
          console.log("User Data:", userData[0]);
          const user = userData[0];
          setEditedUserInfo({
            email: user.email || "",
            firstName: user.first_name || "",
            lastName: user.last_name || "",
            petUser: {
              bio: user.pet_user?.bio || "",
              city: user.pet_user?.city || "",
            },
          });
          setLoading(false); 
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUser();
  }, [token, userId]);

  const handleCancel = () => {
    navigate("/");
  };

  const saveChanges = async () => {
    try {
      setSavingChanges(true);
      console.log("Updating user with data:", editedUserInfo);
      const response = await updateUser(userId, editedUserInfo);
      console.log("Update response:", response); // Log the response
      // Handle success
    } catch (error) {
      console.error("Error updating user info:", error);
    } finally {
      setSavingChanges(false);
    }
  };
  

  return (
    <div className="bg-gradient-to-b from-blue-200 to-blue-800 text-center my-8 p-6 rounded-lg shadow-lg max-w-md mx-auto">
      <h1 className="text-5xl font-semibold mb-4 text-white">Edit User Form</h1>

      <div className="mb-2">
        <h2 className="text-3xl font-semibold text-black">
          {editedUserInfo.firstName} {editedUserInfo.lastName}
        </h2>
      </div>
    
      <div className="form-field">
        <label className="block font-bold mb-1" htmlFor="first_name">
          First Name:
        </label>
        <input
          className="textarea-field border p-2 w-full"
          id="first_name"
          type="text"
          placeholder=""
          value={editedUserInfo.firstName}
          onChange={(e) =>
            setEditedUserInfo((prevUserInfo) => ({
              ...prevUserInfo,
              firstName: e.target.value,
            }))
          }
        />
      </div>

      <div className="form-field">
        <label className="block font-bold mb-1" htmlFor="last_name">
          Last Name:
        </label>
        <input
          className="input-field border p-2 w-full"
          id="last_name"
          type="text"
          placeholder=""
          value={editedUserInfo.lastName}
          onChange={(e) =>
            setEditedUserInfo((prevUserInfo) => ({
              ...prevUserInfo,
              lastName: e.target.value,
            }))
          }
        />
      </div>

      <div className="form-field">
        <label className="block font-bold mb-1" htmlFor="email">
          Email:
        </label>
        <input
          className="input-field border p-2 w-full"
          id="email"
          type="email"
          placeholder=""
          value={editedUserInfo.email}
          onChange={(e) =>
            setEditedUserInfo((prevUserInfo) => ({
              ...prevUserInfo,
              email: e.target.value,
            }))
          }
        />
      </div>

      <div className="form-field">
        <label className="block font-bold mb-1" htmlFor="bio">
          Bio:
        </label>
        <input
          className="input-field border p-2 w-full"
          id="bio"
          type="text"
          placeholder=""
          value={editedUserInfo.petUser.bio}
          onChange={(e) =>
            setEditedUserInfo((prevUserInfo) => ({
              ...prevUserInfo,
              petUser: { ...prevUserInfo.petUser, bio: e.target.value },
            }))
          }
        />
      </div>

      <div className="form-field">
        <label className="block font-bold mb-1" htmlFor="city">
          City:
        </label>
        <input
          className="input-field border p-2 w-full"
          id="city"
          type="text"
          placeholder=""
          value={editedUserInfo.petUser.city}
          onChange={(e) =>
            setEditedUserInfo((prevUserInfo) => ({
              ...prevUserInfo,
              petUser: { ...prevUserInfo.petUser, city: e.target.value },
            }))
          }
        />
      </div>

      <button
        onClick={saveChanges}
        disabled={savingChanges}
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700"
      >
        {savingChanges ? "Saving..." : "Save"}
      </button>
      <button
        className="bg-gray-500 text-white px-4 py-2 rounded-md"
        onClick={() => handleCancel()}
      >
        Cancel
      </button>
    </div>
  );
};