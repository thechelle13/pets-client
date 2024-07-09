import React, { useState, useEffect } from "react";
import { getUser, updateUser, deleteUser } from "../../services/userServices";
import { useNavigate, useParams } from "react-router-dom";

export const UserEditForm = ({ token }) => {
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
      const updatedUser = {
        id: userId,
        username: editedUserInfo.email.split('@')[0], 
        first_name: editedUserInfo.firstName,
        last_name: editedUserInfo.lastName,
        email: editedUserInfo.email,
        pet_user: {
          bio: editedUserInfo.petUser.bio,
          city: editedUserInfo.petUser.city,
        },
      };
      const response = await updateUser(userId, updatedUser);
      if (!response.ok) {
        throw new Error("Failed to update user");
      }
      console.log("Update response:", await response.json());
      navigate("/");
    } catch (error) {
      console.error("Error updating user info:", error);
    } finally {
      setSavingChanges(false);
    }
  };

  const handleDelete = async () => {
    const confirmed = window.confirm("Are you sure you would like to delete your profile?");
    if (confirmed) {
      try {
        const response = await deleteUser(userId);
        if (response.ok) {
          console.log("User deleted successfully");
          navigate("/login"); 
        } else {
          console.error("Failed to delete user");
        }
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  return (
    <main className="bg-gradient-to-b from-blue-500 to-purple-500 min-h-screen">
      <div className="bg-gradient-to-b from-blue-200 to-blue-800 text-center my-8 p-6 rounded-lg shadow-lg max-w-md mx-auto mt-24">
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
            value={editedUserInfo.firstName}
            onChange={(e) =>
              setEditedUserInfo((prevUserInfo) => ({
                ...prevUserInfo,
                firstName: e.target.value,
              }))
            }
            autoComplete="off"
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
            value={editedUserInfo.lastName}
            onChange={(e) =>
              setEditedUserInfo((prevUserInfo) => ({
                ...prevUserInfo,
                lastName: e.target.value,
              }))
            }
            autoComplete="off"
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
            value={editedUserInfo.email}
            onChange={(e) =>
              setEditedUserInfo((prevUserInfo) => ({
                ...prevUserInfo,
                email: e.target.value,
              }))
            }
            autoComplete="off"
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
            value={editedUserInfo.petUser.bio}
            onChange={(e) =>
              setEditedUserInfo((prevUserInfo) => ({
                ...prevUserInfo,
                petUser: { ...prevUserInfo.petUser, bio: e.target.value },
              }))
            }
            autoComplete="off"
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
            value={editedUserInfo.petUser.city}
            onChange={(e) =>
              setEditedUserInfo((prevUserInfo) => ({
                ...prevUserInfo,
                petUser: { ...prevUserInfo.petUser, city: e.target.value },
              }))
            }
            autoComplete="off"
          />
        </div>

        <div className="flex justify-between mt-4">
          <button
            onClick={saveChanges}
            disabled={savingChanges}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            {savingChanges ? "Saving..." : "Save"}
          </button>
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-700"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>

        <div className="mt-6">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700"
            onClick={handleDelete}
          >
            Delete Profile
          </button>
        </div>
      </div>
    </main>
  );
};
