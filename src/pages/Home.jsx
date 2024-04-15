import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getUser, updateUser } from "../services/userServices";
import { getAllPosts } from "../services/postServices";
import { getUserPets } from "../services/petServices";
import emma from "../assets/emma.png";
import purrscilla from "../assets/purrscilla.png";

export const Home = ({ token, setToken }) => {
  // const [currentUser, setCurrentUser] = useState([]);
  // const [currentUser, setCurrentUser] = useState({ user: {} });
  const [currentUser, setCurrentUser] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [userPets, setUserPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
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

  // const getAndSetUser = () => {
  //   getUser().then((currentUser) => {
  //     setCurrentUser(currentUser);
  //   });
  // };

  // useEffect(() => {
        
  //   // Fetch and set tech user
  //   getAndSetUser();
   
  // }, []); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user data using the provided token
        const userData = await getUser(token);
        setCurrentUser(userData);

        // Fetch posts and pets associated with the user
        const posts = await getAllPosts();
        setUserPosts(posts.filter((post) => post.is_owner === true));

        const pets = await getUserPets(userData.id);
        setUserPets(pets.filter((pet) => pet.is_owner === true));

        // Set loading to false once all data is fetched
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (token) {
      fetchData(); // Call fetchData function when token changes
    }
  }, [token]);

  const handleUserEdit = () => {
    setIsEditing(true);
    setEditedUserInfo({
      email: currentUser.email,
      firstName: currentUser.first_name,
      lastName: currentUser.last_name,
      pet_user: {
        bio: currentUser.pet_user.bio,
        city: currentUser.pet_user.city,
      },
    });
  };

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
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating user info:", error);
    } finally {
      setSavingChanges(false);
    }
  };




  return (
    <main className="bg-gradient-to-b from-blue-500 to-purple-500 h-full">
      <div className="bg-gradient-to-b from-blue-200 to-blue-800 text-center my-8 p-6 rounded-lg shadow-lg max-w-md mx-auto">
        <h1 className="text-5xl font-semibold mb-4 text-white">
          Welcome to Community Pets
        </h1>

        <div className="user-info-container bg-gray-500 p-6 rounded-md shadow-md">
          <p className="text-black-700 mb-4">
            A platform designed to connect pet owners community to exchange pet sitting services.
          </p>
          {currentUser && (
            <>
              <div className="mb-2">
                <h2 className="text-3xl font-semibold text-black">
                  {isEditing ? (
                    <>
                      <input
                        type="text"
                        name="firstName"
                        value={editedUserInfo.firstName}
                        onChange={handleInputChange}
                        className="mb-2 mr-2"
                      />
                      <input
                        type="text"
                        name="lastName"
                        value={editedUserInfo.lastName}
                        onChange={handleInputChange}
                        className="mb-2"
                      />
                    </>
                  ) : (
                    <>
                      {currentUser.first_name} {currentUser.last_name}
                    </>
                  )}
                </h2>
              </div>
              {isEditing ? (
                <input
                  type="text"
                  name="email"
                  value={editedUserInfo.email}
                  onChange={handleInputChange}
                  className="mb-2"
                />
              ) : (
                <p className="text-blue-800 mb-2">{currentUser.email}</p>
              )}
              {isEditing ? (
              <>
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
              </>
            ) : (
              <>
                {/* <p className="text-blue-800 mb-2">{currentUser.pet_user.bio}</p>
                <p className="text-blue-800 mb-2">{currentUser.pet_user.city}</p> */}
              </>
            )}

              {isEditing ? (
                <button
                  onClick={saveChanges}
                  disabled={savingChanges}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                  {savingChanges ? "Saving..." : "Save"}
                </button>
              ) : (
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                  onClick={handleUserEdit}
                >
                  Edit Profile
                </button>
              )}
            </>
          )}
        </div>

        <div className="container mx-auto mt-8">
          <h1 className="text-3xl text-blue-800 font-semibold mb-4 text-center">
            My Posts
          </h1>

          {loading ? (
            <p className="text-xl font-semibold mb-4 text-center">Loading...</p>
          ) : userPosts.length ? (
            userPosts.map((post) => (
              <Link key={post.id} to={`/postLists/${post.id}`}>
  <div className="bg-gray-100 rounded-md p-4 mb-4">
    <div className="text-xl font-semibold">Description: {post.description}</div>
  </div>
</Link>

            ))
          ) : (
            
            <p className="text-xl font-semibold mb-4 text-center">
              No posts found.
            </p>
            
          )}
         
        </div>

        <div className="container mx-auto mt-8">
          <h1 className="text-3xl text-blue-800 font-semibold mb-4 text-center">
            My Pets
          </h1>
          {loading ? (
            <p className="text-xl font-semibold mb-4 text-center">Loading...</p>
          ) : userPets.length ? (
            userPets.map((pet) => (
              <Link key={pet.id} to={`/petLists/${pet.id}`}>
                <div className="bg-gray-100 rounded-md p-4 mb-4">
                  <div className="text-xl font-semibold">Number: {pet.id}</div>
                  <div className="text-xl font-semibold">Description: {pet.name}</div>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-xl font-semibold mb-4 text-center">
              No pets found.
            </p>
          )}
        </div>
      </div>
      <div className="fixed bottom-0 left-0 w-full flex justify-between items-center px-4" style={{ marginBottom: "-100px" }}>
  <img src={emma} alt="Emma" className="w-54 h-54 mr-8" style={{ marginLeft: "-30px" }} />
  <img src={purrscilla} alt="Purrscilla" className="w-54 h-54" style={{ marginRight: "-30px" }} />
</div>

    </main>
  );
};
