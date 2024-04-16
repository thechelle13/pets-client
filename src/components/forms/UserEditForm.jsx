import React, { useState, useEffect } from "react";
import { updateUser } from "../../services/userServices";

export const UserEditForm = ({ token, setToken }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [editedUserInfo, setEditedUserInfo] = useState({
    email: "",
    firstName: "",
    lastName: "",
    pet_user: {
      bio: "",
      city: "",
    },
  });
  const [savingChanges, setSavingChanges] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Fetch user data only if token exists
        if (token) {
          // Assuming getUser function fetches user data based on the token
          const userData = await getUser();
          setCurrentUser(userData);
          setEditedUserInfo({
            email: userData.email,
            firstName: userData.first_name,
            lastName: userData.last_name,
            pet_user: {
              bio: userData.pet_user.bio,
              city: userData.pet_user.city,
            },
          });
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUser();
  }, [token]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes("pet_user")) {
      const petUserField = name.split(".")[1];
      setEditedUserInfo((prevUserInfo) => ({
        ...prevUserInfo,
        pet_user: {
          ...prevUserInfo.pet_user,
          [petUserField]: value,
        },
      }));
    } else {
      setEditedUserInfo({ ...editedUserInfo, [name]: value });
    }
  };

  const saveChanges = async () => {
    try {
      setSavingChanges(true);
      await updateUser(currentUser.id, editedUserInfo);
      setCurrentUser((prevUser) => ({ ...prevUser, ...editedUserInfo }));
    } catch (error) {
      console.error("Error updating user info:", error);
    } finally {
      setSavingChanges(false);
    }
  };

  return (
    <div className="user-info-container bg-gray-500 p-6 rounded-md shadow-md">
      <div className="mb-2">
        <h2 className="text-3xl font-semibold text-black">
          {editedUserInfo.firstName} {editedUserInfo.lastName}
        </h2>
      </div>
      <p className="text-blue-800 mb-2">{editedUserInfo.email}</p>
      <textarea
        name="pet_user.bio"
        value={editedUserInfo.pet_user.bio}
        onChange={handleInputChange}
        className="mb-2"
      />
      <input
        type="text"
        name="pet_user.city"
        value={editedUserInfo.pet_user.city}
        onChange={handleInputChange}
        className="mb-2"
      />
      <button
        onClick={saveChanges}
        disabled={savingChanges}
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700"
      >
        {savingChanges ? "Saving..." : "Save"}
      </button>
    </div>
  );
};
