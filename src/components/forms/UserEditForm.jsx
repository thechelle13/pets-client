import React, { useState, useEffect } from "react";
import { getUser, updateUser } from "../../services/userServices";
import { useParams } from "react-router-dom";

export const UserEditForm = ({ token, setToken }) => {
    const { userId } = useParams();
  const [editedUserInfo, setEditedUserInfo] = useState({
    email: "",
    firstName: "",
    lastName: "",
    // pet_user: {
    //   bio: "",
    //   city: "",
    // },
  }
);
  const [savingChanges, setSavingChanges] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (token) {
          const userData = await getUser(userId); 
          setEditedUserInfo({
            email: userData.email || "", 
            firstName: userData.first_name || "", 
            lastName: userData.last_name || "", 
            // pet_user: {
            //   bio: userData.pet_user?.bio || "", 
            //   city: userData.pet_user?.city || "", 
            // },
          });
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
  
    fetchUser();
  }, [token, userId]);
  


  const handleSaveClick = () => {
    // e.preventDefault()

    const updatedUser = {      
       
        first_name: techUser.user.first_name,
        last_name: techUser.user.last_name,
        email: techUser.user.email,
       
    };
    console.log("userId:", userId);
    console.log("updatedUser:", updatedUser);

    editUser(parseInt(userId), updatedUser).then(() => {
      navigate(`/`);
    });
  };

  const handleDeleteClick = () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this Profile?"
    );
    if (confirmDelete) {
      deleteUser(userId).then(() => {
        navigate("/Login");
      });
    }
  };
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     if (name.includes("pet_user")) {
//       const petUserField = name.split(".")[1];
//       setEditedUserInfo((prevUserInfo) => ({
//         ...prevUserInfo,
//         pet_user: {
//           ...prevUserInfo.pet_user,
//           [petUserField]: value,
//         },
//       }));
//     } else {
//       setEditedUserInfo({ ...editedUserInfo, [name]: value });
//     }
//   };

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
    <div className="bg-gradient-to-b from-blue-200 to-blue-800 text-center my-8 p-6 rounded-lg shadow-lg max-w-md mx-auto">
        <h1 className="text-5xl font-semibold mb-4 text-white">Edit User Form</h1>
  
      <div className="mb-2">
        <h2 className="text-3xl font-semibold text-black">
          {editedUserInfo.firstName} {editedUserInfo.lastName}
        </h2>
      </div>
      <p className="text-blue-800 mb-2">{editedUserInfo.email}</p>

      <div className="form-field">
        <label className="block font-bold mb-1" htmlFor="first_name">
          First Name:
        </label>
        <input
                className="textarea-field border p-2 w-full"
                id="first_name"
                onChange={(e) => updateUser(e)}
                type="text"
                placeholder=""
                value={editedUserInfo.firstName}
              />
      </div>

      <div className="form-field">
        <label className="block font-bold mb-1" htmlFor="last_name">
          Last Name:
        </label>
        <input
                className="input-field border p-2 w-full"
                id="last_name"
                onChange={(e) => updateUser(e)}
                type="text"
                placeholder=""
                value={editedUserInfo.lastName}
              />
      </div>

      <div className="form-field">
        <label className="block font-bold mb-1" htmlFor="email">
            Email:
        </label>
        <input
                className="input-field border p-2 w-full"
                id="email"
                onChange={(e) => updateUser(e)}
                type="email"
                placeholder=""
                value={editedUserInfo.email}
              />
        </div>


      {/* <input
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
      /> */}
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
        <button
        className="bg-red-500 text-white px-4 py-2 rounded-md mt-4"
        onClick={() => handleDeleteClick()}
      >
        Delete Profile
      </button>
    </div>
  );
};
